Ship = function(physics) {
    var self = this;
    self.x = 0;
    self.y = 0;
    self.xVelocity = 0;
    self.yVelocity = 0;
    self.direction = Math.PI / 2;
    self.angularVelocity = 0;
    
    var _isAccelerating = false;
    self.isAccelerating = function() {
        return _isAccelerating;
    };

    self.startAccelerate = function() {
        _isAccelerating = true;
    }

    self.stopAccelerate = function() {
        _isAccelerating = false;
    }

    self.accelerate = function() {
        self.y += 0.01;
    }

    self.burn = function() {
        var force = 0.001;
        var resolution = 1000;
        var burnVector = {
            x: Math.round(Math.cos(self.direction) * force * resolution) / resolution,
            y: Math.round(Math.sin(self.direction) * force * resolution) / resolution
        };
        physics.applyForce(self, burnVector);
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