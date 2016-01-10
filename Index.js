require('./Application/Server/ServerDependencyInversionWireUp').init();
var di = require('di4js');

// Todo: this is bit of a mess.
var express = di.resolve('express');
var app = di.resolve('expressApp');
var expressWs = di.resolve('expressWs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Index.html');
});

app.get('/Bundle', function(req, res) {
    res.sendFile(__dirname + '/Bundle.js');
});

var game = di.resolve('serverGame');

var wss = expressWs.getWss('/');
app.ws('/', function(ws, req) {
    ws.on('message', function(messageString) {
        // Todo: This proto-bit should re-implemented with tests.
        var message = JSON.parse(messageString);
        if (message.type === 'createShip') {
            game.createShip(message.shipId);
        }

        if (message.type === 'shoot') {
            game.shoot(message.shipId, message.missileId);
        }

        if (message.type === 'steerLeft') {
            game.steerLeft(message.shipId);
        }

        if (message.type === 'steerRight') {
            game.steerRight(message.shipId);
        }

        if (message.type === 'stopSteer') {
            game.stopSteer(message.shipId);
        }

        if (message.type === 'startBoost') {
            game.startBoost(message.shipId);
        }

        if (message.type === 'stopBoost') {
            game.stopBoost(message.shipId);
        }

        console.log(messageString);
    });
});

var server = app.listen(process.env.PORT || 5000);