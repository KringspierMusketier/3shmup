class Triangle extends Enemy {
    constructor(posX, posZ) {
        super();
        this.hp = 80;
        this.geometry = new THREE.CylinderGeometry( 1, 3, 3, 4 );
        this.material = new THREE.MeshBasicMaterial({color: 0xfe7722, wireframe: true});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.basecolor = new THREE.Color(0xfe7722);
        this.speed = 0.4;
        this.clock = new THREE.Clock();
        
        this.reload = 0;
        this.max = 0;

        super.setPos(posX, posZ, this.mesh);

        if (this.mesh.position.x < 0) {
            this.side = -1;
        }
        else {
            this.side = 1;
        }
        scene.add(this.mesh);
        this.clock.start();
    }

    onFire() {
        this.reload++;
        if (this.reload > 60) {
            var lBullet = new EnemyBullet(this, 3, 1, 0.5, 0, 0);
            var mBullet = new EnemyBullet(this, 3, 1, 0.5, 0, 0);
            var rBullet = new EnemyBullet(this, 3, 1, 0.5, 0, 0);
            lBullet.inX += 1;
            rBullet.inX -= 1;
            this.reload = 0;
        }
    }

    update() {
        super.update();
        this.onFire();
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
        score += 100;
        particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
        super.onDeath();
    }

    onExit() {
        super.onDeath();
    }
}