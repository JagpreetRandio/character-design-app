import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { MUTATION_UPDATE_CHARACTER, QUERY_CHARACTER, MUTATION_REMOVE_CHARACTER } from "../utils/queries";

const CharacterDetails = ({ onClose, onRemove, onUpdate }) => {
  const [updateCharacter] = useMutation(MUTATION_UPDATE_CHARACTER);
  const [removeCharacter] = useMutation(MUTATION_REMOVE_CHARACTER);
  const { CharacterId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [backgroundDescription, setBackgroundDescription] = useState("");
  

  const {
    loading,
    error,
    data: character,
  } = useQuery(QUERY_CHARACTER, {
    variables: { id: CharacterId },
    skip: !CharacterId,
  });

  const handleUpdate = async () => {
    await updateCharacter({
      variables: {
        characterId: character.character._id,
        name: name ? name : character.character.name,
        age: age ? Number(age) : character.character.age,
        gender: gender ? gender : character.character.gender,
        pronoun: pronoun ? pronoun : character.character.pronoun,
        backgroundDescription: backgroundDescription ? backgroundDescription : character.character.backgroundDescription,
      },
    });
    setIsEditing(false);
    onUpdate();
  };

  const handleDelete = async () => {
    await removeCharacter({
      variables: {
        characterId: character.character._id
      },
    });
    onRemove(character.character._id);
  };

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  if (loading) {
    console.log("Loading...");
    return <p>Loading...</p>;
  }
  if (error) {
    console.log("Error:", error);
    return <p>Error :(</p>;
  }

  if (!character) {
    return null;
  }

  const {
    _id,
    name: initialName,
    age: initialAge,
    gender: initialGender,
    pronoun: initialPronoun,
    backgroundDescription: initialBackgroundDescription,
  } = character.character;

  return (
    <div>
      <h1>Character Details</h1>
      {isEditing ? (
        <>
          <label>
            Name:
            <input
              type="text"
              value={name|| initialName}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              value={age || initialAge}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              value={gender || initialGender}
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
          <label>
            Pronoun: 
            <input
              type="text"
              value={pronoun || initialPronoun}
              onChange={(e) => setPronoun(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={backgroundDescription || initialBackgroundDescription}
              onChange={(e) => setBackgroundDescription(e.target.value)}
            />
          </label>

          <button
            onClick={() =>
              handleUpdate(character.character._id)
            }
          >
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>Character name: {character.character.name}</p>
          <p>Age: {character.character.age}</p>
          <p>Gender: {character.character.gender}</p>
          <p>Pronoun:{character.character.pronoun}</p>
          <p>Description: {character.character.backgroundDescription}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(_id)}>Delete</button>
          <button onClick={() => handleClose()}>Close</button>
        </>
      )}
    </div>
  );
};

export default CharacterDetails;
