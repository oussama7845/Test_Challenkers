import React, { useState } from "react";
import "../css/delete.css";

function Delete({ showDeletePopup, closeDeletePopup }) {
    
  return showDeletePopup ? (



<div className="popup">

<div className="popup_container">
        <div className="title_confirm_delete">
          <h3>Vous êtes sûr ?</h3>
        </div>
        <br />
        <div  className="btns-colonne">
          <button 
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

