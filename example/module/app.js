'use strict';

var Message = require('./message');
var Message2 = require('./message2');
var m = new Message();
var m2 = new Message2();

var promise = Promise.resolve(1);
promise.then(m.getMessage())
       .then(m.setMessage('asd'))
       .then(m.getMessage())
       .then(m2.getMessage())
       .catch(function(err) {
          console.log(err.stack);
       });
