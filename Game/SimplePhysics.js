SimplePhysics = function() {
    var self = this;

    self.applyForce = function(ship, vector) {
        ship.xVelocity += vector.x / ship.mass;
        ship.yVelocity += vector.y / ship.mass;
    }

    self.applyAngularForce = function(ship, force) {
        ship.angularVelocity += force / ship.mass;
    }

    var ship;
    self.add = function(_ship) {
        ship = _ship;
    }

    self.apply = function() {
        ship.x += ship.xVelocity;
        ship.y += ship.yVelocity;
        ship.direction += ship.angularVelocity;
    }
}