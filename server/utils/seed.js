const connection = require('../config/connection');
const { User, Trip, Post } = require('../models');

console.time('seeding');

// Create connection to MongoDB
connection.once('open', async () => {
    // Delete entries in User, Trip, Post collections
    await User.deleteMany({});
    await Trip.deleteMany({});
    await Post.deleteMany({});

    // Insert mock user data
    const users = [
        {
            username: 'Jane',
            email: 'jane@gmail.com',
            password: 'jane12345',
            bio: 'I love nature!',
        },
        {
            username: 'Sal',
            email: 'sal@gmail.com',
            password: 'sal12345',
        }
    ];
    await User.collection.insertMany(users);

    // Insert mock trip data
    const trips = [
        {
            location: 'Yellowstone National Park',
            username: 'Jane'
        },
        {
            location: 'Yosemite National Park',
            username: 'Jane'
        }
    ];
    await Trip.collection.insertMany(trips);


    // Insert mock post data
    const janeTrips = await Trip.find({ username: 'Jane' });
    const posts = [
        {
            title: 'Day 1: Hot Springs',
            description: 'They were so cool!',
            username: 'Jane',
            tripId: janeTrips[0]._id
        },
        {
            title: 'Day 2: Old Faithful',
            description: 'Amazing!',
            username: 'Jane',
            tripId: janeTrips[0]._id
        }
    ];
    await Post.collection.insertMany(posts);
    const janePosts = await Post.find({});

    // Update User trips and posts fields
    await User.findOneAndUpdate( 
        { username: 'Jane' },
        { $push: { 
            trips: [janeTrips[0]._id, janeTrips[1]._id],
            posts: [janePosts[0]._id, janePosts[1]._id]
        } },
        { new: true }
    );

    // Update Trip posts field
    await Trip.findOneAndUpdate(
        { location: 'Yellowstone National Park' },
        { $push: { posts: [janePosts[0]._id, janePosts[1]._id] } },
        { new: true }
    );

    console.timeEnd('seeding complete');
    process.exit(0);
});