import React, { useState, useEffect,useReducer} from "react";
import "../css/favorite.css";
import Edit from "../popups/edit";
import Delete from "../popups/delete";
import axios from 'axios';

  
function MesCitations( {searchTerm ,reducerValuee} ) {
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const [citations, setCitations] = useState([]);
  const [signalEdit, setSignalEdit] = useState(false);
  const [resSearch, setResSearch] = useState([]); 


 
useEffect(() => {
  getAllCitation();
}, [reducerValue, reducerValuee]);


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
/* Search function*/
useEffect(() => {
  // Set up an interval to call the method every 1 second
  
 handleSearch();

}, [searchTerm,reducerValue]);

const handleSearch = async () => {
  try {
    const response = await axios.get("http://localhost:3000/rechercher", {
      params: {
        searchTerm: searchTerm, // Passez la valeur de 'searchTerm' en tant que paramètre de requête
      },
    });

    if (response.data.length > 0) {
      // Des citations ont été trouvées
      setResSearch(response.data);
    } else {
      // Aucune citation trouvée
      console.log("Aucune citation trouvée pour le terme de recherche");
      setResSearch(response.data)
    }
  } catch (error) {
    console.error("Une erreur est survenue lors de la recherche des citations :", error);
  }
};



/* ----------------*/
 

  return (
    <div>
      <div className="container_mescitation">
        <div className="line1"></div>

        {resSearch.length > 0 ? (
          resSearch.map((c: { id: number; citation: string }) => (
            <div key={c.id} className="fetchallCitations">
              <div className="myquote">
                <p>{c.citation}</p>

                <div className="btns_del_edit">
                <svg
                  key={c.id}
                  onClick={() => deleteButton(c.id)}
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
                <svg
                  onClick={() => editButton(c.id)}
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
        ) : resSearch.length === 0 ? (
          <p className="emptysearchquote">La citations que vous cherchez n'existe pas</p>
        ) : citations.length > 0 ? (
          citations.map((c: { id: number; citation: string }) => (
            <div key={c.id} className="fetchallCitations">
              <div className="myquote">
                <p>{c.citation}</p>

                <div className="btns_del_edit">
                <svg
                  key={c.id}
                  onClick={() => deleteButton(c.id)}
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
                <svg
                  onClick={() => editButton(c.id)}
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
          <p className="emptyquote">Aucune citation disponible</p>
        )}
      </div>

      <Edit forceUpdate={forceUpdate}  detectSignalEdit={signalEdit} resetSignal={() => setSignalEdit(false)} showEditPopup={showEditPopup} idCitation={idCitation} closeEditPopup={closeEditPopup} />
      <Delete   forceUpdate={forceUpdate}  showDeletePopup={showDeletePopup} idCitation={idCitation} closeDeletePopup={closeDeletePopup} />
    </div>
  );
}


export default MesCitations;
