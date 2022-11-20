import { gql } from '@apollo/client';

export const QUERY_SINGLEUSER = gql`
query Query {
    getSingleUser {
      _id
      email
      password
      savedBooks {
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
`