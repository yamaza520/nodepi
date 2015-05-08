'use strict';

var net = require('net'),
	JuliusParse = require('./julius-parse'),
	Execution = require('./execution');
var host = '127.0.0.1',
	port = 10500,
	datas = '',
	juliusParse = new JuliusParse,
	execution = new Execution;

var client = net.createConnection(port, host, function() {
	console.log('connected.');
});

client.on('data', function(data) {
	// console.log('-------------------------------');
	// console.log(data.toString());
	var dataString = data.toString();
	datas += dataString;
	if (dataString.trim().slice(-1) === '.') {
		// console.log(datas);
		var tmp = datas;
		datas = '';
		// julius parse
		juliusParse.parseJulius(tmp)
				.then(function(w) {
					// do exec
					execution.doRight(w);
				})
				.catch(function(err) {
					console.log('err,' + err);
				});
	}
});

client.on('close', function() {
	console.log('close.');
});
client.on('end', function() {
	console.log('disconnected.');
});
client.on('error', function(e){
	console.log(e.message);
});

