describe('ServerGame', function() {
    var tickMock;
    var tickCallback;
    var physicsSpy;
    var gameObjectASpy;
    var gameObjectBSpy;
    var gameObjects;
    var broadcasterSpy;
    var serverGame;
    var shipSpy;
    var shipFactorySpy;
    beforeEach(function() {
        physicsSpy = jasmine.createSpyObj('physicsSpy', ['apply']);

        tickMock = function(callback) {
            tickCallback = callback;
        };

        gameObjectASpy = jasmine.createSpyObj('gameObjectASpy', ['live']);
        gameObjectBSpy = jasmine.createSpyObj('gameObjectBSpy', ['live']);
        gameObjects = { 1: gameObjectASpy, 2: gameObjectBSpy };

        broadcasterSpy = jasmine.createSpyObj('broadcasterSpy', ['broadcast']);

        shipSpy = jasmine.createSpyObj('shipSpy', ['shoot', 'startBoost', 'stopBoost', 'steerLeft', 'steerRight', 'stopSteer']);
        shipFactorySpy = jasmine.createSpyObj('shipFactorySpy', ['create']);
        shipFactorySpy.create.and.callFake(function(id) {
            // Todo: this is mock of what the real shipFactory does. Could we use the real shipfactory here?
            gameObjects[id] = shipSpy;
            return shipSpy;
        });

        var ServerGame = require('./ServerGame').ServerGame;
        serverGame = new ServerGame(tickMock, physicsSpy, gameObjects, broadcasterSpy, shipFactorySpy);
    });

    describe('when tick', function() {
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

        it('should broadcast game state to clients', function() {
            expect(broadcasterSpy.broadcast).toHaveBeenCalled();
        });
    });

    it('should prune gameObjects that are too far from origo', function() {
        gameObjects[1] = { x: 1000 };
        gameObjects[2] = { y: 1000 };
        gameObjects[3] = { x: -1000 };
        gameObjects[4] = { y: -1000 };
        tickCallback();

        expect(gameObjects[1]).not.toBeDefined();
        expect(gameObjects[2]).not.toBeDefined();
        expect(gameObjects[3]).not.toBeDefined();
        expect(gameObjects[4]).not.toBeDefined();
    });

    describe('when ship is created with id 123', function() {
        beforeEach(function() {
            serverGame.createShip(123);
        });

        it('should create ship using shipFactory', function() {
            expect(shipFactorySpy.create).toHaveBeenCalledWith(123);
        });

        describe('the created ship when ordered so for shipId 123, and missileId 111', function() {
            it('should shoot', function() {
                serverGame.shoot(123, 111);

                expect(shipSpy.shoot).toHaveBeenCalledWith(111);
            });

            it('should turn left', function() {
                serverGame.steerLeft(123);

                expect(shipSpy.steerLeft).toHaveBeenCalled();
            });

            it('should turn right', function() {
                serverGame.steerRight(123);

                expect(shipSpy.steerRight).toHaveBeenCalled();
            });

            it('should stop steering', function() {
                serverGame.stopSteer(123);

                expect(shipSpy.stopSteer).toHaveBeenCalled();
            });

            it('should boost', function() {
                serverGame.startBoost(123);

                expect(shipSpy.startBoost).toHaveBeenCalled();
            });

            it('should stop boosting', function() {
                serverGame.stopBoost(123);

                expect(shipSpy.stopBoost).toHaveBeenCalled();
            });
        });
    });
});