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

    var shouldBurn = false;
    self.upStart = function() {
        shouldBurn = true;
    }

    self.upEnd = function() {
        shouldBurn = false;
    }

    self.start = function() {
        world.tick(function() {
            if (shouldBurn) {
                ship.burn();
            }

            physics.applyForce(ship, { x: 0, y: -0.1 });

            physics.apply();
        });
    }
}