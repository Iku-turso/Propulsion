Server = function(socket) {
    var self = this;
    self.message = function(callback) {
        socket.onmessage = callback;
    }

    self.onConnect = function(callback) {
        socket.onopen = callback;
    }

    self.createShip = function(id) {
        socket.send(JSON.stringify({ type: 'createShip', shipId: id }));
    }

    self.shoot = function(id) {
        socket.send(JSON.stringify({ type: 'shoot', shipId: id }));
    }

    self.startBoost = function(id) {
        socket.send(JSON.stringify({ type: 'startBoost', shipId: id }));
    }

    self.stopBoost = function(id) {
        socket.send(JSON.stringify({ type: 'stopBoost', shipId: id }));
    }

    self.steerLeft = function(id) {
        socket.send(JSON.stringify({ type: 'steerLeft', shipId: id }));
    }

    self.steerRight = function(id) {
        socket.send(JSON.stringify({ type: 'steerRight', shipId: id }));
    }

    self.stopSteer = function(id) {
        socket.send(JSON.stringify({ type: 'stopSteer', shipId: id }));
    }
};