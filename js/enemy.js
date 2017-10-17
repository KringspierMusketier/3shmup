enemies = [];

class Enemy {
    constructor(posX, posZ) {
        this.hp = 100;
        this.state = 'alive';

        this.geometry = new THREE.CubeGeometry(5,5,5);
        this.material = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true});
        this.basecolor = new THREE.Color(0x00ffff);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.x = posX;
        this.mesh.position.z = posZ;
        enemies.push(this);
        scene.add(this.mesh);

        this.hitbox = new THREE.Box3();
    }

    onHit() {
        console.log("shot hit");
        this.mesh.material.color.set(0xff0000);
        this.hp -= 20;
    }

    onDeath() {
        scene.remove(this.mesh);
        enemies[this] = null;
        enemy = new Enemy(getRndNext(-28, 29), -45);
    }

    onExit() {
        scene.remove(this.mesh);
        enemies[this] = null;
        enemy = new Enemy(getRndNext(-28, 29), -45);
    }

    update() {
        this.mesh.position.z += 0.2;
        this.hitbox.setFromObject(this.mesh);

        //destroy enemy when out of bounds
        if (this.mesh.position.z > 50)
            this.onExit();
        
        for (var i = 0; i < playerBulletList.length; i++) {
            if (this.hitbox.intersectsBox(playerBulletList[i].hitbox)) {
                playerBulletList[i].destroy();
                this.onHit();
            }
        }

        if (this.hp <= 0)
            this.onDeath();

    }
}