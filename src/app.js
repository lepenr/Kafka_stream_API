// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

// configs
const port = process.env.PORT ||  3001;

// ExpressJs Setup
const app = express();
app.use(bodyParser.json());

//import main router
const routes = require('./routes'); 

app.use(routes);

// Starting up the server
app.listen(port,  function() {
  console.log(`Express server listening on port ${port}`);
});

module.exports = app; 