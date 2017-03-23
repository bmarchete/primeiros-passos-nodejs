var authorize = {
  isAuth : function(req, res, next) {

    if (!req.isAuthenticated()) {
      return res.redirect('/')
    }

    next();
  },

  isNotAuth : function(req, res, next) {

    if (req.isAuthenticated()) {
      return res.redirect('/')
    }

    next();
  }
};

module.exports = authorize;

// exports.isLogged = function(req, res, next) {
//     if (!req.isAuthenticated()) {
//       return res.redirect('/')
//     }
//
//     next();
// };
