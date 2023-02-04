const { AuthenticationError } = require('apollo-server-express');
const { User, Trip, Post } = require('../models');
const { signToken } = require('../utils/auth');
const nodemailer = require('nodemailer');

const resolvers = {
    Query: {
        // Get logged-in user info
        me: async (parent, args, context) => {
            if (context.user || args.username) {
                const user = await User.findOne({ username: args.username || context.user.username }).populate('trips').populate({
                    path: 'trips',
                    populate: 'posts'
                }).populate('posts').populate('followers');

                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        // Get single user (to look at their profile page)
        getSingleUser: async (parent, { username }, context) => {
            const user = await User.findOne({ username }).populate('trips').populate('posts').populate('followers');

            return user;
        },

        // Get all users in DB
        getAllUsers: async (parent, args) => {
            return await User.find({}).populate('trips').populate('posts').populate('followers');
        },

        // Get trips by single user (to populate trips list on profile page)
        getTripsByUser: async (parent, args, context) => {
            const trips = await Trip.find({
                username: /*args.username ||*/ context.user.username
            }).populate('posts');
            return trips;
        },

        // Get single trip by ID
        getSingleTrip: async (parent, { tripId }, context) => {
            const trip = await Trip.findOne({ _id: tripId }).populate('posts');
            return trip;
        },

        // Get all posts (travel feed) & sort from newest to oldest
        getAllPosts: async (parent, args) => {
            const posts = await Post.find({}).populate('comments').populate('tripId');
            const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
            return sortedPosts;
        },

        // Get posts by single user (profile page)
        getPostsByUser: async (parent, { username }) => {
            const posts = await Post.find({ username }).populate('comments').populate('tripId');
            return posts;
        },

        // Get all posts in single trip (profile page)
        getPostsByTrip: async (parent, { tripId }) => {
            const posts = await Post.find({ tripId }).populate('comments').populate('tripId');
            return posts;
        },

        // Get single post by ID
        getSinglePost: async (parent, { postId }) => {
            const post = await Post.findOne({ _id: postId }).populate('comments').populate('tripId');
            return post;
        },

        // Get comments based on postId (populate comments per post on travel feed)
        getCommentsOnPost: async (parent, { postId }) => {
            const post = await Post.findOne({ _id: postId }).populate('comments');
            return post;
        },

        // Get user's followers
        getUsersFollowers: async (parent, { username }) => {
            const user = await User.findOne({ username }).populate('followers');
            return user.followers;
        },

        // Nodemailer email functionality
        getEmailUser: async (parent, args, context) => {

            console.log(args);

            if (args.username) {
                console.log('You got here');
                const recipient = await User.findOne({ username: args.username });
                console.log('RESULT:\n');
                console.log('recipient', recipient);

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'ryanmbelcher86@gmail.com',
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });

                let info = await transporter.sendMail({
                    from: 'Journey Journals',
                    to: recipient.email,
                    subject: `Message from`,
                    text: args.message,
                    html: `<p>${args.message}<p>`
                });

                console.log("Message sent: %s", info.messageId);
                res.status(200);
                return result;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        // Login as existing user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        // Sign up as new user
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },

        // Add user's new trip
        addTrip: async (parent, args, context) => {
            // Create trip
            const trip = await Trip.create({
                location: args.location,
                username: args.username || context.user.username
            });

            // Add trip to User's trips
            const updatedUser = await User.findOneAndUpdate(
                { username: args.username || context.user.username },
                {
                    $addToSet: {
                        trips: trip
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('trips');
            return trip;
        },

        // Delete user's trip
        deleteTrip: async (parent, args, context) => {
            // Delete trip
            const trip = await Trip.findOneAndDelete({ _id: args.tripId });

            // Update User's trips field
            const updatedUser = await User.findOneAndUpdate(
                { username: args.username || context.user.username },
                { $pull: { trips: { _id: args.tripId } } },
                { new: true }
            ).populate('trips');

            return trip;
        },

        // Add post from certain trip
        addPost: async (parent, { postInfo }, context) => {
            // Create post
            const post = await Post.create({
                title: postInfo.title,
                description: postInfo.description,
                image: postInfo.image,
                username: postInfo.username || context.user.username,
                tripId: postInfo.tripId
            });

            // Update Trip's posts field
            const updatedTrip = await Trip.findOneAndUpdate(
                { _id: postInfo.tripId },
                {
                    $addToSet: {
                        posts: post
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            // Update User's posts field
            const updatedUser = await User.findOneAndUpdate(
                { username: postInfo.username || context.user.username },
                {
                    $addToSet: {
                        posts: post
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            return post;
        },

        // Delete post from certain trip
        deletePost: async (parent, args, context) => {
            // Delete post
            const post = await Post.findOneAndDelete({ _id: args.postId });

            // Update Trip's posts field
            const updatedTrip = await Trip.findOneAndUpdate(
                { _id: post.tripId._id },
                {
                    $pull: { posts: { _id: args.postId } },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            // Update User's posts field
            const updatedUser = await User.findOneAndUpdate(
                { username: args.username || context.user.username },
                {
                    $pull: { posts: { _id: args.postId } },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );

            return post;
        },

        // Add comment to a post
        addComment: async (parent, args, context) => {
            const post = await Post.findOneAndUpdate(
                { _id: args.postId },
                {
                    $addToSet: {
                        comments: {
                            text: args.text,
                            username: args.username || context.user.username,
                            postId: args.postId
                        }
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('comments');
            return post;
        },

        // Delete comment from post
        deleteComment: async (parent, { commentId, postId }) => {
            return await Post.findOneAndUpdate(
                { _id: postId },
                { $pull: { comments: { _id: commentId } } },
                { new: true }
            ).populate('tripId');
        },
    }
}

module.exports = resolvers;



