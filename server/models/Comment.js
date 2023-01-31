const { Schema } = require('mongoose');

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        username: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
);

module.exports = commentSchema;