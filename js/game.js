earth = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 32), new THREE.MeshLambertMaterial({ color: 0x005988 }));
earth.position.z = -400;

class Game {
    constructor() {

        audio.startGame();
        this.tempLight = new THREE.PointLight(0xDDDDFF, 2, 0, 2);
        this.tempLight.position.set(-50, 0, 30);
        scene.add(this.tempLight);
        input = new Input();
        this.hit = false;
        this.timer = 0;
        this.cTimer = 0;
        this.winTimer = 0;
        this.extend1 = false;
        this.extend2 = false;
        player = new Player(0,20);
        player.ship.position.y = 100;
        intro = new Intro();
        this.done = false;
        scene.add(earth);
        for (var i = 0; i < 6; i++) {
            bg.bginit(1, 80 * i, Math.random(), 5, 9);
        }
        bg.bginit(1, 900, 0, 20, 7);
        bg.bginit(1, 900, 113, 20, 7);


        //comment de onderste lijnen eruit om intro af te laten spelen
        /**intro.started = true;
        done = true;
        camera.position.set(0,50,0);
        player.ship.position.y = 0;**/
    }

    //game loop
    update() {
        //ga alle mindere update functies erlangs
        bg.update();
        player.update();
        enemyUpdates();
        enemyBulletUpdate();
        playerBulletMovement();
        particleUpdate();
        orbUpdate();

        if (!intro.started) {
            intro.start();
        }

        if(done) {
            this.timer++;
            if(!player.dead) {
                input.update();
                timeline(this.timer);
            }
        }

        //voor elke 100000 punten krijg je een bonus leven
        if(!this.extend1 && score > 100000) {
            lives += 1;
            audio.extend();
            this.extend1 = true;
        }

        if(!this.extend2 && score > 200000) {
            lives += 1;
            audio.extend();
            this.extend2 = true;
        }

        //check collisies met kogels, vijanden, orbs en speler
        for (var i = 0; i < enemies.length; i++) {
            if (player.hitbox.intersectsBox(enemies[i].hitbox) && lives > -1 && !player.god) {
                lives -= 1;
                player.onHit();
                this.cTimer = this.timer;
                break;
            }

            for (var j = 0; j < playerBulletList.length; j++) {
                if (enemies[i].hitbox.intersectsBox(playerBulletList[j].hitbox)) {
                    playerBulletList[j].destroy();
                    enemies[i].onHit();
                }
            }
        }

        for (var i = 0; i < eBullList.length; i++) {
            if (player.hitbox.intersectsBox(eBullList[i].hitbox) && lives > -1 && !player.god) {
                lives -= 1;
                player.onHit();
                this.cTimer = this.timer;
                break;
            }

        }

        for (var i = 0; i < orbArray.length; i++) {
            if (player.hitbox.intersectsBox(orbArray[i].hitbox)) {
                orbArray[i].destroy();
                score += 500;
                audio.powerup();
            }
        }

        //als je geraakt wordt, laat alle kogels verdwijnen voor 2.5 seconden
        if (player.hit) {
            if (this.timer < this.cTimer + 150)
                emptyBullets();
            else {
                player.god = false;
                player.hit = false;
                player.ship.remove(player.godSphere);
            }
        }

        //laat gameover scherm zien als speler geen levens meer heeft
        if(player.dead) {
            if (this.timer < this.cTimer + 150) {
                emptyBullets();
            } else {
                gui.show(document.getElementById("gameover"));
            }
        }

        //als speler gewonnen heeft, laat nu vijf seconden het schip naar boven vliegen en laat de win scherm zien
        if (player.win) {
            this.winTimer++;
            if (this.winTimer > 300) {
                player.ship.position.z -= 1.3;
                if (player.ship.position.z < -50) {
                    gui.show(document.getElementById("gamewon"));
                }
            }
        }
    }
}