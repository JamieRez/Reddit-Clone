var Post = require('../models/post');
module.exports = function(app) {

  // CREATE
  app.post('/posts', function(req,res) {
      // INSTANTIATE INSTANCE OF POST MODEL
      var post = new Post(req.body);
      post.url = "/posts/" + post.id;
      // SAVE INSTANCE OF POST MODEL TO DB
      post.save(function (err, post) {
        if(err) throw err;
        // REDIRECT TO THE ROOT
        return res.redirect(`/`);
      })
  });

  //Individual Post Page
  app.get('/posts/:id', function (req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).populate('comments').exec(function(err, post) {

      // RESPOND BY RENDERING THE TEMPLATE
      res.render('post-show', { post: post });
    });
  });

  //Getting only Subreddit Posts
  app.get('/g/:subreddit', function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).exec(function (err, posts) {
      res.render('index', { posts: posts });
    })
  });

};
