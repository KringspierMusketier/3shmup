class Player {
    constructor(posX, posZ) {
        this.ship = models[0];
        this.ship.add(models[1]);
        this.ship.scale.set(0.1,0.1,0.1);
        this.speed = 0.6;
        scene.add(this.ship);
    }

    moveLeft() {
        this.ship.position.x -= this.speed;
        if (this.ship.rotation.z < 0.5)
            this.ship.rotation.z += 0.08;
    }

    moveRight() {
        this.ship.position.x += this.speed;
        if (this.ship.rotation.z > -0.5)
            this.ship.rotation.z -= 0.08;
    }
    moveUp() {
        this.ship.position.z -= this.speed;
    }
    moveDown() {
        this.ship.position.z += this.speed;
    }
    shoot() {
        var bullet = new PlayerBullet(this.ship.position.x, this.ship.position.z);
    }
    update() {
        if (this.ship.rotation.z > 0)
            this.ship.rotation.z -= 0.04;
        if (this.ship.rotation.z < 0)
            this.ship.rotation.z += 0.04;
    }
}

