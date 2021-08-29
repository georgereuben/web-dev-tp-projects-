const express = require('express');
const https = require('https');

var app = express();

app.use(express.urlencoded());

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/signup.html');
})

app.listen(3000, () => {
  console.log('server is running on port 3000...')
})