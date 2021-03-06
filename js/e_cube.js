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
        this.speed = 0.25;
        this.orbs = 5;

        super.setPos(posX, posZ, this.mesh);

        scene.add(this.mesh);
    }

    onFire() {
        this.reload++;
        if (this.reload > 90) {
            if (this.max < 2) {
                //meerdere kogels worden in een keer gespawnt waarbij elke een beetje hoger dan de vorige wordt gespawnt, waardoor de kogels op een grotere rubberen slang lijken
                var lBullet = new EnemyBullet(this, 2, 0, 0, 0, 0);
                var mBullet = new EnemyBullet(this, 2, 0, 0, -0.6, 0);
                var nBullet = new EnemyBullet(this, 2, 0, 0, -1.2, 0);
                var rBullet = new EnemyBullet(this, 2, 0, 0, -1.8, 0);
                var oBullet = new EnemyBullet(this, 2, 0, 0, -2.4, 0);
                var pBullet = new EnemyBullet(this, 2, 0, 0, -3.0, 0);
                this.reload = 0;
                this.max++;
            }
        }
    }

    update() {
        this.onFire()
        super.update();
        this.mesh.position.z += this.speed;
    }

    onDeath() {
        particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
        score += 3000;
        super.onDeath();
    }

    onExit() {
        super.onExit();
    }

}