particles = [];

class Explosion {
    constructor(posX, posZ, optArg) {
        this.particleCount = 10;
        this.particles = new THREE.Geometry();
        this.pMaterial = new THREE.PointsMaterial({
            color: 0xbfbfbf,
            size: 0.6
        });

        if(optArg == 1) {
            this.particleCount = 50;
            this.pMaterial = new THREE.PointsMaterial({
                color: 0xff0000,
                size: 1.2
            });
        }

        if(optArg == 2) {
            
        }

        for (var i = 0; i < this.particleCount; i++) {
            var pX = posX;
            var pY = -2;
            var pZ = posZ;
            var particle = new THREE.Vector3(pX, pY, pZ);
            particle.vX = getRndNext(-1, 1);
            particle.vZ = getRndNext(-1, 1);
            this.particles.vertices.push(particle);
        }

        this.particleSystem = new THREE.Points(this.particles, this.pMaterial);
        scene.add(this.particleSystem);
        this.clock = new THREE.Clock();
        this.clock.start();
        
    }

    update() {
        var verts = this.particleSystem.geometry.vertices;
        for (var i = 0; i < verts.length; i++) {
            var vert = verts[i];

            vert.x += vert.vX;
            vert.z += vert.vZ;
        }

        if (this.clock.getElapsedTime() > 1.5) {
            scene.remove(this.particleSystem);
            particles.splice(particles.indexOf(this), 1);
        }

        this.particleSystem.geometry.verticesNeedUpdate = true;

    }
}