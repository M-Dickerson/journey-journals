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
            }
            postCount
            followerCount
        }
    }
`;