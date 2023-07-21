import React from 'react';
import BtnsCitations from './components/citations/btnsCitations';
import CreateSearch from './components/citations/createSearch';
import Edit from './components/popups/edit';
import FavoriteCitation from './components/citations/favoriteCitation.tsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/css/global.css';

function App() {
  return (
    <div>

      <BtnsCitations/>
      <CreateSearch/>
      <Edit />
      <ToastContainer />
      <FavoriteCitation/>

    </div>
  );
} 

export default App;
