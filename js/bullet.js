class Bullet {
    constructor(posX, posY, posZ, sprite) {
        this.spriteMap = new THREE.TextureLoader().load("res/sprites/" + sprite);
        this.spriteMaterial = new THREE.SpriteMaterial({map: spriteMap, color: oxffffff});
        this.sprite = new THREE.Sprite(spriteMaterial);
        this.sprite.position.x = posX;
        this.sprite.position.y = posY;
        this.sprite.position.z = posZ;
        scene.add(sprite);

        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }
}