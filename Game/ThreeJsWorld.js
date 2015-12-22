ThreeJsWorld = function(scene, renderer, camera, container, window, wait) {
    var self = this;
    var ship;

    self.init = function() {
        scene.add(camera);
        container.appendChild(renderer.domElement);
    };

    var meshesAndObjects = [];
    self.add = function(_ship_) {
        ship = _ship_;
        var geometry = new THREE.BoxGeometry(1, 1, 1);
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[i].color.setHex(hex);
            geometry.faces[i + 1].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });

        var shipMesh = new THREE.Mesh(geometry, material);
        scene.add(shipMesh);
        meshesAndObjects.push({ mesh: shipMesh, object: ship });
    };

    // Todo: adding should be the same with all objects.
    self.addMissile = function(missile) {
        var geometry = new THREE.BoxGeometry(0.3, 0.1, 0.1);
        var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });

        // Todo: use a buffer;
        var missileMesh = new THREE.Mesh(geometry, material);
        missileMesh.position.x = missile.x;
        missileMesh.position.y = missile.y;
        missileMesh.rotation.z = missile.direction;
        scene.add(missileMesh);
        meshesAndObjects.push({ mesh: missileMesh, object: missile });
    }

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
        meshesAndObjects.forEach(function(meshAndObject) {
            meshAndObject.mesh.position.x = meshAndObject.object.x;
            meshAndObject.mesh.position.y = meshAndObject.object.y;
            meshAndObject.mesh.rotation.z = meshAndObject.object.direction;
        });
        wait(animate);
        renderer.render(scene, camera);
    };

    self.tick = function(callback) {
        tickCallback = callback;
        animate();
    };
}