import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bio
            trips {
                _id
                location
                posts {
                    _id
                    title
                    description
                }
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


// export const GET_TRIPS = gql`
//     query getTrips($tripId: String!) {
//         getTrip(tripId: $tripId) {
//             _id
//             location
//             posts {
//                 _id
//                 title
//                 comments {
//                     text
//                 }
//                 likes
//                 image
//                 description
//                 createdAt
//             }
//         }
//     }
// `;
