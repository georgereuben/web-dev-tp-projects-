const express = require('express');
const https = require('https');

const app = express();

app.use(express.urlencoded());

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/signup.html');
})

app.post('/failure', function(req, res){
  res.redirect('/');
})

app.post('/', function(req, res){

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;
  
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }    
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/19bbabf0fd";

  const options = {
    method: "POST",
    auth: "reuben:d091170be7eebe3510a57dd4f259a473-us5"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){

      if(response.statusCode === 200){
        res.sendFile(__dirname + '/success.html');
      }
      else{
        res.sendFile(__dirname + '/failure.html');
      }        

      const JsonData = JSON.parse(data);
      console.log(JsonData);

    })
  })  

  request.write(jsonData);
  request.end();
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port 3000...')
})

// API Key : d091170be7eebe3510a57dd4f259a473-us5
// Audience ID : 19bbabf0fd