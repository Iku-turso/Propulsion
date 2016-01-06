MissileFactory = function(world, physics, locate, gameObjects) {
    var self = this;

    self.create = function(id) {
        var missile = locate('missile');
        missile.id = id;
        world.add(missile);
        physics.add(missile);
        gameObjects[id] = missile;
        return missile;
    };
};
exports.MissileFactory = MissileFactory;