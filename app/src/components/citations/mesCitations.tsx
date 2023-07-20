import React, { useState, useEffect } from "react";
import "../css/mesCitations.css";
import Edit from "../popups/edit";
import Delete from "../popups/delete";
import axios from 'axios';
import { search } from "../../../../api/routes/citations";


function MesCitations(searchTerm) {
  const [citations, setCitations] = useState([]);
  const [signalEdit, setSignalEdit] = useState(false);


  console.log(searchTerm);

  useEffect(() => {
    getAllCitation();
  }, []);

  const getAllCitation = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fetchallCitations');
      const { data, status } = response;
      if (status === 200) {
        setCitations(data);
     
      } else {
        throw new Error('Erreur lors de la récupération des citations.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [idCitation, setIdCitation] = useState('');


  const editButton = (id) => {
    setShowEditPopup(true);
    setIdCitation(id);
    setSignalEdit(true);



  };

  const deleteButton = (id) => {
    setShowDeletePopup(true);
    setIdCitation(id);


  };

  const closeEditPopup = () => {
    setShowEditPopup(false);

  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
  };

 

  return (
    <div className="container_mescitation">
      <div className="line1"></div>
  
      {citations.length > 0 ? (
        citations.map((c: { id: number, citation: string }) => (
          <div key={c.id} className="fetchallCitations">
            <div className="myquote">
              <p>{c.citation}</p>
              <div className="btns_del_edit">
            <svg key={c.id} onClick={()=> deleteButton(c.id)}
             
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 32 32"
            >
              <path
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M28 6H6l2 24h16l2-24H4m12 6v12m5-12l-1 12m-9-12l1 12m0-18l1-4h6l1 4"
              />
            </svg>
            <svg  onClick={ ()=> editButton(c.id)}
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 32 32"
            >
              <path
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m30 7l-5-5L5 22l-2 7l7-2Zm-9-1l5 5ZM5 22l5 5Z"
              />
            </svg>
          </div>
            </div>
            <div className="line2"></div>
          </div>
        ))
      ) : (
        <p>Aucune citation disponible</p>
      )}
  
      <Edit detectSignalEdit={signalEdit} resetSignal={() => setSignalEdit(false)}  showEditPopup={showEditPopup} idCitation={idCitation} closeEditPopup={closeEditPopup} />
      <Delete showDeletePopup={showDeletePopup} idCitation={idCitation} closeDeletePopup={closeDeletePopup} />
    </div>
  );
}

export default MesCitations;