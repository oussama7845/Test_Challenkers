let express = require('express');
let router = express.Router();
let Citation = require('../models').citations;
let path = require('path');
let env = process.env.NODE_ENV || "development";
let config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const axios= require('axios');


// we can't call the kaamelott api from the front because both server are not in the same domaine (error :: cros) 
//solution ? call the kaamelott from the backend and then call the /api/random in th front :)

router.get("/api/random", async (req, res) => {
  try {
    const response = await axios.get("https://kaamelott.chaudie.re/api/random");
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error); 
    res.status(500).json({ error: "Erreur lors de l'appel à l'API externe." });
  }
});





// Get All quotes
router.get('/fetchallCitations', function (req, res) {
    
    try {
       
     
      Citation.findAll().then(citations => {
        return res.status(200).json(citations);
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des citations." });
    }
  });

// fetch citation by id 
  

router.get('/fetchCitationById/:id', async (req, res) => {
  const id = req.params.id;
  
  try {
    const citation = await Citation.findOne({ where: { id } });

    if (!citation) {
      return res.status(404).json({ error: 'Citation non trouvée.' });
    }
    

    return res.status(200).json(citation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération du citation." });
  }
});



  // get a random quote of mine
  router.get('/fetchRandomCitation', async function (req, res) {
    try {
      const count = await Citation.count();
      if(count > 0){
        const randomIndex = Math.floor(Math.random() * count);
        const citation = await Citation.findOne({
          offset: randomIndex,
        });
        return res.status(200).json(citation);

      }else if(count === 0){
        return res.status(201).json('empty');
      }

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de la citation aléatoire." });
    }
  });
  
  
  

//add a quote
router.post('/create_Citation',async (req, res) =>{

  try {
     const {citation,auteur,acteur,personnage,saison,episode} = req.body;
  
    // create a new quote by the data sent to the body
    const newCitation = {
        citation:citation,
        auteur:auteur,
        acteur:acteur,
        personnage:personnage,
        saison:saison,
        episode:episode,
        favorite:false,
    };
  
    // save a new quote
    let created = await Citation.create(newCitation)
    return res.status(201).json(created);
  } catch (error) {
    console.log(error);
      return res.status(500).json(error)
  }
    
   
  });


  //edit a quote
    
    router.put('/edit_Citation/:id', function(req, res) {
        const Id = req.params.id;
        const { citation,auteur,acteur,personnage,saison,episode } = req.body;
      
        Citation.findByPk(Id)
          .then(c => {
            if (!c) {
              return res.status(404).json({ message: "Citations n'a pas été trouvé." });
            }
      
            c.citation = citation;
            c.auteur = auteur;
            c.acteur = acteur;
            c.personnage = personnage;
            c.saison = saison;
            c.episode = episode;

      
            return c.save();
          })
          .then(updatedCitation => {
            return res.status(200).json(updatedCitation);
          })
          .catch(err => {
            console.error(err);
            return res.status(500).json({ message: "Une erreur est survenue lors de la modification de la citation." });
          });
      });


        // delete a quote by id
router.delete('/citation/:id', function(req, res) {
    const Id = req.params.id;
  
    // search for the correspond quote
    Citation.findByPk(Id).then(citation => {
      if (!citation) {
        return res.status(404).json({ message: "Citation n'a pas été trouvé." });
      }
  
      // delete the quote from the data base 
      citation.destroy().then(() => {
        return res.status(200).json({ message: "Citation a été supprimé avec succès." });
      }).catch(err => {
        return res.status(500).json({ message: "Une erreur est survenue lors de la suppression de la citation." });
      });
    }).catch(err => {
      return res.status(500).json({ message: "Une erreur est survenue lors de la recherche de la citation." });
    });
  });



module.exports = router;

