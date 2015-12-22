ThreeJsWorld = function(scene, renderer, camera, container, window, wait) {
    var self = this;
    var ship;
    var shipMesh;

    self.init = function() {
        scene.add(camera);
        container.appendChild(renderer.domElement);
    };

    self.add = function(_ship_) {
        ship = _ship_;
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[i].color.setHex(hex);
            geometry.faces[i + 1].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });

        shipMesh = new THREE.Mesh(geometry, material);
        scene.add(shipMesh);
    };

    self.setCanvas = function() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };

    var tickCallback;
    var animate = function() {
        // Todo: find out the correct order of this stuff.
        tickCallback();
        shipMesh.position.y = ship.y;
        wait(animate);
        renderer.render(scene, camera);
    };

    self.tick = function(callback) {
        tickCallback = callback;
        animate();
    };
}