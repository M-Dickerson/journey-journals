const { AuthenticationError } = require('apollo-server-express');
const { User, Trip, Post } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Get logged-in user info
        me: async (parent, { userId }) => {
            if (/*context.user*/ true) {
                return await User.findOne({ _id: /*context.user._id*/ userId }).populate('trips').populate({
                    path: 'trips',
                    populate: 'posts'
                });
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        getPosts: async (parent, args) => {
            return await Post.find({});
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
        addTrip: async (parent, { userId, location }) => {
            const trip = await Trip.create({ location });
        
            const updatedUser = await User.findOneAndUpdate(
                { _id: userId },
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
            return updatedUser;
        },

        // Delete user's trip
        deleteTrip: async (parent, { userId, tripId }) => {
            const result = await Trip.findOneAndDelete({ _id: tripId });

            const updatedUser = await User.findOneAndUpdate(
                { _id: userId},
                { $pull: { trips: { _id: tripId } } },
                { new: true }
            ).populate('trips');

            return updatedUser;
        },

        // Add post from certain trip
        addPost: async (parent, { postInfo }) => {
            // Create post
            const post = await Post.create({
                title: postInfo.title,
                description: postInfo.description,
                image: postInfo.image
            });

            // Update that trip collection
            const updatedTrip = Trip.findOneAndUpdate(
                { _id: postInfo.tripId },
                { $addToSet: { posts: post } },
                {
                    new: true,
                    runValidators: true,
                }
            ).populate('posts');

            return updatedTrip;
        },

        // Delete post from certain trip
        deletePost: async (parent, { postId }) => {
            return await Post.findOneAndDelete({ _id: postId });
        }
    }
}

module.exports = resolvers;