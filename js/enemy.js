enemies = [];

class Enemy {
    constructor(posX, posZ) {
        this.hp;
        this.state = 'alive';

        this.geometry = new THREE.CubeGeometry(5,5,5);
        this.material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = posX;
        this.mesh.position.z = posZ;
        enemies.push(this);
        scene.add(this.mesh);
    }

    onHit() {

    }

    onDeath() {

    }

    update() {
        this.mesh.position.z += 1;

        //destroy enemy when out of bounds
        if (this.mesh.position.z > 50) {
            scene.remove(this.mesh);
            enemies[this] = null;
        }

    }
}