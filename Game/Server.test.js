/// <reference path="Server.js" />

describe('Server', function() {
    var server;
    var socketSpy;
    beforeEach(function() {
        socketSpy = jasmine.createSpyObj('socketSpy', ['send']);
        server = new Server(socketSpy);
    });

    it('should exist', function() {
        expect(Server).toBeDefined();
    });

    it('should call message callback with message when socket gets a message', function() {
        var messageCallbackSpy = jasmine.createSpy('messageCallbackSpy');
        server.message(messageCallbackSpy);
        var message = {};
        
        socketSpy.onmessage(message);
        
        expect(messageCallbackSpy).toHaveBeenCalledWith(message);
    });

    it('boost should send a message for ship through socket', function() {
        var ship = { id: 123 };
        server.boost(ship);

        expect(socketSpy.send).toHaveBeenCalledWith({ boost: 123 });
    });
});