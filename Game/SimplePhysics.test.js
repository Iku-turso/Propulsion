/// <reference path="SimplePhysics.js" />
/// <reference path="Ship.js" />
/// <reference path="Missile.js" />
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

    describe('when two objects are added to physics', function() {
        var objectA;
        var objectB;
        beforeEach(function() {
            objectA = { x: 0, y: 0, xVelocity: 0, yVelocity: 0, direction: 0, angularVelocity: 0, mass: 1 };
            objectB = { x: 0, y: 0, xVelocity: 0, yVelocity: 0, direction: 0, angularVelocity: 0, mass: 1 };
            physics.add(objectA);
            physics.add(objectB);
        });

        describe('when different force is applied to both objects', function() {
            beforeEach(function() {
                physics.applyForce(objectA, { x: -1, y: 0 });
                physics.applyForce(objectB, { x: 1, y: 0 });
            });

            it('both objects should have xVelocity matching to force', function() {
                expect(objectA.xVelocity).toBe(-1);
                expect(objectB.xVelocity).toBe(1);
            });

            describe('when physics are applied', function() {
                beforeEach(function() {
                    physics.apply();
                });

                it('both objects should move to directions matching to velocity', function() {
                    expect(objectA.x).toBe(-1);
                    expect(objectB.x).toBe(1);
                });
            });
        });
    });
});