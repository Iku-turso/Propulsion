SimplePhysics = function() {
    var self = this;

    self.applyForce = function(ship, vector) {
        ship.xVelocity += vector.x;
        ship.yVelocity += vector.y;
    }

    var ship;
    self.add = function(_ship) {
        ship = _ship;
    }

    self.apply = function() {
        ship.x += ship.xVelocity;
        ship.y += ship.yVelocity;
    }
}