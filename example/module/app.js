'use strict';

var Message = require('./message');
var Message2 = require('./message2');
var m = new Message();
var m2 = new Message2();

m.setMessage('asd');
m.getMessage();

m2.getMessage();
