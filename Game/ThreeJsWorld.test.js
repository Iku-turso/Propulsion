/// <reference path="ThreeJsWorld.js" />
/// <reference path="../Scripts/three.js" />
describe('ThreeJsWorld', function() {
    var sceneFactorySpy;
    var sceneSpy;
    var rendererFactorySpy;
    var rendererSpy;
    var cameraFactorySpy;
    var cameraSpy;
    var world;
    

    beforeEach(function() {
        sceneSpy = jasmine.createSpyObj('sceneSpy', ['add']);

        sceneFactorySpy = jasmine.createSpyObj('sceneFactorySpy', ['create']);
        sceneFactorySpy.create.and.returnValue(sceneSpy);

        rendererSpy = jasmine.createSpyObj('rendererSpy', ['render', 'setSize']);
        rendererSpy.domElement = {};
        rendererFactorySpy = jasmine.createSpyObj('rendererFactorySpy', ['create']);
        rendererFactorySpy.create.and.returnValue(rendererSpy);

        cameraSpy = jasmine.createSpyObj('cameraSpy', ['updateProjectionMatrix']);
        cameraFactorySpy = jasmine.createSpyObj('cameraFactorySpy', ['create']);
        cameraFactorySpy.create.and.returnValue(cameraSpy);

        world = new ThreeJsWorld(sceneFactorySpy, rendererFactorySpy, cameraFactorySpy);
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

        it('should create a scene', function() {
            expect(sceneFactorySpy.create).toHaveBeenCalled();
        });

        it('should create a renderer', function() {
            expect(rendererFactorySpy.create).toHaveBeenCalled();
        });

        it('should create a camera with aspect-ratio 1', function() {
            expect(cameraFactorySpy.create).toHaveBeenCalled();
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

describe('ThreeJsSceneFactory', function() {
    it('should exist', function() {
        expect(ThreeJsSceneFactory).toBeDefined();
    });

    it('should create threeJs scene', function() {
        var factory = new ThreeJsSceneFactory();
        var scene = factory.create();

        expect(scene).toEqual(jasmine.any(THREE.Scene));
    });
});

describe('ThreeJsRendererFactory', function() {
    it('should exist', function() {
        expect(ThreeJsRendererFactory).toBeDefined();
    });

    // Todo: Supposedly PhantomJs has problems with this?
    xit('should create a threeJs renderer', function() {
        var factory = new ThreeJsRendererFactory();
        var renderer = factory.create();

        expect(renderer).toEqual(jasmine.any(THREE.WebGLRenderer));
    });
});

describe('ThreeJsCameraFactory', function() {
    it('should exist', function() {
        expect(ThreeJsCameraFactory).toBeDefined();
    });

    describe('when create is called with aspectRatio 2', function() {
        var camera;

        beforeEach(function() {
            var factory = new ThreeJsCameraFactory();
            camera = factory.create();
        });

        describe('the created camera', function() {
            it('should be a threeJs perspectiveCamera', function() {
                expect(camera).toEqual(jasmine.any(THREE.PerspectiveCamera));
            });

            it('should be in coordinate x = 0', function() {
                expect(camera.position.x).toBe(0);
            });

            it('should be in coordinate y = 0', function() {
                expect(camera.position.y).toBe(0);
            });

            it('should be lifted 10 units over ground-level', function() {
                expect(camera.position.z).toBe(10);
            });

            it('should have FOV of 45 degrees', function() {
                expect(camera.fov).toBe(45);
            });

            it('should have far-drawing distance of 10000 units', function() {
                expect(camera.far).toBe(10000);
            });

            it('should have near-drawing distance of 0.1 units', function() {
                expect(camera.near).toBe(0.1);
            });

            it('should have aspect-ratio of 1', function() {
                expect(camera.aspect).toBe(1);
            });
        });
    });
});