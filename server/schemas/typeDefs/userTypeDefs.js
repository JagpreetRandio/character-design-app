const { gql } = require('apollo-server-express');

const userTypeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    addSkill(userId: ID!, skill: String!): User
    removeUser(userId: ID!): User
    removeSkill(userId: ID!, skill: String!): User
  }
`;

module.exports = userTypeDefs;
