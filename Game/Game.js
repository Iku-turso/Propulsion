Game = function(shipFactory, world, physics, gameObjects) {
    var self = this;
    var ship1;
    var ship2;

    self.init = function() {
        world.init();
    }

    self.setCanvas = function() {
        world.setCanvas();
    }

    var shouldBurn = false;
    self.upStart = function() {
        shouldBurn = true;
    }

    self.startShip2Boost = function() {
        ship2.startBoost();
    }

    self.stopShip2Boost = function() {
        ship2.stopBoost();
    }

    self.startShip2SteerLeft = function() {
        ship2.startSteerLeft();
    }

    self.stopShip2SteerLeft = function() {
        ship2.stopSteerLeft();
    }

    self.startShip2SteerRight = function() {
        ship2.startSteerRight();
    }

    self.stopShip2SteerRight = function() {
        ship2.stopSteerRight();
    }

    self.ship2Shoot = function() {
        ship2.shoot();
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
        ship1.shoot();
    }

    self.start = function() {
        ship1 = shipFactory.create();
        ship2 = shipFactory.create();
        
        world.tick(function() {
            if (shouldBurn) {
                ship1.burn();
            }

            if (shouldSteerLeft) {
                ship1.steerLeft();
            }

            if (shouldSteerRight) {
                ship1.steerRight();
            }

            // Todo: should gameObjects be an array or a class?
            gameObjects.forEach(function(go) {
                go.live();
            });

            physics.applyForce(ship1, { x: 0, y: -0.1 });

            physics.apply();
        });
    }
}