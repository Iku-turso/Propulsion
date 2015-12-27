MissileFactory = function(world, physics, locate, gameObjects) {
    var self = this;

    self.create = function(ship) {
        var missile = locate('missile');
        missile.x = ship.x;
        missile.y = ship.y;
        missile.xVelocity = ship.xVelocity;
        missile.yVelocity = ship.yVelocity;
        missile.direction = ship.direction;
        world.add(missile);
        physics.add(missile);
        gameObjects.push(missile);
        return missile;
    };
};