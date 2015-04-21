'use strict'

var _gpio = require('node-pi-gpio');

var pin = 24;
var time = 500;

function gpioClose(gpio) {
  gpio.value(0);
  gpio.close();
}

function _loop(gpio, val) {
  console.log('loop v=' + val);
  gpio.value(val);
  var sig = 1;
  if (val == 1) sig = 0;
  setTimeout(_loop, 500, gpio, sig);
}

_gpio.open(pin, 'out')
  .then(function(gpio) {
    process.on('SIGINT', gpioClose(gpio))
      .then(function() {
        process.exit();
      });
    _loop(gpio, 1);
  })
  .catch(
    function(err) {
      console.log(err);
    }
  );

