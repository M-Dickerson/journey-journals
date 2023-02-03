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


export const GET_TRIP = gql`
    query getTrip($tripId: String!) {
        getTrip(tripId: $tripId) {
            _id
            location
            posts {
                _id
                title
                comments {
                    text
                }
                likes
                image
                description
                createdAt
            }
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
