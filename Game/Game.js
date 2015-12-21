Game = function(shipFactory, world) {
    var self = this;

    self.init = function(container) {
        world.init(container);
        var ship = shipFactory.create();
        world.add(ship);
    }

    self.setCanvas = function(width, height) {
        world.setCanvas(width, height);
    }

    self.start = function() {
        world.render();
    }
}