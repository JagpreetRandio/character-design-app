import React, { useState } from 'react';

function CharacterForm() {
    // Define state variables for each form field
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [pronoun, setPronoun] = useState("");


    // handle form
    const handleSubmit = (event) => {
        event.preventDefault();
      };

      

}