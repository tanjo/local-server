var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var routes = require('./routes');
var app = express();

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan({ format: 'dev', immediate: true }));
app.use(express.static(__dirname + '/public'));

app.get('/qr', routes.qr);
app.get('/', routes.home);

app.listen(process.env.PORT || 3000);
