class Game {
    constructor() {
        input = new Input();
        player = new Player(0,20);
        player.ship.position.y = 50;        
        enemies.push(new Cube(getRndNext(-28, 29), -45));
        enemies.push(new Triangle(0, -45));
        enemies.push(new Spinner(15, -30));
        this.intro = true;
    }
    //game loop
    update() {
        player.update();
        enemyUpdates();
        enemyBulletUpdate();
        playerBulletMovement();
        particleUpdate();
        input.update();

        //intro
        if (player.ship.position.y > 0 && this.intro) {
            player.ship.position.y -= 1;
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