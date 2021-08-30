
const express = require('express');
const https = require('https');

const app = express();

app.use(express.urlencoded());

app.use(express.static('public'));

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port 3000...')
})
