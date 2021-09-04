
const express = require('express');
const date = require(__dirname + '/date.js');
const mongoose = require("mongoose");
const app = express();

app.use(express.urlencoded());
app.use(express.static('public'));

app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemsSchema = {
  name: String,
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

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

app.get('/', function(req,res){

  Item.find({}, function(err, foundItems){

    if(foundItems.length === 0){
      Item.insertMany(defaultItems, function(err){
        if(err) {
          console.log(err);
        } else {
          console.log("Default items saved!");
        }
      });
    }
    res.render('list', {listTitle: "Today", newListItems: foundItems});
  })
});

app.post('/', function(req, res){

  const itemName = req.body.newItem;
  const newItem = new Item({
    name: itemName
  });

  newItem.save();
  res.redirect('/');
});

app.get("/:customListName", function(req, res){
  const customListName = req.params.customListName;

  List.findOne({name: customListName}, function(err, foundList){
    
    if(!err){
      if(!foundList){
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
      }
    } 
  })
})

app.post('/delete', function(req, res){
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId.trim(), doc => console.log(doc));
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log('server is running on port 3000...');
});
