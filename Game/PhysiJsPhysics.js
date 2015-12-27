PhysiJsPhysics = function(meshById) {
    var self = this;

    self.applyForce = function(object, vector) {
        var mesh = meshById[object.id];
        var vector3 = new THREE.Vector3(vector.x, vector.y, 0);
        mesh.applyCentralImpulse(vector3);
    };

    self.applyAngularForce = function(object, force) {
        var mesh = meshById[object.id];
        var vector3 = new THREE.Vector3(0, 0, force);
        mesh.applyTorque(vector3);
    };

    self.applyForwardForce = function(object, force) {
        var mesh = meshById[object.id];
        var vector = {
            // Todo: why the offset?
            x: Math.cos(mesh.rotation.z + Math.PI / 2) * force,
            y: Math.sin(mesh.rotation.z + Math.PI / 2) * force
        };
        
        self.applyForce(object, vector);
    };

    self.add = function(object) {
    };

    self.apply = function() {
    };
}