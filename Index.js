var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Index.html');
});

app.use('/Game', express.static('Game'));
app.use('/Scripts', express.static('Scripts'));

var server = app.listen(3000);