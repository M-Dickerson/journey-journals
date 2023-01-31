const { Schema, model } = require('mongoose');

const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        likes: {
            type: Number,
            default: 0 
        },
        comments: [commentSchema],
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    // Set this to use virtual below
    {
        toJSON: {
            virtuals: true,
        },
    }
);

const Post = model('Post', postSchema);

module.exports = Post;