import React from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from "@apollo/client";
import { MUTATION_UPDATE_CHARACTER, QUERY_CHARACTER } from "../utils/queries";

const CharacterDetails = ({ onClose, onRemove, onUpdate }) => {
  const [updateCharacter] = useMutation(MUTATION_UPDATE_CHARACTER);
  const { CharacterId } = useParams();

  const { loading, error, data: character } = useQuery(QUERY_CHARACTER, {
    variables:{id:CharacterId},
    skip: !CharacterId
  });


  // const handleUpdate = async (_id, name, age, gender, pronoun, backgroundDescription) => {
  //   await updateCharacter({
  //     variables: {
  //       characterId: _id,
  //       name,
  //       age,
  //       gender,
  //       pronoun,
  //       backgroundDescription,
  //     },
  //   });
  //   onClose();
  // };

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

  console.log(character)
  return (
    <div>
      <h1>Character Details</h1>
      <p>Character name: {character.character.name}</p>
      <p>Age: {character.character.age}</p>
      <p>Gender: {character.character.gender}</p>
      <p>Pronoun: {character.character.pronoun}</p>
      <p>Description: {character.character.backgroundDescription}</p>
      {/* <button onClick={() => onRemove(character.character._id)}>Delete</button>
      <button onClick={() => onClose()}>Close</button> */}
      <p>Backstory</p>
    </div>
  );

  return null
}

export default CharacterDetails;

