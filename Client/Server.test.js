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

    it('should run callback when connection is established', function() {
        var callbackSpy = jasmine.createSpy('callbackSpy');

        server.onConnect(callbackSpy);
        socketSpy.onopen();

        expect(callbackSpy).toHaveBeenCalled();
    });

    it('createShip should send a message for ship through socket', function() {
        server.createShip(123);

        expect(socketSpy.send).toHaveBeenCalledWith(JSON.stringify({ type: 'createShip', shipId: 123 }));
    });

    it('shoot should send a message for ship through socket', function() {
        server.shoot(123, 111);

        expect(socketSpy.send).toHaveBeenCalledWith(JSON.stringify({ type: 'shoot', shipId: 123, missileId: 111 }));
    });

    it('startBoost should send a message for ship through socket', function() {
        server.startBoost(123);

        expect(socketSpy.send).toHaveBeenCalledWith(JSON.stringify({ type: 'startBoost', shipId: 123 }));
    });

    it('stopBoost should send a message for ship through socket', function() {
        server.stopBoost(123);

        expect(socketSpy.send).toHaveBeenCalledWith(JSON.stringify({ type: 'stopBoost', shipId: 123 }));
    });

    it('steerLeft should send a message for ship through socket', function() {
        server.steerLeft(123);

        expect(socketSpy.send).toHaveBeenCalledWith(JSON.stringify({ type: 'steerLeft', shipId: 123 }));
    });

    it('steerRight should send a message for ship through socket', function() {
        server.steerRight(123);

        expect(socketSpy.send).toHaveBeenCalledWith(JSON.stringify({ type: 'steerRight', shipId: 123 }));
    });

    it('stopSteer should send a message for ship through socket', function() {
        server.stopSteer(123);

        expect(socketSpy.send).toHaveBeenCalledWith(JSON.stringify({ type: 'stopSteer', shipId: 123 }));
    });
});