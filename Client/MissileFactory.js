MissileFactory = function(world, physics, locate, gameObjects, idFactory) {
    var self = this;

    self.create = function(ship) {
        var missile = locate('missile');
        missile.x = ship.x;
        missile.y = ship.y;
        missile.xVelocity = ship.xVelocity;
        missile.yVelocity = ship.yVelocity;
        missile.direction = ship.direction;
        var id = idFactory.create();
        missile.id = id;
        world.add(missile);
        physics.add(missile);
        gameObjects[id] = missile;
        return missile;
    };
};
exports.MissileFactory = MissileFactory;