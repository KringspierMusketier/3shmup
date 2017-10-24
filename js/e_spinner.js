class Spinner extends Enemy {
    constructor() {
        super();
        this.hp = 800;

        this.mesh = enemyModels[0].clone();
        this.basecolor = new THREE.Color(0xfe7722);
        this.mesh.position.z = -45;
        this.speed = 0.4;
        this.clock = new THREE.Clock();

        if (Math.round(Math.random()) == 0) {
            this.side = -1;
            this.mesh.position.x = getRndNext(-28, 0);
        }
        else {
            this.side = 1;
            this.mesh.position.x = getRndNext(0, 28);
        }
        scene.add(this.mesh);
        this.clock.start();
    }

    update() {
        super.update();
        this.mesh.position.z += this.speed;
        if (this.clock.getElapsedTime() > 1.5)
            if (this.speed > 0)
                this.speed -= 0.02;

        if (this.clock.getElapsedTime() > 2) {
            this.mesh.rotation.y += 0.02;
        }

        if (this.clock.getElapsedTime() > 10) {
            this.mesh.position.z -= 0.2;
            this.mesh.rotation.y -= 0.03;
        }
    }

    onDeath() {
        score += 100;
        particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
        super.onDeath();
    }

    onExit() {
        super.onDeath();
    }
}