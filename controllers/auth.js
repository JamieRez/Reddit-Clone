module.exports = function(app){
    app.get('/sign-up', function(req, res, next) {
      res.render('sign-up');
    });
}
