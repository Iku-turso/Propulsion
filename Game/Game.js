Game = function(shipFactory, world, physics) {
    var self = this;
    var ship;

    self.init = function() {
        world.init();
        ship = shipFactory.create();
    }

    self.setCanvas = function() {
        world.setCanvas();
    }

    self.start = function() {
        world.tick(function() {
            ship.burn();
            physics.apply();
        });
    }
}