ShipFactory = function(world, physics, locate, gameObjects) {
    var self = this;
    self.create = function(id) {
        var ship = locate('ship');
        world.add(ship);
        physics.add(ship);
        gameObjects[id] = ship;
        // Todo: Is this needed anywhere?
        ship.id = id;
        return ship;
    };
};
exports.ShipFactory = ShipFactory;