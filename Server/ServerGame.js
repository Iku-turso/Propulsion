exports.ServerGame = function(tick, physics, gameObjects, broadcaster, shipFactory) {
    var self = this;

    // Todo: This is logic in constructor.
    tick(function() {
        gameObjects.forEach(function(gameObject) {
            gameObject.live();
        });

        physics.apply();

        broadcaster.broadcast();
    });

    self.createShip = function(id) {
        shipFactory.create(id);
    }
};