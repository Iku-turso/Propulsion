﻿Game = function(shipFactory, world, physics, gameObjects, server, idFactory, missileFactory) {
    var self = this;

    // Todo: merge with start.
    self.init = function() {
        world.init();
    };

    // Todo: move to world.
    self.setCanvas = function() {
        world.setCanvas();
    };

    var localShipId = idFactory.create();
    var localShip;
    self.start = function() {
        server.onConnect(function() {
            server.createShip(localShipId);
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
                // Todo: move to own class.
                Object.keys(message.gameObjects).forEach(function(stringId) {
                    var messageGameObject = message.gameObjects[stringId];
                    var id = parseFloat(stringId);
                    var gameObject = gameObjects[id];

                    if (!gameObject) {
                        if (messageGameObject.type === 'ship') {
                            gameObject = shipFactory.create(id);
                            if (id === localShipId) {
                                localShip = gameObject;
                            }
                        }
                        
                        if (messageGameObject.type === 'missile') {
                            gameObject = missileFactory.create(id);
                        }
                    }

                    gameObject.x = messageGameObject.x;
                    gameObject.y = messageGameObject.y;
                    gameObject.direction = messageGameObject.direction;
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
        server.shoot(localShipId);
        localShip.shoot();
    };
    self.remoteStartBoost = function() {
        server.startBoost(localShipId);
        localShip.startBoost();
    };
    self.remoteStopBoost = function() {
        server.stopBoost(localShipId);
        localShip.stopBoost();
    };
    self.remoteSteerLeft = function() {
        server.steerLeft(localShipId);
        localShip.steerLeft();
    };
    self.remoteSteerRight = function() {
        server.steerRight(localShipId);
        localShip.steerRight();
    };
    self.remoteStopSteer = function() {
        server.stopSteer(localShipId);
        localShip.stopSteer();
    };
}