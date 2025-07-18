  // Configuração padrão do Express Generator
  var createError = require('http-errors');
  var express = require('express');
  var path = require('path');
  var cookieParser = require('cookie-parser');
  var logger = require('morgan');

  // Rota INDEX (Para o banco de dados)
  var apiRouter = require('./routes/api');
  var index =  require('./models/index')
  // var usersRouter = require('./routes/users');

  const { syncModels } = require('./models/index')

  // Ativando o EXPRESS
  var app = express();
  const port = process.env.PORT || 3000;

  // BANCO DE DADOS
  const { connectToDatabase } = require('./config/db');
  const { seedPanelStyles } = require('./models/seedData')

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  // Chama o INDEX usando o Express
  app.use('/api', apiRouter);


  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  connectToDatabase()
  .then(async () => {
    await syncModels();
    await seedPanelStyles();
    

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar ao banco de dados: ', err);
  });

module.exports = app;
