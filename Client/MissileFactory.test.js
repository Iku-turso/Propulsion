/// <reference path="Missile.js" />
/// <reference path="MissileFactory.js" />

describe('when MissileFactory creates a missile for a ship in origo, pointing right', function() {
    var factory;
    var missile;
    var worldSpy;
    var physicsSpy;
    var locateSpy;
    var gameObjects;
    beforeEach(function() {
        worldSpy = new jasmine.createSpyObj('worldSpy', ['add']);
        physicsSpy = new jasmine.createSpyObj('physicsSpy', ['add']);
        locateSpy = jasmine.createSpy('locateSpy').and.returnValue(new Missile());
        gameObjects = {};
        factory = new MissileFactory(worldSpy, physicsSpy, locateSpy, gameObjects);
        missile = factory.create(111);
    });
    
    it('should create missile using serviceLocator', function() {
        expect(locateSpy).toHaveBeenCalledWith('missile');
    });

    it('should add missile to world', function() {
        expect(worldSpy.add).toHaveBeenCalledWith(missile);
    });

    it('should add missile to physics', function() {
        expect(physicsSpy.add).toHaveBeenCalledWith(missile);
    });

    it('should create a missile with given id', function() {
        expect(missile.id).toBe(111);
    });

    it('should add the missile with id to gameObjects', function() {
        expect(gameObjects[111]).toEqual(missile);
    });
});