﻿Ship = function(physics, missileFactory) {
    var self = this;
    self.x = 0;
    self.y = 0;
    self.xVelocity = 0;
    self.yVelocity = 0;
    self.direction = Math.PI / 2;
    self.angularVelocity = 0;
    self.mass = 1000;
    self.id = Math.random();
    self.type = 'ship';

    var boosting = false;
    self.startBoost = function() {
        boosting = true;
    };

    self.stopBoost = function() {
        boosting = false;
    };

    var turn = 0;
    self.steerLeft = function() {
        turn = 1;
    };

    self.steerRight = function() {
        turn = -1;
    };

    self.stopSteer = function() {
        turn = 0;
    };

    self.live = function() {
        if (boosting) {
            physics.applyForwardForce(self, 1);
        }

        if (turn) {
            physics.applyAngularForce(self, turn);
        }
    };

    self.shoot = function(missileId) {
        var missile = missileFactory.create(missileId);
        missile.x = self.x;
        missile.y = self.y;
        missile.xVelocity = self.xVelocity;
        missile.yVelocity = self.yVelocity;
        missile.direction = self.direction;
    };
};
exports.Ship = Ship;