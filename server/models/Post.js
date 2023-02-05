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
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
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
        id: false,
        timestamps: {
            createdAt: 'created_at'
        }
    }
);

// Getter function to format timestamp on query
function formatTimestamp (time) {
    return dayjs(time).format('MMM D, YYYY [at] h:mm A');
}

// Number of post's comments
postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

// Number of post's likes
postSchema.virtual('likesCount').get(function () {
    return this.likes.length;
});

const Post = model('Post', postSchema);

module.exports = Post;