superSpeed = 5;
boundRight;
boundLeft;
boundTop;
boundBot;

bulletScale = 0.1;
bGeoTetra = new THREE.TetrahedronGeometry(bulletScale);
bGeoCube = new THREE.CubeGeometry(bulletScale,bulletScale,bulletScale);
bGeoOcta = new THREE.OctahedronGeometry(bulletScale);
bGeoDod = new THREE.DodecahedronGeometry(bulletScale);
bGeoIcos = new THREE.IcosahedronGeometry(bulletScale);

//player bullet shape




class Bullet {

    constructor()
    outOfBound() {
        if (this.position.x < boundLeft || this.position.x > boundRight || this.position.z < boundTop || this.position.z > boundBot) {
            //bulletcontroller.destroy(this);
            this = null;
            delete this;
        }
    }

    
}


