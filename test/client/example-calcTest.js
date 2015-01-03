/*global describe, it, before, beforeEach, chai, __html__, async, sinon, document*/
'use strict';
var assert = chai.assert;

describe('example-calcのテスト', function() {

  var waitUntil = function(f, done) {
    async.until(f, function(cb) {setTimeout(cb, 0);}, done);
  };

  var calc;

  before(function(done) {
    document.body.innerHTML = __html__['test/client/example-calcTest.html'];
    calc = document.querySelector('example-calc');
    waitUntil(function() {return calc.output !== undefined;}, done);
  });

  describe('初期状態', function() {
    it('outputは「0」', function() {
      assert.equal(calc.output, '0');
    });

    it('キーは全部で17個', function() {
      var keys = calc.shadowRoot.querySelectorAll('calc-key');
      assert.equal(keys.length, 17);
    });

    it('CLEARキーがある', function() {
      var clear = calc.shadowRoot.querySelector('#clear');
      assert.equal(clear.innerHTML, 'CLEAR');
    });
  });

  describe('キー入力', function() {
    it('「7894561230.」キーをクリックすると outputが「7894561230.」になる', function() {
      var keys = calc.shadowRoot.querySelectorAll('calc-key.number');
      assert.equal(keys.length, 11);
      for(var i = 0; i < keys.length; i++) {
        keys[i].click();
      }
      assert.equal(calc.output, '7894561230.');
    });

    it('「CLEAR」キーをクリックすると outputが「0」になる', function() {
      calc.output = '1';
      calc.shadowRoot.querySelector('#clear').click();
      assert.equal(calc.output, '0');
    });

    it('演算子キー（/*-+）クリック後に数値入力するとそれ以前に入力された数値はクリアされる', function() {
      var seven = calc.shadowRoot.querySelector('calc-key.number');
      var keys = calc.shadowRoot.querySelectorAll('calc-key.operator');
      assert.equal(keys.length, 4);
      for(var i = 0; i < keys.length; i++) {
        calc.output = '1';
        keys[i].click();
        seven.click();
        assert.equal(calc.output, '7');
      }
    });
  });

  describe('メソッド実行', function() {
    it('clearメソッドを呼び出すと output が「0」になる', function() {
      calc.output = '1';
      calc.clear();
      assert.equal(calc.output, '0');
    });
  });

  describe('計算実行', function() {

    var request, numberKeys, operatorKeys, enterKey;
    beforeEach(function(){
      request = null;
      numberKeys = calc.shadowRoot.querySelectorAll('calc-key.number');
      operatorKeys = calc.shadowRoot.querySelectorAll('calc-key.operator');
      enterKey = calc.shadowRoot.querySelector('#enter');

      var xhr = sinon.useFakeXMLHttpRequest();
      xhr.onCreate = function(xhr) {
        request = xhr;
      };
    });

    it('=をクリックするとサーバへのリクエストを行う', function(done) {
      async.series([
        function(cb) {
          numberKeys[0].click();
          operatorKeys[0].click();
          numberKeys[0].click();
          enterKey.click();
          cb();
        },
        function(cb) {
          waitUntil(function(){return request !== null;}, cb);
        },
        function(cb) {
          assert.equal(request.url, './calc/divide/7/7');
          request.respond(200, {}, '{"result" : "1"}');
          assert.equal(calc.output, '1');
          cb();
        }
      ], done);
    });

    it('=をクリックしてもその前にほかのキーをクリックしていなければサーバへのリクエストは行なわない', function(done) {
      async.series([
        function(cb) {
          sinon.spy(calc, 'calculate');
          calc.operator = '';
          enterKey.click();
          cb();
        },
        function(cb) {
          assert.ok(calc.calculate.calledOnce);
          calc.calculate.restore();
          assert.equal(request, null);
          cb();
        }
      ], done);
    });

  });


});



