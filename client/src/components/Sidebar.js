import React from 'react';
import { Link, useNavigate } from "react-router-dom";
// import CharacterDetails from "./CharacterDetails";
// import CharacterForm from "./CharacterForm";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Characters</h2>
      <ul>
        <li><Link to="/character-details">Character 1</Link></li>
        <li><Link to="/character-details">Character 2</Link></li>
        <li><Link to="/character-details">Character 3</Link></li>
        <li><Link to="/character-details">Character 4</Link></li>
        <li><Link to="/character-details">Character 5</Link></li>
      </ul>
      <button>Create New Character</button>
    </div>
  );
}

export default Sidebar;