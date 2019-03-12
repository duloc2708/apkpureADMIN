var express = require('express');
var http = require('http');
var path = require('path');
var app = express();
var config = require('./config');
var compress = require('compression');
const fs = require('fs');
var _ = require('lodash');
const uuidv4 = require('uuid/v4')();
//read file and update version
var setting = {};
try {
    const rawSetting = fs.readFileSync(__dirname + '/settingVer.json');
    setting = JSON.parse(rawSetting);
} catch (err) {
    setting = {};
}
setting.version = uuidv4;
fs.writeFileSync(__dirname + '/settingVer.json', JSON.stringify(setting, null, 4));
// const BrowserFingerprint = require('browser_fingerprint')

// these are the default options
// const options = {
//     cookieKey: '__bf',
//     toSetCookie: true,
//     onlyStaticElements: true,
//     settings: {
//         path: '/',
//         expires: 1000 * 60 * 60 * 24,
//         httpOnly: null
//     }
// }
// 
// const fingerprinter = new BrowserFingerprint(options)
app.use(compress({
    threshold: 0, //or whatever you want the lower threshold to be
    filter: function(req, res) {
        var ct = res.get('content-type')
        return true
    }
}));
var everyauth = require('everyauth');
everyauth.debug = true;
app.configure(function() {
    app.set('port', process.env.PORT || config.port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('azure zomg'));
    app.use(express.session());
    app.use(everyauth.middleware(app));
    app.use(require('less-middleware')(path.join(__dirname, '/public')));
    app.use(express.static(path.join(__dirname, '/public')));
    app.use(express.static(__dirname + '/public'));
    // app.use(function(req, res, next) {
    //     var { fingerprint, elementHash, headersHash } = fingerprinter.fingerprint(req);
    //     headersHash['Content-Type'] = 'text/plain' // append any other headers you want
    //     res.writeContinue(200, headersHash);
    //     if(!req.cookies.__bf)
    //         res.cookie('__bf', fingerprint, { maxAge: 24 * 60 * 60 * 1000 * 10000 });
    //     next();
    // });//
    app.use(app.router);
});
app.configure('development', function() {
    app.use(express.errorHandler());
});
require('./routes/init')(app);
var server = http.createServer(app);
server.listen(app.get('port'), function() {
    console.log("Server listening on port " + app.get('port'));
});