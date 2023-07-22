import React, { useState, useEffect } from "react";
import "../css/edit.css";
import { toast } from 'react-toastify';
import axios from 'axios';

 
function Edit({ detectSignalEdit,resetSignal, showEditPopup, idCitation, closeEditPopup, forceUpdate }) {

    const [citation, setCitation] = useState('');
    const [auteur, setAuteur] = useState('');
    const [acteur, setActeur] = useState('');
    const [personnage, setPersonnage] = useState('');
    const [saison, setSaison] = useState('');
    const [episode, setEpisode] = useState('');


  useEffect(() => {
    if (detectSignalEdit) {
      getCitationDetails();
      resetSignal();
    }
  }, [detectSignalEdit]);


    const getCitationDetails = async () => {
    
    try {
      console.log("id",idCitation)
      

      const response = await axios.get(`http://localhost:3000/fetchCitationById/${idCitation}`);
      
      const { data, status } = response;
      if (status === 200) {
        setCitation(data.citation);
        setAuteur(data.auteur);
        setActeur(data.acteur);
        setPersonnage(data.personnage);
        setSaison(data.saison);
        setEpisode(data.episode);



     
      } else {
        throw new Error('Erreur lors de la récupération des citations.');
      }
    } catch (err) {
      console.error(err);
    }
  };

    


    const confirm = async () => {
      try {
        let body = {
          citation: citation,
          auteur: auteur,
          acteur: acteur,
          personnage: personnage,
          saison: saison,
          episode: episode,
        };
  
        const response = await axios.put(`http://localhost:3000/edit_Citation/${idCitation}`,body);
  
        if (response.status === 200) {
          closeEditPopup(); // appeler la function qui close le pop up
          toast.success("Citation modifiée avec succès");
          forceUpdate();
  
          
        } else {
          toast.error("erreur");
  
        }
      } catch (err) {
        console.log(err);
        toast.error("erreur");
      }
    };



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
                  Value={citation}
                  onChange={(e) => setCitation(e.target.value)}
                  type="text"
                  placeholder="modifier votre citation"
                />
              </div>
              <div className="input-field">
                <label >auteur</label>
                <input
                  id="auteur"
                  Value={auteur}
                  onChange={(e) => setAuteur(e.target.value)}
                  type="text"
                  placeholder="modifier le nom de l'auteur"
                />
              </div>

              <div className="input-field">
                <label >episode</label>
                <input
                  id="episode"
                  Value={episode}
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
                  defaultValue={acteur}
                  onChange={(e) => setActeur(e.target.value)}
                  type="text"
                  placeholder="modifier le nom de l'auteur"
                />
              </div>
              <div className="input-field">
                <label >
                personnage
                 
                </label>
                <input
                  defaultValue={personnage}
                  onChange={(e) => setPersonnage(e.target.value)}
                  id="personnage"
                  type="text"
                  placeholder="modifier le nom de personnage"
                />
              </div>

              <div className="input-field">
                <label >saison</label>
                <input
                  id="saison"
                  defaultValue={saison}
                  onChange={(e) => setSaison(e.target.value)}
                  type="text"
                  placeholder="quelle saison ?"
                />
              </div>

     

              

            </div>
          </div>

          <div className="button-colonne margin">
            <div className="container_btn_invite">
              <a  href="#" className="btn1" onClick={confirm}>
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


