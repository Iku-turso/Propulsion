/// <reference path="Game.js" />

describe('Game', function() {
    var shipFactorySpy;
    var shipSpy;
    var worldSpy;
    var game;
    var tickCallback;

    beforeEach(function() {
        shipSpy = jasmine.createSpyObj('shipSpy', ['accelerate']);
        shipFactorySpy = jasmine.createSpyObj('shipFactorySpy', ['create']);
        shipFactorySpy.create.and.returnValue(shipSpy);

        worldSpy = jasmine.createSpyObj('worldSpy', ['add', 'init', 'render', 'setCanvas', 'tick']);
        worldSpy.tick.and.callFake(function(callback) {
            tickCallback = callback;
        });

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
            expect(worldSpy.add).toHaveBeenCalledWith(shipSpy);
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

            it('should accelerate the ship on every tick', function() {
                tickCallback();
                tickCallback();
                tickCallback();
                expect(shipSpy.accelerate.calls.count()).toEqual(3);
            });
        });
    });
});