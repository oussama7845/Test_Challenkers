import React from 'react';
import BtnsCitations from './components/citations/btnsCitations.tsx';
import CreateSearch from './components/citations/createSearch.tsx';
import MesCitations from './components/citations/mesCitations.tsx';
import Edit from './components/popups/edit.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import './components/css/global.css';

function App() {
  return (
    <div>

      <BtnsCitations/>
      <CreateSearch/>
      <MesCitations/>
      <Edit />
      <ToastContainer />

    </div>
  );
} 

export default App;
