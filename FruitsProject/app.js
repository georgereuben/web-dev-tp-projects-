
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

const fruitSchema = new mongoose.Schema({
  name: String,
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const apple = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

const banana = new Fruit({
  name: "Banana",
  rating: 9,
  review: "Naiss"
});

Fruit.find(function(err, fruits){

  if(err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    })
  }
});