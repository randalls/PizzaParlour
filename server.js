'use strict';

// ===========================================
// Import Modules, declare variables
// ===========================================
var express = require('express'),
    path = require('path'),
	nconf = require('nconf'),
	fs = require('fs'),
	app, logger;

require('./config')();

app = express();
app.set('env', nconf.get('NODE_ENV'));


// ===========================================
// Express Server Configuration
// ===========================================


// middleware.
app.use(require('body-parser')());
app.use(require('method-override')());
app.use(require('cookie-parser')());
app.use(require('errorhandler')());

if (nconf.get('NODE_ENV') === 'local') {
	logger = { write: function (message) { console.log(message); } }
} else {
	logger = fs.createWriteStream(__dirname + '/logs/access_' + nconf.get('NODE_ENV') + '.log', {flags: 'a'});
}

app.use(require('morgan')(':date :method :url :status', { stream: logger }));

// server configurations.
app.set('port', nconf.get('PORT'));

// xsrf protection
//app.use(require('csurf')({value: require('./core/xsrf').token}));
//app.use(require('./core/xsrf').cookie);

// html config
app.set('views', __dirname + '/public/');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// routes
require('./server/route')(app);


// ===========================================
// Application Startup
// ===========================================
var host = nconf.get('host'),
    server;
server = app.listen(host.port, host.name, function () {
    console.log('Express server listening on port ' + server.address().port + ' in ' + app.settings.env + ' mode');
});
