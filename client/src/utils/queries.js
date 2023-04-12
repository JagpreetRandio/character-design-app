import { gql } from "@apollo/client";

export const QUERY_CHARACTERS = gql`
  query getCharacters {
    characters {
      _id
      name
      age
      gender
      pronoun
      backgroundDescription
    }
  }
`;

export const QUERY_CHARACTER = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      _id
      name
      age
      gender
      pronoun
      backgroundDescription
    }
  }
`;

export const MUTATION_ADD_CHARACTER = gql`
  mutation addCharacter(
    $name: String!
    $age: Int!
    $gender: String!
    $pronoun: String!
    $backgroundDescription: String!
  ) {
    addCharacter(
      name: $name
      age: $age
      gender: $gender
      pronoun: $pronoun
      backgroundDescription: $backgroundDescription
    ) {
      _id
      name
      age
      gender
      pronoun
      backgroundDescription
    }
  }
`;

export const MUTATION_REMOVE_CHARACTER = gql`
  mutation removeCharacter($characterId: ID!) {
    removeCharacter(characterId: $characterId) {
      _id
      name
      age
      gender
      pronoun
      backgroundDescription
    }
  }
`;

export const MUTATION_UPDATE_CHARACTER = gql`
  mutation updateCharacter(
    $characterId: ID!
    $name: String!
    $age: Int!
    $gender: String!
    $pronoun: String!
    $backgroundDescription: String!
  ) {
    updateCharacter(
      characterId: $characterId
      name: $name
      age: $age
      gender: $gender
      pronoun: $pronoun
      backgroundDescription: $backgroundDescription
    ) {
      _id
      name
      age
      gender
      pronoun
      backgroundDescription
    }
  }
`;
export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      name
      email
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      name
      email
    }
  }
`;

export const MUTATION_ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;

export const MUTATION_REMOVE_USER = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId) {
      _id
      name
      email
    }
  }
`;

export const MUTATION_UPDATE_USER = gql`
  mutation updateUser(
    $userId: ID!
    $name: String
    $email: String
    $password: String
  ) {
    updateUser(
      userId: $userId
      name: $name
      email: $email
      password: $password
    ) {
      _id
      name
      email
    }
  }
`;

export const SAVE_BACKSTORY = gql`
  mutation saveBackstory($backstory: String!) {
    saveBackstory(backstory: $backstory) {
      _id
      backstory
    }
  }
`;

export const GET_BACKSTORY = gql`
  query GetBackstory {
    backstory {
      _id
      backstory
    }
  }
`;
