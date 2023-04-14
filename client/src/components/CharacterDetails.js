import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { MUTATION_UPDATE_CHARACTER, QUERY_CHARACTER,QUERY_CHARACTERS, MUTATION_REMOVE_CHARACTER } from "../utils/queries";
import BackstoryForm from "./BackstoryForm";
const CharacterDetails = () => {
  const [updateCharacter] = useMutation(MUTATION_UPDATE_CHARACTER);
  const [removeCharacter] = useMutation(MUTATION_REMOVE_CHARACTER);
  const { CharacterId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [backgroundDescription, setBackgroundDescription] = useState("");
  const [updatedCharacter, setUpdatedCharacter] = useState("");
  const navigate = useNavigate();

  const handleBackstoryChange = (updatedBackstory) => {
    setUpdatedCharacter({
      ...updatedCharacter,
      backstory: updatedBackstory,
    });
  };

  const resetForm = () => {
    setName("");
    setAge("");
    setGender("");
    setPronoun("");
    setBackgroundDescription("");
  }

  const {
    loading,
    error,
    data: character,
    refetch,
  } = useQuery(QUERY_CHARACTER, {
    variables: { id: CharacterId },
    skip: !CharacterId,
  });

  useEffect(() => {
    if (character) {
      const {
        name: initialName,
        age: initialAge,
        gender: initialGender,
        pronoun: initialPronoun,
        backgroundDescription: initialBackgroundDescription,
      } = character.character;
      setName(initialName);
      setAge(initialAge);
      setGender(initialGender);
      setPronoun(initialPronoun);
      setBackgroundDescription(initialBackgroundDescription);
    }
  }, [character]);

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
    resetForm();
    refetch();
  };

  const handleDelete = async () => {
    if (!character || !character.character || !character.character._id) {
      console.log("Invalid character id");
      return;
    }
    
    removeCharacter({
      variables: {
        characterId: character.character._id
      },
      refetchQueries: [{ query: QUERY_CHARACTERS }]
    }).then(() => {
      // handle delete success
      navigate("/");    }).catch(() => {
      // handle failure
     return(
      <div>
        <h3>
            Sorry, something went wrong! We weren't able to delete your character at this time.
        </h3>
      </div>
     )
    })
  };


  // const handleClose = () => {
  //   setIsEditing(false);
  //   onClose();
  //   resetForm();
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

  const {
    _id,
    name: initialName,
    age: initialAge,
    gender: initialGender,
    pronoun: initialPronoun,
    backgroundDescription: initialBackgroundDescription,
  } = character.character;

  // const handleBackstoryChange = (updatedBackstory) => {
  //   setUpdatedCharacter({
  //     ...updatedCharacter,
  //     backstory: updatedBackstory,
  //   });
  // };

  return (
    <div>
      <h1>Character Details</h1>
      {/* <button onClick={() => onRemove(character.character._id)}>Delete</button>
      <button onClick={() => onClose()}>Close</button> */}
      {isEditing ? (
        <>
          <label>
            Name:
            <input
              type="text"
              placeholder={initialName}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Age:
            <input
              type="text"
              placeholder={initialAge}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <label>
            Gender:
            <input
              type="text"
              placeholder={initialGender}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
          <label>
            Pronoun: 
            <input
              type="text"
              placeholder={initialPronoun}
              value={pronoun}
              onChange={(e) => setPronoun(e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              placeholder={initialBackgroundDescription}
              value={backgroundDescription}
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
          <p> Character name: {character.character.name}</p>
          <p> Age: {character.character.age}</p>
          <p> Gender: {character.character.gender}</p>
          <p> Pronoun:{character.character.pronoun}</p>
          <p> Description: {character.character.backgroundDescription}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(character.character._id)}>Delete</button>
          <BackstoryForm
           backstory={updatedCharacter.backstory}
           onChange={handleBackstoryChange}
            />
        </>
      )}
    </div>
  );
};

export default CharacterDetails;