
const express = require('express');
const date = require(__dirname + '/date.js');
const app = express();

app.use(express.urlencoded());
app.use(express.static('public'));

app.set('view engine', 'ejs');

let items = [];
let workItems = [];

app.get('/', function(req,res){
  let day = date.getDate();
  res.render('list', {listTitle: day, newListItems: items});
})

app.post('/', function(req, res){

  if(req.body.list === 'Work List'){
    workItems.push(req.body.newItem);
    res.redirect('/work');
  }
  else{
  items.push(req.body.newItem);
  res.redirect('/');
  }
})

app.get('/work', function(req, res){
  res.render('list', {listTitle: 'Work List', newListItems: workItems});
})

app.post('/work', function(req, res){
  workItems.push(req.body.newItem);
  res.redirect('/work');
})

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port 3000...');
})
