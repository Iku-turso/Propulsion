﻿/// <reference path="SimplePhysics.js" />
/// <reference path="Ship.js" />
describe('SimplePhysics when ship is added', function() {
    var physics;
    var ship;
    beforeEach(function() {
        physics = new SimplePhysics();
        ship = new Ship(physics);
        physics.add(ship);
    });

    describe('when applyForce is called for the ship with upward force', function() {
        beforeEach(function() {
            physics.applyForce(ship, { x: 0, y: 123 });
        });

        it('ship\'s yVelocity should be 123', function() {
            expect(ship.yVelocity).toBe(0.123);
        });

        it('ship\'s xVelocity should be 0', function() {
            expect(ship.xVelocity).toBe(0);
        });

        describe('when physics are applied twice', function() {
            beforeEach(function() {
                physics.apply();
                physics.apply();
            });

            it('ship\'s y should be 123 * 2 / 1000 = 246', function() {
                expect(ship.y).toBe(0.246);
            });

            it('ship\'s x should be 0 * 2 / 1000 = 0', function() {
                expect(ship.x).toBe(0);
            });

            describe('when applyForce is called for the ship with leftward force ', function() {
                beforeEach(function() {
                    physics.applyForce(ship, { x: -1, y: 0 });
                });

                it('ship\'s yVelocity should be 0.123', function() {
                    expect(ship.yVelocity).toBe(0.123);
                });

                it('ship\'s xVelocity should be -0.001', function() {
                    expect(ship.xVelocity).toBe(-0.001);
                });

                describe('when physics are applied once', function() {
                    beforeEach(function() {
                        physics.apply();
                    });

                    it('ship\'s y should be 123 * 3 / 1000 = 0.369', function() {
                        expect(ship.y).toBe(0.369);
                    });

                    it('ship\'s x should be -1 * 1 / 1000 = -0.001', function() {
                        expect(ship.x).toBe(-0.001);
                    });
                });
            });
        });
    });

    describe('when applyAngularForce is called with PI for a ship pointing right', function() {
        beforeEach(function() {
            ship.direction = 0;
            physics.applyAngularForce(ship, Math.PI * 1000);
        });

        it('should set ship\'s angularVelocity to PI', function() {
            expect(ship.angularVelocity).toBe(Math.PI);
        });

        describe('when physics are applied', function() {
            beforeEach(function() {
                physics.apply();
            });

            it('ship should point left', function() {
                expect(ship.direction).toBe(Math.PI);
            });
        });
    });
});