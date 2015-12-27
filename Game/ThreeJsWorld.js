ThreeJsWorld = function(scene, renderer, camera, container, window, wait, meshById) {
    var self = this;

    self.init = function() {
        scene.add(camera);
        scene.setGravity(new THREE.Vector3(0, 0, 0));
        
        var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        scene.add(directionalLight);
        
        var ambientLight = new THREE.AmbientLight(0x404040);
        scene.add(ambientLight);
        
        container.appendChild(renderer.domElement);
    };

    var meshesAndObjects = [];
    self.add = function(obj) {
        if (obj instanceof Ship) {
            var geometry = new THREE.CylinderGeometry(0, .5, 1);
            var shipMaterial = new THREE.MeshLambertMaterial();
            var shipPhysicsMaterial = Physijs.createMaterial(shipMaterial, 0, 1);
            var shipMesh = new Physijs.ConeMesh(geometry, shipPhysicsMaterial, obj.mass);
            shipMesh.position.x = obj.x;
            shipMesh.position.y = obj.y;
            // Todo: why the offset?
            shipMesh.rotation.z = obj.direction - Math.PI / 2;

            scene.add(shipMesh);
            meshesAndObjects.push({ mesh: shipMesh, object: obj });
            meshById[obj.id] = shipMesh;
        }

        if (obj instanceof Missile) {
            var missileGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
            var missileMaterial = new THREE.MeshLambertMaterial();
            var missilePhysicsMaterial = Physijs.createMaterial(missileMaterial, 0, 1);
            var missileMesh = new Physijs.BoxMesh(missileGeometry, missilePhysicsMaterial, obj.mass);
            missileMesh.position.x = obj.x;
            missileMesh.position.y = obj.y;
            missileMesh.rotation.z = obj.direction;

            scene.add(missileMesh);

            var initialVelocity = new THREE.Vector3(obj.xVelocity, obj.yVelocity, 0);
            missileMesh.setLinearVelocity(initialVelocity);

            meshesAndObjects.push({ mesh: missileMesh, object: obj });
            meshById[obj.id] = missileMesh;
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
        scene.simulate();
        meshesAndObjects.forEach(function(meshAndObject) {
            var object = meshAndObject.object;
            var mesh = meshAndObject.mesh;
            object.x = mesh.position.x;
            object.y = mesh.position.y;

            var velocity = mesh.getLinearVelocity();
            object.xVelocity = velocity.x;
            object.yVelocity = velocity.y;
            object.direction = mesh.rotation.z;
        });
        wait(animate);
        renderer.render(scene, camera);
    };

    self.tick = function(callback) {
        tickCallback = callback;
        animate();
    };
}