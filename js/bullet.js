class Bullet {
    constructor(posX, posY, posZ, sprite) {
        this.spriteMap = new THREE.TextureLoader().load("res/sprites/" + sprite);
        this.spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: oxffffff});
        this.sprite = new THREE.Sprite(spriteMaterial);
        this.sprite.x = posX;
        this.sprite.y = posY;
        this.sprite.z = posZ;
        scene.add(sprite);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }


}