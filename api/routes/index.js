const express = require('express');
const app = express();

// Autres configurations de l'application...

// Configuration des routes
const citationsRoutes = require('./routes/citations'); // Assurez-vous que le chemin est correct
app.use('/', citationsRoutes); // Assurez-vous que le chemin de base est correct

// Autres configurations de l'application...

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Le serveur est en écoute sur le port 3000.');
});
