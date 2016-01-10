/// <reference path="Ship.js" />

describe('Ship', function() {
    var ship;
    var physicsSpy;
    var missileFactorySpy;

    beforeEach(function() {
        physicsSpy = jasmine.createSpyObj('physicsSpy', ['applyForwardForce', 'applyAngularForce']);

        missileFactorySpy = jasmine.createSpyObj('missileFactorySpy', ['create']);

        var idFactoryMock = { create: function() {
                return 111;
            }
        };
        ship = new Ship(physicsSpy, missileFactorySpy, idFactoryMock);
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

    it('should have type "ship"', function() {
        expect(ship.type).toBe('ship');
    });

    it('should know how to live', function() {
        expect(ship.live).toEqual(jasmine.any(Function));
    });

    describe('when shooting with missileId 123', function() {
        var missile;
        beforeEach(function() {
            missile = {};
            missileFactorySpy.create.and.returnValue(missile);

            ship.x = 1;
            ship.y = 2;
            ship.xVelocity = 3;
            ship.yVelocity = 4;
            ship.direction = 5;
            ship.shoot(123);
        });

        it('should call missileFactory with id 123', function() {
            expect(missileFactorySpy.create).toHaveBeenCalledWith(123);
        });

        it('missile should be where ship is', function() {
            expect(missile.x).toBe(1);
            expect(missile.y).toBe(2);
        });

        it('missile should have ships velocity', function() {
            expect(missile.xVelocity).toBe(3);
            expect(missile.yVelocity).toBe(4);
        });

        it('missile should point where ship points', function() {
            expect(missile.direction).toBe(5);
        });
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
        ship.steerLeft();
        ship.live();

        expect(physicsSpy.applyAngularForce).toHaveBeenCalledWith(ship, 1);
    });

    it('should not apply force when steering left has stopped before the world ticks', function() {
        ship.steerLeft();
        ship.stopSteer();
        ship.live();

        expect(physicsSpy.applyAngularForce).not.toHaveBeenCalled();
    });

    it('should apply angular force to right when steering right and the world ticks', function() {
        ship.steerRight();
        ship.live();

        expect(physicsSpy.applyAngularForce).toHaveBeenCalledWith(ship, -1);
    });

    it('should not apply force when steering right has stopped before the world ticks', function() {
        ship.steerRight();
        ship.stopSteer();
        ship.live();

        expect(physicsSpy.applyAngularForce).not.toHaveBeenCalled();
    });
});