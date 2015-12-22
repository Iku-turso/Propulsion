Game = function(shipFactory, world) {
    var self = this;
    var ship;

    self.init = function() {
        world.init();
        ship = shipFactory.create();
        world.add(ship);
    }

    self.setCanvas = function() {
        world.setCanvas();
    }

    self.start = function() {
        world.tick(function() {
            ship.accelerate();
        });
    }


}