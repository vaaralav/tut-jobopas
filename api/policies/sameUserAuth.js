module.exports = function(req, res, next) {
  if("" + req.user.id !== "" + req.param('id')) {
    return res.forbidden();
  }
  next();
}
