exports.ServerGame = function(tick, physics, gameObjects, broadcaster, shipFactory) {
    var self = this;

    var tooFar = function(gameObject) {
        return Math.abs(gameObject.x) >= 1000 || Math.abs(gameObject.y) >= 1000;
    };

    // Todo: This is logic in constructor.
    tick(function() {
        Object.keys(gameObjects).forEach(function(id) {
            var gameObject = gameObjects[id];
            if (tooFar(gameObject)) {
                delete gameObjects[id];
            } else {
                gameObject.live();
            }
        });

        physics.apply();

        broadcaster.broadcast();
    });

    self.createShip = function(id) {
        shipFactory.create(id);
    };
    self.shoot = function(id) {
        gameObjects[id].shoot();
    };
    self.steerLeft = function(id) {
        gameObjects[id].steerLeft();
    };
    self.steerRight = function(id) {
        gameObjects[id].steerRight();
    };
    self.stopSteer = function(id) {
        gameObjects[id].stopSteer();
    };
    self.startBoost = function(id) {
        gameObjects[id].startBoost();
    };
    self.stopBoost = function(id) {
        gameObjects[id].stopBoost();
    };
};