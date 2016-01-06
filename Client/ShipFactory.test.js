/// <reference path="Ship.js" />
/// <reference path="ShipFactory.js" />

describe('ShipFactory when ship is created', function() {
    var factory;
    var ship;
    var worldSpy;
    var physicsSpy;
    var locateSpy;
    var gameObjects;
    beforeEach(function() {
        worldSpy = jasmine.createSpyObj('worldSpy', ['add']);
        physicsSpy = jasmine.createSpyObj('physicsSpy', ['add']);
        locateSpy = jasmine.createSpy('locateSpy').and.returnValue(new Ship());
        gameObjects = {};
        factory = new ShipFactory(worldSpy, physicsSpy, locateSpy, gameObjects);
        ship = factory.create(123);
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

    it('should add ship to gameObjects with given id', function() {
        expect(gameObjects[123]).toBe(ship);
    });

    it('should create a ship with given id', function() {
        expect(ship.id).toBe(123);
    });
});