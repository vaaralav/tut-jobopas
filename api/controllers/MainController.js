var MainController =  {
  index : function index(req, res) {
    var user = (req.user ? req.user : false);

    var tags = {};
    if(user) {
      User.findOne(user.id).populateAll().exec(function( err, user) {
        if(err) return res.negotiate(err);
        console.log(user);
        Tag.find()
        .sort("id ASC")
        .exec(function(err, tags) {
          if(err) return res.negotiate(err);
          return res.view('main/index', {user: user, tags: tags});
        });
      });
    } else {
      return res.view('main/index');
    }
  }
}

module.exports = MainController;
