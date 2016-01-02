Server = function(socket) {
    var self = this;
    self.message = function(callback) {
        socket.onmessage = callback;
    }

    self.boost = function(ship) {
        socket.send({ boost: ship.id });
    }
};