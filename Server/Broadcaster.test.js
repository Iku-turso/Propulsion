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

        gameObjects = {};

        var Broadcaster = require('./Broadcaster').Broadcaster;
        broadcaster = new Broadcaster(webSocketMock, gameObjects);
    });

    it('broadcast should send gameObjects to all clients that have readyState 1', function() {
        client1Spy.readyState = 1;
        client2Spy.readyState = 2;
        
        broadcaster.broadcast();

        var expectedBroadcast = '{"type":"gameObjects","gameObjects":{}}';
        expect(client1Spy.send).toHaveBeenCalledWith(expectedBroadcast);
        expect(client2Spy.send).not.toHaveBeenCalledWith(expectedBroadcast);
    });
});