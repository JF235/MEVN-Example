var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./uc0-inicializacao/index');
var cadastroRouter = require('./uc1-cadastro/cadastro')
var loginRouter = require('./uc2-login/login')
var funcionariosRouter = require('./uc3-funcionarios/funcionarios')
var viagensRouter = require('./uc4-viagens/viagens')
var servicosRouter = require('./uc5-servicos/servicos')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// Obtém os arquivos estáticos em public por padrão
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/funcionarios', funcionariosRouter);
app.use('/login', loginRouter);
app.use('/cadastro', cadastroRouter);
app.use('/viagens', viagensRouter);
app.use('/servicos', servicosRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
