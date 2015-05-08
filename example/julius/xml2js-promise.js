'use strict';

var Promise = require("bluebird");
var xml2js = require("xml2js");

exports.parseString = Promise.promisify(xml2js.parseString);

// module.exports = function (input) {
// 	var deferred = Promise.defer();
// 	var parser = new xml2js.Parser();
// 	parser.parseString(input, {trim: true, explicitArray: false}, function (err, stdout, stderr) {
// 		console.log('++++++++++++');
// 		console.log(stdout);
// 		if (err)  {
// 			return deferred.reject(err);
// 		}
// 		return deferred.resolve(stdout);
// 	});
// 	return deferred.promise;
// };
