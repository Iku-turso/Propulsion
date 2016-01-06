exports.init = function() {
    var di = require('di4js');

    di.register('locate').instance(di.resolve);

    di.register('gameObjects').instance({});

    di.register('physics')
        // Todo: moved stuff shared between Client/Server to eg. "Shared"-folder.
        .as(new require('../Client/SimplePhysics').SimplePhysics)
        .asSingleton();

    // Todo: currently the world is stubbed on server-side.
    di.register('world').instance({ add: function() {} });

    di.register('missile')
        .as(new require('../Client/Missile').Missile)
        .withConstructor()
        .param().ref('physics');

    di.register('idFactory')
        .as(new require('../Client/IdFactory').IdFactory)
        .asSingleton();

    di.register('missileFactory')
        .as(new require('../Client/MissileFactory').MissileFactory)
        .asSingleton()
        .withConstructor()
        .param().ref('world')
        .param().ref('physics')
        .param().ref('locate')
        .param().ref('gameObjects')
        .param().ref('idFactory');

    di.register('ship')
        .as(new require('../Client/Ship').Ship)
        .withConstructor()
        .param().ref('physics')
        .param().ref('missileFactory')
        .param().ref('idFactory');

    di.register('shipFactory')
        .as(new require('../Client/ShipFactory').ShipFactory)
        .asSingleton()
        .withConstructor()
        .param().ref('world')
        .param().ref('physics')
        .param().ref('locate')
        .param().ref('gameObjects');

    di.register('tick').instance(function(callback) {
        setInterval(callback, 1000 / 60);
    });

    // Todo: this is a bit of a mess.
    di.register('express').instance(require('express'));
    di.register('expressApp').instance(di.resolve('express')());
    di.register('expressWs').instance(require('express-ws')(di.resolve('expressApp')));

    di.register('webSocket').instance(di.resolve('expressWs').getWss('/'));

    di.register('broadcaster')
        .as(new require('./Broadcaster').Broadcaster)
        .asSingleton()
        .withConstructor()
        .param().ref('webSocket')
        .param().ref('gameObjects');

    di.register('serverGame')
        .as(new require('./ServerGame').ServerGame)
        .asSingleton()
        .withConstructor()
        .param().ref('tick')
        .param().ref('physics')
        .param().ref('gameObjects')
        .param().ref('broadcaster')
        .param().ref('shipFactory');
}