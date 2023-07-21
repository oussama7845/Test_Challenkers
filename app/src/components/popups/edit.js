import React, { useState, useEffect } from "react";
import "../css/edit.css";
import { toast } from 'react-toastify';
import axios from 'axios';

 
function Edit({ detectSignalEdit,resetSignal, showEditPopup, idCitation, closeEditPopup }) {

    const [citation, setcitation] = useState('');
    const [auteur, setauteur] = useState('');
    const [acteur, setacteur] = useState('');
    const [personnage, setpersonnage] = useState('');
    const [saison, setsaison] = useState('');
    const [episode, setepisode] = useState('');


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
        setcitation(data.citation);
        setauteur(data.auteur);
        setacteur(data.acteur);
        setpersonnage(data.personnage);
        setsaison(data.saison);
        setepisode(data.episode);



     
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
           window.location.reload();
          toast.success("modification est faite avec succès");
  
          
        } else {
          toast.error("error");
  
        }
      } catch (err) {
        console.log(err);
        toast.error("error");
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
                  onChange={(e) => setcitation(e.target.value)}
                  type="text"
                  placeholder="modifier votre citation"
                />
              </div>
              <div className="input-field">
                <label >auteur</label>
                <input
                  id="auteur"
                  Value={auteur}
                  onChange={(e) => setauteur(e.target.value)}
                  type="text"
                  placeholder="modifier le nom de l'auteur"
                />
              </div>

              <div className="input-field">
                <label >episode</label>
                <input
                  id="episode"
                  Value={episode}
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
                  defaultValue={acteur}
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
                  defaultValue={personnage}
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
                  defaultValue={saison}
                  onChange={(e) => setsaison(e.target.value)}
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


