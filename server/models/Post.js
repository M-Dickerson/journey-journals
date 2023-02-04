const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');
const commentSchema = require('./Comment');

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
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
            get: formatTimestamp
        },
        username: {
            type: String
        },
        tripId: {
            type: Schema.Types.ObjectId,
            ref: 'Trip'
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    // Set this to use virtual below
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Getter function to format timestamp on query
function formatTimestamp (time) {
    return dayjs(time).format('MMM D, YYYY [at] h:mm A');
}

const Post = model('Post', postSchema);

module.exports = Post;