const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        bio: String
        profileImage: String
        trips: [Trip]
        posts: [Post]
        followers: [User]
        tripCount: Int
        postCount: Int
        followerCount: Int
    }

    type Trip {
        _id: ID!
        location: String
        posts: [Post]
        username: String
        postCount: Int
    }

    type Post {
        _id: ID!
        title: String
        description: String
        image: String
        likes: Int
        comments: [Comment]
        createdAt: String
        username: String
        userId: User
        tripId: Trip
    }

    type Comment {
        _id: ID!
        text: String
        username: String
        postId: Post
        createdAt: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input AddPostInfo {
        title: String
        description: String
        image: String
        username: String
        userId: String
        tripId: String
    }

    # Read operations 
    type Query {
        # Get logged-in user (profile page)
        me(username: String): User
        # Get a single user (look at their profile page)
        getSingleUser(username: String!): User
        # Get all users
        getAllUsers: [User]
        # Get trips by single user (trips list on profile page)
        getTripsByUser(username: String): [Trip] 
        # Get single trip by ID
        getSingleTrip(tripId: String): Trip 
        # Get all posts (travel feed)
        getAllPosts: [Post]
        # Get posts by single user (profile page)
        getPostsByUser(username: String!): [Post]
        # Get all posts in single trip (profile page)
        getPostsByTrip(tripId: String!): [Post]
        # Get single post by ID
        getSinglePost(postId: String!): Post
        # Get comments based on postId (populate comments per post on travel feed)
        getCommentsOnPost(postId: String!): Post
        # Get user's followers
        getUsersFollowers(username: String!): [User]
    }

    # Create, Update, Delete operations
    type Mutation {
        login(email: String!, password: String!): Auth 
        addUser(username: String!, email: String!, password: String!): Auth
        editProfile(username: String, bio: String, profileImage: String): User
        addTrip(location: String!, username: String): Trip
        deleteTrip(tripId: String!, username: String): Trip
        addPost(postInfo: AddPostInfo): Post
        deletePost(postId: String!, username: String): Post
        addComment(text: String!, username: String, postId: String!): Post
        deleteComment(commentId: String!, postId: String!): Post
    }
`;

module.exports = typeDefs;
