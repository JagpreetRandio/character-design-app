const { gql } = require('apollo-server');


const characterTypeDefs = gql`
type Character {
    _id: ID
    name: String
    age: Int
    gender: String
    pronoun: String
    description: String
}
    type Query {
    characters: [character]!
    character(id: ID!): character
}

    type Mutation {
    addCharacter(name: String!, age: Int!, gender: String!, pronoun: String!, description: String!) Character

    removeCharacter(CharacterId: ID!): Character
}

`;

module.exports = characterTypeDefs;