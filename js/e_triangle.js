class Triangle extends Enemy {
    constructor() {
        super();
        this.hp = 80;
        this.geometry = new THREE.CylinderGeometry( 1, 3, 3, 4 );
        this.material = new THREE.MeshBasicMaterial({color: 0xfe7722, wireframe: true});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
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

        if (this.clock.getElapsedTime() > 2.5) {
            this.mesh.position.x += (0.4 * this.side);
            this.mesh.position.z -= 0.2;
        }
    }

    onDeath() {
        particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
        super.onDeath();
        enemies.push(new Triangle());
    }

    onExit() {
        super.onDeath();
        enemies.push(new Triangle());
    }
}