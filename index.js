var util = require('util');
var fs = require('fs');
var markov = require('markov');
var http = require('http');
var config = require('./config/serverCfg.js');
var express = require('express'), app = express();

// Routes
app.use('/client', express.static(__dirname + '/client'));

app.get('/home*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/', function(req, res) {
  res.redirect('/home');
});

// Initialze markov chain hash table
var m = markov(2);
var s = fs.createReadStream(config.tweetsFilename, { encoding: 'utf-8' });
console.log('Seeding...');
console.time('seed');
m.seed(s, function() {
  console.timeEnd('seed');

  // Route to get a random tweet
  app.get('/tweet', function(req, res) {
    var randomKey = m.pick();
    var output = m.forward(randomKey).join(' ');
    var finalTweet = m.word(randomKey) + ' ' + output;
    res.status(200).json({
      tweet: finalTweet
    });
  });
  // Any other route gets a 404
  app.get('*', function(req, res) {
    res.sendFile(__dirname + '/404.html');
  });

  console.log('Starting server...');
  http.createServer(app).listen(3000, function() {
    console.log("Listening on port 3000.");
  });

});
