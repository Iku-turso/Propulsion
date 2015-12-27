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

        game = new Game(shipFactorySpy, worldSpy, physicsSpy, gameObjects);
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

            it('should not burn when upStart is called', function() {
                game.upStart();

                expect(ship1Spy.burn).not.toHaveBeenCalled();
            });

            it('should burn when upStart is called and tickCallback is called', function() {
                game.upStart();
                tickCallback();

                expect(ship1Spy.burn).toHaveBeenCalled();
            });

            it('should start to boost ship 2 when startShip2Boost is called', function() {
                game.startShip2Boost();

                expect(ship2Spy.startBoost).toHaveBeenCalled();
            });

            it('should stop to boost ship 2 when stopShip2Boost is called', function() {
                game.stopShip2Boost();

                expect(ship2Spy.stopBoost).toHaveBeenCalled();
            });

            it('should start to steer left ship 2 when startShip2SteerLeft is called', function() {
                game.startShip2SteerLeft();

                expect(ship2Spy.startSteerLeft).toHaveBeenCalled();
            });

            it('should stop to steer left ship 2 when stopShip2SteerLeft is called', function() {
                game.stopShip2SteerLeft();

                expect(ship2Spy.stopSteerLeft).toHaveBeenCalled();
            });

            it('should start to steer right ship 2 when startShip2SteerRight is called', function() {
                game.startShip2SteerRight();

                expect(ship2Spy.startSteerRight).toHaveBeenCalled();
            });

            it('should stop to steer right ship 2 when stopShip2SteerRight is called', function() {
                game.stopShip2SteerRight();

                expect(ship2Spy.stopSteerRight).toHaveBeenCalled();
            });

            it('should shoot ship 2 when ship2Shoot is called', function() {
                game.ship2Shoot();

                expect(ship2Spy.shoot).toHaveBeenCalled();
            });

            it('should not burn when up is called and upEnd is called and tickCallback is called', function() {
                game.upStart();
                game.upEnd();
                tickCallback();

                expect(ship1Spy.burn).not.toHaveBeenCalled();
            });

            it('should not steer left when leftStart is called', function() {
                game.leftStart();

                expect(ship1Spy.steerLeft).not.toHaveBeenCalled();
            });

            it('should steer left when leftStart is called and tickCallback is called', function() {
                game.leftStart();
                tickCallback();

                expect(ship1Spy.steerLeft).toHaveBeenCalled();
            });

            it('should not steer left when left is called and leftEnd is called and tickCallback is called', function() {
                game.leftStart();
                game.leftEnd();
                tickCallback();

                expect(ship1Spy.steerLeft).not.toHaveBeenCalled();
            });

            it('should not steer right when rightStart is called', function() {
                game.rightStart();

                expect(ship1Spy.steerRight).not.toHaveBeenCalled();
            });

            it('should steer right when rightStart is called and tickCallback is called', function() {
                game.rightStart();
                tickCallback();

                expect(ship1Spy.steerRight).toHaveBeenCalled();
            });

            it('should not steer right when right is called and rightEnd is called and tickCallback is called', function() {
                game.rightStart();
                game.rightEnd();
                tickCallback();

                expect(ship1Spy.steerRight).not.toHaveBeenCalled();
            });

            it('ship should shoot when game shoots', function() {
                game.shoot();

                expect(ship1Spy.shoot).toHaveBeenCalled();
            });

            describe('when tickCallback is called', function() {
                beforeEach(function() {
                    tickCallback();
                });

                it('should apply gravity to ship', function() {
                    expect(physicsSpy.applyForce).toHaveBeenCalledWith(ship1Spy, jasmine.objectContaining({ x: 0, y: -0.1 }));
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
        });
    });
});