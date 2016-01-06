/// <reference path="Missile.js" />
/// <reference path="MissileFactory.js" />

describe('when MissileFactory creates a missile for a ship in origo, pointing right', function() {
    var factory;
    var ship;
    var missile;
    var worldSpy;
    var physicsSpy;
    var locateSpy;
    var gameObjects;
    beforeEach(function() {
        ship = { x: 0, y: 0, direction: 0 };
        worldSpy = new jasmine.createSpyObj('worldSpy', ['add']);
        physicsSpy = new jasmine.createSpyObj('physicsSpy', ['add']);
        locateSpy = jasmine.createSpy('locateSpy').and.returnValue(new Missile());
        gameObjects = {};
        var idFactoryMock = { create: function() {
                return 123;
            }
        };
        factory = new MissileFactory(worldSpy, physicsSpy, locateSpy, gameObjects, idFactoryMock);
        missile = factory.create(ship);
    });
    
    it('should create missile using serviceLocator', function() {
        expect(locateSpy).toHaveBeenCalledWith('missile');
    });

    it('missile should be where ship is', function() {
        expect(missile.x).toBe(0);
        expect(missile.y).toBe(0);
    });

    it('missile should point where ship points', function() {
        expect(missile.direction).toBe(0);
    });

    it('missile should have ships velocity', function() {
        expect(missile.xVelocity).toBe(ship.xVelocity);
        expect(missile.yVelocity).toBe(ship.yVelocity);
    });

    it('should add missile to world', function() {
        expect(worldSpy.add).toHaveBeenCalledWith(missile);
    });

    it('should add missile to physics', function() {
        expect(physicsSpy.add).toHaveBeenCalledWith(missile);
    });

    it('should create a missile with id from idFactory', function() {
        expect(missile.id).toBe(123);
    });

    it('should add the missile with id to gameObjects', function() {
        expect(gameObjects[123]).toEqual(missile);
    });
});