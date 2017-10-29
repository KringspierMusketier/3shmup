class Icosa extends Enemy {
    constructor(posX, posZ) {
        super();
        this.hp = 300;
        this.geometry = new THREE.IcosahedronGeometry(2);
        this.material = new THREE.MeshBasicMaterial({color: 0x2661b5, wireframe: true});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.basecolor = new THREE.Color(0x2661b5);
        this.speed = 0.2;
        this.orbs = 10;

        this.reload = 0;
        this.timer = 0;

        super.setPos(posX, posZ, this.mesh);
        if (this.mesh.position.x < 0) {
            this.side = -1;
        }
        else {
            this.side = 1;
        }

        scene.add(this.mesh);
    }

    onFire() {
        if (this.max < 2 && this.timer >= 90) {
            var laser = new EnemyBullet(this, 3, 0, 0, 0, 0);
            this.max++;
        }
    }

    update() {
        this.onFire();
        super.update();
        this.mesh.position.z += this.speed;
        if (this.timer > 90)
            if (this.speed > 0)
                this.speed -= 0.02;
            

        else if (this.timer > 640) {
            this.mesh.position.x += (0.4 * this.side);
            this.mesh.position.z -= 0.2;
        }
    }
    
    onDeath() {
        score += 500;
        particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
        super.onDeath();
    }

    onExit() {
        super.onExit();
    }
}