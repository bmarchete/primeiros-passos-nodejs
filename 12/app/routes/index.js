var express = require('express');
var router = express.Router();

router.get('/', (req, res, next)=> {
  if (req.session.nome) {
    res.redirect('/home')
  }else{
    res.render('login');
  }
});

router.post('/', (req, res, next)=> {
  if (req.body.nome == 'admin' && req.body.senha == '1234') {
    req.session.nome = req.body.nome;
    res.redirect('/home')
  }else{
    res.redirect('/');
  }
});

router.get('/home', (req, res, next)=> {
  if (req.session.nome == 'admin') {
    res.render('home',{
      session: req.session,
      usuario: req.session.nome
    });
  }else{
    res.redirect('/');
  }
});

router.get('/logout', (req, res, next)=> {
  req.session.destroy();
  res.redirect('/')
});

module.exports = router;
