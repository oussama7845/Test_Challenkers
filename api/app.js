let express = require('express');
let path = require('path');
let fs = require('fs');
let bodyParser = require('body-parser');
let cluster = require('cluster');
let helmet = require('helmet');
const cors = require('cors');

let app = express();

// Amélioration de la securité
app.use(helmet())

// Enable CORS
app.use(cors());


// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
// Get Sequelize Models
let models = require('./models');

// Clustering the App
if (cluster.isMaster) {
  let cpus = require('os').cpus().length;

  for (let i = 0; i < cpus; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', function (worker) {
    console.log(`worker ${worker.id} exited, respawning...`);
    cluster.fork();
  });
} else {
  // Sync the DB & Start the API
  models.sequelize.sync().then(() => {
    app.listen("3000", function () {
      console.log(`Worker ${cluster.worker.id} is listening on port 3000`);
    });
  });

}

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function (req, res) {
  res.send("OK");
});

app.use('/', require('./routes/citations'));

