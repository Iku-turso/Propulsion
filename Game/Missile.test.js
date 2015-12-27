/// <reference path="Missile.js" />

describe('Missile', function() {
    var missile;
    var physicsSpy;
    beforeEach(function() {
        physicsSpy = jasmine.createSpyObj('physicsSpy', ['applyForwardForce']);
        missile = new Missile(physicsSpy);
    });

    it('should exists', function() {
        expect(Missile).toBeDefined();
    });

    it('should have coordinate x', function() {
        expect(missile.x).toBe(0);
    });

    it('should have coordinate y', function() {
        expect(missile.y).toBe(0);
    });

    it('should have xVelocity', function() {
        expect(missile.xVelocity).toBe(0);
    });

    it('should have yVelocity', function() {
        expect(missile.yVelocity).toBe(0);
    });

    it('should have mass', function() {
        expect(missile.mass).toBe(10);
    });

    it('should have direction', function() {
        expect(missile.direction).toBe(0);
    });

    it('should have angular velocity', function() {
        expect(missile.angularVelocity).toBe(0);
    });

    it('should have id', function() {
        expect(missile.id).toEqual(jasmine.any(Number));
    });

    it('should know how to live', function() {
        expect(missile.live).toEqual(jasmine.any(Function));
    });

    it('should apply forward force when live is called', function() {
        missile.live();

        expect(physicsSpy.applyForwardForce).toHaveBeenCalledWith(missile, 0.1);
    });
});

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
        gameObjects = [];
        factory = new MissileFactory(worldSpy, physicsSpy, locateSpy, gameObjects);
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

    it('should push missile to gameObjects', function() {
        expect(gameObjects).toEqual([missile]);
    });
});