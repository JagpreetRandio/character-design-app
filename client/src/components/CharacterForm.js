import React, { useState } from "react";
import "../assets/css/index.css";

// Define a functional component called CharacterForm that receives two props: onClose and onSubmit
const CharacterForm = ({ onClose, onSubmit }) => {
  // Define multiple state variables using the useState hook
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [pronoun, setPronoun] = useState("");
  const [backgroundDescription, setBackgroundDescription] = useState("");


  // Define a function that handles the form submission

  const [personality, setPersonality] = useState("");
  const [physicalDescription, setPhysicalDescription] = useState("");
  

  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Call the onSubmit prop function with the current state values
    onSubmit(name, Number(age), gender, pronoun, backgroundDescription, personality, physicalDescription);

  };

  // Return JSX that renders a modal with a form for inputting character details
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog bg-light" role="document">
        <div className="modal-content bg-light">
          <div className="modal-header text-dark ">
            <h5 className="modal-title text-primary ">
              Input your character's details!
            </h5>
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
              <h2 className="text-center ">Add New Character</h2>
              <form onSubmit={handleSubmit}>
                <div className="text-center">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <br></br>
                <div className="text-center">
                  <label htmlFor="age">Age:</label>
                  <input
                    type="text"
                    id="age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                  />
                </div>
                <br></br>
                <div className="text-center">
                  <label htmlFor="gender">Gender:</label>
                  <input
                    type="text"
                    id="gender"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                  />
                </div>
                <br></br>
                <div className="text-center">
                  <label htmlFor="pronoun">Pronoun:</label>
                  <input
                    type="text"
                    id="pronoun"
                    value={pronoun}
                    onChange={(event) => setPronoun(event.target.value)}
                  />
                </div>
                <br>
                 </br>

        <div className="text-center">
          <label htmlFor="personality">Personality:</label>
          <textarea 
            id="personality"
            value={personality}
            onChange={(event) => setPersonality(event.target.value)}
          ></textarea>
        </div>

        <br>
        </br>

        <div className="text-center">
          <label htmlFor="physicalDescription">Physical Description:</label>
          <textarea 
            id="physicalDescription"
            value={physicalDescription}
            onChange={(event) => setPhysicalDescription(event.target.value)}
          ></textarea>
        </div>

        <br>
                </br>
                <div className="text-center">
                  <label htmlFor="backgroundDescription">
                    Background Description:
                  </label>
                  <textarea
                    id="backgroundDescription"
                    value={backgroundDescription}
                    onChange={(event) =>
                      setBackgroundDescription(event.target.value)
                    }
                  ></textarea>
                </div>
                <div class="text-center">
                  <button class="btn btn-primary" type="submit">
                    Add Character
                  </button>
                  <button
                    class="btn btn-primary"
                    type="button"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </form>

    </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterForm;
