class Game {
    constructor() {
        input = new Input();
        player = new Player(0, 20);
        enemy = new Enemy(getRndNext(-28, 29), -45);
    }
    //game loop
    update() {
        input.update();
        player.update();
        enemy.update();
        playerBulletMovement();

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

        /**for (var i = 0; i < enemyBulletList.length; i++)
            if (player.hitbox.intersectsBox(enemyBulletList[i].hitbox))
                player.onHit();**/
    }
}