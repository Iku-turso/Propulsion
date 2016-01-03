/// <reference path="Game.js" />

describe('Game', function() {
    var shipFactorySpy;
    var ship1Spy;
    var ship2Spy;
    var worldSpy;
    var physicsSpy;
    var game;
    var tickCallback;
    var gameObjectASpy;
    var gameObjectBSpy;
    var serverMessageCallback;
    var serverSpy;

    beforeEach(function() {
        ship1Spy = jasmine.createSpyObj('ship1Spy', ['accelerate', 'burn', 'steerLeft', 'steerRight', 'shoot']);
        ship2Spy = jasmine.createSpyObj('ship2Spy', ['startBoost', 'stopBoost', 'startSteerLeft', 'stopSteerLeft', 'startSteerRight', 'stopSteerRight', 'shoot']);
        shipFactorySpy = jasmine.createSpyObj('shipFactorySpy', ['create']);

        var alreadyCalled = false;
        shipFactorySpy.create.and.callFake(function() {
            if (alreadyCalled) return ship2Spy;
            alreadyCalled = true;
            return ship1Spy;
        });

        worldSpy = jasmine.createSpyObj('worldSpy', ['init', 'render', 'setCanvas', 'tick']);
        worldSpy.tick.and.callFake(function(callback) {
            tickCallback = callback;
        });

        physicsSpy = jasmine.createSpyObj('physicsSpy', ['apply', 'applyForce']);

        gameObjectASpy = jasmine.createSpyObj('gameObjectASpy', ['live']);
        gameObjectBSpy = jasmine.createSpyObj('gameObjectBSpy', ['live']);
        var gameObjects = [gameObjectASpy, gameObjectBSpy];

        serverSpy = jasmine.createSpyObj('serverSpy', ['message']);
        serverSpy.message.and.callFake(function(callback) {
            serverMessageCallback = callback;
        });

        game = new Game(shipFactorySpy, worldSpy, physicsSpy, gameObjects, serverSpy);
    });

    describe('when init is called', function() {
        beforeEach(function() {
            game.init();
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

            it('should create two ships', function() {
                expect(shipFactorySpy.create.calls.count()).toEqual(2);
            });

            it('game should have two ships from shipFactory', function() {
                expect(game.ships).toEqual([ship1Spy, ship2Spy]);
            });

            describe('when tickCallback is called', function() {
                beforeEach(function() {
                    tickCallback();
                });

                it('should not burn', function() {
                    expect(ship1Spy.burn).not.toHaveBeenCalled();
                });

                it('should apply physics', function() {
                    expect(physicsSpy.apply).toHaveBeenCalled();
                });

                it('should call live on all gameObjects', function() {
                    expect(gameObjectASpy.live).toHaveBeenCalled();
                    expect(gameObjectBSpy.live).toHaveBeenCalled();
                });
            });

            it('should move ship2 when told so by server', function() {
                serverMessageCallback({ data: '{"type":"boost","shipId":123}' });

                expect(ship2Spy.startBoost).toHaveBeenCalled();
            });

            it('should shoot ship1 when told so by server', function() {
                serverMessageCallback({ data: '{"type":"shoot","shipId":123}' });
                expect(ship1Spy.shoot).toHaveBeenCalled();
            });
        });
    });
});