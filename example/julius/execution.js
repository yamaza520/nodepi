'use strict';

var gpiopi = require('node-pi-gpio');
var pin1 = 24;
var pin2 = 20;
var time = 500;

module.exports = function() {
	var gpio = {
		pin1 : {
			id : pin1,
			out : null
		},
		pin2 : {
			id : pin2,
			out : null
		},
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
			var val2 = (val == 1) ? 0 : 1;
			console.log('v=' + val);
			gpio.pin1.out.value(val);
			gpio.pin2.out.value(val2);
		},

		/**
		 * open Gpio
		 */
		openGpio : function() {
			return new Promise(function(resolve, reject) {
				Promise.all(
						[gpiopi.open(gpio.pin1.id, 'out'), gpiopi.open(gpio.pin2.id, 'out')]
					)
					.then(function(res) {
						gpio.pin1.out = res[0];
						gpio.pin2.out = res[1];
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
				clearTimeout(timer.loop);
				privates.openGpio()
					.then(privates.doLoop(0));
				break;
			default :
		}
	};
};
