/// <reference path="Game.js" />

describe('Game', function() {
    var shipFactorySpy;
    var shipSpy;
    var worldSpy;
    var physicsSpy;
    var game;
    var tickCallback;
    var gameObjects;
    var serverMessageCallback;
    var serverSpy;
    var onConnectionCallback;
    var idFactorySpy;
    var missileMock;
    var missileFactorySpy;

    beforeEach(function() {
        gameObjects = {};
        shipSpy = jasmine.createSpyObj('shipSpy', ['shoot', 'startBoost', 'stopBoost', 'steerLeft', 'steerRight', 'stopSteer']);
        shipFactorySpy = jasmine.createSpyObj('shipFactorySpy', ['create']);
        shipFactorySpy.create.and.callFake(function(id) {
            // Todo: this is mock of what the real shipFactory does. Could we use the real shipFactory here?
            shipSpy.id = id;
            gameObjects[id] = shipSpy;
            return shipSpy;
        });

        missileMock = {};
        missileFactorySpy = jasmine.createSpyObj('missileFactorySpy', ['create']);
        missileFactorySpy.create.and.callFake(function(id) {
            // Todo: this is mock of what the real missileFactory does. Could we use the real missilefactory here?
            missileMock.id = id;
            gameObjects[id] = missileMock;
            return missileMock;
        });

        worldSpy = jasmine.createSpyObj('worldSpy', ['init', 'render', 'setCanvas', 'tick']);
        worldSpy.tick.and.callFake(function(callback) {
            tickCallback = callback;
        });

        physicsSpy = jasmine.createSpyObj('physicsSpy', ['apply', 'applyForce']);

        serverSpy = jasmine.createSpyObj('serverSpy', ['message', 'createShip', 'shoot', 'startBoost', 'stopBoost', 'steerLeft', 'steerRight', 'stopSteer']);
        serverSpy.message.and.callFake(function(callback) {
            serverMessageCallback = callback;
        });

        serverSpy.onConnect = function(callback) {
            onConnectionCallback = callback;
        };

        idFactorySpy = jasmine.createSpyObj('idFactorySpy', ['create']);
        idFactorySpy.create.and.returnValue(111);

        game = new Game(shipFactorySpy, worldSpy, physicsSpy, gameObjects, serverSpy, idFactorySpy, missileFactorySpy);
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

            describe('given there are gameObjects when tickCallback is called', function() {
                var gameObjectASpy;
                var gameObjectBSpy;
                beforeEach(function() {
                    gameObjectASpy = jasmine.createSpyObj('gameObjectASpy', ['live']);
                    gameObjectBSpy = jasmine.createSpyObj('gameObjectBSpy', ['live']);
                    gameObjects[1] = gameObjectASpy;
                    gameObjects[2] = gameObjectBSpy;

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

            describe('when connection to server is established', function() {
                beforeEach(function() {
                    onConnectionCallback();
                });

                it('should tell server to create a ship with id unique to player 111', function() {
                    expect(serverSpy.createShip).toHaveBeenCalledWith(111);
                });

                describe('when server messages to update gameObjects containing ship with the same id 111', function() {
                    beforeEach(function() {
                        serverMessageCallback({ data: '{"type":"gameObjects","gameObjects":{"111":{"type":"ship","id":111,"x":111,"y":222,"direction":333}}}' });
                    });

                    it('should create the player\'s ship with id 111', function() {
                        expect(shipFactorySpy.create).toHaveBeenCalledWith(111);
                    });

                    describe('the player\'s ship', function() {
                        it('should shoot locally and remotely with a unique id for the missile', function() {
                            idFactorySpy.create.and.returnValue(222);
                            game.remoteShoot();

                            expect(shipSpy.shoot).toHaveBeenCalledWith(222);
                            expect(serverSpy.shoot).toHaveBeenCalledWith(111, 222);
                        });

                        it('should boost locally and remotely', function() {
                            game.remoteStartBoost();

                            expect(shipSpy.startBoost).toHaveBeenCalled();
                            expect(serverSpy.startBoost).toHaveBeenCalledWith(111);
                        });

                        it('should stop boost locally and remotely ', function() {
                            game.remoteStopBoost();

                            expect(shipSpy.stopBoost).toHaveBeenCalled();
                            expect(serverSpy.stopBoost).toHaveBeenCalledWith(111);
                        });
                        
                        it('should steer left locally and remotely ', function() {
                            game.remoteSteerLeft();

                            expect(shipSpy.steerLeft).toHaveBeenCalled();
                            expect(serverSpy.steerLeft).toHaveBeenCalledWith(111);
                        });

                        it('should steer right locally and remotely ', function() {
                            game.remoteSteerRight();

                            expect(shipSpy.steerRight).toHaveBeenCalled();
                            expect(serverSpy.steerRight).toHaveBeenCalledWith(111);
                        });

                        it('should stop steering locally and remotely ', function() {
                            game.remoteStopSteer();

                            expect(shipSpy.stopSteer).toHaveBeenCalled();
                            expect(serverSpy.stopSteer).toHaveBeenCalledWith(111);
                        });
                    });
                });
            });

            // Todo: do we need all these features below, or are they covered by updating gameObjects?
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

            describe('when server messages to update gameObjects with unknown ship and its data', function() {
                beforeEach(function() {
                    // Todo: the id is duplicate.
                    serverMessageCallback({ data: '{"type":"gameObjects","gameObjects":{"123":{"type":"ship","id":123,"x":111,"y":222,"direction":333}}}' });
                });

                it('should call shipFactory with the unknown id', function() {
                    expect(shipFactorySpy.create).toHaveBeenCalledWith(123);
                });

                it('should set the created ship\'s x to value from server', function() {
                    expect(shipSpy.x).toBe(111);
                });

                it('should set the created ship\'s y to value from server', function() {
                    expect(shipSpy.y).toBe(222);
                });

                it('should set the created ship\'s direction to value from server', function() {
                    expect(shipSpy.direction).toBe(333);
                });

                describe('when server again messages to update gameObjects with previously created ship and its changed data', function() {
                    beforeEach(function() {
                        shipFactorySpy.create.calls.reset();
                        serverMessageCallback({ data: '{"type":"gameObjects","gameObjects":{"123":{"type":"ship","id":123,"x":1,"y":2,"direction":3}}}' });
                    });

                    it('should not call shipFactory', function() {
                        expect(shipFactorySpy.create).not.toHaveBeenCalled();
                    });

                    it('should set the old ship\'s x to value from server', function() {
                        expect(shipSpy.x).toBe(1);
                    });

                    it('should set the old ship\'s y to value from server', function() {
                        expect(shipSpy.y).toBe(2);
                    });

                    it('should set the old ship\'s direction to value from server', function() {
                        expect(shipSpy.direction).toBe(3);
                    });
                });
            });

            describe('when server messages to update gameObjects with unknown missile and its data', function() {
                beforeEach(function() {
                    // Todo: the id is duplicate.
                    serverMessageCallback({ data: '{"type":"gameObjects","gameObjects":{"123":{"type":"missile","id":123,"x":111,"y":222,"direction":333}}}' });
                });

                it('should call missileFactory with the unknown id', function() {
                    // Todo: gameObjectFactory?
                    expect(missileFactorySpy.create).toHaveBeenCalledWith(123);
                });

                it('should set the created missile\'s x to value from server', function() {
                    expect(missileMock.x).toBe(111);
                });

                it('should set the created missile\'s y to value from server', function() {
                    expect(missileMock.y).toBe(222);
                });

                it('should set the created missile\'s direction to value from server', function() {
                    expect(missileMock.direction).toBe(333);
                });

                describe('when server again messages to update gameObjects with previously created missile and its changed data', function() {
                    beforeEach(function() {
                        missileFactorySpy.create.calls.reset();
                        serverMessageCallback({ data: '{"type":"gameObjects","gameObjects":{"123":{"type":"missile","id":123,"x":1,"y":2,"direction":3}}}' });
                    });

                    it('should not call missileFactory', function() {
                        expect(missileFactorySpy.create).not.toHaveBeenCalled();
                    });

                    it('should set the old missile\'s x to value from server', function() {
                        expect(missileMock.x).toBe(1);
                    });

                    it('should set the old missile\'s y to value from server', function() {
                        expect(missileMock.y).toBe(2);
                    });

                    it('should set the old missile\'s direction to value from server', function() {
                        expect(missileMock.direction).toBe(3);
                    });
                });
            });

        });
    });
});