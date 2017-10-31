orbArray = [];

function orbUpdate() {
    for (var i = 0; i < orbArray.length; i++) {
        orbArray[i].update();
    }
}
//Dit zijn de gele orbs die je kan verzamelen als je een vijand neerschiet.
class Orb {
    constructor(posX, posZ, mega) {
        this.geometry = new THREE.SphereGeometry(0.8, 6, 6);
        this.material = new THREE.MeshBasicMaterial({color: 0xFFBF00, wireframe: true});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = posX;
        this.mesh.position.z = posZ;
        this.isHoming = false;
        this.mega = mega;

        this.direction = new THREE.Vector3();
        this.s3 = new THREE.Vector3();
        this.vX = getRndNext(-0.8, 0.8);
        this.vZ = getRndNext(-0.8, 0.8);
        if (this.mega) {
            this.vX = getRndNext(-2.0, 2.0);
            this.vZ = getRndNext(-2.0, 2.0);
        }
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
        //Eerst schieten ze weg.
        this.hitbox.setFromObject(this.mesh);

        if (this.timer < 20 && !this.mega) {
            this.mesh.position.x += this.vX;
            this.mesh.position.z += this.vZ;
        }
        else if (this.timer < 60 && this.mega) {
            this.mesh.position.x += this.vX;
            this.mesh.position.z += this.vZ;
        }
        // Dit zorgt ervoor dat je schip de punten aantrekt als je de Z (schieten) los laat. Dit is gedaan zodat mensen een rede hebben om niet de Z ingedrukt te houden tijdens het hele spel
        else if (!keyboard.pressed("z") || this.isHoming == true) {
            this.direction.set(this.mesh.position.x - player.ship.position.x, 0, this.mesh.position.z - player.ship.position.z);
            this.direction.multiplyScalar(-1);
            this.direction.normalize();
            this.mesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed));
            //Dit zorgt ervoor dat punten die al worden aangetrokken en heel dichtbij zijn, nog steeds worden aangetrokken. Het voelde slecht als ze vlak naast je stopten.
            if (this.mesh.position.distanceTo(player.ship.position) < 16) {
                this.isHoming = true;
            }
            //nu vallen ze neer.
        } else {
            this.mesh.position.z += 0.4;
        }
        //nu worden kogels heel dichtbij toch aangetrokken. Dit is gedaan zodat de punten niet als debris werden gezien door zij die de z ingedruikt houden
        if (this.mesh.position.distanceTo(player.ship.position) < 6) this.isHoming = true;
        if (this.mesh.position.z > 40)
            this.destroy();
    }
}