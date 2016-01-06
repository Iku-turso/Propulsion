describe('ServerGame', function() {
    var tickMock;
    var tickCallback;
    var physicsSpy;
    var gameObjectASpy;
    var gameObjectBSpy;
    var gameObjects;
    var broadcasterSpy;
    var serverGame;
    // var shipSpy;
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

        // shipSpy = jasmine.createSpyObj('shipSpy', ['shoot', 'startBoost', 'stopBoost', 'steerLeft', 'steerRight', 'stopSteer']);
        shipFactorySpy = jasmine.createSpyObj('shipFactorySpy', ['create']);
        // shipFactorySpy.create.and.returnValue(shipSpy);

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

    describe('when ship is added with id 123', function() {
        beforeEach(function() {
            serverGame.createShip(123);
        });

        it('should create ship using shipFactory', function() {
            expect(shipFactorySpy.create).toHaveBeenCalledWith(123);
        });
    });
});