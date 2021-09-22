import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username:$username, email:$email, password:$password){
      token
      user{
          _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email:$email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookId: BookInput){
    saveBook(input: $bookId) {
        username
        savedBooks{
            bookId
            title
            authors
            image
            description
            link
        }
    }
}
`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!){
    removeBook(bookId: $bookId) {
        username
        savedBook{
            bookId
            title
            authors
            image
            description
        }
    }
}
`;