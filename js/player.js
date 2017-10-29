class Player {
    constructor(posX, posZ) {
        this.ship = models[0].clone();
        this.ship.add(models[1].clone());
        this.basecolor = 0xDD4444;

        this.exhaustgeo = new THREE.CylinderGeometry(2,5,20,3);
        this.exhaustmat = new THREE.MeshBasicMaterial({color: 0xfe7722, wireframe: true});
        this.exhaust = new THREE.Mesh(this.exhaustgeo, this.exhaustmat);
        this.exhaust.rotation.x += 1.5;
        this.exhaust.position.y += -6;
        this.exhaust.position.z += 41;
        this.exhaust2 = this.exhaust.clone();
        this.exhaust.position.x += -10;
        this.exhaust2.position.x += 10;
        this.ship.add(this.exhaust);
        this.ship.add(this.exhaust2);

        this.gGeo = new THREE.SphereGeometry(50, 9, 6);
        this.gMat = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
        this.godSphere = new THREE.Mesh(this.gGeo, this.gMat);

        this.ship.scale.set(0.1,0.1,0.1);
        this.ship.children[0].scale.set(0.8, 0.8, 0.8);
        this.speed = 0.7;
        this.reload = 0;
        this.spin = false;
        this.god = false;
        this.hit = false;
        this.dead = false;
        this.ship.position.x = posX;
        this.ship.position.z = posZ;
        scene.add(this.ship);

        this.hitbox = new THREE.Box3();

    }

    moveLeft() {
        if (this.ship.position.x > -28) {
            this.ship.position.x -= this.speed;
            if (this.ship.rotation.z < 0.5)
                this.ship.rotation.z += 0.08;
        }
    }

    moveRight() {
        if (this.ship.position.x < 28) {
            this.ship.position.x += this.speed;
            if (this.ship.rotation.z > -0.5)
                this.ship.rotation.z -= 0.08;
        }
    }
    moveUp() {
        if (this.ship.position.z > - 35) {
            this.ship.position.z -= this.speed;
        }
    }
    moveDown() {
        if (this.ship.position.z < 37) {
            this.ship.position.z += this.speed;
        }
    }
    shoot() {
        this.reload++;
        if (this.reload > 7) {
            var lBullet = new PlayerBullet(new THREE.Vector3(this.ship.position.x - 2.5, 0, this.ship.position.z), this.ship.rotation.z);
            var mBullet = new PlayerBullet(this.ship.position, this.ship.rotation.z);
            var rBullet = new PlayerBullet(new THREE.Vector3(this.ship.position.x + 2.5, 0, this.ship.position.z), this.ship.rotation.z);
            this.reload = 0;
        }
    }
    update() {

        if(this.spin) {
            this.ship.rotation.z -= 0.32;
        } else {
            if (this.ship.rotation.z > 0)
                this.ship.rotation.z -= 0.04;
            if (this.ship.rotation.z < 0)
                this.ship.rotation.z += 0.04;
        }

        this.hitbox.setFromObject(this.ship.children[0]);

        if (this.exhaust.scale.x < 0.01) {
            this.exhaust.scale.x = 1;
            this.exhaust.scale.z = 1;
            this.exhaust.scale.y = 1;
            this.exhaust2.scale.x = 1;
            this.exhaust2.scale.z = 1;
            this.exhaust2.scale.y = 1;
        }

        this.exhaust.scale.x -= 0.05;
        this.exhaust.scale.z -= 0.05;
        this.exhaust.scale.y -= 0.025;
        this.exhaust2.scale.x -= 0.05;
        this.exhaust2.scale.z -= 0.05;
        this.exhaust2.scale.y -= 0.025;
            
    }
    onHit() {
        if (lives > -1) {
            this.god = true;
            this.hit = true;
            this.ship.add(this.godSphere);
            particles.push(new Explosion(this.ship.position.x, this.ship.position.z));
            intro.hit();
            emptyBullets();
        } else {
            this.dead = true;
            particles.push(new Explosion(this.ship.position.x, this.ship.position.z, this.dead));
            scene.remove(this.ship);
        }
    }
}

