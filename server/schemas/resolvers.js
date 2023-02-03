const { AuthenticationError } = require('apollo-server-express');
const { User, Trip, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get logged-in user info
        me: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOne({ _id: context.user._id }).populate('trips').populate({
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
        getTripsByUser: async (parent, { username }, context) => {
            const trips = await Trip.find({ username }).populate('posts');
            return trips;
        },

        // Get single trip by ID
        getSingleTrip: async (parent, { tripId }, context) => {
            const trip = await Trip.findOne({ _id: tripId }).populate('posts');
            return trip;
        },

        // Get all posts (travel feed) & sort from newest to oldest
        getAllPosts: async (parent, args) => {
            const posts = await Post.find({}).populate('comments');
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
        }
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
        addTrip: async (parent, { location, userId }, context) => {
            console.log('Add Trip');
            const trip = await Trip.create({ location });
        
            const updatedUser = await User.findOneAndUpdate(
                { _id: /*context.user._id*/ userId },
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
            console.log(updatedUser);
            return trip;
        },

        // Delete user's trip
        deleteTrip: async (parent, { tripId }, context) => {
            const result = await Trip.findOneAndDelete({ _id: tripId });

            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id},
                { $pull: { trips: { _id: tripId } } },
                { new: true }
            ).populate('trips');

            return updatedUser;
        },

        // Add post from certain trip
        addPost: async (parent, { postInfo }, context) => {
            console.log('addPost');
            // Create post
            const post = await Post.create({
                title: postInfo.title,
                description: postInfo.description,
                image: postInfo.image
            });
            console.log(post);

            // Update that trip collection
            const updatedTrip = Trip.findOneAndUpdate(
                { _id: postInfo.tripId },
                { $addToSet: { posts: post._id } },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('posts');
            console.log('\n\n');
            console.log('TripID: ' + postInfo.tripId);
            console.log(updatedTrip);

            // Update user
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
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
            console.log(updatedUser);

            return post;
        },

        // Delete post from certain trip
        deletePost: async (parent, { postId }, context) => {
            console.log('Delete post');

            // Update user
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                {
                    $pull: {
                        posts: postId
                    }
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
            console.log(updatedUser);

            return await Post.findOneAndDelete({ _id: postId });
        },

        // Add comment to a post
        addComment: async (parent, { postId, text, userId }) => {
            return await Post.findOneAndUpdate(
                { _id: postId },
                {
                    $addToSet: {
                        comments: {
                            text,
                            user: userId
                        }
                    }
                },
            ).populate('comments').populate({
                path: 'comments',
                populate: 'user'
            });
        },

        // Delete comment from post
        deleteComment: async (parent, { commentId, postId }) => {
            return await Post.findOneAndUpdate(
                { _id: postId },
                { $pull: { comments: { _id: commentId } } },
                { new: true }
            );
        }
    }
}

module.exports = resolvers;