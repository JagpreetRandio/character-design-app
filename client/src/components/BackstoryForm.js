import React, { useState } from "react";
import { useMutation, useQuery } from '@apollo/client';
import { GET_BACKSTORY, SAVE_BACKSTORY } from "../utils/queries";

const BackstoryForm = () => {
  const { loading, error, data, refetch } = useQuery(GET_BACKSTORY);

  const [editing, setEditing] = useState(false);
  const [updatedBackstory, setUpdatedBackstory] = useState(data?.backstory);
  const [saveBackstory] = useMutation(SAVE_BACKSTORY, {
    onCompleted: () => {
      setEditing(false);
      refetch();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    await saveBackstory({ variables: { backstory: updatedBackstory } });
  };

  const handleCancelClick = () => {
    setUpdatedBackstory(data?.backstory);
    setEditing(false);
  };

  const handleInputChange = (event) => {
    setUpdatedBackstory(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      {!editing ? (
        <div>
          <h3>Backstory</h3>
          <p>{data?.backstory}</p>
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