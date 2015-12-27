ThreeJsWorld = function(scene, renderer, camera, container, window, wait) {
    var self = this;
    var ship;

    self.init = function() {
        scene.add(camera);
        container.appendChild(renderer.domElement);
    };

    var meshesAndObjects = [];
    self.add = function(obj) {
        if (obj instanceof Ship) {
            ship = obj;
            var geometry = new THREE.BoxGeometry(1, 1, 1);
            for (var i = 0; i < geometry.faces.length; i += 2) {
                var hex = Math.random() * 0xffffff;
                geometry.faces[i].color.setHex(hex);
                geometry.faces[i + 1].color.setHex(hex);
            }
            var shipMaterial = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });

            var shipMesh = new THREE.Mesh(geometry, shipMaterial);
            scene.add(shipMesh);
            meshesAndObjects.push({ mesh: shipMesh, object: ship });
        }

        if (obj instanceof Missile) {
            // Todo: These coordinates seem wrong. The missile flies sideways?
            var missileGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.1);
            var missileMaterial = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
            var missileMesh = new THREE.Mesh(missileGeometry, missileMaterial);
            missileMesh.position.x = obj.x;
            missileMesh.position.y = obj.y;
            missileMesh.rotation.z = obj.direction;

            scene.add(missileMesh);
            meshesAndObjects.push({ mesh: missileMesh, object: obj });
        }
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