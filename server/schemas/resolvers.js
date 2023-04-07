const { AuthenticationError } = require('apollo-server-express');
const { User, Character } = require('../models');


const resolvers = {
    Query: {
      Users: async () => {
        return User.find().populate('characters')
      },
  
      User: async (parent, { User }) => {
        return User.findOne({ User }).populate('characters');
      },
      
      //retrieve the logged in user without specifically searching for them
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      Characters: async (parent, { User }) => {
        return Character.findbyId({ User }).populate('characters');
      },

      Character: async (parent, {characterId}) => {
        return Character.findOne({ _id: characterId });
      }
    },
  
    Mutation: {
      addUser: async (parent, { name, email, password }) => {
        const User = await User.create({ name, email, password });
        const token = signToken(User);
  
        return { token, User };
      },
      login: async (parent, { email, password }) => {
        const User = await User.findOne({ email });
  
        if (!User) {
          throw new AuthenticationError('No user with this email found!');
        }
  
        const correctPw = await User.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(User);
        return { token, User };
      },

      // user can only remove their profile and no one else's
      removeUser: async (parent, args, context) => {
        if (context.user) {
          return User.findOneAndDelete({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      // 
      addCharacter: async (parent, {name, backgroundDescription, age, gender, pronoun, physical, personality }) => {
        const User = await Character.create({name, backgroundDescription, age, gender, pronoun, physical, personality});
        return Character;
      },

      
      removeCharacter: async (parent, {characterId}) => {
        return Character = await Character.findOneAndDelete(characterId);
      
      },
      
      updateCharacter: async (parent, {characterId}) =>{
        return Character = await Character.findOneAndUpdate(characterId);
  
      }

    },
  };
  
  module.exports = resolvers;