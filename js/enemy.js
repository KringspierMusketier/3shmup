enemies = [];

class Enemy {
    constructor() {
        this.timer = 0;
        this.hp = 1;
        this.hitbox = new THREE.Box3();
        this.mesh = new THREE.Object3D();
        this.flash = new THREE.Clock();
        this.basecolor = new THREE.Color();
        this.multiplier = 5.0;
        this.orbs = 0;

    }

    onHit() {
        this.flash.start();
        this.mesh.material.color.set(0xff0000);
        this.hp -= 20;
    }

    onDeath() {
        scene.remove(this.mesh);
        enemies.splice(enemies.indexOf(this), 1);
        for (var i = 0; i < this.orbs; i++) {
            var newOrb = new Orb(this.mesh.position.x, this.mesh.position.z);
        }
    }

    onExit() {
        scene.remove(this.mesh);
        enemies.splice(enemies.indexOf(this), 1);
    }

    setPos(posX, posZ, mesh) {
        if(posX == null) {
            if(player.ship.position.x > 0)
                mesh.position.x = getRndNext(-28, 0);
            else {
                mesh.position.x = getRndNext(0, 28);
            }
        } else {
            mesh.position.x = posX;
        }

        if(posZ == null) {
            mesh.position.z = -45;
        } else {
            mesh.position.z = posZ;
        }
    }

    update() {
        this.hitbox.setFromObject(this.mesh);
        this.timer++;
        //destroy enemy when out of bounds
        if (this.mesh.position.z > 50 || this.mesh.position.x < -30 || this.mesh.position.x > 30)
            this.onExit();
        
        if (this.flash.getElapsedTime() > 0.05) {
            this.mesh.material.color.set(this.basecolor);
            this.flash.stop();
        }

        if (this.hp <= 0)
            this.onDeath();

    }
}