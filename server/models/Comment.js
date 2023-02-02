const { Schema } = require('mongoose');
const dayjs = require('dayjs');

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
            trim: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: formatTimestamp
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

module.exports = commentSchema;