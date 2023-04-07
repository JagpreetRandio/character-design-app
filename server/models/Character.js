const { Schema, model } = require('mongoose');

const CharacterSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      backgroundDescription: {
        type: String,
        required: 'Please add a description for your character!',
        trim: true
      },
      age: {
        type: Int
      },
      gender: {
        type: String
      },
      pronoun: {
        type: String
      },
      physical: [
        {
          hair: {
            type: String
          },
          eyes: {
            type: String
          },
          skin: {
            type: String
          },
          height: {
            type: String
          }
        },
      ],
      personality: [
        {
          strengths: {
            type: String
          },
          weaknesses: {
            type: String
          },
          willpower: {
            type: String
          },
          charmisa: {
            type: String
          },
          intelligence: {
            type: String
          },
        },
      ],
    }
  );
  
  const character = model('character', CharacterSchema);
  
  module.exports = character;