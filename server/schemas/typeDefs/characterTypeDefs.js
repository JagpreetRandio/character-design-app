const { gql } = require('apollo-server-express');

const characterTypeDefs = gql`
  type Character {
    _id: ID
    name: String
    age: Int
    gender: String
    pronoun: String
    backgroundDescription: String
  }

  type Query {
    characters: [Character]!
    character(id: ID!): Character
  }

  type Mutation {
    addCharacter(name: String!, age: Int!, gender: String!, pronoun: String!, backgroundDescription: String!): Character
    removeCharacter(characterId: ID!): Character
    updateCharacter(characterId: ID!): Character
  }
`;

module.exports = characterTypeDefs;