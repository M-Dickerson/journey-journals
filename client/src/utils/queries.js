import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me($username: String) {
        me(username: $username) {
            _id
            username
            email
            bio
            profileImage
            trips {
                _id
                location
                posts {
                    _id
                }
            }
            posts {
                _id
                title
            }
            followers {
                _id
                username
            }
            tripCount
            postCount
            followerCount
        }
    }
`;

export const GET_SINGLE_USER = gql`
    query getSingleUser($username: String!) {
        getSingleUser(username: $username) {
            _id
            username
            email
            bio
            profileImage
            trips {
                _id
                location
            }
            tripCount
            posts {
                _id
            }
            postCount
            followers {
                _id
                username
            }
            followerCount
        }
    }
`;


export const GET_SINGLE_TRIP = gql`
    query getSingleTrip($tripId: String!) {
        getSingleTrip(tripId: $tripId) {
            _id
            username
            location
            posts {
                _id
                title
                description
            }
            postCount
        }
    }
`;

export const GET_TRIPS_BY_USER = gql`
    query getTripsByUser($username: String) {
        getTripsByUser(username: $username) {
            _id
            username
            location
            posts {
                _id
            }
            postCount
        }
    }
`;

export const GET_ALL_POSTS = gql`
    query getAllPosts {
        getAllPosts {
            _id
            username
            title
            description
            image
            likes
            tripId {
                _id
                location
            }
            comments {
                _id
                username
                text
                postId {
                    _id
                }
                createdAt
                }
            createdAt
            userId {
                _id
                username
                profileImage
            }
        }
    }
`;

export const GET_POSTS_BY_TRIP = gql`
    query getPostsByTrip($tripId: String!) {
        getPostsByTrip(tripId: $tripId) {
            _id
            username
            title
            description
            image
            likes
            createdAt
            tripId {
                _id
                location
            }
            comments {
                _id
            }
        }
    }
`;
