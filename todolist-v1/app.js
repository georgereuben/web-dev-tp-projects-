
const express = require('express');
const date = require(__dirname + '/date.js');
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded());
app.use(express.static('public'));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: {
    type: String,
    unique: true
  }
};

const Item = mongoose.model("items", itemsSchema);

const item1 = new Item({
  name: "Welcome to your ToDo List!"
});

const item2 = new Item({
  name: "Hit the + button to add an item"
});

const item3 = new Item({
  name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err){
  if(err) {
    console.log(err);
  } else {
    console.log("Default items saved!");
  }
});

app.get('/', function(req,res){
  res.render('list', {listTitle: "Today", newListItems: items});
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
