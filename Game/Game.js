Game = function(shipFactory, world, physics, gameObjects) {
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

    var shouldSteerLeft = false;
    self.leftStart = function() {
        shouldSteerLeft = true;
    }

    self.leftEnd = function() {
        shouldSteerLeft = false;
    }

    var shouldSteerRight = false;
    self.rightStart = function() {
        shouldSteerRight = true;
    }

    self.rightEnd = function() {
        shouldSteerRight = false;
    }

    self.shoot = function() {
        ship.shoot();
    }

    self.start = function() {
        world.tick(function() {
            if (shouldBurn) {
                ship.burn();
            }

            if (shouldSteerLeft) {
                ship.steerLeft();
            }

            if (shouldSteerRight) {
                ship.steerRight();
            }

            // Todo: should gameObjects be an array or a class?
            gameObjects.forEach(function(go) {
                go.live();
            });

            physics.applyForce(ship, { x: 0, y: -0.1 });

            physics.apply();
        });
    }
}