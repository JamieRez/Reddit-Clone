var Comment = require('../models/comment');
var Post = require('../models/post');

module.exports = function(app) {

// CREATE
    app.post('/posts/:postId/comments', function (req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        var comment = new Comment(req.body);

        // SAVE INSTANCE OF POST MODEL TO DB
        Post.findById(req.params.postId).exec(function (err, post) {
            comment.save(function (err, comment) {
                post.comments.unshift(comment);
                post.save();
                return res.redirect(`/posts/` + post._id);
            });
        });
    });

};
