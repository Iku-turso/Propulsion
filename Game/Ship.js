Ship = function(physics, missileFactory) {
    var self = this;
    self.x = 0;
    self.y = 0;
    self.xVelocity = 0;
    self.yVelocity = 0;
    self.direction = Math.PI / 2;
    self.angularVelocity = 0;
    self.mass = 1000;
    self.id = Math.random();

    var boosting = false;
    self.startBoost = function() {
        boosting = true;
    };

    self.stopBoost = function() {
        boosting = false;
    };

    var turn = 0;
    self.startSteerLeft = function() {
        turn = 1;
    };

    self.stopSteerLeft = function() {
        turn = 0;
    };

    self.startSteerRight = function() {
        turn = -1;
    };

    self.stopSteerRight = function() {
        turn = 0;
    };

    self.live = function() {
        if (boosting) {
            var force = 1;
            var burnVector = {
                x: Math.cos(self.direction) * force,
                y: Math.sin(self.direction) * force
            };
            physics.applyForce(self, burnVector);
        }

        if (turn) {
            physics.applyAngularForce(self, turn);
        }
    };

    self.shoot = function() {
        missileFactory.create(self);
    };

    // Todo: start using the new boost instead of burn.
    self.burn = function() {
        var force = 1;
        var burnVector = {
            x: Math.cos(self.direction) * force,
            y: Math.sin(self.direction) * force
        };
        physics.applyForce(self, burnVector);
    };

    self.steerLeft = function() {
        physics.applyAngularForce(self, 1);
    };

    self.steerRight = function() {
        physics.applyAngularForce(self, -1);
    };
};

ShipFactory = function(world, physics, locate, gameObjects) {
    var self = this;
    self.create = function() {
        var ship = locate('ship');
        world.add(ship);
        physics.add(ship);
        gameObjects.push(ship);
        return ship;
    };
};