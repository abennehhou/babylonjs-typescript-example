/// <reference path="../node_modules/babylonjs/babylon.d.ts" />

class HappyParticles {

    constructor(scene: BABYLON.Scene, emitter: any) {
        let particleSystem = new BABYLON.ParticleSystem("particles", 200, scene);
        particleSystem.particleTexture = new BABYLON.Texture("src/textures/happy-face.png", scene);
        particleSystem.emitter = emitter;
        particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0);
        particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0);
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
        particleSystem.minSize = 0.05;
        particleSystem.maxSize = 0.3;
        particleSystem.minLifeTime = 0.3;
        particleSystem.maxLifeTime = 1.5;
        particleSystem.emitRate = 150;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
        particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
        particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;
        particleSystem.minEmitPower = 0.5;
        particleSystem.maxEmitPower = 1;
        particleSystem.updateSpeed = 0.005;

        particleSystem.start();
    }
}