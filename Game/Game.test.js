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
        var window;
        beforeEach(function() {
            container = {};
            window = { innerWidth: 1, innerHeight: 2 };
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

        it('should render world', function() {
            expect(worldSpy.render).toHaveBeenCalled();
        });

        it('should call refreshCanvas with width 1 and height 2', function() {
            expect(worldSpy.setCanvas).toHaveBeenCalledWith(1, 2);
        });

        it('refreshCanvas should call setCanvas with dimensions from window', function() {
            window.innerWidth = 5;
            window.innerHeight = 6;

            game.setCanvas();

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