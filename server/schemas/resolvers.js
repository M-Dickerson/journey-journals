const { AuthenticationError } = require('apollo-server-express');
const { User, Trip, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get logged-in user info
        me: async (parent, args, context) => {
            // console.log(context);
            if (context.user) {
                const result = await User.findOne({ _id: context.user._id }).populate('trips').populate({
                    path: 'trips',
                    populate: 'posts'
                });
                console.log('RESULT:\n');
                console.log(result);
                return result;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        // Returns either single post by ID or all posts from newest to oldest (for travel feed)
        getPosts: async (parent, args) => {
            if (args.postId) {
                const post = await Post.find({ _id: args.postId });
                return post;
            }
            const posts = await Post.find({});
            const sortedPosts = posts.sort((a, b) => b.createdAt - a.createdAt);
            return sortedPosts;
        },

        getTrip: async (parent, { tripId }, context) => {
            const trip = await Trip.findOne({ _id: tripId }).populate('posts');
            console.log(trip);
            return trip;
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
        addTrip: async (parent, { location }, context) => {
            console.log('Add Trip');
            const trip = await Trip.create({ location });
        
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
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
            return updatedUser;
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
                { $addToSet: { posts: post } },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('posts');
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

            return updatedTrip;
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