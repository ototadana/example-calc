'use strict';
var koa = require('koa');

var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');

var calc = require('./controllers/calc');

var app = module.exports = koa();
app.use(logger());

app.use(route.get('/calc/add/:a/:b', calc.add));
app.use(route.get('/calc/divide/:a/:b', calc.divide));
app.use(route.get('/calc/multiply/:a/:b', calc.multiply));
app.use(route.get('/calc/subtract/:a/:b', calc.subtract));

app.use(serve('public'));

if (!module.parent) {
  app.listen(process.env.PORT);
  console.log('listening on port ' + process.env.PORT);
}
