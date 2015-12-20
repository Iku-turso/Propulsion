Ship = function() {
    var self = this;
    self.x = 0;
    self.y = 0;
};

ShipFactory = function() {
    var self = this;
    self.create = function() {
        return new Ship();
    }
};