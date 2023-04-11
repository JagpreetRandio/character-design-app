import React, { useState } from 'react';
import CharacterForm from './CharacterForm';

function CustomForm() {
  const [characters, setCharacters] = useState([]);

  const handleAddCharacter = (character) => {
    setCharacters([...characters, character]);
  };

  return (
    <div className="customForm">
      <h1>Characters:</h1>
      <CharacterForm onAddCharacter={handleAddCharacter} />
      {characters.map((character) => (
        <CharacterForm key={character.id} character={character} />
      ))}
    </div>
  );
}

export default CustomForm;


