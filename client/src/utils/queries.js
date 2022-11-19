import { gql } from '@apollo/client';

export const QUERY_SINGLEUSER = gql`
    query getSingleUser($_id: String, $username: String) {
        user(_id: $_id, or: {username: $username}) {
            _id
            username
            email
            password
            savedBooks
        }
    }
`