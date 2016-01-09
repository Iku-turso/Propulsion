Server = function(socket) {
    var self = this;
    self.message = function(callback) {
        socket.onmessage = callback;
    }

    self.onConnect = function(callback) {
        socket.onopen = callback;
    }

    var send = function(messageType, shipId) {
        socket.send(JSON.stringify({ type: messageType, shipId: shipId }));
    }
    
    self.createShip = function(id) {
        send('createShip', id);
    }

    self.shoot = function(id) {
        send('shoot', id);
    }

    self.startBoost = function(id) {
        send('startBoost', id);
    }

    self.stopBoost = function(id) {
        send('stopBoost', id);
    }

    self.steerLeft = function(id) {
        send('steerLeft', id);
    }

    self.steerRight = function(id) {
        send('steerRight', id);
    }

    self.stopSteer = function(id) {
        send('stopSteer', id);
    }
};