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
  },
  pronoun: {
    type: String,
  },
  physicalDescription: {
    type: String,
  },
  personality: {
    type: String,
  },
  custom: {
    type: String,
  },
});

const Character = model('Character', CharacterSchema);

module.exports = Character;
