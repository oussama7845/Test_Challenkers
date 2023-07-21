let express = require('express');
let router = express.Router();
let Citation = require('../models').citations;
let path = require('path');
let env = process.env.NODE_ENV || "development";
let config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const axios= require('axios');
const { Op, where } = require('sequelize');





// search bar

router.get('/rechercher', async (req, res) => {
  const searchTerm = req.query.searchTerm; // La chaîne à rechercher (par exemple cet exemple, "la vie")

  try {
    // Utilisez le critère de recherche "LIKE" avec le caractère joker "%" pour récupérer les citations qui commencent par "la vie"
    const citations = await Citation.findAll({
      where: {
        citation: {
          [Op.like]: `${searchTerm}%`,
        },
        favorite: false // afficher juste mes citations
      },
    });

    if(citations){
      res.status(200).json(citations);

    }else{
      res.status(201).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de la recherche des citations.' });
  }
});





// Get All quotes
router.get('/fetchallCitations', function (req, res) {
    
    try {
       
     
      Citation.findAll({where : {favorite : false}}).then(citations => {
        return res.status(200).json(citations);
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des citations." });
    }
  });

  // Get All favorite quotes
router.get('/fetchallFavorite', function (req, res) {
    
  try {
     
   
    Citation.findAll({where :{ favorite : true}}).then(citations => {
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


  //favorite citation

  router.post('/favorite_Citation', async (req, res) => {
    try {
      const { citation, auteur, acteur, personnage, saison, episode } = req.body;
  
      // Recherchez la citation dans la base de données
      const exist = await Citation.findOne({ where: { citation: citation } });
  
      if (exist) {
        // Si la citation existe dans la base de données
        if (exist.favorite === false) {
          // Mettez à jour la citation existante pour la marquer comme favorite
          await exist.update({ favorite: true });
          res.sendStatus(200); // Renvoyer un code 200 pour indiquer une mise à jour réussie
        } else {
          // La citation est déjà marquée comme favorite
          res.sendStatus(201); // Renvoyer un code 201 pour indiquer que la citation est déjà favorite
        }
      } else {
        // La citation n'existe pas dans la base de données, créons-en une nouvelle
        const newCitation = {
          citation: citation,
          auteur: auteur,
          acteur: acteur,
          personnage: personnage,
          saison: saison,
          episode: episode,
          favorite: true,
        };
  
        // Enregistrez la nouvelle citation
        await Citation.create(newCitation);
        res.sendStatus(202); // Renvoyer un code 202 pour indiquer que la nouvelle citation a été créée
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
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

