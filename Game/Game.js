Game = function(shipFactory, worldFactory) {
    var self = this;
    var world;
    var window;

    self.init = function(container, _window_) {
        window = _window_;
        world = worldFactory.create();
        world.init(container);
        var ship = shipFactory.create();
        world.add(ship);
        self.setCanvas();
        world.render();
    }

    self.setCanvas = function() {
        world.setCanvas(window.innerWidth, window.innerHeight);
    }

    self.start = function() {
        world.render();
    }
}