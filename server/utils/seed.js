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
    const userJane = await User.create({
        username: 'Jane',
        email: 'jane@gmail.com',
        password: 'jane12345',
        bio: "Hello, my name is Jane! I love visiting national parks and learning about the natural landmarks in the country. It's so interesting to see how all this beautiful nature has been preserved over the years. Some places I have been to are Yellowstone, Yosemite, Glacier, Arches, and so many more parks! I would love to explore other national parks outside of the U.S. as well!",
        profileImage: 'https://res.cloudinary.com/dqax39nha/image/upload/v1675543560/yuja8msn7nqxt5fttouq.jpg',
    });
    const userSal = await User.create({
        username: 'Sal',
        email: 'sal@gmail.com',
        password: 'sal12345',
        bio: "Hi, I'm Sal! I'm 25 years old. I grew up in New York City. Though I have spent most of my life in NYC, I absolutely love being in cities. Cities are lively - I can always find some company. I also love trying new food, and you can find me hopping from one restaurant to the next. I'm looking to explore other cities in the US and around the world and would appreciate any recommendations! Besides NYC, I have only been to San Francisco."
    });
    
    // Insert mock trip data
    const trip1 = await Trip.create({
        location: 'Yellowstone National Park',
        username: 'Jane'
    });
    const trip2 = await Trip.create({
        location: 'Glacier National Park',
        username: 'Jane'
    });
    const trip3 = await Trip.create({
        location: 'San Francisco',
        username: 'Sal'
    });

    // Insert mock post data
    const janeTrips = await Trip.find({ username: 'Jane' });
    const salTrips = await Trip.find({ username: 'Sal' });
    const post1 = await Post.create({
        title: 'Day 1: Hot Springs',
        description: 'Today, I checked out all the hot springs in Yellowstone! There are so many of them. My favorite was the Grand Prismatic Spring. It is apparently the largest hot spring in the U.S. Love how colorful it is. During my tour, I learned that the different colors correspond to the different temperatures at which the various bacteria in the hot spring can survive. So cool and definitely recommend checking out the various hot springs in the park!',
        image: 'https://res.cloudinary.com/dqax39nha/image/upload/v1675616921/somzfynffzqvtndzgkti.jpg',
        username: 'Jane',
        tripId: janeTrips[0]._id,
        userId: userJane._id
    });
    const post2 = await Post.create({
        title: 'Day 2: "Grand Canyon"',
        description: "Today I figured out why the park is called “Yellowstone”! I checked out the Grand Canyon of Yellowstone. I could spot a variety of colored hues in the rocks - reds, oranges, and golds. The rocks shimmered under the sunlight. The sight was breathtaking.",
        image: 'https://res.cloudinary.com/dqax39nha/image/upload/v1675616944/soqamxczypxemevfnhei.jpg',
        username: 'Jane',
        tripId: janeTrips[0]._id,
        userId: userJane._id
    });
    const post3 = await Post.create({
        title: 'Day 1: Grinnell Lake',
        description: "Loved the opaque turquoise appearance of the lake. The hike to this lake was definitely worth it. Sad to see that the glaciers are melting though.",
        image: 'https://res.cloudinary.com/dqax39nha/image/upload/v1675616957/xzke6kp0ipvuec8pemwz.jpg',
        username: 'Jane',
        tripId: janeTrips[1]._id,
        userId: userJane._id
    });
    const post4 = await Post.create({
        title: 'Day 1: Golden Gate Bridge & Painted Ladies',
        description: "San Francisco is so cool! Today, I checked out the Golden Gate Bridge. Seeing the sunset over the Golden Gate Bridge was so nice - the bright red-orange colors of the bridge popped out. We also saw the famous Painted Ladies Victorian houses that were in the opening credits of the TV show “Full House”. Love the city, but I don't recommend driving here as the roads are so crooked and steep!",
        image: 'https://res.cloudinary.com/dqax39nha/image/upload/v1675616989/oqnirwxmpw4nvihdostg.jpg',
        username: 'Sal',
        tripId: salTrips[0]._id,
        userId: userSal._id
    });
    const janePosts = await Post.find({ username: 'Jane'});
    const salPosts = await Post.find({ username: 'Sal'});

    // Update User trips and posts fields
    await User.findOneAndUpdate( 
        { username: 'Jane' },
        { $push: { 
            trips: [janeTrips[0]._id, janeTrips[1]._id],
            posts: [janePosts[0]._id, janePosts[1]._id, janePosts[2]._id]
        } },
        { new: true }
    );
    await User.findOneAndUpdate( 
        { username: 'Sal' },
        { $push: { 
            trips: [salTrips[0]._id],
            posts: [salPosts[0]._id]
        } },
        { new: true }
    );

    // Update Trip posts field
    await Trip.findOneAndUpdate(
        { location: 'Yellowstone National Park' },
        { $push: { posts: [janePosts[0]._id, janePosts[1]._id] } },
        { new: true }
    );
    await Trip.findOneAndUpdate(
        { location: 'Glacier National Park' },
        { $push: { posts: [janePosts[2]._id] } },
        { new: true }
    );
    await Trip.findOneAndUpdate(
        { location: 'San Francisco' },
        { $push: { posts: [salPosts[0]._id] } },
        { new: true }
    );

    console.timeEnd('seeding complete');
    process.exit(0);
});