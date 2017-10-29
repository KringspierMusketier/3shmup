class Spinner extends Enemy {
    constructor(posX, posZ) {
        super();
        this.hp = 800;

        this.mesh = enemyModels[0].clone();
        this.basecolor = new THREE.Color(0x2661b5);
        this.speed = 0.1;
        this.timer = 0;
        this.orbs = 20;

        this.pivot1 = new THREE.Object3D();
        this.pivot2 = new THREE.Object3D();
        this.pivot3 = new THREE.Object3D();
        this.pivot1.rotation.z = 0;
        this.pivot2.rotation.z = 2 * Math.PI/3;
        this.pivot3.rotation.z = 4 * Math.PI/3;
        this.mesh.add(this.pivot1);
        this.mesh.add(this.pivot2);
        this.mesh.add(this.pivot3);

        this.mesh1 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
        this.mesh2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
        this.mesh3 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));
        this.mesh1.position.z = 5;
        this.mesh2.position.z = 5;
        this.mesh3.position.z = 5;
        this.pivot1.add(this.mesh1);
        this.pivot2.add(this.mesh2);
        this.pivot3.add(this.mesh3);

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
    }

    update() {
        super.update();
        this.onFire();
        this.mesh.position.z += this.speed;
        this.mesh.rotation.z += 0.1;
    }
    
    onFire() {
        this.reload++;
        if (this.reload > 60) {
            var lBullet = new EnemyBullet(this, 1, new THREE.Vector3(this.mesh.position.x - this.mesh.children[0].position.x, 0, this.mesh.position.z - this.mesh.children[0].position.z), 0, 0, 3);
            var mBullet = new EnemyBullet(this, 1, new THREE.Vector3(this.mesh.position.x - this.mesh.children[1].position.x, 0, this.mesh.position.z - this.mesh.children[1].position.z), 0, 0, 3);
            var rBullet = new EnemyBullet(this, 1, new THREE.Vector3(this.mesh.position.x - this.mesh.children[2].position.x, 0, this.mesh.position.z - this.mesh.children[2].position.z), 0, 0, 3);
            this.reload = 0;
        }
    }

    onDeath() {
        score += 1000;
        particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
        super.onDeath();
    }

    onExit() {
        super.onExit();
    }
}