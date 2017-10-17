class Game {
    constructor() {

    }
    update() {
        //collision checking
        for (var i = 0; i < enemies.length; i++) {
            if (player.hitbox.intersectsBox(enemies[i].hitbox))
                player.onHit();

            for (var j = 0; j < playerBulletList.length; j++) {
                if (enemies[i].hitbox.intersectsBox(playerBulletList[j].hitboxes))
                    enemies[i].onHit();
            }
        }

        for (var i = 0; i < enemyBulletList.length; i++)
            if (player.hitbox.intersectsBox(enemyBulletList[i].hitbox))
                player.onHit();
    }
}