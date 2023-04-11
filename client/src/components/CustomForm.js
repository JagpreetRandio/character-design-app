import React, { useState } from 'react';

function CharacterForm() {
    // Define state variables for each form field
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [pronoun, setPronoun] = useState("");
    const [backgroundDescription, setBackgroundDescription] = useState("");


    // handle form
    const handleSubmit = (event) => {
        event.preventDefault();
      };


      return (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />


        <label htmlFor="background">background Description:</label>
          <input
            type="text"
            id="backgroundDescription"
            value={backgroundDescription}
            onChange={(event) => setBackgroundDescription(event.target.value)}
          />
    
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
    
          <label htmlFor="gender">Gender:</label>
          <select id="gender" value={gender} onChange={(event) => setGender(event.target.value)}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="nonbinary">Non-binary</option>
            <option value="agender">Agender</option>
            <option value="genderfluid">Gender Fluid</option>
            <option value="other">Other</option>
            <option value="nonbinary">Non-binary</option>
            
          </select>


          <label htmlFor="pronoun">Pronoun:</label>
          <select id="pronoun" value={pronoun} onChange={(event) => setPronoun(event.target.value)}>
            <option value="he/him">he/him</option>
            <option value="she/her">she/her</option>
            <option value="they/them">they/them</option>
            <option value="he/they/she">he/they/she</option>
            <option value="she/they">she/they</option>
            <option value="he/they">he/they</option>
            <option value="they/he">they/he</option>
            <option value="he/her">he/her</option>
            <option value="they/she">they/she</option>
            <option value="she/her">she/her</option>
            <option value="he/they/she">he/they/she</option>
            <option value="he/they/she">he/they/she</option>
            <option value="he/they/she">he/they/she</option>
            <option value="she/they/he">she/they/he</option>
            <option value="they/she/he">they/she/he</option>
            <option value="they/he/she">they/he/she</option>
            
          </select>
    
          <button type="submit">Submit</button>
        </form>
      );
    }
    
    export default CharacterForm;
