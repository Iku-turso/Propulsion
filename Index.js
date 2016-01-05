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

var wss = expressWs.getWss('/');
app.ws('/', function(ws, req) {
    ws.on('message', function(messageString) {
        console.log(messageString);
        wss.clients.forEach(function(client) {
            client.send(messageString);
        });
    });
});

var game = di.resolve('serverGame');

var server = app.listen(process.env.PORT);