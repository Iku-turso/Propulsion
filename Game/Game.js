Game = function(shipFactory, world, physics, gameObjects, server) {
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

        server.message(function(msg) {
            var message = JSON.parse(msg.data);

            if (message.type === 'boost') {
                self.ships[1].startBoost();
            }

            if (message.type === 'shoot') {
                self.ships[0].shoot();
            }
        });
        
        world.tick(function() {
            // Todo: should gameObjects be an array or a class?
            gameObjects.forEach(function(go) {
                go.live();
            });

            physics.apply();
        });
    }
}