particles = [];

//deze klasse creert een explosie van particles wanneer iets wordt vernietigd
class Explosion {
    constructor(posX, posZ, optArg) {
        this.particleCount = 10; //hoeveel particles moeten er worden gespawnd?
        this.decay = 1.5; //voor hoe lang moeten de particles op het scherm zijn?
        this.particles = new THREE.Geometry();
        this.pMaterial = new THREE.PointsMaterial({
            color: 0xbfbfbf,
            size: 0.6
        });

        //als de speler explodeert
        if(optArg == 1) {
            this.particleCount = 50;
            this.pMaterial = new THREE.PointsMaterial({
                color: 0xff0000,
                size: 1.2
            });
            this.decay = 3;
        }

        //als de boss explodeert
        if(optArg == 2) {
            this.particleCount = 500;
            this.pMaterial = new THREE.PointsMaterial({
                color: 0x00ff00,
                size: 1.5
            });
            this.decay = 10;
        }

        //elke particle krijgt een willekeurige snelheid in de x- en z-axis
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

    //elke particle gaat vervolgens per frame in de gegeven richting, anders wordt de particle despawnt
    update() {
        var verts = this.particleSystem.geometry.vertices;
        for (var i = 0; i < verts.length; i++) {
            var vert = verts[i];

            vert.x += vert.vX;
            vert.z += vert.vZ;
        }

        if (this.clock.getElapsedTime() > this.decay) {
            scene.remove(this.particleSystem);
            particles.splice(particles.indexOf(this), 1);
        }

        this.particleSystem.geometry.verticesNeedUpdate = true;

    }
}