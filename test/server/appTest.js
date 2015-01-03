/*global describe, it*/
'use strict';
var superagent = require('supertest');
var app = require('../../app.js');
var request = superagent(app.listen());

describe('add (足し算)', function () {
  it('1 + 2 = 3', function (done) {
    request
      .get('/calc/add/1/2')
      .expect(200, {result: 3}, done);
  });
});

describe('divide (割り算)', function () {
  it('12 / 3 = 4', function (done) {
    request
      .get('/calc/divide/12/3')
      .expect(200, {result: 4}, done);
  });
});

describe('multiply (掛け算)', function () {
  it('1.5 / 2 = 3', function (done) {
    request
      .get('/calc/multiply/1.5/2')
      .expect(200, {result: 3}, done);
  });
});
