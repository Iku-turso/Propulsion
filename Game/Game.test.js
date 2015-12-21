/// <reference path="Game.js" />

describe('Game', function() {
    var shipFactorySpy;
    var ship;
    var worldSpy;
    var game;

    beforeEach(function() {
        ship = {};
        shipFactorySpy = jasmine.createSpyObj('shipFactorySpy', ['create']);
        shipFactorySpy.create.and.returnValue(ship);

        worldSpy = jasmine.createSpyObj('worldSpy', ['add', 'init', 'render', 'setCanvas']);

        game = new Game(shipFactorySpy, worldSpy);
    });

    describe('when init is called', function() {
        beforeEach(function() {
            game.init();
        });

        it('should create a ship', function() {
            expect(shipFactorySpy.create).toHaveBeenCalled();
        });

        it('should init the world', function() {
            expect(worldSpy.init).toHaveBeenCalled();
        });

        it('should add the ship from shipFactory to world', function() {
            expect(worldSpy.add).toHaveBeenCalledWith(ship);
        });

        it('setCanvas should call world.setCanvas', function() {
            game.setCanvas();

            expect(worldSpy.setCanvas).toHaveBeenCalled();
        });

        describe('when game is started', function() {
            beforeEach(function() {
                game.start();
            });

            it('should render the world', function() {
                expect(worldSpy.render).toHaveBeenCalled();
            });
        });
    });
});