import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
    }
  }
}
`

export const LOGIN_USER = gql`
mutation Mutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      username
    }
  }
}
`;

export const ADD_BOOK = gql`
mutation Mutation($newBook: iBook!) {
  addBook(newBook: $newBook) {
    username
    password
    email
    _id
    savedBooks {
      bookId
      authors
      description
      title
      image
      link
    }
  }
}
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: bookId) {
      _id
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;