import React, { useState } from "react";
import "../assets/css/index.css"
import BackstoryForm from "./BackstoryForm";

const CharacterForm = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [backgroundDescription, setBackgroundDescription] = useState("");
  const [updatedCharacter, setUpdatedCharacter] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(name, age, gender, pronoun, backgroundDescription);
  };

  const handleBackstoryChange = (updatedBackstory) => {
    setUpdatedCharacter({
      ...updatedCharacter,
      backstory: updatedBackstory,
    });
  };

console.log("MODAL WHERE ARE YOUUUU")
  return (
    <div className="modal" style={{display: 'block'}}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Input your character's details!</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"></span>
              </button>
            </div>
            <div className="modal-body">
              
              
    <div className="modal-content">
      <h2>Add New Character</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            id="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="pronoun">Pronoun:</label>
          <input
            type="text"
            id="pronoun"
            value={pronoun}
            onChange={(event) => setPronoun(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="backgroundDescription">Background Description:</label>
          <textarea
            id="backgroundDescription"
            value={backgroundDescription}
            onChange={(event) => setBackgroundDescription(event.target.value)}
          ></textarea>
        </div>
        <BackstoryForm
        backstory={updatedCharacter.backstory}
        onChange={handleBackstoryChange}
      />
      <br>
      </br>
        <button type="submit">Add Character</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
            
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default CharacterForm;
