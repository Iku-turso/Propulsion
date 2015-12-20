Game = function(shipFactory, worldFactory) {
    var self = this;
    var world;

    self.init = function(container) {
        world = worldFactory.create();
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