var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Index.html');
});

app.use('/Client', express.static('Client'));
app.use('/Scripts', express.static('Scripts'));

var wss = expressWs.getWss('/');
app.ws('/', function(ws, req) {
    ws.on('message', function(messageString) {
        console.log(messageString);
        wss.clients.forEach(function(client) {
            client.send(messageString);
        });
    });
});

var tick = function(callback) {
    setInterval(callback, 1000);
};

require('./Server/ServerDependencyInversionWireUp').init();

var di = require('di4js');
var game = di.resolve('serverGame');

var server = app.listen(process.env.PORT);