Server = function(socket) {
    var self = this;
    self.message = function(callback) {
        socket.onmessage = callback;
    }

    self.boost = function(ship) {
        socket.send(JSON.stringify({ type: 'boost', shipId: ship.id }));
    }

    self.shoot = function(ship) {
        socket.send(JSON.stringify({ type: 'shoot', shipId: ship.id }));
    }
};