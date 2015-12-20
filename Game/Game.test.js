/// <reference path="Game.js" />

describe('Game', function() {
    var shipFactorySpy;
    var ship;
    var worldFactorySpy;
    var worldSpy;
    var game;

    beforeEach(function() {
        ship = {};
        shipFactorySpy = jasmine.createSpyObj('shipFactorySpy', ['create']);
        shipFactorySpy.create.and.returnValue(ship);

        worldSpy = jasmine.createSpyObj('worldSpy', ['add', 'init', 'render', 'setCanvas']);
        worldFactorySpy = jasmine.createSpyObj('worldFactorySpy', ['create']);
        worldFactorySpy.create.and.returnValue(worldSpy);

        game = new Game(shipFactorySpy, worldFactorySpy);
    });

    describe('when init is called with a container and window', function() {
        var container;
        beforeEach(function() {
            container = {};
            game.init(container, window);
        });

        it('should create a ship', function() {
            expect(shipFactorySpy.create).toHaveBeenCalled();
        });

        it('should create a world', function() {
            expect(worldFactorySpy.create).toHaveBeenCalled();
        });

        it('should init the world with container', function() {
            expect(worldSpy.init).toHaveBeenCalledWith(container);
        });

        it('should add the ship from shipFactory to world', function() {
            expect(worldSpy.add).toHaveBeenCalledWith(ship);
        });

        it('setCanvas should call world.setCanvas with given dimensions', function() {
            game.setCanvas(5, 6);

            expect(worldSpy.setCanvas).toHaveBeenCalledWith(5, 6);
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