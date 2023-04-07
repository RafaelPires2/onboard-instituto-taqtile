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
