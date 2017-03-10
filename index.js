var util = require('util');
var fs = require('fs');
var markov = require('markov');
var http = require('http');
var request = require('request');
var config = require('./config/serverCfg.js');
var express = require('express'), app = express();

// Routes
app.use('/client', express.static(__dirname + '/client'));



// Route to get a random tweet
app.get('/tweet', function(req, res) {
  request('http://127.0.0.1:3001/tweet', function(err, response, body) {
    res.status(response.statusCode).json(JSON.parse(body));
  });
});

// Route to get some sweet FJM lyrics
app.get('/lyric', function(req, res) {
  request('http://127.0.0.1:3001/lyric', function(err, response, body) {
    res.status(response.statusCode).json(JSON.parse(body));
  });
});

// Any other route serves the website (all website routing handled by angular)
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

console.log('Starting server...');
http.createServer(app).listen(3000, function() {
  console.log("Listening on port 3000.");
});
