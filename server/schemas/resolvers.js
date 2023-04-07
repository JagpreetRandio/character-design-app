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
  
      addSkill: async (parent, { UserId, skill }, context) => {
        if (context.user) {
          return User.findOneAndUpdate(
            { _id: User },
            {
              $addToSet: { skills: skill },
            },
            {
              new: true,
              runValidators: true,
            }
          );
        }
        //throw an error
        throw new AuthenticationError('You need to be logged in!');
      },
      // user can only remove their profile and no one else's
      removeUser: async (parent, args, context) => {
        if (context.user) {
          return User.findOneAndDelete({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      },

      // not sure if this correct 
      addCharacter: async (parent, {name, backgroundDescription, age, gender, pronoun, physical, personality }) => {
        const User = await Character.create({name, backgroundDescription, age, gender, pronoun, physical, personality});
        return Character;
      },

      // I feel like this is correct? Maybe?
      removeCharacter: async (parent, {characterId}) => {
        const character = await Character.findByIdAndRemove(characterId);
        return character;
      },

      // um again im not sure
      updateCharacter: async (parent, {characterId}) =>{
        const character = await Character.findOneAndUpdate(characterId);
        return character;

      }

    },
  };
  
  module.exports = resolvers;