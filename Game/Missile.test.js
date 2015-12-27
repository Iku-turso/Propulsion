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