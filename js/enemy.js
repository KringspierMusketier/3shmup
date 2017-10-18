enemies = [];

class Enemy {
    constructor() {
        this.hp = 1;
        this.hitbox = new THREE.Box3();
        this.mesh = new THREE.Object3D();
    }

    onHit() {
        console.log("shot hit");
        this.mesh.material.color.set(0xff0000);
        this.hp -= 20;
    }

    onDeath() {
        scene.remove(this.mesh);
        enemies.splice(enemies.indexOf(this), 1);
    }

    onExit() {
        scene.remove(this.mesh);
        enemies.splice(enemies.indexOf(this), 1);
    }

    update() {
        this.hitbox.setFromObject(this.mesh);

        //destroy enemy when out of bounds
        if (this.mesh.position.z > 50 || this.mesh.position.x < -30 || this.mesh.position.x > 30)
            this.onExit();

        if (this.hp <= 0)
            this.onDeath();

    }
}