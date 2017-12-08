//lijst van vijanden
enemies = [];

class Enemy {
    constructor() {
        this.timer = 0;
        this.hp = 1;
        this.hitbox = new THREE.Box3();
        this.mesh = new THREE.Object3D();
        this.mesh.renderOrder = 0.2;
        this.flash = new THREE.Clock();
        this.basecolor = new THREE.Color();
        this.orbs = 0; //hoeveel Orbs moet de vijand spawnen als het sterft?

    }

    //als vijand geraakt wordt, speel geluidje en maak de vijand tijdelijk rood om aan te geven dat het geraakt is
    onHit() {
        audio.enemyImpact();
        this.flash.start();
        this.mesh.material.color.set(0xff0000);
        this.hp -= 20;
    }

    //als vijand sterft, speel een geluidje, verwijder vijand uit de scene, en spawn wat Orbs
    onDeath() {
        audio.enemyDeath();
        scene.remove(this.mesh);
        enemies.splice(enemies.indexOf(this), 1);
        for (var i = 0; i < this.orbs; i++) {
            var newOrb = new Orb(this.mesh.position.x, this.mesh.position.z);
        }
    }

    //als vijand buiten het veld raakt
    onExit() {
        scene.remove(this.mesh);
        enemies.splice(enemies.indexOf(this), 1);
    }

    //zet de positie van het vijandmodel met de meegegeven coordinaten, als die coordinaten leeg zijn, dan wordt de vijand willekeurig op de x-as geplaatst op het helft van het scherm waar de speler niet is
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
        //als speler buiten het veld is
        if (this.mesh.position.z > 50 || this.mesh.position.x < -30 || this.mesh.position.x > 30)
            this.onExit();
        
        //zet kleur van het vijandmodel terug naar normaal
        if (this.flash.getElapsedTime() > 0.05) {
            this.mesh.material.color.set(this.basecolor);
            this.flash.stop();
        }

        if (this.hp <= 0)
            this.onDeath();

    }
}