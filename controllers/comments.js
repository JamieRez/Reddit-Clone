var Comment = require('../models/comment');
var Post = require('../models/post');

module.exports = function(app) {

// CREATE Comment
    app.post('/posts/:postId/comments', function (req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        var comment = new Comment(req.body);
        comment.author = req.user.username;
        comment.save(function(err){
            // SAVE INSTANCE OF POST MODEL TO DB
            Post.findById(req.params.postId).exec(function (err, post) {
                post.comments.unshift(comment);
                post.save();
                return res.redirect(`/posts/` + post._id);
            });
        });
    });

        // NEW REPLY
      app.get('/posts/:postId/comments/:commentId/replies/new', function(req, res, next) {
            Post.findById(req.params.postId).exec(function (err, post) {
                Comment.findById(req.params.commentId).exec(function(err, comment){
                    res.render('replies-new', { post: post, comment: comment });
                });
            });
      });

      // CREATE REPLY
      app.post('/posts/:postId/comments/:commentId/replies', function(req, res, next) {
        console.log(req.body);
      });

};
