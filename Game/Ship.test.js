/// <reference path="Ship.js" />

describe('Ship', function() {
    var ship;
    beforeEach(function() {
        ship = new Ship();
    });
    
    it('should exist', function() {
        expect(Ship).toBeDefined();
    });

    it('should have x-coordinate 0', function() {
        expect(ship.x).toBe(0);
    });

    it('should have y-coordinate 0', function() {
        expect(ship.y).toBe(0);
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