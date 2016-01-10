/// <reference path="Missile.js" />

describe('Missile', function() {
    var missile;
    var physicsSpy;
    beforeEach(function() {
        physicsSpy = jasmine.createSpyObj('physicsSpy', ['applyForwardForce']);
        missile = new Missile(physicsSpy);
    });

    describe('should have default value for', function() {
        it('coordinate x', function() {
            expect(missile.x).toBe(0);
        });

        it('coordinate y', function() {
            expect(missile.y).toBe(0);
        });

        it('xVelocity', function() {
            expect(missile.xVelocity).toBe(0);
        });

        it('yVelocity', function() {
            expect(missile.yVelocity).toBe(0);
        });

        it('mass', function() {
            expect(missile.mass).toBe(10);
        });

        it('direction', function() {
            expect(missile.direction).toBe(0);
        });

        it('angular velocity', function() {
            expect(missile.angularVelocity).toBe(0);
        });

        it('id', function() {
            expect(missile.id).toEqual(jasmine.any(Number));
        });

        it('type', function() {
            expect(missile.type).toBe('missile');
        });
    });

    it('should know how to live', function() {
        expect(missile.live).toEqual(jasmine.any(Function));
    });

    it('should apply forward force when live is called', function() {
        missile.live();

        expect(physicsSpy.applyForwardForce).toHaveBeenCalledWith(missile, 0.1);
    });
});