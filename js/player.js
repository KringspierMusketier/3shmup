class Player {
    constructor(posX, posZ) {
        this.ship = new THREE.Object3D();
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

