var express = require('express');
var router = express.Router();
var passport = require('passport');
var isNotAuth = require('../middlewares/authorize').isNotAuth;
var db = require('../db');

router.get('/login', isNotAuth, (req ,res ,next)=>{
  res.render('login');
});


router.post('/login', passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect: '/error',

}));

router.get('/logout', (req, res, next)=> {
  req.session.destroy();
  res.redirect('/')
});

router.get('/register', isNotAuth, (req ,res ,next)=>{
  res.render('register');
});

router.post('/register', isNotAuth, (req,res,next)=>{
  db("users").insert(req.body).then((ids) => {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });

  },next)
});

module.exports = router;
