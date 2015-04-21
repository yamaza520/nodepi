'use strict'

var _gpio = require('node-pi-gpio');

var pin = 24;
var time = 500;

function gpioClose(gpio) {
  console.log('sigint close');
  gpio.value(0);
  gpio.close();
  process.exit();
}

function _loop(gpio, val) {
  gpio.value(val);
  var sig = (val == 1) ? 0 : 1;
  console.log('loop, v=' + val + ', s=' + sig);
  setTimeout(_loop, 500, gpio, sig);
}

console.log('start');

_gpio.open(pin, 'out')
  .then(function(gpio) {
    process.on('SIGINT', gpioClose.bind(this, gpio));
    _loop(gpio, 1);
  })
  .catch(function(err) {
    console.log(err.stack);
  });
