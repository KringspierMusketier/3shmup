class Player {
    constructor(posX, posZ) {
        this.ship = models[0];
        this.ship.add(models[1]);
        this.ship.scale.set(0.1,0.1,0.1);
        this.speed = 1.0;
        scene.add(this.ship);
    }

    moveLeft() {
        this.ship.position.x -= this.speed;
    }

    moveRight() {
        this.ship.position.x += this.speed;
    }
    moveUp() {
        this.ship.position.z -= this.speed;
    }
    moveDown() {
        this.ship.position.z += this.speed;
    }
    shoot() {
        var bullet = new PlayerBullet(this.ship.positionx, this.ship.position.z);
    }
}

