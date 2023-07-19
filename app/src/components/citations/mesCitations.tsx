import React, { useState, useEffect } from "react";
import "../css/mesCitations.css";
import Edit from "../popups/edit.jsx";
import Delete from "../popups/delete.jsx";
import axios from 'axios';


function MesCitations() {
  const [citations, setCitations] = useState([]);

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

  const editButton = () => {
    setShowEditPopup(true);
  };

  const deleteButton = () => {
    setShowDeletePopup(true);
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
                <svg
                  onClick={deleteButton}
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 32 32"
                >
                  {/* SVG code */}
                </svg>
                <svg
                  onClick={editButton}
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 32 32"
                >
                  {/* SVG code */}
                </svg>
              </div>
            </div>
            <div className="line2"></div>
          </div>
        ))
      ) : (
        <p>Aucune citation disponible</p>
      )}
  
      <Edit showEditPopup={showEditPopup} closeEditPopup={closeEditPopup} />
      <Delete showDeletePopup={showDeletePopup} closeDeletePopup={closeDeletePopup} />
    </div>
  );
}

export default MesCitations;