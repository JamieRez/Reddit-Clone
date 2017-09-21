var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Post = require('./models/post.js');

app.set('view engine', 'jade');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/my_database', { useMongoClient: true });


app.get('/', function(req,res){
    Post.find().exec(function (err, posts) {
    res.render('index', { posts: posts });
  });
});

app.get('/posts/new', function(req,res){
    res.render('newPost');
});

//Controllers
require('./controllers/posts.js')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);




app.listen(3000);
