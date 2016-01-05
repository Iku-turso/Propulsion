describe('ServerGame', function() {
    var tickMock;
    var tickCallback;
    var physicsSpy;
    var gameObjectASpy;
    var gameObjectBSpy;
    var gameObjects;
    var clientSpy;
    var serverGame;
    beforeEach(function() {
        physicsSpy = jasmine.createSpyObj('physicsSpy', ['apply']);

        tickMock = function(callback) {
            tickCallback = callback;
        };

        gameObjectASpy = jasmine.createSpyObj('gameObjectASpy', ['live']);
        gameObjectBSpy = jasmine.createSpyObj('gameObjectBSpy', ['live']);
        gameObjects = [gameObjectASpy, gameObjectBSpy];
        
        clientSpy = jasmine.createSpyObj('clientssSpy', ['broadcast']);
        var ServerGame = require('./ServerGame').ServerGame;
        serverGame = new ServerGame(tickMock, physicsSpy, gameObjects, clientSpy);
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
            expect(clientSpy.broadcast).toHaveBeenCalled();
        });
    });

    describe('when ship is added with id 123', function() {
        beforeEach(function() {
            serverGame.createShip(123);
        });

        it('should ', function() {
            
        });
    });
});