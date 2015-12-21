Game = function(shipFactory, world) {
    var self = this;

    self.init = function() {
        world.init();
        var ship = shipFactory.create();
        world.add(ship);
    }

    self.setCanvas = function() {
        world.setCanvas();
    }

    self.start = function() {
        world.render();
    }
}