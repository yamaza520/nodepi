'use strict';

var parseString = require('./xml2js-promise').parseString;

module.exports = function() {
	var privates = {
		/**
		 * generate xml RECOGOUT tag
		 *
		 * @param data
		 */
		generateXml : function(data) {
			var lines = data.split('\n'),
				xml = '',
				xmlEnd = false;
			lines.forEach(function(l) {
				if (l == '</RECOGOUT>') {
					xml += l;
					xmlEnd = true;
				} else if ((xml.length > 0 && xmlEnd == false) || l == '<RECOGOUT>') {
					xml += l;
				}
			});
			// console.log(xml);
			return xml;
		},

		/**
		 * parse xml
		 *
		 * @param data
		 */
		parseXml : function(xml) {
			return new Promise(function(resolve, reject) {
				// console.log('xml\n' + xml);
				parseString(xml, {trim: true, explicitArray: false})
					.then(function (result) {
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
							resolve(whypo.$.WORD);
						});
					})
					.catch(function (err) {
						reject(err);
					})
			});
		}
	};

	this.parseJulius = function(data) {
		return new Promise(function(resolve, reject) {
			// generate
			var xml = privates.generateXml(data);
			if (xml.length == 0) {
				return resolve('');
			}
			// parse
			privates.parseXml(xml)
				.then(function(w) {
					return resolve(w);
				})
				.catch(function(err) {
					return reject(err);
				})
		});
	};
};
