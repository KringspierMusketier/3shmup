orbArray = [];

function orbUpdate() {
    for (var i = 0; i < orbArray.length; i++) {
        orbArray[i].update();
    }
}

class Orb {
    constructor(posX, posZ) {
        this.geometry = new THREE.SphereGeometry(0.8, 6, 6);
        this.material = new THREE.MeshBasicMaterial({color: 0x9baf18, wireframe: true});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = posX;
        this.mesh.position.z = posZ;

        this.direction = new THREE.Vector3();
        this.s3 = new THREE.Vector3();
        this.vX = getRndNext(-0.8, 0.8);
        this.vZ = getRndNext(-0.8, 0.8);
        this.hitbox = new THREE.Box3();
        this.timer = 0;
        this.speed = 1.5;

        orbArray.push(this);
        scene.add(this.mesh);
    }

    destroy() {
        scene.remove(this.mesh);
        orbArray.splice(orbArray.indexOf(this), 1);
    }

    update() {
        this.timer++;
        this.hitbox.setFromObject(this.mesh);

        if (this.timer < 30 && keyboard.pressed("z")) {
            this.mesh.position.x += this.vX;
            this.mesh.position.z += this.vZ;
        }
        else if (!keyboard.pressed("z")) {
            this.direction.set(this.mesh.position.x - player.ship.position.x, 0, this.mesh.position.z - player.ship.position.z);
            this.direction.multiplyScalar(-1);
            this.direction.normalize();
            this.mesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed));
        } else {
            this.mesh.position.z += 0.6;
        }

        if (this.mesh.position.z > 40)
            this.destroy();
    }
}