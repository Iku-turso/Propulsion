/// <reference path="ThreeJsWorld.js" />
/// <reference path="../Scripts/three.js" />
describe('ThreeJsWorld', function() {
    var sceneSpy;
    var rendererSpy;
    var cameraSpy;
    var world;
    
    beforeEach(function() {
        sceneSpy = jasmine.createSpyObj('sceneSpy', ['add']);

        rendererSpy = jasmine.createSpyObj('rendererSpy', ['render', 'setSize']);
        rendererSpy.domElement = {};

        cameraSpy = jasmine.createSpyObj('cameraSpy', ['updateProjectionMatrix']);

        world = new ThreeJsWorld(sceneSpy, rendererSpy, cameraSpy);
    });

    it('should exist', function() {
        expect(ThreeJsWorld).toBeDefined();
    });

    describe('when init is called with a container', function() {
        var container;
        beforeEach(function() {
            container = jasmine.createSpyObj('containerSpy', ['appendChild']);
            var window = { innerWidth: 6, innerHeight: 2 };
            world.init(container, window);
        });

        it('should add the camera to the scene', function() {
            expect(sceneSpy.add).toHaveBeenCalledWith(cameraSpy);
        });

        it('should append the DOM-element from renderer to container', function() {
            expect(container.appendChild).toHaveBeenCalledWith(rendererSpy.domElement);
        });

        describe('when setCanvas is called with width 2 and height 4', function() {
            beforeEach(function() {
                world.setCanvas(4, 2);
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

        describe('when add is called with a ship', function() {
            var mesh;
            beforeEach(function() {
                sceneSpy.add.and.callFake(function(m) {
                    mesh = m;
                });
                
                var ship = {};
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

                it('should be white', function() {
                    expect(mesh.material.color).toEqual(jasmine.objectContaining({ r: 1, g: 1, b: 1 }));
                });
            });

            describe('when render is called', function() {
                beforeEach(function() {
                    world.render();
                });

                it('should call renderer with scene and camera', function() {
                    expect(rendererSpy.render).toHaveBeenCalledWith(sceneSpy, cameraSpy);
                });
            });
        });
    });
});