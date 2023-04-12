import React, { useState } from "react";


const BackstoryForm = ({ backstory, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [updatedBackstory, setUpdatedBackstory] = useState(backstory);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onChange(updatedBackstory);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setUpdatedBackstory(backstory);
    setEditing(false);
  };

  const handleInputChange = (event) => {
    setUpdatedBackstory(event.target.value);
  };

  return (
    <div>
      {!editing ? (
        <div>
          <h3>Backstory</h3>
          <p>{backstory}</p>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      ) : (
        <div>
          <h3>Backstory</h3>
          <textarea value={updatedBackstory} onChange={handleInputChange} />
          <br />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BackstoryForm;