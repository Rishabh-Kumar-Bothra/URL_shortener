var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

var config = {};

config.db = {};
config.webhost = 'http://localhost:3000';

config.db.host = 'localhost';
config.db.name = 'url_shortener';

module.exports = config;