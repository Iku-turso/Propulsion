exports.ServerGame = function(tick, physics, gameObjects, broadcaster, shipFactory) {
    var self = this;

    // Todo: This is logic in constructor.
    tick(function() {
        Object.keys(gameObjects).forEach(function(id) {
            gameObjects[id].live();
        });

        physics.apply();

        broadcaster.broadcast();
    });

    self.createShip = function(id) {
        shipFactory.create(id);
    }

    self.shoot = function(id) {
        gameObjects[id].shoot();
    }

    self.steerLeft = function(id) {
        gameObjects[id].steerLeft();
    }

    self.steerRight = function(id) {
        gameObjects[id].steerRight();
    }

    self.stopSteer = function(id) {
        gameObjects[id].stopSteer();
    }

    self.startBoost = function(id) {
        gameObjects[id].startBoost();
    }

    self.stopBoost = function(id) {
        gameObjects[id].stopBoost();
    }
};