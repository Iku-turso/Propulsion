Game = function(shipFactory, world, physics, gameObjects, server, idFactory) {
    var self = this;

    // Todo: merge with start.
    self.init = function() {
        world.init();
    };

    // Todo: move to world.
    self.setCanvas = function() {
        world.setCanvas();
    };

    var shipId = idFactory.create();
    self.start = function() {
        server.onConnect(function() {
            server.createShip(shipId);
        });

        var ships = {};
        server.message(function(msg) {
            var message = JSON.parse(msg.data);

            if (message.type === 'createShip') {
                ships[message.shipId] = shipFactory.create(message.shipId);
            }

            if (message.type === 'shoot') {
                ships[message.shipId].shoot();
            }

            if (message.type === 'startBoost') {
                ships[message.shipId].startBoost();
            }

            if (message.type === 'stopBoost') {
                ships[message.shipId].stopBoost();
            }

            if (message.type === 'steerLeft') {
                ships[message.shipId].steerLeft();
            }

            if (message.type === 'steerRight') {
                ships[message.shipId].steerRight();
            }

            if (message.type === 'stopSteer') {
                ships[message.shipId].stopSteer();
            }

            if (message.type === 'gameObjects') {
                Object.keys(message.gameObjects).forEach(function(stringId) {
                    var id = parseFloat(stringId);
                    var gameObject = message.gameObjects[id];
                    var ship = gameObjects[id] || shipFactory.create(id);
                    ship.x = gameObject.x;
                    ship.y = gameObject.y;
                    ship.direction = gameObject.direction;
                });
            }
        });

        world.tick(function() {
            Object.keys(gameObjects).forEach(function(id) {
                gameObjects[id].live();
            });

            physics.apply();
        });
    };
    self.remoteShoot = function() {
        server.shoot(shipId);
    };
    self.remoteStartBoost = function() {
        server.startBoost(shipId);
    };
    self.remoteStopBoost = function() {
        server.stopBoost(shipId);
    };
    self.remoteSteerLeft = function() {
        server.steerLeft(shipId);
    };
    self.remoteSteerRight = function() {
        server.steerRight(shipId);
    };
    self.remoteStopSteer = function() {
        server.stopSteer(shipId);
    };
}