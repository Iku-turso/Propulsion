ThreeJsWorld = function(scene, renderer, camera) {
    var self = this;

    self.init = function(container) {
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