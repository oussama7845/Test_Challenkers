import React, { useState } from "react";
import "../css/delete.css";
import axios from 'axios';
import { toast } from 'react-toastify';



function Delete({ showDeletePopup, idCitation , closeDeletePopup }) {


  const confirm = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/citation/${idCitation}`);
      
      if (response.status === 200) {
        closeDeletePopup();
        window.location.reload();
        toast.success('Citation supprimée avec succès');

        
     
      } else {
        throw new Error('Erreur lors de la récupération des citations.');
      }
    }
      
     catch (err) {
      console.error(err);
    }
  };
  
    
  return showDeletePopup ? (


<div className="popup">

<div className="popup_container">
        <div className="title_confirm_delete">
          <h3>Vous êtes sûr ?</h3>
        </div>
        <br />
        <div  className="btns-colonne">
          <button onClick={confirm}
            className="container_btn_confirm"
            
          >
            Confirmer
          </button>
          <button
            className="container_btn_close"
            onClick={closeDeletePopup}
          >
            Annuler
          </button>
        </div>
 

</div>
      

</div>
    
      

  
  ) : null;
}

export default Delete;

