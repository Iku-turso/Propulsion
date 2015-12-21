di.register('container')
    .instance(document.body);

di.register('window')
    .instance(window);

di.register('threeJsCamera')
    .as(THREE.PerspectiveCamera)
    .asSingleton()
    .setFactory(function() {
        var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
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
    .as(ThreeJsWorld)
    .asSingleton()
    .withConstructor()
    .param().ref('threeJsScene')
    .param().ref('threeJsRenderer')
    .param().ref('threeJsCamera')
    .param().ref('container')
    .param().ref('window');

di.register('shipFactory')
    .as(ShipFactory)
    .asSingleton()
    .withConstructor();

di.register('game')
    .as(Game)
    .asSingleton()
    .withConstructor()
    .param().ref('shipFactory')
    .param().ref('world');

