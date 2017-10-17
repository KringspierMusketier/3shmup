eBullMesh = [];
eBullBeh = [];
eBullList = [];

eBullMesh[0] = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 10), new THREE.MeshBasicMaterial({ color: 0x44DD22, wireframe: true }));
eBullMesh[1] = new THREE.Mesh(new THREE.TetrahedronGeometry(), new THREE.MeshBasicMaterial({ color: 0xDDEE00, wireframe: true }));
eBullMesh[2] = new THREE.Mesh(new THREE.OctahedronGeometry(), new THREE.MeshBasicMaterial({ color: 0x7799BB, wireframe: true }));
eBullMesh[3] = new THREE.Mesh(new THREE.DodecahedronGeometry(), new THREE.MeshBasicMaterial({ color: 0x22DD99, wireframe: true }));
eBullMesh[4] = new THREE.Mesh(new THREE.IcosahedronGeometry(), new THREE.MeshBasicMaterial({ color: 0x999999, wireframe: true }));


boundRight = 30;
boundLeft = -30;
boundTop = -40;
boundBot = 40;

//player bullet shape




class EnemyBullet {

    constructor(xPos, zPos, bulletType, bulletBehavior, initialSpeed, initialDirection, acceleration) {
        this.direction = new THREE.Vector3();
        if (bulletBehavior == 2) {
            var tanx = zPos - player.position.z / xPos - player.position.x;
            initialDirection += Math.tan(tanx);
        }
        if (bulletBehavior > 1) {
            bulletBehavior--;
        }
        this.direction.set(Math.sin(initialDirection), 0, Math.cos(initialDirection));
        this.speed = initialSpeed;
        this.acc = acceleration;
        this.s3 = new THREE.Vector3();
        this.behavior = bulletBehavior;
        this.bMesh = eBullMesh[bulletType];
        this.bMesh.position.set(xPos, 0, zPos);
        this.bMesh.rotation.y = initialDirection;
        scene.add(this.bMesh);
        eBullList.push(this);
    }
    outOfBound() {
        if (this.position.x < boundLeft || this.position.x > boundRight || this.position.z < boundTop || this.position.z > boundBot) {
            //bulletcontroller.destroy(this);
            this = null;
            delete this;
        }
    }

    behavior_one() //straight bullet / targetted bullet
    {
        outOfBound()
        this.bMesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed))
        this.speed += this.acc;
    }

    behavior_two() //homing bullet /// needs to increase in brightness
    {
        outOfBound()

    }

    behavior_three() // boomerang bullet
    {
        outOfBound()
        this.bMesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed))
        this.speed += this.acc;
        this.acc -= 0.03;
    }

    behavior_four() // re-targetting bullet ///needs flashing
    {
        outOfBound()
        this.bMesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed))
        this.speed += this.acc;
        if (this.position.z > -15 && this.position.z < -20) {
            var tanx = Math.tan(zPos - player.position.z / xPos - player.position.x);
            var tanz = Math.tan(xPos - player.position.x / zPos - player.position.z);
            this.direction.set(tanx, 0, tanz);
        }
    }

    eBullBeh = [ behavior_one(), behavior_two(), behavior_three(), behavior_four() ];

    eBullMove()
    {
        eBullBeh[this.behavior];
    }



}


