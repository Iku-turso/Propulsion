di.register('locate').instance(di.resolve);

di.register('container').instance(document.body);

di.register('window').instance(window);

di.register('wait').instance(requestAnimationFrame);

di.register('gameObjects').instance([]);

di.register('meshById').instance({});

di.register('physics')
    .as(PhysiJsPhysics)
    .asSingleton()
    .withConstructor()
    .param().ref('meshById');

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
    .as(Physijs.Scene)
    .asSingleton()
    .withConstructor();

di.register('world')
    .as(ThreeJsWorld)
    .asSingleton()
    .withConstructor()
    .param().ref('threeJsScene')
    .param().ref('threeJsRenderer')
    .param().ref('threeJsCamera')
    .param().ref('container')
    .param().ref('window')
    .param().ref('wait')
    .param().ref('meshById');

di.register('missile')
    .as(Missile)
    .withConstructor()
    .param().ref('physics');

di.register('missileFactory')
    .as(MissileFactory)
    .asSingleton()
    .withConstructor()
    .param().ref('world')
    .param().ref('physics')
    .param().ref('locate')
    .param().ref('gameObjects');

di.register('ship')
    .as(Ship)
    .withConstructor()
    .param().ref('physics')
    .param().ref('missileFactory');

di.register('shipFactory')
    .as(ShipFactory)
    .asSingleton()
    .withConstructor()
    .param().ref('world')
    .param().ref('physics')
    .param().ref('locate')
    .param().ref('gameObjects');

di.register('game')
    .as(Game)
    .asSingleton()
    .withConstructor()
    .param().ref('shipFactory')
    .param().ref('world')
    .param().ref('physics')
    .param().ref('gameObjects');