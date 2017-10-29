class Cone extends Enemy {
    constructor(posX, posZ) {
        super();
        this.hp = 400;
        this.geometry = new THREE.ConeGeometry(3,9,9,11);
        this.material = new THREE.MeshBasicMaterial({color: 0x93d600, wireframe: true});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x += 90*Math.PI/180;
        this.basecolor = new THREE.Color(0x93d600);
        this.speed = 0.3;
        this.orbs = 10;
        
        this.reload = 0;
        this.side = 1;
        this.max = 0;

        super.setPos(posX, posZ, this.mesh);
        scene.add(this.mesh);
    }

    onFire() {
        this.reload++;
        if (this.reload > 10) {
            if (this.side == 1){
                var lBullet = new EnemyBullet(this, 1, 0, 0, 0, 1);
                this.side = 0;
            } else {
                var lBullet = new EnemyBullet(this, 1, 0, 0, 0, 2);
                this.side = 1;
            }
            this.reload = 0;
        }
    }

    update() {
        this.onFire();
        super.update();
        this.mesh.position.z += this.speed;
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