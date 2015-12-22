Ship = function() {
    var self = this;
    self.x = 0;
    self.y = 0;
    self.xVelocity = 0;
    self.yVelocity = 0;
    self.direction = Math.PI / 2;
    self.angularVelocity = 0;

    self.accelerate = function() {
        self.y += 0.01;
    }
};

ShipFactory = function() {
    var self = this;
    self.create = function() {
        return new Ship();
    }
};