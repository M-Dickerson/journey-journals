const { Schema, model } = require('mongoose');

const tripSchema = new Schema(
    {
        location: {
            type: String,
            required: true
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            },
        ],
    },
    // Set this to use virtual below
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// Number of posts associated to trip
tripSchema.virtual('postCount').get(function () {
    return this.posts.length;
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;
