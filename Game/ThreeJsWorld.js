ThreeJsWorld = function(sceneFactory, rendererFactory, cameraFactory) {
    var self = this;
    var scene;
    var renderer;
    var camera;

    self.init = function(container, width, height) {
        scene = sceneFactory.create();
        renderer = rendererFactory.create(width, height);
        var aspectRatio = width / height;
        camera = cameraFactory.create(aspectRatio);

        scene.add(camera);
        container.appendChild(renderer.domElement);
    };

    self.add = function() {
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
    }

    self.render = function() {
        renderer.render(scene, camera);
    }

    self.setCanvas = function(width, heigth) {
        camera.aspect = width / heigth;
        camera.updateProjectionMatrix();
        renderer.setSize(width, heigth);
    }
}

ThreeJsSceneFactory = function() {
    var self = this;

    self.create = function() {
        return new THREE.Scene();
    }
}

ThreeJsRendererFactory = function() {
    var self = this;

    self.create = function() {
        var renderer = new THREE.WebGLRenderer();
        return renderer;
    }
}

ThreeJsCameraFactory = function() {
    var self = this;

    self.create = function() {
        var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 10000);
        camera.position.z = 10;
        return camera;
    }
}