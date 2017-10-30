aggression = 1;

class Spinner extends Enemy {
    constructor(posX, posZ) {
        super();
        this.hp = 25000;

        this.mesh = enemyModels[1].clone();
        this.mesh.scale.set(20,20,20);
        this.mesh.rotation.y += 90*Math.PI/180;
        this.mesh.rotation.z += 90*Math.PI/180;
        this.basecolor = new THREE.Color(0x2661b5);
        this.speed = 0.15;
        this.timer = 0;
        this.cTimer = 0;
        this.dTimer = 0;
        this.eTimer = 0;
        this.orbs = 500;
        this.bob = 0;
        this.bobdirection = false;

        this.bob = 0;
        this.down = false;
        this.hPhase = false;
        this.phaseArray = [0,1,2];
        this.phase = Math.floor(getRndNext(0,this.phaseArray.length));
        this.subPhase = 0;
        this.shotTimer = 0;
        this.dying = false;

        this.reload = 0;
        this.max = 0;

        super.setPos(posX, posZ, this.mesh);

        if (this.mesh.position.x < 0) {
            this.side = -1;
        }
        else {
            this.side = 1;
        }
        scene.add(this.mesh);
    }

    update() {
        super.update();
        this.timer++;

        if(this.hp < 16000 && this.hp >= 8000) {
            aggression = 1.1;
            this.basecolor = 0x0000ff;
            if (!this.hPhase) {
                this.phase = 3;
                this.hPhase = true;
            }
        }

        else if (this.hp < 8000) {
            aggression = 1.2;
            this.basecolor = 0xff9933;
        }

        if (!this.dying) {
            if(this.hp < 8000) {
                this.eTimer++;
                if (this.eTimer > 420) {
                    enemies.push(new Cone());
                    this.eTimer = 0;
                }
            }

            if (this.timer < 240)
                this.mesh.position.z += this.speed;
            else if (this.timer >= 240 && this.hp > 0) {
                this.onFire();
            }
            this.bobbing();
        } else {
            emptyBullets();
            this.cTimer++;
            this.dTimer++;
            this.mesh.rotation.x += 0.1;
            if (this.dTimer > 15 && this.cTimer < 300) {
                particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z));
                for (var i = 0; i < 20; i++) {
                    var newOrb = new Orb(this.mesh.position.x, this.mesh.position.z);
                }
                this.dTimer = 0;
            }
            else if (this.cTimer >= 480) {
                particles.push(new Explosion(this.mesh.position.x, this.mesh.position.z, 2));
                player.win = true;
                super.onDeath();
            }
        }
    }

    bobbing() {
        if (true) {
            if (this.bobdirection) this.mesh.position.z += 0.04;
            else this.mesh.position.z -= 0.04;
            this.bob++;
            if (this.bob > 80) {
                this.bob = 0;
                this.bobdirection = !this.bobdirection;
            }
        }
    }
    
    onFire() {
        this.reload++;
        switch (this.phase) {
            //homing attack
            case 0: {
                if (this.reload > (30) && this.subPhase == 0) {
                    var lBullet = new EnemyBullet(this, 2, 0, -15, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, -15, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, -15, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, -15, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, -15, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, -15, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, -10, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, -10, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, -10, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, -10, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, -10, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, -10, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, -5, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, -5, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, -5, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, -5, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, -5, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, -5, -3.0, 0);
                    if (aggression >= 1.1) {
                        var lBullet = new EnemyBullet(this, 2, 0, -7, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, -7, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, -7, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, -7, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, -7, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, -7, -9.0, 0);
                        var lBullet = new EnemyBullet(this, 2, 0, -12, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, -12, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, -12, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, -12, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, -12, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, -12, -9.0, 0);
                    }
                    this.subPhase++;
                }
                else if (this.reload > 50 && this.subPhase == 1) {
                    var lBullet = new EnemyBullet(this, 2, 0, 15, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, 15, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, 15, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, 15, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, 15, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, 15, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, 10, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, 10, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, 10, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, 10, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, 10, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, 10, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, 5, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, 5, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, 5, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, 5, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, 5, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, 5, -3.0, 0);
                    if (aggression >= 1.1) {
                        var lBullet = new EnemyBullet(this, 2, 0, 7, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, 7, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, 7, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, 7, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, 7, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, 7, -9.0, 0);
                        var lBullet = new EnemyBullet(this, 2, 0, 12, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, 12, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, 12, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, 12, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, 12, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, 12, -9.0, 0);
                    }
                    this.subPhase++;
                }
                else if (this.reload > 70 && this.subPhase == 2) {
                    var lBullet = new EnemyBullet(this, 2, 0, -15, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, -15, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, -15, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, -15, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, -15, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, -15, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, -10, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, -10, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, -10, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, -10, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, -10, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, -10, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, -5, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, -5, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, -5, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, -5, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, -5, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, -5, -3.0, 0);
                    if (aggression >= 1.1) {
                        var lBullet = new EnemyBullet(this, 2, 0, -7, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, -7, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, -7, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, -7, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, -7, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, -7, -9.0, 0);
                        var lBullet = new EnemyBullet(this, 2, 0, -12, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, -12, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, -12, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, -12, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, -12, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, -12, -9.0, 0);
                    }
                    this.subPhase++;
                }
                else if (this.reload > 90 && this.subPhase == 3) {
                    var lBullet = new EnemyBullet(this, 2, 0, 15, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, 15, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, 15, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, 15, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, 15, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, 15, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, 10, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, 10, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, 10, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, 10, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, 10, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, 10, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, 5, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, 5, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, 5, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, 5, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, 5, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, 5, -3.0, 0);
                    if (aggression >= 1.1) {
                        var lBullet = new EnemyBullet(this, 2, 0, 7, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, 7, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, 7, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, 7, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, 7, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, 7, -9.0, 0);
                        var lBullet = new EnemyBullet(this, 2, 0, 12, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, 12, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, 12, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, 12, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, 12, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, 12, -9.0, 0);
                    }
                    this.subPhase++;
                }
                else if (this.reload > 110 && this.subPhase == 4) {
                    var lBullet = new EnemyBullet(this, 2, 0, -15, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, -15, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, -15, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, -15, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, -15, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, -15, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, -10, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, -10, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, -10, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, -10, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, -10, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, -10, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, -5, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, -5, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, -5, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, -5, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, -5, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, -5, -3.0, 0);
                    if (aggression >= 1.1) {
                        var lBullet = new EnemyBullet(this, 2, 0, -7, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, -7, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, -7, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, -7, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, -7, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, -7, -9.0, 0);
                        var lBullet = new EnemyBullet(this, 2, 0, -12, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, -12, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, -12, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, -12, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, -12, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, -12, -9.0, 0);
                    }
                    this.subPhase++;
                }
                else if (this.reload > 130 && this.subPhase == 5) {
                    var lBullet = new EnemyBullet(this, 2, 0, 15, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, 15, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, 15, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, 15, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, 15, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, 15, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, 10, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, 10, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, 10, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, 10, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, 10, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, 10, -3.0, 0);
                    var lBullet = new EnemyBullet(this, 2, 0, 5, 0, 0);
                    var mBullet = new EnemyBullet(this, 2, 0, 5, -0.6, 0);
                    var nBullet = new EnemyBullet(this, 2, 0, 5, -1.2, 0);
                    var rBullet = new EnemyBullet(this, 2, 0, 5, -1.8, 0);
                    var oBullet = new EnemyBullet(this, 2, 0, 5, -2.4, 0);
                    var pBullet = new EnemyBullet(this, 2, 0, 5, -3.0, 0);
                    if (aggression >= 1.1) {
                        var lBullet = new EnemyBullet(this, 2, 0, 7, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, 7, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, 7, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, 7, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, 7, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, 7, -9.0, 0);
                        var lBullet = new EnemyBullet(this, 2, 0, 12, -6, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, 12, -6.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, 12, -7.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, 12, -7.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, 12, -8.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, 12, -9.0, 0);
                    }
                    this.subPhase++;
                }
                else if (this.subPhase == 6) {
                    /**var nextPhase = getRndNext(0, 3);
                    while (nextPhase == this.phase) {
                        var nextPhase = getRndNext(0, 3);
                    }
                    this.phase = nextPhase;**/
                    this.subPhase = 0;
                    this.reload = 0;
                    if (this.down) {
                        this.phase = 4;
                    } else {
                        this.phase = 2;
                    }
                }
                break;
            }
            case 2: {
                if (this.reload > 60 && this.subPhase == 0) {
                    for (var i = 0; i < (35 * aggression); i++) {
                        var pBullet = new EnemyBullet(this, 1, 0, getRndNext(-5, 5), 0, 4);
                        if (i >= (35 * aggression - 1)) {
                            this.subPhase++;
                        }
                    }
                }
                else if (this.reload > 90 && this.subPhase == 1) {
                    for (var i = 0; i < (35 * aggression); i++) {
                        var pBullet = new EnemyBullet(this, 1, 0, getRndNext(-5, 5), 0, 4);
                        if (i >= (35 * aggression - 1)) {
                            this.subPhase++;
                        }
                    }
                }
                else if (this.reload > 120 && this.subPhase == 2) {
                    for (var i = 0; i < (35 * aggression); i++) {
                        var pBullet = new EnemyBullet(this, 1, 0, getRndNext(-5, 5), 0, 4);
                        if (i >= (35 * aggression - 1)) {
                            this.subPhase++;
                        }
                    }
                }
                else if (this.reload > 150 && this.subPhase == 3) {
                    for (var i = 0; i < (35 * aggression); i++) {
                        var pBullet = new EnemyBullet(this, 1, 0, getRndNext(-5, 5), 0, 4);
                        if (i >= (35 * aggression - 1)) {
                            this.subPhase++;
                        }
                    }
                }
                else if (this.reload > 300 && this.subPhase == 4) {
                    this.reload = 0;
                    this.subPhase = 0;
                    if(this.down) {
                        this.phase = 4;
                    } else {
                        this.phase = 1;
                    }
                }
                break;
            }
            case 1: {
                if (this.reload >= 60 && this.reload < 120) {
                    var pBullet = new EnemyBullet(this, 1, 0, 0, 0, 5);
                    if (this.subPhase == 0 && aggression >= 1.1) {
                        var lBullet = new EnemyBullet(this, 2, 0, 10, 0, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, 10, -0.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, 10, -1.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, 10, -1.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, 10, -2.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, 10, -3.0, 0);
                        this.subPhase++;
                    }
                }
                else if (this.reload >= 150 && this.reload < 210) {
                    var pBullet = new EnemyBullet(this, 1, 0, 0, 0, 6);
                    if (this.subPhase == 1 && aggression >= 1.1) {
                        var lBullet = new EnemyBullet(this, 2, 0, -10, 0, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, -10, -0.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, -10, -1.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, -10, -1.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, -10, -2.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, -10, -3.0, 0);
                        this.subPhase++;
                    }
                }
                else if (this.reload >= 270 && this.reload < 360) {
                    var pBullet = new EnemyBullet(this, 1, 0, 0, 0, 5);
                    var mBullet = new EnemyBullet(this, 1, 0, 0, 0, 6);
                    if (this.subPhase == 2 && aggression >= 1.1) {
                        var lBullet = new EnemyBullet(this, 2, 0, -10, 0, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, -10, -0.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, -10, -1.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, -10, -1.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, -10, -2.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, -10, -3.0, 0);
                        var lBullet = new EnemyBullet(this, 2, 0, 10, 0, 0);
                        var mBullet = new EnemyBullet(this, 2, 0, 10, -0.6, 0);
                        var nBullet = new EnemyBullet(this, 2, 0, 10, -1.2, 0);
                        var rBullet = new EnemyBullet(this, 2, 0, 10, -1.8, 0);
                        var oBullet = new EnemyBullet(this, 2, 0, 10, -2.4, 0);
                        var pBullet = new EnemyBullet(this, 2, 0, 10, -3.0, 0);
                        this.subPhase++;
                    }
                }
                else if (this.reload > 430) {
                    this.reload = 0;
                    if(this.down) {
                        this.phase = 4;
                    } else {
                        this.phase = 0;
                    }
                    this.subPhase = 0;
                }
                break;
            }
            case 3: {
                if (this.mesh.position.z < 30) {
                    this.mesh.position.z += 0.4;
                    emptyBullets();
                } else {
                    this.down = true;
                    this.reload = 0;
                    this.subPhase = 0;
                    this.phase = 1;
                }
                break;
            }
            case 4: {
                if (this.mesh.position.z > -26) {
                    this.mesh.position.z -= 0.4;
                } else {
                    this.down = false;
                    this.reload = 0;
                    this.subPhase = 0;
                    this.phase = 0;
                }
                break;
            }
        }
    }

    onDeath() {
        if(!this.dying)
            score += 100000;
        
        this.dying = true;
    }

    onExit() {
        super.onExit();
    }
}