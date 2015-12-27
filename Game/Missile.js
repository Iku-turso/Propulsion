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
        // Todo: this code is duplicate with ship's burn.
        var force = 0.1;
        var burnVector = {
            x: Math.cos(self.direction) * force,
            y: Math.sin(self.direction) * force
        };
        physics.applyForce(self, burnVector);
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