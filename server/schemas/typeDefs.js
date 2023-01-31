const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        trips: [Trip]
        posts: [Post]
        followers: [User]
        postCount: Int
        followerCount: Int
    }

    type Trip {
        _id: ID!
        location: String!
        posts: [Post]
    }

    type Post {
        _id: ID!
        title: String!
        description: String!
        image: String
        likes: Int
        comments: [Comment]
        createdAt: String!
    }

    type Comment {
        _id: ID!
        text: String!
        username: [User]
        createdAt: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    # Read operations 
    type Query {
        me(userId: String!): User
    }

    # Create, Update, Delete operations
    type Mutation {
        login(email: String!, password: String!): Auth 
        addUser(username: String!, email: String!, password: String!): Auth
        addTrip(userId: String!, location: String!): User
        deleteTrip(userId: String!, tripId: String!): User
    }
`;

module.exports = typeDefs;
