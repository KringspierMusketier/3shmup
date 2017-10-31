eBullMesh = [];
eBullList = [];

//maximum coordinaten van het veld waarbinnen de kogels moeten zijn
boundRight = 30;
boundLeft = -30;
boundTop = -40;
boundBot = 40;

class EnemyBullet {

    constructor(enemy, bulletType, initialDirection, x_offset, z_offset, optArg) {
        var inX = enemy.mesh.position.x; //speler x-positie
        var inZ = enemy.mesh.position.z; //speler z-positie
        this.x_offset = x_offset;
        this.z_offset = z_offset;
        this.arg = optArg;

        this.direction = new THREE.Vector3();
        this.direction.set(-Math.sin(initialDirection), 0, Math.cos(initialDirection));

        this.speed = 0;
        this.acc = 0;
        this.s3 = new THREE.Vector3();
        this.behavior = 0;
        this.timer = 0;
        this.cTimer = 0;
        this.locked = false;
        this.mesh = new THREE.Object3D();
        this.mesh.renderOrder = 0.1;
        this.hitbox = new THREE.Box3();

        this.c2_color = 0;

        switch(bulletType) {
            //triangle, cone, spinner
            case 1: {
                var mesh = new THREE.Mesh(new THREE.TetrahedronGeometry(), new THREE.MeshBasicMaterial({ color: 0xCB26C9}));
                this.mesh = mesh.clone();
                this.behavior = 1;
                this.speed = 0.9;
                this.acc = 0;
                break;
            }
            //cube
            case 2: {
                var mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(), new THREE.MeshBasicMaterial({color: 0xCB26C9}));
                this.mesh = mesh.clone();
                this.behavior = 2;
                this.speed = 0.7 * aggression;
                this.acc = 0;
                break;
            }
        }

        this.mesh.position.set(inX + this.x_offset, 0, inZ + this.z_offset);
        eBullList.push(this);
        scene.add(this.mesh);
    }

    //update de positie en richting van de kogel
    movement() {
        this.hitbox.setFromObject(this.mesh);
        switch (this.behavior) {
            case 1: //deze kogels gaan in een lineaire richting
                {
                    this.cTimer++;
                    if(!this.locked) {
                        if (this.arg == 0)
                            this.direction.set(this.mesh.position.x - player.ship.position.x - this.x_offset, 0, this.mesh.position.z - player.ship.position.z - this.z_offset);
                        else if (this.arg == 1) {
                            this.direction.set(-30, 0, 0);
                            this.speed = 0.6;
                            this.mesh.scale.set(2,2,2);
                        }
                        else if (this.arg == 2) {
                            this.direction.set(30, 0, 0);
                            this.speed = 0.6;
                            this.mesh.scale.set(2,2,2);
                        }
                        else if (this.arg == 4) {
                            this.direction.set(getRndNext(-1, 1), 0, -1);
                            this.speed = 0.5 * aggression;
                        }
                        else if (this.arg == 5) {
                            this.mesh.position.x -= 15;
                            this.direction.set(this.mesh.position.x - player.ship.position.x - this.x_offset, 0, this.mesh.position.z - player.ship.position.z - this.z_offset);
                            this.mesh.scale.set(2,2,2);
                            this.speed = 1.8 * aggression;
                        }
                        else if (this.arg == 6) {
                            this.mesh.position.x += 15;
                            this.direction.set(this.mesh.position.x - player.ship.position.x - this.x_offset, 0, this.mesh.position.z - player.ship.position.z - this.z_offset);
                            this.mesh.scale.set(2,2,2);
                            this.speed = 1.8 * aggression;
                        }
                        this.direction.multiplyScalar(-1);
                        this.locked = true;
                    }

                    if (this.cTimer > 10 ) {
                        if (this.c2_color == 0) {
                            this.mesh.material.color.set(0xdf7cde);
                            this.c2_color = 1;
                        } else {
                            this.mesh.material.color.set(0xCB26C9);
                            this.c2_color = 0;
                        }

                        this.cTimer = 0;
                    }

                    this.direction.normalize();
                    this.mesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed));
                    break;
                }

            case 2: //deze kogels achtervolgen je
                {
                    this.timer++;
                    this.cTimer++;
                    if (this.timer < 60) {
                        this.direction.set(this.mesh.position.x - player.ship.position.x, 0, this.mesh.position.z - player.ship.position.z);
                        this.direction.multiplyScalar(-1);
                    }
                    else if (this.timer >= 60 && this.timer < 90) {
                        this.direction.set(this.mesh.position.x - player.ship.position.x, 0, this.mesh.position.z - player.ship.position.z);
                        this.direction.multiplyScalar(-1);
                        if (this.speed > 0.05)
                            this.speed -= 0.02;
                    }
                    else if (this.timer >= 90 && this.timer < 95) {
                        this.direction.set(this.mesh.position.x - player.ship.position.x, 0, this.mesh.position.z - player.ship.position.z);
                        this.direction.multiplyScalar(-1);
                        this.speed += 0.02;
                    }
                    else if (this.timer >= 95 && this.speed < 1.2)
                        this.speed += 0.04;

                    //laat de kleur van de kogel veranderen van paars naar rood en dan terug naar paars enz.
                    if (this.cTimer > 5 ) {
                        if (this.c2_color == 0) {
                            this.mesh.material.color.set(0xFF0000);
                            this.c2_color = 1;
                        } else {
                            this.mesh.material.color.set(0xCB26C9);
                            this.c2_color = 0;
                        }

                        this.cTimer = 0;
                    }
                    
                    this.direction.normalize();
                    this.mesh.position.add(this.s3.copy(this.direction).multiplyScalar(this.speed));
                    break;
                }
        }
    }


    //verwijder kogel van scene en de kogellijst
    destroy() {
        scene.remove(this.mesh);
        eBullList.splice(eBullList.indexOf(this), 1);
    }

    //update kogelbeweging en check of kogel binnen het veld zit
    update() {
        this.movement();
        if (outOfBound(this.mesh)) {
            this.destroy();
        }
    }
}


