class Game {
    constructor() {
        input = new Input();
        this.hit = false;
        this.timer = 0;
        this.cTimer = 0;
        player = new Player(0,20);
        player.ship.position.y = 100;
        intro = new Intro();

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
        /**for (var i = 0; i < enemyBulletList.length; i++)
            if (player.hitbox.intersectsBox(enemyBulletList[i].hitbox))
                player.onHit();**/
    }
}