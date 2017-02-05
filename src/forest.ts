/// <reference path="../node_modules/babylonjs/babylon.d.ts" />

const TreeSpriteName: string = "tree";

class Forest {
    private _spriteManagerPlayer: BABYLON.SpriteManager;
    private _sprites: BABYLON.Sprite[];

    constructor(scene: BABYLON.Scene, isPickable: boolean, numberOfTrees: number, groundSize: BABYLON.Vector3) {
        let spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "src/textures/tree-icon.png", numberOfTrees, 800, scene);
        let sprites: BABYLON.Sprite[] = [];

        for (var i = 0; i < numberOfTrees; i++) {
            let tree = new BABYLON.Sprite(TreeSpriteName, spriteManagerTrees);
            tree.position.x = -groundSize.x + Math.random() * groundSize.x * 2;
            tree.position.z = -groundSize.z + Math.random() * groundSize.z * 2;
            tree.position.y = groundSize.y + 1;
            tree.isPickable = isPickable;
            sprites.push(tree);
        }

        spriteManagerTrees.isPickable = isPickable;
        this._spriteManagerPlayer = spriteManagerTrees;
        this._sprites = sprites;
    }

    public RotateTree(tree: BABYLON.Sprite): void {
        if (this._sprites.indexOf(tree) === -1) {
            throw 'Tree is not part of the forest.';
        }

        tree.angle += 0.5;
    }
}
