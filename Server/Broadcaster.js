exports.Broadcaster = function(webSocket, gameObjects) {
    var self = this;

    self.broadcast = function() {
        webSocket.clients.forEach(function(client) {
            client.send(gameObjects);
        });
    }
}