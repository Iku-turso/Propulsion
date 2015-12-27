ShipFactory = function(world, physics, locate, gameObjects) {
    var self = this;
    var x = -1;
    self.create = function() {
        var ship = locate('ship');
        ship.x = x;
        x += 2;
        world.add(ship);
        physics.add(ship);
        gameObjects.push(ship);
        return ship;
    };
};