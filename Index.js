require('./Server/ServerDependencyInversionWireUp').init();
var di = require('di4js');

// Todo: this is bit of a mess.
var express = di.resolve('express');
var app = di.resolve('expressApp');
var expressWs = di.resolve('expressWs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Index.html');
});

app.use('/Client', express.static('Client'));
app.use('/Scripts', express.static('Scripts'));

var game = di.resolve('serverGame');

var wss = expressWs.getWss('/');
app.ws('/', function(ws, req) {
    ws.on('message', function(messageString) {
        // Todo: This proto-bit should re-implemented with tests.
        var message = JSON.parse(messageString);
        if (message.type === 'createShip') {
            game.createShip(message.shipId);
        }
        console.log(messageString);
        wss.clients.forEach(function(client) {
            client.send(messageString);
        });
    });
});

var server = app.listen(process.env.PORT || 5000);