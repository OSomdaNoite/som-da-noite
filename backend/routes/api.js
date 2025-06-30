// Configuração Padrão do Express ( AQUI É ONDE FICA A API )
var express = require('express');
var router = express.Router();
const body_parser = require('body-parser');
const { PanelStyle } = require('../models');
const app = express();



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.use(express.json());


/* GET HELLO */
router.get('/hello', function(req, res, next){
  res.status(200).json({ message: 'Hello, World!' });
})



// Testes de Requisição
router.get('/todos', async(req, res, next) => {
  const tasks = await Task.findAll();

  res.status(200).json(tasks)
})

router.post('/todos', async (req, res, next) => {
  const { content, description } = req.body;

  try {
    const newTask = await Task.create({
      content,
      description
    });

    res.status(201).json(newTask); 
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar task', details: err.message });
  }
});


router.get('/todos/:id', async (req, res, next) => {
  const task = await Task.findOne({
    where: {
      id:req.params.id
    },
  })
  try {
    res.status(200).json(task)

  } catch(err) {
    res.status(500).json({error: 'Erro ao criar task', details: err.message})
  }

})

router.post('/todos/:id',  function(req, res,  next){

})

router.put('/todos/:id',  function(req, res,  next){

})

router.delete('/todos/:id',  function(req, res,  next){
})


router.post('/hello', function(req, res, next){

})


// Consulta do estilo de painel

router.get('/panel-style', async(req, res) => {
  try {
    const panel = await PanelStyle.findAll()
    res.status(200).json(panel)
  } catch (err) {
    res.status(500).json({
      error: 'Ocorreu um erro inesperado!',
      details: err.message
    })
  }
})

// Selecionar o estilo do painel através do ID
router.get('/panel-style/:id', async(req, res) => {
  try  {
    const panel = await PanelStyle.findOne({
      where: {
        id:req.params.id
      }
    })
    res.status(200).json(panel)
  } catch (err) {
    res.status(500).json({
      error: 'Ocorreu um erro inesperado!',
      details: err.message
    })
  }
})

module.exports = router;
