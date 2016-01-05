var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Index.html');
});

app.use('/Game', express.static('Game'));
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
var SimplePhysics = new require('./Game/SimplePhysics').SimplePhysics;
var physics = new SimplePhysics();
var broadcaster = { broadcast: function() {} };
var serverGame = require('./Server/ServerGame').ServerGame;
var gameObjects = [];
serverGame(tick, physics, gameObjects, broadcaster);

var server = app.listen(process.env.PORT);