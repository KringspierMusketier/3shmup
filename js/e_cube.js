class Cube extends Enemy {
    constructor(posX, posZ) {
        super();
        this.hp = 100;
        this.reload = 0;
        this.max = 0;
        this.geometry = new THREE.CubeGeometry(5,5,5);
        this.material = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true});
        this.basecolor = new THREE.Color(0x00ffff);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.speed = 0.15;

        super.setPos(posX, posZ, this.mesh);

        scene.add(this.mesh);
    }

    onFire() {
        this.reload++;
        if (this.reload > 90) {
            if (this.max < 3) {
                var lBullet = new EnemyBullet(this, 2, 0, 0, 0, 0);
                this.reload = 0;
                this.max++;
            }
        }
        else if (this.reload > 120) {
            this.max = 0;
            this.reload = 0;
        }
    }

    update() {
        this.onFire()
        super.update();
        this.mesh.position.z += this.speed;
    }

    onDeath() {
        particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
        score += 100;
        super.onDeath();
    }

    onExit() {
        super.onExit();
    }

}