Ship = function(physics) {
    var self = this;
    self.x = 0;
    self.y = 0;
    self.xVelocity = 0;
    self.yVelocity = 0;
    self.direction = Math.PI / 2;
    self.angularVelocity = 0;
    self.mass = 1000;

    self.burn = function() {
        var force = 1;
        var resolution = 1000;
        var burnVector = {
            x: Math.round(Math.cos(self.direction) * force * resolution) / resolution,
            y: Math.round(Math.sin(self.direction) * force * resolution) / resolution
        };
        physics.applyForce(self, burnVector);
    }

    self.steerLeft = function() {
        physics.applyAngularForce(self, 1);
    }

    self.steerRight = function() {
        physics.applyAngularForce(self, -1);
    }
};

ShipFactory = function(world, physics, locate) {
    var self = this;
    self.create = function() {
        var ship = locate('ship');
        world.add(ship);
        physics.add(ship);
        return ship;
    }
};