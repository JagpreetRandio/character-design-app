//imports
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

import {
  MUTATION_UPDATE_CHARACTER,
  QUERY_CHARACTER,
  QUERY_CHARACTERS,
  MUTATION_REMOVE_CHARACTER,
} from "../utils/queries";
// import BackstoryForm from "./BackstoryForm";
import CustomForm from "./CustomForm";

const CharacterDetails = () => {
  const [updateCharacter] = useMutation(MUTATION_UPDATE_CHARACTER);
  const [removeCharacter] = useMutation(MUTATION_REMOVE_CHARACTER);
  const { CharacterId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [personality, setPersonality] = useState("");
  const [physicalDescription, setPhysicalDescription] = useState("");
  const [backgroundDescription, setBackgroundDescription] = useState("");

  // const [updatedCharacter, setUpdatedCharacter] = useState("");
  const navigate = useNavigate();

  // const handleBackstoryChange = (updatedBackstory) => {
  //   setUpdatedCharacter({
  //     ...updatedCharacter,
  //     backstory: updatedBackstory,
  //   });
  // };

  const [custom, setCustom] = useState("");
  const navigate = useNavigate();

  const resetForm = () => {
    setName("");
    setAge("");
    setGender("");
    setPronoun("");
    setBackgroundDescription("");

    setPersonality("");
    setPhysicalDescription("");
    setCustom("");
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
        personality: initialPersonality,
        physicalDescription: initialPhysicalDescription,
        custom: initialCustom
      } = character.character;
      setName(initialName);
      setAge(initialAge);
      setGender(initialGender);
      setPronoun(initialPronoun);
      setBackgroundDescription(initialBackgroundDescription);
      setPersonality(initialPersonality);
      setPhysicalDescription(initialPhysicalDescription);
      setCustom(initialCustom);
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

       // backgroundDescription: backgroundDescription
        //  ? backgroundDescription
       //   : character.character.backgroundDescription,

        backgroundDescription: backgroundDescription ? backgroundDescription : character.character.backgroundDescription,
        personality: personality ? personality : character.character.personality,
        physicalDescription: physicalDescription ? physicalDescription : character.character.physicalDescription,
        custom: custom ? custom : character.character.custom,

      },
    });
    setIsEditing(false);
    resetForm();
    refetch();
  };

  //handles deleted character
  const handleDelete = async () => {
    if (!character || !character.character || !character.character._id) {
      return;
    }

    removeCharacter({
      variables: {
        characterId: character.character._id,
      },
      refetchQueries: [{ query: QUERY_CHARACTERS }],
    })
      .then(() => {
        // handle delete success
        navigate("/");
      })
      .catch(() => {
        // handle failure
        return (
          <div>
            <h3>
              Sorry, something went wrong! We weren't able to delete your
              character at this time.
            </h3>
          </div>
        );
      });
  };



  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error :(</p>;
  }

  if (!character) {
    return null;
  }

  const {
    name: initialName,
    age: initialAge,
    gender: initialGender,
    pronoun: initialPronoun,
    backgroundDescription: initialBackgroundDescription,
    personality: initialPersonality,
    physicalDescription: initialPhysicalDescription,
    custom: initialCustom
  } = character.character;

  return (
    <div className="container mt-5">
      <h1>Character Details</h1>
      {isEditing ? (
        <div className="card p-4">
          <div className="form-group">
            <label for="name">Name:</label>
            <input
              className="form-control"
              type="text"
              id="name"
              placeholder={initialName}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="age">Age:</label>
            <input
              className="form-control"
              type="text"
              id="age"
              placeholder={initialAge}
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="gender">Gender:</label>
            <input
              className="form-control"
              type="text"
              id="gender"
              placeholder={initialGender}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="pronoun">Pronoun:</label>
            <input
              className="form-control"
              type="text"
              id="pronoun"
              placeholder={initialPronoun}
              value={pronoun}
              onChange={(e) => setPronoun(e.target.value)}
            />

          </div>
          <div className="form-group">
            <label for="description">Description:</label>
            <textarea
              className="form-control"
              id="description"
              rows="4"

          </label>
          <label>
            Backstory:
            <input
              type="text"

              placeholder={initialBackgroundDescription}
              value={backgroundDescription}
              onChange={(e) => setBackgroundDescription(e.target.value)}
            />

          </div>
          <div style={{ marginTop: "15px" }}>
            <button
              className="btn margin-10px btn-info"
              onClick={() => handleUpdate(character.character._id)}
            >
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>

          </label>
          <label>
            Personality:
            <input
              type="text"
              placeholder={initialPersonality}
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
            />
          </label>

          <label>
            Physical Description:
            <input
              type="text"
              placeholder={initialPhysicalDescription}
              value={physicalDescription}
              onChange={(e) => setPhysicalDescription(e.target.value)}
            />
          </label>
    
          
          <CustomForm>
          </CustomForm>
    

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
        <div>
          <p> Character name: {character.character.name}</p>
          <p> Age: {character.character.age}</p>
          <p> Gender: {character.character.gender}</p>
          <p> Pronoun:{character.character.pronoun}</p>

          <p> Description: {character.character.backgroundDescription}</p>
          <div className="d-flex ">
            <button className="btn btn-info" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(character.character._id)}
            >
              Delete
            </button>
          </div>
        </div>

          <p> Backstory: {character.character.backgroundDescription}</p>
          <p> Personality: {character.character.personality}</p>
          <p> Physical Description: {character.character.physicalDescription}</p>
          {/* <p> Custom: {character.character.custom}</p> */}

          <br>
          </br>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(character.character._id)}>Delete</button>
        </>

      )}
    </div>
  );
};

export default CharacterDetails;
