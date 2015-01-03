/*global describe, it, document, browser, process*/
'use strict';
var assert = require('chai').assert;

describe('calcアプリのテスト', function () {

  var click = function(selector) {
    document.querySelector(selector).click();
  };

  var getText = function(selector) {
    return document.querySelector(selector).innerHTML;
  };

  it('1+2=3', function(done) {
    browser
      .url(process.env.SERVER_URL)
      .pause(1000)
      .execute(click, 'example-calc::shadow #container > div:nth-child(4) > calc-key.number:nth-child(1)')
      .execute(click, 'example-calc::shadow #container > div:nth-child(5) > calc-key.operator')
      .execute(click, 'example-calc::shadow #container > div:nth-child(4) > calc-key.number:nth-child(2)')
      .execute(click, 'example-calc::shadow #enter')
      .pause(100)
      .execute(getText, 'example-calc::shadow #output', function(err, ret) {
        if(err) {
          return done(err);
        }
        console.log(ret.value);
        assert.equal(ret.value, '3');
      })
      .end(done);
  });
});
