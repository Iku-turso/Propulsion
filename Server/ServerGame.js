exports.ServerGame = function(tick, physics, gameObjects, broadcaster) {
    tick(function() {
        gameObjects.forEach(function(gameObject) {
            gameObject.live();
        });

        physics.apply();

        broadcaster.broadcast();
    });
};