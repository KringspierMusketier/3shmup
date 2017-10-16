class Player {
    constructor(posX, posZ) {
        this.ship = models[0];
        this.ship.add(models[1]);
        this.ship.scale.set(0.1,0.1,0.1);
        this.speed = 0.6;
        this.speed = 0.8;
        this.reload = 0;
        scene.add(this.ship);

        this.helper = new THREE.BoundingBoxHelper(this.ship, 0xff0000);
        scene.add(this.helper);

    }

    moveLeft() {
        if (this.ship.position.x > -28) {
            this.ship.position.x -= this.speed;
            if (this.ship.rotation.z < 0.5)
                this.ship.rotation.z += 0.08;
        }
    }

    moveRight() {
        if (this.ship.position.x < 28) {
            this.ship.position.x += this.speed;
            if (this.ship.rotation.z > -0.5)
                this.ship.rotation.z -= 0.08;
        }
    }
    moveUp() {
        if (this.ship.position.z > - 35) {
            this.ship.position.z -= this.speed;
        }
    }
    moveDown() {
        if (this.ship.position.z < 37) {
            this.ship.position.z += this.speed;
        }
    }
    shoot() {
        this.reload++;
        if (this.reload > 7) {
            var bullet = new PlayerBullet(this.ship.position, this.ship.rotation.z);
            this.reload = 0;
        }
    }
    update() {
        if (this.ship.rotation.z > 0)
            this.ship.rotation.z -= 0.04;
        if (this.ship.rotation.z < 0)
            this.ship.rotation.z += 0.04;
        this.helper.update();
    }
    onHit() {

    }
}

