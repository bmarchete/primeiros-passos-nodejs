var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuth = require('../middlewares/authorize.js').isAuth;
var isNotAuth = require('../middlewares/authorize.js').isNotAuth;

router.get('/', isAuth, (req, res, next)=> {

  res.render('home',{
    session: req.session,
    usuario: req.user
  });

});

router.get('/login', isNotAuth, (req, res, next)=> {

    res.render('login')

});

router.post('/', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/error',

}));


router.get('/logout', (req, res, next)=> {
  req.session.destroy();
  res.redirect('/')
});

module.exports = router;
