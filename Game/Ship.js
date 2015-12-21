Ship = function() {
    var self = this;
    self.x = 0;
    self.y = 0;

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