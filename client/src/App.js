import React from 'react';
import Sidebar from './components/Sidebar';
import CharacterForm from './components/CharacterForm';
import CharacterDetails from './components/CharacterDetails';
import BackstoryForm from './components/BackstoryForm';
import SettingForm from './components/SettingForm';
import CustomSectionForm from './components/CustomSectionForm';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main">
        <CharacterForm />
        <CharacterDetails />
        <BackstoryForm />
        <SettingForm />
        <CustomSectionForm />
      </div>
    </div>
  );
}

export default App;