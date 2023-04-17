const { AuthenticationError } = require("apollo-server-express");
const { User, Character } = require("../models");
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find().exec();
    },

    user: async (parent, { id }) => {
      return User.findById(id).exec();
    },

    // retrieve the logged in user without specifically searching for them
    // me: async (parent, args, context) => {
    //   if (context.user) {
    //     return User.findById(context.user._id);
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },

    characters: async () => {
      return Character.find().exec();
    },

    character: async (parent, { id }) => {
      return Character.findById(id);
    },
  },

  Mutation: {
    addUser: async (parent, { name, email, password }) => {

      // const email = await User.create ({email})
      // console.log(name, email, password)
      const user = await User.create({ name, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    // user can only remove their profile and no one else's
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findByIdAndDelete(context.user._id);
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    //
    addCharacter: async (
      parent,
      {
        name,
        backgroundDescription,
        age,
        gender,
        pronoun,
        personality,
        physicalDescription,
        custom
      }
    ) => {
      const character = await Character.create({
        name,
        backgroundDescription,
        age,
        gender,
        pronoun,
        personality,
        physicalDescription,
        custom
      });
      return character;
    },

    removeCharacter: async (parent, {characterId: id}) => {

      // console.log("CharacterID: ", id);
      return Character.findByIdAndDelete(id);
    },

    updateCharacter: async (
      parent,
      {
        characterId,
        name,
        backgroundDescription,
        age,
        gender,
        pronoun,
        physicalDescription,
        personality,
        custom
      }
    ) => {
      const updatedCharacter = await Character.findByIdAndUpdate(
        characterId,
        {
          name,
          backgroundDescription,
          age,
          gender,
          pronoun,
          physicalDescription,
          personality,
          custom
        },
        { new: true }
      );
      return updatedCharacter;
    },
  },
};

module.exports = resolvers;
