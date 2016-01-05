/// <reference path="Game.js" />

describe('Game', function() {
    var shipFactorySpy;
    var shipSpy;
    var worldSpy;
    var physicsSpy;
    var game;
    var tickCallback;
    var gameObjectASpy;
    var gameObjectBSpy;
    var serverMessageCallback;
    var serverSpy;
    var onConnectionCallback;
    var idFactorySpy;

    beforeEach(function() {
        shipSpy = jasmine.createSpyObj('shipSpy', ['shoot', 'startBoost', 'stopBoost', 'steerLeft', 'steerRight', 'stopSteer']);
        shipFactorySpy = jasmine.createSpyObj('shipFactorySpy', ['create']);
        shipFactorySpy.create.and.returnValue(shipSpy);

        worldSpy = jasmine.createSpyObj('worldSpy', ['init', 'render', 'setCanvas', 'tick']);
        worldSpy.tick.and.callFake(function(callback) {
            tickCallback = callback;
        });

        physicsSpy = jasmine.createSpyObj('physicsSpy', ['apply', 'applyForce']);

        gameObjectASpy = jasmine.createSpyObj('gameObjectASpy', ['live']);
        gameObjectBSpy = jasmine.createSpyObj('gameObjectBSpy', ['live']);
        var gameObjects = [gameObjectASpy, gameObjectBSpy];

        serverSpy = jasmine.createSpyObj('serverSpy', ['message', 'createShip', 'shoot', 'startBoost', 'stopBoost', 'steerLeft', 'steerRight', 'stopSteer']);
        serverSpy.message.and.callFake(function(callback) {
            serverMessageCallback = callback;
        });

        serverSpy.onConnect = function(callback) {
            onConnectionCallback = callback;
        };

        idFactorySpy = jasmine.createSpyObj('idFactorySpy', ['create']);
        idFactorySpy.create.and.returnValue(111);

        game = new Game(shipFactorySpy, worldSpy, physicsSpy, gameObjects, serverSpy, idFactorySpy);
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

            describe('when tickCallback is called', function() {
                beforeEach(function() {
                    tickCallback();
                });

                it('should apply physics', function() {
                    expect(physicsSpy.apply).toHaveBeenCalled();
                });

                it('should call live on all gameObjects', function() {
                    expect(gameObjectASpy.live).toHaveBeenCalled();
                    expect(gameObjectBSpy.live).toHaveBeenCalled();
                });
            });

            it('should tell server to shoot with id unique to player when remoteShoot is called ', function() {
                game.remoteShoot();

                expect(serverSpy.shoot).toHaveBeenCalledWith(111);
            });

            it('should tell server to boost with id unique to player when remoteBoost is called ', function() {
                game.remoteStartBoost();

                expect(serverSpy.startBoost).toHaveBeenCalledWith(111);
            });

            it('should tell server to stop boost with id unique to player when remoteBoost is called ', function() {
                game.remoteStopBoost();

                expect(serverSpy.stopBoost).toHaveBeenCalledWith(111);
            });

            it('should tell server to steer left with id unique to player when remoteSteerLeft is called ', function() {
                game.remoteSteerLeft();

                expect(serverSpy.steerLeft).toHaveBeenCalledWith(111);
            });

            it('should tell server to steer right with id unique to player when remoteSteerRight is called ', function() {
                game.remoteSteerRight();

                expect(serverSpy.steerRight).toHaveBeenCalledWith(111);
            });

            it('should tell server to stop steering with id unique to player when remoteStopSteer is called ', function() {
                game.remoteStopSteer();

                expect(serverSpy.stopSteer).toHaveBeenCalledWith(111);
            });

            describe('when connection to server is established', function() {
                beforeEach(function() {
                    onConnectionCallback();
                });

                it('should tell server to create a ship with id unique to player', function() {
                    expect(serverSpy.createShip).toHaveBeenCalledWith(111);
                });
            });

            describe('when server messages to create a ship with id 123', function() {
                beforeEach(function() {
                    serverMessageCallback({ data: '{"type":"createShip","shipId":123}' });
                });

                it('should create a ship with id from server', function() {
                    expect(shipFactorySpy.create).toHaveBeenCalledWith(123);
                });

                it('should make the ship shoot when server messages', function() {
                    serverMessageCallback({ data: '{"type":"shoot","shipId":123}' });

                    expect(shipSpy.shoot).toHaveBeenCalled();
                });

                it('should make the ship boost when server messages', function() {
                    serverMessageCallback({ data: '{"type":"startBoost","shipId":123}' });

                    expect(shipSpy.startBoost).toHaveBeenCalled();
                });

                it('should make the ship stop boosting when server messages', function() {
                    serverMessageCallback({ data: '{"type":"stopBoost","shipId":123}' });

                    expect(shipSpy.stopBoost).toHaveBeenCalled();
                });

                it('should make the ship steer left when server messages', function() {
                    serverMessageCallback({ data: '{"type":"steerLeft","shipId":123}' });

                    expect(shipSpy.steerLeft).toHaveBeenCalled();
                });

                it('should make the ship steer right when server messages', function() {
                    serverMessageCallback({ data: '{"type":"steerRight","shipId":123}' });

                    expect(shipSpy.steerRight).toHaveBeenCalled();
                });

                it('should make the ship stop steering when server messages', function() {
                    serverMessageCallback({ data: '{"type":"stopSteer","shipId":123}' });

                    expect(shipSpy.stopSteer).toHaveBeenCalled();
                });
            });
        });
    });
});