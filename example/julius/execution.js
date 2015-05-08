'use strict';

var gpiopi = require('node-pi-gpio');
var pin = 24;
var time = 500;

module.exports = function() {
	var gpio = {
		out : null
	};
	var timer = {
		loop : null
	};

	var privates = {
		doRightOn : function() {
			clearTimeout(timer.loop);
			privates.openGpio()
				.then(privates.rightChange(1));
		},
		doRightOff : function() {
			clearTimeout(timer.loop);
			privates.openGpio()
				.then(privates.rightChange(0));
		},
		doLoop : function(val) {
			privates.rightChange(val);
			var sig = (val == 1) ? 0 : 1;
			timer.loop = setTimeout(privates.doLoop, time, sig);
		},

		/**
		 * right change
		 *
		 * @param val
		 */
		rightChange : function(val) {
			console.log('v=' + val);
			gpio.out.value(val);
		},

		/**
		 * open Gpio
		 */
		openGpio : function() {
			return new Promise(function(resolve, reject) {
				gpiopi.open(pin, 'out')
					.then(function(gpio) {
						gpio.out = gpio;
						console.log('open pin=' + pin);
						resolve();
					})
					.catch(function(err) {
						reject(err);
					});
			});
		}
	};

	this.doRight = function(w) {
		switch (w) {
			case 'あ' :
				privates.doRightOn();
				break;
			case 'い' :
				privates.doRightOff();
				break;
			case 'ん' :
				privates.openGpio()
					.then(privates.doLoop(0));
				break;
			default :
		}
	};
};
