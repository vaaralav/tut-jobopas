var MainController =  {
  index : function index(req, res) {
    var user = (req.user ? req.user : false);
    console.log(user);
    var tags = {};
    if(user) {
      Tag.find()
      .sort("id ASC")
      .exec(function(err, tags) {
        if(err) return res.negotiate(err);
        return res.view('main/index', {user: user, tags: tags});
      });
    } else {
      return res.view('main/index', {user: user});
    }
  }
}

module.exports = MainController;
