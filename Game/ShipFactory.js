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