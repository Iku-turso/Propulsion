ShipFactory = function(world, physics, locate, gameObjects) {
    var self = this;
    self.create = function(id) {
        var ship = locate('ship');
        world.add(ship);
        physics.add(ship);
        gameObjects.push(ship);
        ship.id = id;
        return ship;
    };
};