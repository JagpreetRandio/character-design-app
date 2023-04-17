import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CharacterDetails from "./CharacterDetails";
import CharacterForm from "./CharacterForm";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_CHARACTERS,
  MUTATION_ADD_CHARACTER,
  MUTATION_REMOVE_CHARACTER,
  MUTATION_UPDATE_CHARACTER,
} from "../utils/queries";
import "../assets/css/sidebar.css";
import "../assets/css/index.css";

const Sidebar = () => {
  // Import the `useNavigate` hook from `react-router-dom` to navigate to a new URL
  const navigate = useNavigate();
  // Define two state variables using the `useState` hook to track whether the "Add Character" modal is visible and which character is currently selected
  const [showModal, setShowModal] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Use the `useQuery` hook from Apollo Client to fetch data from a GraphQL server and track the loading and error states
  const { loading, error, data } = useQuery(QUERY_CHARACTERS);
  

  // Use the `useMutation` hook from Apollo Client to execute mutations (i.e., add, remove, or update characters) and refetch the list of characters
  const [addCharacter] = useMutation(MUTATION_ADD_CHARACTER, {
    refetchQueries: [{ query: QUERY_CHARACTERS }],
  });

  const [removeCharacter] = useMutation(MUTATION_REMOVE_CHARACTER, {
    refetchQueries: [{ query: QUERY_CHARACTERS }],
  });

  const [updateCharacter] = useMutation(MUTATION_UPDATE_CHARACTER, {
    refetchQueries: [{ query: QUERY_CHARACTERS }],
  });

  // Define event handlers to handle clicks on the "Add Character" button, on a character in the list, and on the "Submit", "Remove", and "Update" buttons in the modal
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
    backgroundDescription
  ) => {
    await addCharacter({
      variables: {
        name,
        age,
        gender,
        pronoun,
        backgroundDescription,
      },
    });
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
    backgroundDescription
  ) => {
    await updateCharacter({
      variables: {
        characterId: id,
        name,
        age,
        gender,
        pronoun,
        backgroundDescription,
      },
    });
    setSelectedCharacter(null);
  };
// If the data is still loading, display a loading message
  if (loading) {
    return <p>Loading...</p>;
  }
  // If there is an error, display an error message
  if (error) {
    console.log("Error:", error);
    return <p>Error :(</p>;
  }

  return (
    <>
      <div className="sidebar bg-secondary" style={{ top: 0, bottom: 0 }}>
        <button className="btn btn-success" onClick={handleNewCharacterClick}>
          New Character
        </button>
        <div className="sidebar-characters text-light">
          {data.characters.map((character) => (
            <div
              style={{ cursor: "pointer", padding: "5px", fontSize: "30px" }}
              key={character._id}
              onClick={() => handleCharacterClick(character)}
              className={selectedCharacter === character ? "text-info" : ""}
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
