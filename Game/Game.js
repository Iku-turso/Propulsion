Game = function(shipFactory, world, physics, gameObjects) {
    var self = this;

    self.init = function() {
        world.init();
    }

    self.setCanvas = function() {
        world.setCanvas();
    }

    self.ships = [];

    self.start = function() {
        self.ships.push(shipFactory.create());
        self.ships.push(shipFactory.create());
        
        world.tick(function() {
            // Todo: should gameObjects be an array or a class?
            gameObjects.forEach(function(go) {
                go.live();
            });

            physics.apply();
        });
    }
}