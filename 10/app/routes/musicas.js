var express = require('express');
var router = express.Router();
var db = require('../db');

router.get('/', (req, res, next) => {
  db("musicas").then((musicas)=>{
    res.render('index',{
      musicas: musicas
    });
  },next);

});

router.get('/add',(req,res,next)=>{
  res.render('add');

});

router.post('/',(req,res,next)=>{
  db("musicas").insert(req.body).then((ids) => {
    res.redirect('/');
  },next)
});

router.get('/edit/:id',(req,res,next)=>{
  const {id} = req.params;

  db("musicas")
  .where("id", id)
  .first()
  .then((musica) => {
    console.log(musica);
    if (!musica) {
      return res.send(400);
    }

    res.render("edit.njk",{
      musica: musica
    });
  },next);

});

router.put('/edit/:id', (req,res,next)=>{
  const {id} = req.params;

  db("musicas")
  .where('id', id)
  .update(req.body)
  .then((result) => {
    if (result === 0) {
      return res.send(400);
    }
    res.redirect('/');
  },next)
});

router.delete('/delete/:id', (req,res,next)=>{
  const {id} = req.params;

  db("musicas")
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
