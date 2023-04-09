import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
      }
    }
  }
`;

export const LIST_USERS_QUERY = gql`
  query ListUsers($data: PageInput) {
    users(data: $data) {
      nodes {
        id
        name
        email
      }
      count
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation createUser($data: UserInput!) {
    createUser(data: $data) {
      name
      phone
      birthDate
      email
      role
      id
    }
  }
`;

export const GET_USER = gql`
  query user($itemId: ID!) {
    user(id: $itemId) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;
