/// <reference path="Game.js" />

describe('Game', function() {
    var shipFactorySpy;
    var shipSpy;
    var worldSpy;
    var physicsSpy;
    var game;
    var tickCallback;

    beforeEach(function() {
        shipSpy = jasmine.createSpyObj('shipSpy', ['accelerate', 'burn']);
        shipFactorySpy = jasmine.createSpyObj('shipFactorySpy', ['create']);
        shipFactorySpy.create.and.returnValue(shipSpy);

        worldSpy = jasmine.createSpyObj('worldSpy', ['init', 'render', 'setCanvas', 'tick']);
        worldSpy.tick.and.callFake(function(callback) {
            tickCallback = callback;
        });

        physicsSpy = jasmine.createSpyObj('physicsSpy', ['apply']);

        game = new Game(shipFactorySpy, worldSpy, physicsSpy);
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

        it('setCanvas should call world.setCanvas', function() {
            game.setCanvas();

            expect(worldSpy.setCanvas).toHaveBeenCalled();
        });

        describe('when game is started', function() {
            beforeEach(function() {
                game.start();
            });

            describe('when tickCallback is called', function() {
                beforeEach(function() {
                    tickCallback();
                });

                it('should have the ship burn', function() {
                    expect(shipSpy.burn).toHaveBeenCalled();
                });

                it('should apply physics', function() {
                    expect(physicsSpy.apply).toHaveBeenCalled();
                });
            });
        });
    });
});