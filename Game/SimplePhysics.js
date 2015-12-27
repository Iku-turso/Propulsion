SimplePhysics = function() {
    var self = this;

    self.applyForce = function(object, vector) {
        object.xVelocity += vector.x / object.mass;
        object.yVelocity += vector.y / object.mass;
    };

    self.applyAngularForce = function(object, force) {
        object.angularVelocity += force / object.mass;
    };

    self.applyForwardForce = function(object, force) {
        var vector = {
            x: Math.cos(object.direction) * force,
            y: Math.sin(object.direction) * force
        };
        
        self.applyForce(object, vector);
    };

    var physicalObjects = [];
    self.add = function(object) {
        physicalObjects.push(object);
    };

    self.apply = function() {
        physicalObjects.forEach(function(object) {
            object.x += object.xVelocity;
            object.y += object.yVelocity;
            object.direction += object.angularVelocity;
        });
    };
}