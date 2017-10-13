class Player {
    constructor(posX, posZ) {
        this.ship = models[0];
        scene.add(this.ship);
    }

    moveLeft() {
        this.ship.position.x -= 1.0;
    }

    moveRight() {
        this.ship.position.x += 1.0;
    }
    moveUp() {
        this.ship.position.z -= 1.0;
    }
    moveDown() {
        this.ship.position.z += 1.0;
    }
    shoot() {
        var bullet = new PlayerBullet(this.ship.positionx, this.ship.position.z);
    }
}

