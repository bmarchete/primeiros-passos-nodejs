var express = require('express');
var router = express.Router();
var passport = require('passport');
var isAuth = require('../middlewares/authorize').isAuth;
var db = require('../db');

router.get('/', (req, res, next) => {
  db("tarefas").then((tarefas)=>{
    res.render('index',{
      tarefas: tarefas,
      isAuth: req.isAuthenticated()
    });
  },next);

});

router.get('/add', isAuth, (req,res,next)=>{
  res.render('add',{
    isAuth: req.isAuthenticated()
  });

});

router.post('/add', isAuth, (req,res,next)=>{
  db("tarefas").insert(req.body).then((ids) => {
    res.redirect('/');
  },next)
});

router.get('/edit/:id', isAuth, (req,res,next)=>{
  const {id} = req.params;

  db("tarefas")
  .where("id", id)
  .first()
  .then((tarefa) => {
    if (!tarefa) {
      return res.send(400);
    }

    res.render("edit",{
      tarefa: tarefa
    });
  },next);

});

router.put('/edit/:id', isAuth, (req,res,next)=>{
  const {id} = req.params;

  db("tarefas")
  .where('id', id)
  .update(req.body)
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/');
  },next)
});

router.delete('/delete/:id', isAuth, (req,res,next)=>{
  const {id} = req.params;
console.log("deltetando" + id);
  db("tarefas")
  .where('id', id)
  .delete()
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/');
  },next)
});

module.exports = router;
