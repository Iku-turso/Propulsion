MissileFactory = function(world, physics, locate, gameObjects) {
    var self = this;

    self.create = function(ship) {
        var missile = locate('missile');
        // Todo: why the minus?
        missile.x = ship.x + Math.sin(-ship.direction);
        missile.y = ship.y + Math.cos(-ship.direction);
        missile.xVelocity = ship.xVelocity;
        missile.yVelocity = ship.yVelocity;
        missile.direction = ship.direction;
        world.add(missile);
        physics.add(missile);
        gameObjects.push(missile);
        return missile;
    };
};