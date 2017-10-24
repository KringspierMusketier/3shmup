pside = 0;

class Player {
    constructor(posX, posZ) {
        this.ship = models[0].clone();
        this.ship.add(models[1].clone());

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

        this.ship.scale.set(0.1,0.1,0.1);
        this.speed = 0.02;
        this.speed = 0.8;
        this.reload = 0;
        this.spin = false;
        this.ship.position.x = posX;
        this.ship.position.z = posZ;
        this.side = 0;
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

        if(this.ship.position.x > 0) {
            pside = 1;
        } else {
            pside = 0;
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

    }
}

