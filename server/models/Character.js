const { Schema, model } = require('mongoose');

const CharacterSchema = new Schema({
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
    type: Number
  },
  gender: {
    type: String,
    // enum: ['male', 'female', 'non-binary','agender', 'genderfluid','other']
  },
  pronoun: {
    type: String,
    // enum: ['he/him', 'he/they', "she/they", "he/they", "they/he", "he/her", "he/they/she", "she/they/he", "they/she/he", "they/he/she", "they/she", 'she/her', 'they/them']
  },
  physicalDescription: {
    type: String,
  },
  personality: {
    type: String,
  },
});

const Character = model('Character', CharacterSchema);

module.exports = Character;
