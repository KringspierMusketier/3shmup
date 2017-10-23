class Game {
    constructor() {
        input = new Input();
        this.timer = 0;
        player = new Player(0,20);
        player.ship.position.y = 70;        
        enemies.push(new Cube(getRndNext(-28, 29), -45));
        enemies.push(new Triangle(0, -45));
        enemies.push(new Spinner(15, -30));
        intro = new Intro();
    }
    //game loop
    update() {
        player.update();
        enemyUpdates();
        enemyBulletUpdate();
        playerBulletMovement();
        particleUpdate();
        input.update();
        timeline(this.timer);
        this.timer++;

        //intro -14, -16, 45, (14, 66, -45)
        if (!intro.done) {
            if (player.ship.position.y > 0) {
                player.ship.position.y -= 0.5;
            }

            else if (!intro.started) {
                intro.start();
            }
        }

        //collision checking
        for (var i = 0; i < enemies.length; i++) {
            if (player.hitbox.intersectsBox(enemies[i].hitbox))
                player.onHit();

            for (var j = 0; j < playerBulletList.length; j++) {
                if (enemies[i].hitbox.intersectsBox(playerBulletList[j].hitbox)) {
                    playerBulletList[j].destroy();
                    enemies[i].onHit();
                }
            }
        }

        for (var i = 0; i < eBullList.length; i++) {
            if (player.hitbox.intersectsBox(eBullList[i].hitbox)) {
                player.onHit();
                eBullList[i].destroy();
            }

        }

        /**for (var i = 0; i < enemyBulletList.length; i++)
            if (player.hitbox.intersectsBox(enemyBulletList[i].hitbox))
                player.onHit();**/
    }
}