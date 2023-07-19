import React from 'react';
import DisplayCitations from './components/citations/displayCitations.tsx';
import BtnsCitations from './components/citations/btnsCitations.tsx';
import CreateSearch from './components/citations/createSearch.tsx';
import MesCitations from './components/citations/mesCitations.tsx';
import Edit from './components/popups/edit.jsx';


import './components/css/global.css';

function App() {
  return (
    <div>
      <DisplayCitations/>
      <BtnsCitations/>
      <CreateSearch/>
      <MesCitations/>
      <Edit />

    </div>
  );
} 

export default App;
