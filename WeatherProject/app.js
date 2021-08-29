const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');  
});

app.post('/', function(req, res){

  const query = req.body.cityName;
  const apiKey = '2c2b8cf6ed92d51982d8fe4909f74640';
  const units = 'metric';
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response){
    response.on('data', function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp; 
      
      res.write("The temperature in " + query + " is: " + temp);
      res.end();
    });
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000');
})



