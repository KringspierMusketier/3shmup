class Cube extends Enemy {
    constructor(posX, posZ) {
        super();
        this.hp = 100;
        this.geometry = new THREE.CubeGeometry(5,5,5);
        this.material = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true});
        this.basecolor = new THREE.Color(0x00ffff);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = posX;
        this.mesh.position.z = posZ;
        scene.add(this.mesh);
    }

    update() {
        super.update();
        this.mesh.position.z += 0.2;
    }

    onDeath() {
        super.onDeath();
        enemies.push(new Cube(getRndNext(-28, 29), -45));
    }

    onExit() {
        super.onExit();
        enemies.push(new Cube(getRndNext(-28, 29), -45));
    }
}