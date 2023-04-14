const { gql } = require('apollo-server-express');

const characterTypeDefs = gql`
  type Character {
    _id: ID
    name: String
    age: Int
    gender: String
    pronoun: String
    backgroundDescription: String
    personality: String
    physicalDescription: String
  }

  type Query {
    characters: [Character]!
    character(id: ID!): Character
  }

  type Mutation {
    addCharacter(name: String!, age: Int!, gender: String!, pronoun: String!, backgroundDescription: String!, personality: String! physicalDescription: String!): Character
    removeCharacter(characterId: ID!): Character
    updateCharacter(characterId: ID!, name: String!, age: Int!, gender: String!, pronoun: String!, backgroundDescription: String!, personality: String!, physicalDescription: String!): Character
  }
`;

module.exports = characterTypeDefs;