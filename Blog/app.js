//jshint esversion:6

const express = require("express");
const _ = require("lodash")
const mongoose = require("mongoose");
const ejs = require("ejs");
const { forEach } = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-reuben:OjxF4eJQbTMOeRbV@cluster0.vqub9.mongodb.net/blogDB")

const postsSchema = {
  title: {
    type: String,
    unique: true
  },
  content: String
};

const Post = mongoose.model("posts", postsSchema);

app.get('/', function(req, res){

  Post.find({}, function(err, posts){
    res.render('home', {homeStartingContent, posts});
  });
});

app.get('/compose', function(req, res){
  res.render('compose');
});

app.get('/posts/:postTitle', function(req, res){
  
  let post = {};
  Post.findOne({"title": req.params.postTitle}, function(err, foundItem){

    if(foundItem.length !== 0){
      post = foundItem;
    }
  });
  res.render('post', {post});
});

app.post('/compose', function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postContent
  });
  post.save();
  res.redirect('/');
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
