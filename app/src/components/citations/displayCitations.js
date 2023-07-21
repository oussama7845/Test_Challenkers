import React, { useEffect, useState } from "react";
import "../css/displayCitations.css";
import axios from "axios";
import { toast } from "react-toastify";

function DisplayCitations({
  detectSignalKaamelottCitation,
  resetKaamelottSignal,
  detectSignalMyCitation,
  resetSignal,
}) {
  const [citation, setcitation] = useState("");
  const [personnage, setpersonnage] = useState("");
  const [episode, setepisode] = useState("");
  const [saison, setsaison] = useState("");
  const [auteur, setauteur] = useState("");
  const [acteur, setacteur] = useState("");
  const [checkEmptyRandom, setcheckEmptyRandom] = useState(10);

  useEffect(() => {
    if (detectSignalMyCitation) {
      getRandomCitation();
      resetSignal();
    }
  }, [detectSignalMyCitation]);

  useEffect(() => {
    if (detectSignalKaamelottCitation) {
      getRandomKaamelottCitation();
      resetKaamelottSignal();
    }
  }, [detectSignalKaamelottCitation]);

  // we can't call the kaamelott api from the front because both server are not in the same domaine (error :: cros)
  //solution ? call the kaamelott from the backend and then call the /api/random in th front :)

  const getRandomKaamelottCitation = async () => {

    const apiUrl = "https://kaamelott.chaudie.re/api/random";
    const corsProxyUrl = "https://cors-anywhere.herokuapp.com/"; // cors-anywhere proxy URL

    await fetch(corsProxyUrl + apiUrl, {
      headers: {
        Origin: "http://localhost:8080", // Set the "Origin" header to your localhost URL
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setcheckEmptyRandom(0);

        setcitation(data.citation.citation);
        setpersonnage(data.infos.personnage);
        setepisode(data.infos.episode);
        setsaison(data.infos.saison);
        setauteur(data.infos.auteur);
        setacteur(data.infos.acteur);

      })
      .catch((err) => {
        console.error(err); 
      });
  };

  const addfavoriteCitation = async () => {
    try {
      const body = {
        citation: citation,
        auteur: auteur,
        acteur: acteur,
        personnage: personnage,
        saison: saison,
        episode: episode,
      };
      const response = await axios.post(
        "http://localhost:3000/favorite_Citation",
        body
      );

      if (response.status === 200 || response.status === 202) {
        toast.success("Citation enregistrer avec suucèes");
      } else if (response.status === 201) {
        toast.info("Citation est déjà enregistrer");
      }
    } catch (err) {
      toast.error(
        "une erreur à été detecter lors d'enregistrement de la citation "
      );
      console.log("erreur", err);
    }
  };

  const getRandomCitation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/fetchRandomCitation"
      );

      const { data, status } = response;
      if (status === 200) {
        setcheckEmptyRandom(0);

        const { citation, personnage, episode,saison, acteur,auteur } = data;
        setcitation(citation);
        setpersonnage(personnage);
        setepisode(episode);
        setsaison(saison);
        setauteur(auteur);
        setacteur(acteur);
      } else if (status === 201) {
        setcheckEmptyRandom(1);

        console.log(checkEmptyRandom);
      } else {
        throw new Error(
          "Erreur lors de la récupération de la citation aléatoire."
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container_citations">
      <div className="title">
        <h1>Citations</h1>
      </div>
      <div className="container_border">
        {checkEmptyRandom === 1 ? (
          <div className="mesCitationsDefault">
            <p>Aucune citation disponible. Veuillez en créer une </p>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 48 48"
            >
              <path
                fill="#ffe500"
                d="M5.04 24.46a18.96 18.96 0 1 0 37.92 0a18.96 18.96 0 1 0-37.92 0Z"
              />
              <path
                fill="#ebcb00"
                d="M24 5.5a19 19 0 1 0 19 19a19 19 0 0 0-19-19Zm0 35.07a17.3 17.3 0 1 1 17.3-17.3A17.3 17.3 0 0 1 24 40.57Z"
              />
              <path
                fill="#fff48c"
                d="M18.31 9.29a5.69 1.42 0 1 0 11.38 0a5.69 1.42 0 1 0-11.38 0Z"
              />
              <path
                fill="#45413c"
                d="M8.83 45.5a15.17 1.5 0 1 0 30.34 0a15.17 1.5 0 1 0-30.34 0Z"
                opacity=".15"
              />
              <path
                fill="none"
                stroke="#45413c"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.04 24.46a18.96 18.96 0 1 0 37.92 0a18.96 18.96 0 1 0-37.92 0Z"
              />
              <path
                fill="#fff"
                stroke="#45413c"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18.79 23a3.32 3.32 0 1 1-3.32-3.32A3.32 3.32 0 0 1 18.79 23Z"
              />
              <path
                fill="#ffaa54"
                d="M37.74 29.2c0 .78-1.06 1.42-2.37 1.42S33 30 33 29.2s1.07-1.42 2.37-1.42s2.37.63 2.37 1.42Zm-27.48 0c0 .78 1.06 1.42 2.37 1.42S15 30 15 29.2s-1.07-1.42-2.37-1.42s-2.37.63-2.37 1.42Z"
              />
              <path
                fill="none"
                stroke="#45413c"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M28.27.5v17.06m4.26-15.38v15.64M36.8 5.03v14.69"
              />
              <path
                fill="#fff"
                stroke="#45413c"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M35.85 23a3.32 3.32 0 1 1-3.32-3.32A3.32 3.32 0 0 1 35.85 23Z"
              />
              <path
                fill="#ffb0ca"
                stroke="#45413c"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M24 36.6a14.27 14.27 0 0 1 5.77 1.22c1.94.87 4.18.31 4.66-2.26c.66-3.56-4.27-8.73-10.43-8.73S12.91 32 13.57 35.56c.48 2.57 2.72 3.13 4.66 2.26A14.27 14.27 0 0 1 24 36.6Z"
              />
              <path
                fill="#ff87af"
                stroke="#45413c"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M24 36.6a14.27 14.27 0 0 1 5.77 1.22a3.37 3.37 0 0 0 3.56-.26a11.81 11.81 0 0 0-18.66 0a3.37 3.37 0 0 0 3.56.26A14.27 14.27 0 0 1 24 36.6Z"
              />
            </svg>
          </div>
        ) : checkEmptyRandom === 10 ? (
          <div className="mesCitationsDefault">
            <p>Explorez les citations en cliquant ci-dessous</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 48 48"
            >
              <path
                fill="#ffe500"
                d="M4 21.5a20 20 0 1 0 40 0a20 20 0 1 0-40 0Z"
              />
              <path
                fill="#ebcb00"
                d="M24 1.5a20 20 0 1 0 20 20a20 20 0 0 0-20-20Zm0 37a18.25 18.25 0 1 1 18.25-18.25A18.25 18.25 0 0 1 24 38.5Z"
              />
              <path
                fill="#fff48c"
                d="M18 5.5a6 1.5 0 1 0 12 0a6 1.5 0 1 0-12 0Z"
              />
              <path
                fill="#45413c"
                d="M8 45.5a16 1.5 0 1 0 32 0a16 1.5 0 1 0-32 0Z"
                opacity=".15"
              />
              <path
                fill="none"
                stroke="#45413c"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 21.5a20 20 0 1 0 40 0a20 20 0 1 0-40 0Z"
              />
              <path
                fill="#ffaa54"
                d="M38.5 26.5c0 .83-1.12 1.5-2.5 1.5s-2.5-.67-2.5-1.5S34.62 25 36 25s2.5.67 2.5 1.5Zm-29 0c0 .83 1.12 1.5 2.5 1.5s2.5-.67 2.5-1.5S13.38 25 12 25s-2.5.67-2.5 1.5Z"
              />
              <path
                fill="#ffe500"
                d="M15.63 42.78a7.59 7.59 0 0 0 10.73 0l6.13-6.13A1.75 1.75 0 0 0 30 34.18l2.12-2.12a1.75 1.75 0 1 0-2.47-2.48l.71-.71a1.75 1.75 0 1 0-2.48-2.47l-1.41 1.41A1.75 1.75 0 1 0 24 25.34l-5.83 5.83l-.45-3.67a1.63 1.63 0 0 0-3 .25l-1.48 4.45a10.16 10.16 0 0 0 2.39 10.58Z"
              />
              <path
                fill="#ebcb00"
                d="m32.18 33.93l-5.82 5.81a7.57 7.57 0 0 1-10.73 0a10.18 10.18 0 0 1-2.86-5.66a10.14 10.14 0 0 0 2.86 8.7a7.59 7.59 0 0 0 10.73 0l6.13-6.13a1.75 1.75 0 0 0 0-2.47a1.79 1.79 0 0 0-.31-.25Z"
              />
              <path
                fill="none"
                stroke="#45413c"
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m26.65 27.64l-4.24 4.24m7.43-2.48l-4.95 4.95m5.3-.35l-2.83 2.83M32.5 19.5s.17-2 2-2s2 2 2 2m-25 0s.17-2 2-2s2 2 2 2m.13 23.28a7.59 7.59 0 0 0 10.73 0l6.13-6.13A1.75 1.75 0 0 0 30 34.18l2.12-2.12a1.75 1.75 0 1 0-2.47-2.48l.71-.71a1.75 1.75 0 1 0-2.48-2.47l-1.41 1.41A1.75 1.75 0 1 0 24 25.34l-5.83 5.83l-.45-3.67a1.63 1.63 0 0 0-3 .25l-1.48 4.45a10.16 10.16 0 0 0 2.39 10.58Z"
              />
            </svg>
          </div>
        ) : (
          <>
            <div className="quote">
              <h3> {citation} </h3>
            </div>
            <div className="arthur">
              <p>
                {personnage} - '{episode}'
              </p>
            </div>
            <div className="container_favorite_btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#6303ac"
                  d="M12 .25a.75.75 0 0 1 .673.418l3.058 6.197l6.839.994a.75.75 0 0 1 .415 1.279l-4.948 4.823l1.168 6.811a.751.751 0 0 1-1.088.791L12 18.347l-6.117 3.216a.75.75 0 0 1-1.088-.79l1.168-6.812l-4.948-4.823a.75.75 0 0 1 .416-1.28l6.838-.993L11.328.668A.75.75 0 0 1 12 .25Zm0 2.445L9.44 7.882a.75.75 0 0 1-.565.41l-5.725.832l4.143 4.038a.748.748 0 0 1 .215.664l-.978 5.702l5.121-2.692a.75.75 0 0 1 .698 0l5.12 2.692l-.977-5.702a.748.748 0 0 1 .215-.664l4.143-4.038l-5.725-.831a.75.75 0 0 1-.565-.41L12 2.694Z"
                />
              </svg>
              <a href="#" className="star_btn" onClick={addfavoriteCitation}>
                Mettre en favoris
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DisplayCitations;
