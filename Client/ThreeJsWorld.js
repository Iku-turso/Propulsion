ThreeJsWorld = function(scene, renderer, camera, container, window, wait) {
    var self = this;
    var ship;

    self.init = function() {
        scene.add(camera);

        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        scene.add(directionalLight);

        var ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);

        container.appendChild(renderer.domElement);
    };

    var meshesAndObjects = [];
    self.add = function(obj) {
        if (obj instanceof Ship) {
            ship = obj;
            var geometry = new THREE.CylinderGeometry(0, .5, 1);
            var shipMaterial = new THREE.MeshLambertMaterial();
            var shipMesh = new THREE.Mesh(geometry, shipMaterial);
            shipMesh.position.x = obj.x;
            shipMesh.position.y = obj.y;
            // Todo: why the offset?
            shipMesh.rotation.z = obj.direction - Math.PI / 2;

            scene.add(shipMesh);
            meshesAndObjects.push({ mesh: shipMesh, object: ship });
        }

        if (obj instanceof Missile) {
            var missileGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
            var missileMaterial = new THREE.MeshLambertMaterial();
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
            // Todo: Find out why we need this offset. Why doesn't mesh.rotation.z = 0 mean east, but instead means north?
            meshAndObject.mesh.rotation.z = meshAndObject.object.direction - Math.PI / 2;
        });
        wait(animate);
        renderer.render(scene, camera);
    };

    self.tick = function(callback) {
        tickCallback = callback;
        animate();
    };
}