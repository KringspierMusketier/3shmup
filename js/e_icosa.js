class Icosa extends Enemy {
    constructor(posX, posZ) {
        super();
        this.hp = 400;
        this.geometry = new THREE.IcosahedronGeometry(4);
        this.material = new THREE.MeshBasicMaterial({color: 0x08aa03, wireframe: true});
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.basecolor = new THREE.Color(0x08aa03);
        this.speed = 0.4;
        this.orbs = 10;

        this.reload = 0;
        this.timer = 0;
        this.active = false;

        var lineGeom = new THREE.Geometry();
        lineGeom.vertices.push(this.mesh.position);
        lineGeom.vertices.push(player.ship.position);
        var lineMat = new THREE.LineBasicMaterial({color: "yellow"});
        this.line = new THREE.Line(lineGeom, lineMat);

        super.setPos(posX, posZ, this.mesh);
        if (this.mesh.position.x < 0) {
            this.side = -1;
        }
        else {
            this.side = 1;
        }

        scene.add(this.mesh);
    }

    onFire() {

    }

    update() {
        this.onFire();
        super.update();
        this.mesh.position.z += this.speed;
        if(this.active) {
            this.line.geometry.verticesNeedUpdate = true;
        }

        if (this.timer >= 40 && this.timer < 60)
            if (this.speed > 0)
                this.speed -= 0.02;
        else if (this.timer >= 60 && this.timer < 120) {
            if (!this.active) {
                scene.add(this.line);
                this.active = true;
            }
        }
        else if (this.timer >= 120 && this.timer < 130)
            this.line.material.color.set("white");
        else if (this.timer >= 130 && this.timer < 140)
            this.line.material.color.set("red");
        else if (this.timer >= 140 && this.timer < 150)
            this.line.material.color.set("white");
        else if (this.timer >= 150 && this.timer < 160)
            this.line.material.color.set("red");
            

        else if (this.timer > 640) {
            this.mesh.position.x += (0.4 * this.side);
            this.mesh.position.z -= 0.2;
        }
    }
    
    onDeath() {
        score += 500;
        particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
        super.onDeath();
    }

    onExit() {
        super.onExit();
    }
}