/// <reference path="Ship.js" />

describe('Ship', function() {
    var ship;
    var physicsSpy;
    var missileFactorySpy;

    beforeEach(function() {
        physicsSpy = jasmine.createSpyObj('physicsSpy', ['applyForwardForce', 'applyAngularForce']);
        missileFactorySpy = jasmine.createSpyObj('missileFactorySpy', ['create']);
        ship = new Ship(physicsSpy, missileFactorySpy);
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

    it('should know how to live', function() {
        expect(ship.live).toEqual(jasmine.any(Function));
    });

    it('should create a missile for ship when shooting', function() {
        ship.shoot();

        expect(missileFactorySpy.create).toHaveBeenCalledWith(ship);
    });

    it('should have id', function() {
        expect(ship.id).toEqual(jasmine.any(Number));
    });

    it('should apply forward force when boosting and the world ticks', function() {
        ship.startBoost();
        ship.live();

        expect(physicsSpy.applyForwardForce).toHaveBeenCalledWith(ship, 1);
    });

    it('should not apply forward force when boosting is stopped before the world ticks', function() {
        ship.startBoost();
        ship.stopBoost();
        ship.live();

        expect(physicsSpy.applyForwardForce).not.toHaveBeenCalled();
    });

    it('should apply angular force to left when steering left and the world ticks', function() {
        ship.startSteerLeft();
        ship.live();

        expect(physicsSpy.applyAngularForce).toHaveBeenCalledWith(ship, 1);
    });

    it('should not apply force when steering left has stopped before the world ticks', function() {
        ship.startSteerLeft();
        ship.stopSteerLeft();
        ship.live();

        expect(physicsSpy.applyAngularForce).not.toHaveBeenCalled();
    });

    it('should apply angular force to right when steering right and the world ticks', function() {
        ship.startSteerRight();
        ship.live();

        expect(physicsSpy.applyAngularForce).toHaveBeenCalledWith(ship, -1);
    });

    it('should not apply force when steering right has stopped before the world ticks', function() {
        ship.startSteerRight();
        ship.stopSteerRight();
        ship.live();

        expect(physicsSpy.applyAngularForce).not.toHaveBeenCalled();
    });
});