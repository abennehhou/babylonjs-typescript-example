/// <reference path="../node_modules/babylonjs/babylon.d.ts" />

class Game {
    private _canvas: HTMLCanvasElement;
    private _engine: BABYLON.Engine;
    private _scene: BABYLON.Scene;

    constructor(canvasElement: string) {
        this._canvas = <HTMLCanvasElement>document.getElementById(canvasElement);
        this._engine = new BABYLON.Engine(this._canvas, true);
    }

    createScene(): void {
        let scene = new BABYLON.Scene(this._engine);
        this._scene = scene;
        let ground = this.CreateGround(scene);
        var groundSize = ground.getBoundingInfo().boundingBox.extendSize;
        let light = this.CreateLigtht(scene);

        let camera = this.CreateCamera(scene);
        camera.attachControl(this._canvas, true);

        let sphere = this.CreateSphere(scene);
        sphere.position.y = 1

        let accordion = new Accordion(scene);
        accordion.SetPosition(0.9, 1, 0);
        accordion.Animate();

        let torus = this.CreateTorus(scene);
        torus.position.x = -3;
        torus.position.z = 10;
        torus.rotation.x = -Math.PI / 4;

        var happyParticles = new HappyParticles(scene, torus);

        let forest = new Forest(scene, true, 200, groundSize);

        let child = new Child(scene, true, true);
        var childInitialPositionX = groundSize.x;
        child.SetPosition(childInitialPositionX, 1, -3);

        scene.onPointerDown = function (evt) {
            let pickingInfo = scene.pickSprite(this.pointerX, this.pointerY);
            if (pickingInfo.hit) {
                var pickedSprite = pickingInfo.pickedSprite;
                if (pickedSprite.name === TreeSpriteName) {
                    forest.RotateTree(pickedSprite);
                }
                else if (pickedSprite.name === ChildSpriteName) {
                    child.InverseAnimation();
                }
            }
        };

        scene.onBeforeRenderObservable.add(() => {
            if (accordion.Intersects(sphere)) {
                sphere.material.alpha = 0.5;
                accordion.SetAlpha(0.5);
            } else {
                sphere.material.alpha = 1;
                accordion.SetAlpha(1);
            }

            if (child.IsAnimated()) {
                child.Move(-groundSize.x, groundSize.x, childInitialPositionX);
            }
        });

        scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
        scene.fogDensity = 0.03;
    }

    animate(): void {
        // run the render loop
        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        // the canvas/window resize event handler
        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }

    private CreateGround(scene: BABYLON.Scene): BABYLON.Mesh {
        let ground = BABYLON.Mesh.CreateGround("ground", 100, 100, 100, scene, false);
        let groundMaterial = new BABYLON.StandardMaterial("ground", scene);
        groundMaterial.diffuseTexture = new BABYLON.Texture("src/textures/ground.jpg", scene);
        ground.material = groundMaterial;
        return ground;
    }

    private CreateLigtht(scene: BABYLON.Scene): BABYLON.Light {
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        return light;
    }

    private CreateCamera(scene: BABYLON.Scene): BABYLON.FreeCamera {
        let camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -10), scene);
        camera.attachControl(this._canvas, true);
        return camera;

    }

    private CreateSphere(scene: BABYLON.Scene): BABYLON.Mesh {
        let sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { segments: 16, diameter: 1 }, scene);
        let materialSphere = new BABYLON.StandardMaterial("textureSphere", scene);
        materialSphere.diffuseColor = new BABYLON.Color3(1, 0, 0);
        sphere.material = materialSphere;

        return sphere;
    }

    private CreateTorus(scene: BABYLON.Scene): BABYLON.Mesh {
        var torus = BABYLON.Mesh.CreateTorus("torus", 2, 0.5, 30, scene, false);
        let torusMaterial = new BABYLON.StandardMaterial("textureTorus", scene);
        torusMaterial.wireframe = true;
        torusMaterial.diffuseColor = new BABYLON.Color3(0, 0, 1);
        torus.material = torusMaterial;

        return torus;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    // Create the game using the 'renderCanvas'
    let game = new Game('renderCanvas');

    // Create the scene
    game.createScene();

    // start animation
    game.animate();
});
