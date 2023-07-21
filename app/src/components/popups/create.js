import React, { useState } from "react";
import "../css/edit.css";
import axios from "axios";
import { toast } from 'react-toastify';

function Create({ showCreatePopup, closeCreatePopup }) {
  const [citation, setCitation] = useState("");
  const [auteur, setAuteur] = useState("");
  const [acteur, setActeur] = useState("");
  const [personnage, setPersonnage] = useState("");
  const [saison, setSaison] = useState("");
  const [episode, setEpisode] = useState("");

  const confirmCreateCitation = async () => {
    try {
      let body = {
        citation: citation,
        auteur: auteur,
        acteur: acteur,
        personnage: personnage,
        saison: saison,
        episode: episode,
      };

      const response = await axios.post("http://localhost:3000/create_Citation",body);

      if (response.status === 201) {
         closeCreatePopup(); // appeler la function qui close le pop up
         window.location.reload();
        toast.success("Citation enregistrée avec succès");

        
      } else {
        toast.error("erreur");

      }
    } catch (err) {
      console.log(err);
      toast.error("erreur");
    }
  };


  return showCreatePopup ? (

    
<div id="app">
      <div className='popup'>
        <div className="profile-popup-content">
          <div className="title-profile">
            <h2>Créer votre Citation</h2>
            <div className="line3"></div>
          </div>
          <div className="colonne-step">
            <div className="colonnne-step1-grid1">
              <div className="input-field">
                <label >Citation</label>
                <input
                  id="citation"
                  value={citation}
                  onChange={(e) => setCitation(e.target.value)}
                  type="text"
                  placeholder="Créer votre citation"
                />
              </div>
              <div className="input-field">
                <label >auteur</label>
                <input
                  id="auteur"
                  value={auteur}
                  onChange={(e) => setAuteur(e.target.value)}
                  type="text"
                  placeholder="Nom de l'auteur"
                />
              </div>

              <div className="input-field">
                <label >episode</label>
                <input
                  id="episode"
                  value={episode}
                  onChange={(e) => setEpisode(e.target.value)}
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
                  onChange={(e) => setActeur(e.target.value)}
                  type="text"
                  placeholder="Nom de l'acteur"
                />
              </div>
              <div className="input-field">
                <label >
                personnage
                 
                </label>
                <input
                  value={personnage}
                  onChange={(e) => setPersonnage(e.target.value)}
                  id="personnage"
                  type="text"
                  placeholder="Nom de personnage"
                />
              </div>

              <div className="input-field">
                <label >saison</label>
                <input
                  id="saison"
                  value={saison}
                  onChange={(e) => setSaison(e.target.value)}
                  type="text"
                  placeholder="quelle saison ?"
                />
              </div>

     

              

            </div>
          </div>

          <div className="button-colonne margin">
            <div className="container_btn_invite">
              <a onClick={confirmCreateCitation}  href="#" className="btn1">
                Confirmer
              </a>
            </div>
            <div className="container_btn_invite">
              <a onClick={closeCreatePopup} href="#" className="btn1">
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  ) : null;
}

export default Create;


