eBullMesh = [];
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

    constructor(enemy, bulletType, bulletBehavior, initialSpeed, initialDirection, acceleration) {
        var inX = enemy.mesh.position.x; //initial x
        var inZ = enemy.mesh.position.z; //initial z

        //aim at player

        this.direction = new THREE.Vector3();
        this.direction.set(-Math.sin(initialDirection), 0, Math.cos(initialDirection));
        console.log("Vector before 1sformation");
        console.log(this.direction); 
        if (bulletBehavior == 1) {
            this.direction.set(inX - player.ship.position.x, 0, inZ - player.ship.position.z);
            this.direction.multiplyScalar(-1);
            
            this.direction.normalize();
            //console.log("Vector after 1sformation");
            //console.log(this.direction);
        }

        this.speed = initialSpeed;
        this.acc = acceleration;
        this.s3 = new THREE.Vector3();
        this.behavior = bulletBehavior;
        this.timer = 0;
        this.mesh = new THREE.Mesh(new THREE.TetrahedronGeometry(), new THREE.MeshBasicMaterial({ color: 0xCCBCFA, wireframe: true }));
        this.hitbox = new THREE.Box3();
        this.mesh.position.set(inX, 0,inZ);
        //this.mesh.rotation.y = initialDirection;
        console.log(eBullList.length);
        eBullList.push(this);
        
        scene.add(this.mesh);
        console.log("bullet is added to the scene")
        console.log(initialDirection);
    }
   
    

    movement() {
        this.hitbox.setFromObject(this.mesh);
        switch (this.behavior) {
            case 0: ///constant drop

            case 1: //constant drop, with angle.
                {
                    this.direction.normalize();
                    this.mesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed));
                    break;
                }

            case 2: //homing bullet /// needs to increase in brightness
                {
                    this.time++;
                    var tanx = Math.tan(this.mesh.position.z - player.ship.position.z / this.mesh.position.x - player.ship.position.x);
                    var tanz = Math.tan(this.mesh.position.x - player.ship.position.x / this.mesh.position.z - player.ship.position.z);
                    this.direction.add(0.05 * tanx, 0, 0.05 * tanz);
                    this.direction.normalize();
                    this.mesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed));
                    break;
                }

            case 3: // boomerang bullet
                {
                    this.direction.normalize()
                    this.mesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed));
                    this.speed += this.acc;
                    this.acc -= 0.03;
                    break;
                }

            case 4: // re-targetting bullet ///needs flashing
                {
                    this.direction.normalize();
                    this.mesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed));
                    this.speed += this.acc;
                    if (this.position.z > -15 && this.position.z < -20) {
                        var tanx = Math.tan(zPos - player.ship.position.z / xPos - player.ship.position.x);
                        var tanz = Math.tan(xPos - player.ship.position.x / zPos - player.ship.position.z);
                        this.direction.set(tanx, 0, tanz);
                    }
                    break;
                }
        }
    }


    destroy() {
        scene.remove(this.mesh);
        eBullList.splice(eBullList.indexOf(this), 1);
    }
    update() {
        this.movement();
        if (outOfBound(this.mesh)) {
            this.destroy();
        }
    }
}


