exports.Broadcaster = function(webSocket, gameObjects) {
    var self = this;

    self.broadcast = function() {
        var message = JSON.stringify({ type: 'gameObjects', gameObjects: gameObjects });
        webSocket.clients.forEach(function(client) {
            if (client.readyState === 1) {
                client.send(message);
            }
        });
    }
}