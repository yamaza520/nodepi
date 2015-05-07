'use strict';

var net = require('net');
var parseString = require('xml2js').parseString;
var host = '127.0.0.1';
var port = 10500;

var client = net.createConnection(port, host, function() {
	console.log('connected.');
});

var datas = '';
client.on('data', function(data) {
	// console.log('-------------------------------');
	// console.log(data.toString());
	var trimedData = data.toString().trim();
	datas += trimedData;
	if (trimedData.slice(-1) === '.') {
		parseString(datas.slice(0, -1), {explicitArray: false}, function(err, result) {
			if (err) {
				return;
			}
			if (!result.RECOGOUT) {
				return;
			}
			// console.log('++++++++++++');
			// console.log(datas);
			result.RECOGOUT.SHYPO.WHYPO.forEach(function(whypo) {
				if (whypo.$.CLASSID < 2) {
					return;
				}
				console.log('CM=' + whypo.$.CM + ', w=' + whypo.$.WORD);
			});

		});
		datas = '';
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

