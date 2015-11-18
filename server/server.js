var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var path = require('path');

// Create an instance of PassportConfigurator with the app instance
var PassportConfigurator = require('loopback-component-passport').PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// cloudify setup for file upload
var cloudinary = require('cloudinary');
var fs = require('fs');
var util = require('util');

cloudinary.config({
  cloud_name: 'hiqbii68e',
  api_key: '887336151291393',
  api_secret: 'YeQ1OQVp02z-pzoOZvm8VTNXy7E'
});

// Load the provider configurations
var config = {};
try {
 config = require('./providers.json');
} catch(err) {
 console.error('Please configure your passport strategy in `providers.json`.');
 console.error('Copy `providers.json.template` to `providers.json` and replace the clientID/clientSecret values with your own.');
 process.exit(1);
}
// Initialize passport
passportConfigurator.init();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken,
  currentUserLiteral: 'me'
}));

app.middleware('session:before', loopback.cookieParser(app.get('cookieSecret')));
app.middleware('session', loopback.session({
	secret: 'kitty',
	saveUninitialized: true,
	resave: true
}));
passportConfigurator.init();


// Set up related models
passportConfigurator.setupModels({
 userModel: app.models.user,
 userIdentityModel: app.models.userIdentity,
 userCredentialModel: app.models.userCredential
});
// Configure passport strategies for third party auth providers
for(var s in config) {
 var c = config[s];
 c.session = c.session !== false;
 passportConfigurator.configureProvider(s, c);
}
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


/*
 *  This is where all the authentication takes place
 */
app.get('/auth/account', ensureLoggedIn('/failure'), function (req, res, next) {
  //We're logged in! Yay!
  res.redirect('/');
});
app.get('/auth/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});
app.get('/auth/user', function (req, res, next) {
  //We're logged in! Yay!
  return res.json(req.user);
});
