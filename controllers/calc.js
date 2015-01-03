'use strict';

module.exports.add = function *(a, b) {
  this.body = {result: Number(a) + Number(b)};
};

module.exports.divide = function *(a, b) {
  this.body = {result: Number(a) / Number(b)};
};

module.exports.multiply = function *(a, b) {
  this.body = {result: Number(a) * Number(b)};
};

module.exports.subtract = function *(a, b) {
  this.body = {result: Number(a) - Number(b)};
};
