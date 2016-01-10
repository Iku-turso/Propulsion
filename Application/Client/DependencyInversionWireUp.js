exports.init = function() {
    var di = require('di4js');

    di.register('locate').instance(di.resolve);

    di.register('container').instance(document.body);

    di.register('window').instance(window);

    di.register('wait').instance(requestAnimationFrame);

    di.register('gameObjects').instance({});

    di.register('physics')
        .as(require('./SimplePhysics').SimplePhysics)
        .asSingleton();

    var THREE = require('three');
    di.register('threeJsCamera')
        .as(THREE.PerspectiveCamera)
        .asSingleton()
        .setFactory(function() {
            var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
            // This logic should be in game, and tested.
            camera.position.z = 10;
            return camera;
        });

    di.register('threeJsRenderer')
        .as(THREE.WebGLRenderer)
        .asSingleton()
        .withConstructor();

    di.register('threeJsScene')
        .as(THREE.Scene)
        .asSingleton()
        .withConstructor();

    di.register('world')
        .as(require('./ThreeJsWorld').ThreeJsWorld)
        .asSingleton()
        .withConstructor()
        .param().ref('threeJsScene')
        .param().ref('threeJsRenderer')
        .param().ref('threeJsCamera')
        .param().ref('container')
        .param().ref('window')
        .param().ref('wait');

    di.register('missile')
        .as(require('./Missile').Missile)
        .withConstructor()
        .param().ref('physics');

    di.register('idFactory')
        .as(require('./IdFactory').IdFactory)
        .asSingleton();

    di.register('missileFactory')
        .as(require('./MissileFactory').MissileFactory)
        .asSingleton()
        .withConstructor()
        .param().ref('world')
        .param().ref('physics')
        .param().ref('locate')
        .param().ref('gameObjects')
        .param().ref('idFactory');

    di.register('socket').instance(new WebSocket(location.origin.replace(/^http/, 'ws')));

    di.register('server')
        .as(require('./Server').Server)
        .asSingleton()
        .withConstructor()
        .param().ref('socket');

    di.register('ship')
        .as(require('./Ship').Ship)
        .withConstructor()
        .param().ref('physics')
        .param().ref('missileFactory');

    di.register('shipFactory')
        .as(require('./ShipFactory').ShipFactory)
        .asSingleton()
        .withConstructor()
        .param().ref('world')
        .param().ref('physics')
        .param().ref('locate')
        .param().ref('gameObjects');

    di.register('game')
        .as(require('./Game').Game)
        .asSingleton()
        .withConstructor()
        .param().ref('shipFactory')
        .param().ref('world')
        .param().ref('physics')
        .param().ref('gameObjects')
        .param().ref('server')
        .param().ref('idFactory')
        .param().ref('missileFactory');

    return di;
}