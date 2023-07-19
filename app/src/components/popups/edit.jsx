import React, { useState } from "react";
import "../css/edit.css";

function Edit({ showEditPopup, closeEditPopup }) {
    const [citation, setcitation] = useState('');
    const [auteur, setauteur] = useState('');
    const [acteur, setacteur] = useState('');
    const [personnage, setpersonnage] = useState('');
    const [saison, setsaison] = useState('');
    const [episode, setepisode] = useState('');
  return showEditPopup ? (

    
<div id="app">
      <div className='popup'>
        <div className="profile-popup-content">
          <div className="title-profile">
            <h2>Modifier votre Citation</h2>
            <div className="line3"></div>
          </div>
          <div className="colonne-step">
            <div className="colonnne-step1-grid1">
              <div className="input-field">
                <label >Citation</label>
                <input
                  id="citation"
                  value={citation}
                  onChange={(e) => setcitation(e.target.value)}
                  type="text"
                  placeholder="modifier votre citation"
                />
              </div>
              <div className="input-field">
                <label >auteur</label>
                <input
                  id="auteur"
                  value={auteur}
                  onChange={(e) => setauteur(e.target.value)}
                  type="text"
                  placeholder="modifier le nom de l'auteur"
                />
              </div>

              <div className="input-field">
                <label >episode</label>
                <input
                  id="episode"
                  value={episode}
                  onChange={(e) => setepisode(e.target.value)}
                  type="text"
                  placeholder="quelle épisode ?"
                />
              </div>

   
            </div>
            <div className="colonnne-step1-grid2">
              <div className="input-field">
                <label >acteur</label>
                <input
                  id="acteur"
                  value={acteur}
                  onChange={(e) => setacteur(e.target.value)}
                  type="text"
                  placeholder="modifier le nom de l'auteur"
                />
              </div>
              <div className="input-field">
                <label >
                personnage
                 
                </label>
                <input
                  value={personnage}
                  onChange={(e) => setpersonnage(e.target.value)}
                  id="personnage"
                  type="text"
                  placeholder="modifier le nom de personnage"
                />
              </div>

              <div className="input-field">
                <label >saison</label>
                <input
                  id="saison"
                  value={saison}
                  onChange={(e) => setsaison(e.target.value)}
                  type="text"
                  placeholder="quelle saison ?"
                />
              </div>

     

              

            </div>
          </div>

          <div className="button-colonne margin">
            <div className="container_btn_invite">
              <a  href="#" className="btn1">
                Confirmer
              </a>
            </div>
            <div className="container_btn_invite">
              <a onClick={closeEditPopup} href="#" className="btn1">
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  ) : null;
}

export default Edit;


