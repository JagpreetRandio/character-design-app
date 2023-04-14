import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CharacterDetails from "./CharacterDetails";
import CharacterForm from "./CharacterForm";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_CHARACTERS,
  MUTATION_ADD_CHARACTER,
  MUTATION_REMOVE_CHARACTER,
  MUTATION_UPDATE_CHARACTER,
} from "../utils/queries";

const Sidebar = () => {
  console.log("Rendering Sidebar...");
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const { loading, error, data } = useQuery(QUERY_CHARACTERS);
  console.log("loading:", loading);
  console.log("error:", error);
  console.log("data:", data);

  const [addCharacter] = useMutation(MUTATION_ADD_CHARACTER, {
    refetchQueries: [{ query: QUERY_CHARACTERS }],
  });

  const [removeCharacter] = useMutation(MUTATION_REMOVE_CHARACTER, {
    refetchQueries: [{ query: QUERY_CHARACTERS }],
  });

  const [updateCharacter] = useMutation(MUTATION_UPDATE_CHARACTER, {
    refetchQueries: [{ query: QUERY_CHARACTERS }],
  });

  const handleNewCharacterClick = () => {
    setShowModal(true);
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    navigate(`/character-details/${character._id}`);
  };
  
  const handleAddCharacter = async (
    name,
    age,
    gender,
    pronoun,
    backgroundDescription,
    personality,
    physicalDescription
  ) => {
    await addCharacter({
      variables: {
        name,
        age,
        gender,
        pronoun,
        backgroundDescription,
        personality,
        physicalDescription
      },
    });
    console.log("rose is good at adding characters")
    setShowModal(false);
  };

  const handleRemoveCharacter = async (id) => {
    await removeCharacter({
      variables: {
        characterId: id,
      },
    });
  };

  const handleUpdateCharacter = async (
    id,
    name,
    age,
    gender,
    pronoun,
    backgroundDescription,
    personality,
    physicalDescription
    
  ) => {
    await updateCharacter({
      variables: {
        characterId: id,
        name,
        age,
        gender,
        pronoun,
        backgroundDescription,
        personality,
        physicalDescription
      },
    });
    setSelectedCharacter(null);
  };

  if (loading) {
    console.log("Loading...");
    return <p>Loading...</p>;
  }
  if (error) {
    console.log("Error:", error);
    return <p>Error :(</p>;
  }

  console.log("Rendering character list:", data.characters);
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header btn bg-success">
          <button className="btn btn-success" onClick={handleNewCharacterClick}>New Character</button>
        </div>
        <div className="sidebar-characters">
          {data.characters.map((character) => (
            <div
              key={character._id}
              onClick={() => handleCharacterClick(character)}
            >
              {character.name}
            </div>
          ))}
        </div>
        {showModal && (
        <div className="">
          <CharacterForm
            onClose={() => setShowModal(false)}
            onSubmit={handleAddCharacter}
          />
        </div>
      )}
        {selectedCharacter && (
        <div className="modal">
          <CharacterDetails
            character={selectedCharacter}
            onClose={() => setSelectedCharacter(null)}
            onRemove={handleRemoveCharacter}
            onUpdate={handleUpdateCharacter}
          />
        </div>
      )}
      </div>
      </>
  );
};

export default Sidebar;
