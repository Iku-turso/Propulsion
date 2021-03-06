﻿Missile = function(physics) {
    var self = this;

    self.x = 0;
    self.y = 0;
    self.xVelocity = 0;
    self.yVelocity = 0;
    self.mass = 10;
    self.direction = 0;
    self.angularVelocity = 0;
    self.id = Math.random();
    self.type = 'missile';
    self.live = function() {
        physics.applyForwardForce(self, 0.1);
    };
};
exports.Missile = Missile;