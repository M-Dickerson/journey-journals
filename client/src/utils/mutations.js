import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_TRIP = gql`
    mutation addTrip($location: String!) {
        addTrip(location: $location) {
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

export const ADD_POST = gql`
    mutation addPost($postInfo: AddPostInfo) {
        addPost(postInfo: $postInfo) {
            _id
            title
            description
        }
    }
`;

export const DELETE_TRIP = gql`
    mutation DeleteTrip($tripId: String!) {
        deleteTrip(tripId: $tripId) {
            _id
            username
            trips {
                _id
                location
            }
        }
    }
`;

export const DELETE_POST = gql`
    mutation DeletePost($postId: String!) {
        deletePost(postId: $postId) {
            _id
            title
        }
    }
`;
