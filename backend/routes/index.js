var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET HELLO */

router.get('/hello', function(req, res, next){
  res.status(200).json({ message: 'Hello, World!' });
})



// Testes de Requisição

router.get('/todos', function(req, res, next){
  res.status(200).json({ message: 'Todos List' });
})

router.post('/todos', function(req, res, next){
  
})

router.get('/todos/:id', function(req, res, next){
})

router.post('/todos/:id',  function(req, res,  next){

})

router.put('/todos/:id',  function(req, res,  next){

})

router.delete('/todos/:id',  function(req, res,  next){
})



router.post('/hello', function(req, res, next){

})

module.exports = router;
