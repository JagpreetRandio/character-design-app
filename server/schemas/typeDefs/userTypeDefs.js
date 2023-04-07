const { gql } = require('apollo-server');

const userTypeDefs = gql`
type User {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
}

  type Mutation {
    addUser(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addSkill(UserId: ID!, skill: String!): User
    removeUser(UserId: ID!): User
    removeSkill(UserId: ID!, skill: String!): User
}

`;

module.exports = userTypeDefs;