describe('Broadcaster', function() {
    var broadcaster;
    var webSocketMock;
    var client1Spy;
    var client2Spy;
    var gameObjects;
    beforeEach(function() {
        client1Spy = jasmine.createSpyObj('client1Spy', ['send']);
        client2Spy = jasmine.createSpyObj('client2Spy', ['send']);
        webSocketMock = { clients: [ client1Spy, client2Spy ]};

        gameObjects = [];

        var Broadcaster = require('./Broadcaster').Broadcaster;
        broadcaster = new Broadcaster(webSocketMock, gameObjects);
    });

    it('broadcast should send gameState to all clients', function() {
        broadcaster.broadcast();

        var expectedBroadcast = '{"type":"gameObjects","gameObjects":[]}';
        expect(client1Spy.send).toHaveBeenCalledWith(expectedBroadcast);
        expect(client2Spy.send).toHaveBeenCalledWith(expectedBroadcast);
    });
});