class Cube extends Enemy {
    constructor() {
        super();
        this.hp = 100;
        this.geometry = new THREE.CubeGeometry(5,5,5);
        this.material = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true});
        this.basecolor = new THREE.Color(0x00ffff);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = getRndNext(-28, 29);
        this.mesh.position.z = -45;
        scene.add(this.mesh);
    }

    update() {
        super.update();
        this.mesh.position.z += 0.2;
    }

    onDeath() {
        particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
        super.onDeath();
        enemies.push(new Cube());
    }

    onExit() {
        super.onExit();
        enemies.push(new Cube());
    }
}