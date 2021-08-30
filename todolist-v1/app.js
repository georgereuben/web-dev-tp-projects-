
const express = require('express');

const app = express();

app.use(express.urlencoded());

var items = [];

app.set('view engine', 'ejs');

app.get('/', function(req,res){

  var today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options)

  res.render('list', {kindOfDay: day, newListItems: items});

})

app.post('/', function(req, res){
  items.push(req.body.newItem);
  res.redirect('/');
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port 3000...')
})
