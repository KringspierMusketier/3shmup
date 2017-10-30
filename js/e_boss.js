class Boss extends Enemy {
    constructor(posX, posZ) {
        super();
        this.hp = 10000;

        this.mesh = enemyModels[0].clone();
        this.basecolor = new THREE.Color(0x2661b5);
        this.speed = 0;
        this.timer = 0;
        this.orbs = 100;

        this.reload = 0;
        this.max = 0;
        super.setPos(posX, posZ, this.mesh);
        scene.add(this.mesh);
    }

    update() {
        super.update();
        this.timer++;
        this.mesh.rotation.y += 0.1;
        if (this.timer < 120) {
            this.mesh.position.z += this.speed;
        }
    }

    onFire() {

    }

    onDeath() {
        score += 100000;
        particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
        super.onDeath();
    }

    onExit() {
        super.onExit();
    }
}