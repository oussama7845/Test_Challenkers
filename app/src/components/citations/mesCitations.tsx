import React, { useState } from "react";
import "../css/mesCitations.css";
import Edit from "../popups/edit.jsx";
import Delete from "../popups/delete.jsx";

function MesCitations() {
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
      <div className="fetchallCitations">
        <div className="line1"></div>

        <div className="myquote">
          <p>La vie est un mystère qu'il faut vivre, et non un problème à résoudre</p>
          <div className="btns_del_edit">
            <svg onClick={deleteButton}
             
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
            <svg  onClick={editButton}
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

      <Edit showEditPopup={showEditPopup} closeEditPopup={closeEditPopup} />
      <Delete showDeletePopup={showDeletePopup} closeDeletePopup={closeDeletePopup} />
    </div>
  );
}

export default MesCitations;
