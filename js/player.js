class Player {
    constructor(posX, posZ) {
        this.ship = models[0];
        scene.add(this.ship);
    }

    moveLeft() {
        this.ship.position.x -= 2.0;
    }

    moveRight() {
        this.ship.position.x += 2.0;
    }
    moveUp() {
        this.ship.position.z -= 2.0;
    }
    moveDown() {
        this.ship.position.z += 2.0;
    }
}

