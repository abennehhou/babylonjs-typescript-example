/// <reference path="../node_modules/babylonjs/babylon.d.ts" />

const ChildSpriteName: string = "child";

class Child {
    private _spriteManagerPlayer: BABYLON.SpriteManager;
    private _sprite: BABYLON.Sprite;
    private _isAnimated: boolean;

    constructor(scene: BABYLON.Scene, isPickable: boolean, animateAtInit: boolean) {
        var spriteManagerPlayer = new BABYLON.SpriteManager("playerManager", "src/textures/animation-child.png", 1, 170, scene);

        let childSprite = new BABYLON.Sprite(ChildSpriteName, spriteManagerPlayer);
        childSprite.isPickable = isPickable;
        spriteManagerPlayer.isPickable = isPickable;

        this._spriteManagerPlayer = spriteManagerPlayer;
        this._sprite = childSprite;
        this._isAnimated = false;
        if (animateAtInit) {
            this.InverseAnimation();
        }
    }

    public SetPosition(x?: number, y?: number, z?: number): void {
        if (x !== null && x !== undefined) {
            this._sprite.position.x = x;
        }
        if (y !== null && y !== undefined) {
            this._sprite.position.y = y;
        }
        if (z !== null && z !== undefined) {
            this._sprite.position.z = z;
        }
    }

    public InverseAnimation(): void {
        if (this._isAnimated) {
            this._sprite.stopAnimation();
        }
        else {
            this._sprite.playAnimation(0, 5, true, 100, () => { });
        }

        this._isAnimated = !this._isAnimated;
    }

    public IsAnimated(): boolean {
        return this._isAnimated;
    }

    public Move(minimumPositionX: number, maximumPositionX: number, resetPositionX: number): void {
        let alpha = Math.PI;
        alpha += 0.003;
        this._sprite.position.x += Math.cos(alpha) / 10;
        let positionX = this._sprite.position.x;

        if (positionX >= maximumPositionX || positionX <= minimumPositionX) {
            this._sprite.position.x = resetPositionX;
        }
    }

}