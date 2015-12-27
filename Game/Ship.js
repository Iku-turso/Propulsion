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
            physics.applyForwardForce(self, 1);
        }

        if (turn) {
            physics.applyAngularForce(self, turn);
        }
    };

    self.shoot = function() {
        missileFactory.create(self);
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