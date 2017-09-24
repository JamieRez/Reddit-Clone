var Post = require('../models/post');
var User = require('../models/user');

module.exports = function(app) {

  // CREATE
  app.post('/posts', function(req,res) {
      // INSTANTIATE INSTANCE OF POST MODEL
      var post = new Post(req.body);
      post.url = "/posts/" + post._id;
      post.author = req.user.username;
      post.save(function (err) {
          if(err){console.log(err)};
          res.redirect(post.url)
      });
  });

  //Individual Post Page
  app.get('/posts/:id', function (req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).exec(function(err, post) {

      // RESPOND BY RENDERING THE TEMPLATE
      res.render('post-show', { post: post, currentUser : req.user });
    });
  });

  //Getting only Subreddit Posts
  app.get('/g/:subreddit', function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).exec(function (err, posts) {
      res.render('index', { posts: posts, currentUser : req.user });
    })
  });

};
