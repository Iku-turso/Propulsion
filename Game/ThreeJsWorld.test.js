/// <reference path="ThreeJsWorld.js" />
/// <reference path="../Scripts/three.js" />
describe('ThreeJsWorld', function() {
    var sceneSpy;
    var rendererSpy;
    var cameraSpy;
    var world;
    var container;
    var window;
    var waitSpy;

    beforeEach(function() {
        sceneSpy = jasmine.createSpyObj('sceneSpy', ['add', 'addedMissile']);

        rendererSpy = jasmine.createSpyObj('rendererSpy', ['render', 'setSize']);
        rendererSpy.domElement = {};

        cameraSpy = jasmine.createSpyObj('cameraSpy', ['updateProjectionMatrix']);

        container = jasmine.createSpyObj('containerSpy', ['appendChild']);

        window = {};

        waitSpy = jasmine.createSpy('waitSpy');
        world = new ThreeJsWorld(sceneSpy, rendererSpy, cameraSpy, container, window, waitSpy);
    });

    it('should exist', function() {
        expect(ThreeJsWorld).toBeDefined();
    });

    describe('when init is called', function() {

        beforeEach(function() {
            world.init();
        });

        it('should add the camera to the scene', function() {
            expect(sceneSpy.add).toHaveBeenCalledWith(cameraSpy);
        });

        it('should append the DOM-element from renderer to container', function() {
            expect(container.appendChild).toHaveBeenCalledWith(rendererSpy.domElement);
        });

        describe('when window dimensions are 4 and 2 and when setCanvas is called', function() {
            beforeEach(function() {
                window.innerWidth = 4;
                window.innerHeight = 2;
                world.setCanvas();
            });

            it('should set size of renderer to 4 and 2', function() {
                expect(rendererSpy.setSize).toHaveBeenCalledWith(4, 2);
            });

            it('should change the camera\'s aspect ratio to 4 / 2 = 2', function() {
                expect(cameraSpy.aspect).toBe(2);
            });

            it('should update camera\'s projection matrix', function() {
                expect(cameraSpy.updateProjectionMatrix).toHaveBeenCalled();
            });
        });

        describe('when addMissile is called with a missile', function() {
            var missile;
            var addedMesh;
            beforeEach(function() {
                sceneSpy.add.and.callFake(function(m) {
                    addedMesh = m;
                });
                missile = { x: 1, y: 2, direction: 3 };
                world.addMissile(missile);
            });

            it('should add a mesh with missile\'s coordinates', function() {
                expect(addedMesh.position).toEqual(jasmine.objectContaining({ x: 1, y: 2 }));
            });

            it('should add a mesh with missile\'s direction', function() {
                expect(addedMesh.rotation.z).toBe(3);
            });
        });

        describe('when add is called with a ship', function() {
            var mesh;
            var ship;
            beforeEach(function() {
                sceneSpy.add.and.callFake(function(m) {
                    mesh = m;
                });

                ship = {};
                world.add(ship);
            });

            it('should add a threeJs mesh to threeJs scene', function() {
                expect(sceneSpy.add).toHaveBeenCalledWith(jasmine.any(THREE.Mesh));
            });

            describe('the added mesh', function() {
                it('should be a box', function() {
                    expect(mesh.geometry).toEqual(jasmine.any(THREE.BoxGeometry));
                });

                it('should be in origo', function() {
                    expect(mesh.position).toEqual(jasmine.objectContaining({ x: 0, y: 0, z: 0 }));
                });

                it('should be made of basic material', function() {
                    expect(mesh.material).toEqual(jasmine.any(THREE.MeshBasicMaterial));
                });
            });

            describe('when tick is called with a callback', function() {
                var callback;
                beforeEach(function() {
                    ship.y = 123;
                    ship.x = 222;
                    ship.direction = 333;
                    rendererSpy.render.calls.reset();
                    callback = jasmine.createSpy('tickCallback');
                    world.tick(callback);
                });

                it('should wait', function() {
                    expect(waitSpy).toHaveBeenCalled();
                });

                it('should call the callback', function() {
                    expect(callback).toHaveBeenCalled();
                });

                it('should call renderer with scene and camera', function() {
                    expect(rendererSpy.render).toHaveBeenCalledWith(sceneSpy, cameraSpy);
                });

                it('should update ship\'s mesh\'s coordinates to ship\'s coordinates', function() {
                    expect(mesh.position).toEqual(jasmine.objectContaining({ x: 222, y: 123 }));
                });

                it('should update ship\'s mesh\'s direction to ship\'s direction', function() {
                    expect(mesh.rotation.z).toEqual(333);
                });
            });
        });
    });
});