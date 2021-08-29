const express = require('express');
const https = require('https');

var app = express();

app.use(express.urlencoded());

app.listen(3000, () => {
  console.log('server is running on port 3000...')
})