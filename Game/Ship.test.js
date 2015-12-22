/// <reference path="Ship.js" />

describe('Ship', function() {
    var ship;
    var physicsSpy;

    beforeEach(function() {
        physicsSpy = jasmine.createSpyObj('physicsSpy', ['applyForce']);
        ship = new Ship(physicsSpy);
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

    it('should have mass 1000', function() {
        expect(ship.mass).toBe(1000);
    });

    it('should apply an upward force to ship when the ship\'s direction is up and when burning', function() {
        ship.direction = Math.PI / 2;
        ship.burn();

        expect(physicsSpy.applyForce).toHaveBeenCalledWith(ship, jasmine.objectContaining({ x: 0, y: 1 }));
    });

    it('should apply a leftward force to ship when the ship\'s direction is left and when burning', function() {
        ship.direction = Math.PI;
        ship.burn();

        expect(physicsSpy.applyForce).toHaveBeenCalledWith(ship, jasmine.objectContaining({ x: -1, y: 0 }));
    });
});

describe('ShipFactory when ship is created', function() {
    var factory;
    var ship;
    var worldSpy;
    var physicsSpy;
    var locateSpy;
    beforeEach(function() {
        worldSpy = jasmine.createSpyObj('worldSpy', ['add']);
        physicsSpy = jasmine.createSpyObj('physicsSpy', ['add']);
        locateSpy = jasmine.createSpy('locateSpy').and.returnValue(new Ship());
        factory = new ShipFactory(worldSpy, physicsSpy, locateSpy);
        ship = factory.create();
    });

    it('should create ship using serviceLocator', function() {
        expect(locateSpy).toHaveBeenCalledWith('ship');
    });
    
    it('created ship should be a Ship', function() {
        expect(ship).toEqual(jasmine.any(Ship));
    });

    it('should add the ship world', function() {
        expect(worldSpy.add).toHaveBeenCalledWith(ship);
    });

    it('should add the ship to physics', function() {
        expect(physicsSpy.add).toHaveBeenCalledWith(ship);
    });
});