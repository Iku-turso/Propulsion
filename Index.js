var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/Index.html');
});

app.use('/Game', express.static('Game'));
app.use('/Scripts', express.static('Scripts'));

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
        console.log(msg);
        // Todo: this should be in outer scope?
        var wss = expressWs.getWss('/');
        wss.clients.forEach(function(client) {
            client.send('Boost!');
        });
    });
});

var server = app.listen(3000);