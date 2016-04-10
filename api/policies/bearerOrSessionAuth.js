
var bearerAuth = require('./bearerAuth');

module.exports = function (req, res, next) {
  if(req.session.authenticated) return next();
  return bearerAuth(req, res, next);
};
