earth = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 32), new THREE.MeshLambertMaterial({ color: 0x005988 }));
earth.position.z = -400;

class Game {
    constructor() {
        audio = new Audio();

        this.tempLight = new THREE.PointLight(0xDDDDFF, 2, 0, 2);
        this.tempLight.position.set(-50, 0, 30);
        scene.add(this.tempLight);
        input = new Input();
        this.hit = false;
        this.timer = 0;
        this.cTimer = 0;
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


        //verwijder de onderste lijnen om intro af te laten spelen
        intro.started = true;
        done = true;
        camera.position.set(0,50,0);
        player.ship.position.y = 0;
    }
    //game loop
    update() {
        bg.update();
        player.update();
        enemyUpdates();
        enemyBulletUpdate();
        playerBulletMovement();
        particleUpdate();
        orbUpdate();

        //intro -14, -16, 45, (14, 66, -45)
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
        //collision checking
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

        if (player.hit) {
            if (this.timer < this.cTimer + 150)
                emptyBullets();
            else {
                player.god = false;
                player.hit = false;
                player.ship.remove(player.godSphere);
            }
        }

        if(player.dead) {
            if (this.timer < this.cTimer + 150) {
                emptyBullets();
            } else {
                gui.show(document.getElementById("gameover"));
            }
        }

        if (player.win) {
            player.ship.position.z -= 5;
            if (player.ships.position.z < -50) {

            }
        }
        /**for (var i = 0; i < enemyBulletList.length; i++)
            if (player.hitbox.intersectsBox(enemyBulletList[i].hitbox))
                player.onHit();**/
    }
}