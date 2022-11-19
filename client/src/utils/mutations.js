import { gql } from '@apollo/client';

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser (username: $username, email: $email, password: $password) {
            _id
            username
            email
            password
            savedBooks
        }
    }
`

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation saveBook($_id: ID!, $savedBooks: [ID]) {
    saveBook(_id: $_id, savedBooks: $savedBooks) {
      _id
      username
      savedBooks
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($_id: ID!, $savedBooks: [ID]) {
    removeBook(_id: $_id, savedBooks: $savedBooks) {
      _id
      username
      savedBooks
    }
  }
`;