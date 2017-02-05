/// <reference path="../node_modules/babylonjs/babylon.d.ts" />

class Accordion {
    private _box: BABYLON.Mesh;
    private _scene: BABYLON.Scene;

    constructor(scene: BABYLON.Scene) {
        let box = BABYLON.Mesh.CreateBox("box", 1, scene);
        let materialBox = new BABYLON.StandardMaterial("textureBox", scene);
        materialBox.diffuseTexture = new BABYLON.Texture("src/textures/accordion.jpg", scene);
        box.material = materialBox;
        this._scene = scene;
        this._box = box;
    }

    public SetPosition(x?: number, y?: number, z?: number): void {
        if (x !== null && x !== undefined) {
            this._box.position.x = x;
        }
        if (y !== null && y !== undefined) {
            this._box.position.y = y;
        }
        if (z !== null && z !== undefined) {
            this._box.position.z = z;
        }
    }

    public Animate(): void {
        //Create a scaling animation at 30 FPS
        let animationBox = new BABYLON.Animation("scalingAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        // Animation keys
        let keys = [
            { //At the animation key 0, the value of scaling is "1"
                frame: 0,
                value: 1
            },
            { //At the animation key 20, the value of scaling is "0.2"
                frame: 20,
                value: 0.2
            },
            { //At the animation key 100, the value of scaling is "1"
                frame: 100,
                value: 1
            }];

        animationBox.setKeys(keys);

        this._box.animations.push(animationBox);

        this._scene.beginAnimation(this._box, 0, 100, true);
    }

    public Intersects(mesh: BABYLON.Mesh): boolean {
        return this._box.intersectsMesh(mesh, false);
    }

    public SetAlpha(alpha: number): void {
        this._box.material.alpha = alpha;
    }

}