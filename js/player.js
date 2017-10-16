class Player {
    constructor(posX, posZ) {
        this.ship = models[0];
        this.ship.add(models[1]);
        this.ship.scale.set(0.1,0.1,0.1);
        this.speed = 1.0;
        scene.add(this.ship);
    }

    moveLeft() {
        if(this.ship.position.x>-28)
        this.ship.position.x -= this.speed;
    }

    moveRight() {
        if(this.ship.position.x<28)
        this.ship.position.x += this.speed;
    }
    moveUp() {
        if(this.ship.position.z>-35)
        this.ship.position.z -= this.speed;
    }
    moveDown() {
        if(this.ship.position.z<37)
        this.ship.position.z += this.speed;
    }
    shoot() {
        var bullet = new PlayerBullet(this.ship.position.x, this.ship.position.z);
    }
}

