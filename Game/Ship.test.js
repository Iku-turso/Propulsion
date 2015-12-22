/// <reference path="Ship.js" />

describe('Ship', function() {
    var ship;
    beforeEach(function() {
        ship = new Ship();
    });

    it('should have x-coordinate 0', function() {
        expect(ship.x).toBe(0);
    });

    it('should have y-coordinate 0', function() {
        expect(ship.y).toBe(0);
    });

    it('should have x-velocity 0', function() {
        expect(ship.xVelocity).toBe(0);
    });

    it('should have y-velocity 0', function() {
        expect(ship.yVelocity).toBe(0);
    });

    it('should have direction pointing up', function() {
        expect(ship.direction).toBe(Math.PI / 2);
    });

    it('should have angular velocity 0', function() {
        expect(ship.angularVelocity).toBe(0);
    });

    it('should have y-coordinate 0.01 when accelerate is called', function() {
        ship.accelerate();

        expect(ship.y).toBe(0.01);
    });
});

describe('ShipFactory', function() {
    it('should exist', function() {
        expect(ShipFactory).toBeDefined();
    });

    it('should create a Ship', function() {
        var factory = new ShipFactory();
        var ship = factory.create();
        expect(ship).toEqual(jasmine.any(Ship));
    });
});