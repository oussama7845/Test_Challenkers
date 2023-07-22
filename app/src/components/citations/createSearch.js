import React, { useState,useReducer, useEffect } from "react";
import axios from "axios";
import "../css/createSearch.css";
import Create from "../popups/create";
import MesCitations from "./mesCitations.tsx";

function CreateSearch() {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [resSearch, setResSearch] = useState(1); 
  const [reducerValuee, forceUpdate] = useReducer((x) => x + 1, 0);
 
  const closeCreatePopup = () => {
    setShowCreatePopup(false);
  };

  useEffect(()=>{

  },[reducerValuee]);

  const createButton = () => {
    setShowCreatePopup(true);
  };

  

  useEffect(() => {
    // Set up an interval to call the method every 1 second
    const interval = setInterval(() => {
      handleSearch();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);
  

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

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Appeler la méthode de recherche lorsque la touche "Entrée" est enfoncée
      handleSearch();
    }
  };
  return (
    <div>
    <div className="container_mes_citations">
      <div className="title_mes_citations">
        <h2>Mes citations</h2>
      </div>

      <div className="create_search">
        <div className="btn_create">
          <button>
            <div className="create" onClick={createButton}>
              
              <svg
              
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 512 512"
              >
                <path
                  fill="white"
                  d="M298.7 213.3V0h-85.4v213.3H0v85.4h213.3V512h85.4V298.7H512v-85.4z"
                />
              </svg>
              ajouter une citation
            </div>
          </button>
        </div>

        <div className="search_bar">
          <input
          
          onChange={(e) => setSearchTerm(e.target.value)} // Mettre à jour l'état 'searchTerm' lorsqu'il y a des changements dans l'input
          onKeyPress={handleKeyPress} 
            //input de recherche
            type="text"
            placeholder="Rechercher dans mes citations"
          ></input>
          <svg
          onClick={handleSearch}
          className="search_icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 15 15"
          >
            <path
              fill="none"
              stroke="#6303ac"
              d="m14.5 14.5l-4-4m-4 2a6 6 0 1 1 0-12a6 6 0 0 1 0 12Z"
            />
          </svg>
        </div>
      </div>
      <Create   forceUpdate={forceUpdate} showCreatePopup={showCreatePopup} closeCreatePopup={closeCreatePopup} />
    





    </div>
    <MesCitations resSearch={resSearch} reducerValuee={reducerValuee} />



    </div>

    
  );


}
export default CreateSearch;
