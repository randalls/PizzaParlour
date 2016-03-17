'use strict';

var nconf = require('nconf'),
	fs = require('fs');

module.exports = function (env) {
	nconf.argv().env();

	var config = {},
		NODE_ENV = nconf.get('NODE_ENV');

	if (!env && !NODE_ENV) {
		env = NODE_ENV = 'local';
	}
	if (env && (NODE_ENV !== env)) {
		NODE_ENV = env;
	}

	config.path = __dirname + '/config';
	config.baseFile = config.path + '/config.json';
	config.environmentFile = config.path + '/' + NODE_ENV + '.json';
	nconf.file({file: config.environmentFile});
	nconf.defaults(JSON.parse(fs.readFileSync(config.baseFile, 'utf-8')));
	nconf.set('NODE_ENV', NODE_ENV);
	nconf.set('applicationPath', __dirname + '/');
};
