Missile = function(physics) {
    var self = this;

    self.x = 0;
    self.y = 0;
    self.xVelocity = 0;
    self.yVelocity = 0;
    self.mass = 10;
    self.direction = 0;
    self.angularVelocity = 0;
    self.id = Math.random();
    self.live = function() {
        physics.applyForwardForce(self, 0.1);
    };
};

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