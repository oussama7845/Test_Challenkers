import React, { useState, useEffect } from "react";
import "../css/mesCitations.css";
import axios from 'axios';


function FavoriteCitation() {

    const [favoris, setFavoris] = useState([]);



 
  useEffect(() => {
    getAllFavorite();
  }, []);

  

  const getAllFavorite = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fetchallFavorite');
      const { data, status } = response;
      if (status === 200) {
        setFavoris(data);
     
      } else {
        throw new Error('Erreur lors de la récupération des citations.');
      }
    } catch (err) {
      console.error(err);
    }
  };


 


 

  return (
    <div>
      <div className="container_mescitation">
        <h1 className="titleFavorite">Mes Favoris</h1>
        <div className="line1"></div>

        { favoris.length > 0 ? (
          favoris.map((c: { id: number; citation: string }) => (
            <div key={c.id} className="fetchallCitations">
              <div className="myfavorite">
                <p>{c.citation}</p>

                
              </div>
              <div className="line2"></div>
            </div>
          ))
        ) : (
          <p className="emptyquote">Aucune citation en favoris</p>
        )}
      </div>

     
    </div>
  );
}


export default FavoriteCitation;
