class Game {
    constructor() {
        input = new Input();
        player.push(new Player(0,25));
        player[0].ship.position.y = 50;
        enemies.push(new Cube(getRndNext(-28, 29), -45));
        enemies.push(new Triangle(0, -45));
        time = new THREE.Clock();
        var intro = true;
    }
    //game loop
    update() {
        enemyUpdates();
        enemyBulletUpdate();
        playerBulletMovement();
        particleUpdate();
        input.update();
        player[0].update();

        //intro
        if (player.ship.position.y > 0 && intro) {
            player.ship.position.y -= 1;
        }

        //collision checking
        for (var i = 0; i < enemies.length; i++) {
            if (player[0].hitbox.intersectsBox(enemies[i].hitbox))
                player[0].onHit();

            for (var j = 0; j < playerBulletList.length; j++) {
                if (enemies[i].hitbox.intersectsBox(playerBulletList[j].hitbox)) {
                    playerBulletList[j].destroy();
                    enemies[i].onHit();
                }
            }
        }

        for (var i = 0; i < eBullList.length; i++) {
            if (player[0].hitbox.intersectsBox(eBullList[i].hitbox)) {
                player[0].onHit();
                eBullList[i].destroy();
            }

        }

        /**for (var i = 0; i < enemyBulletList.length; i++)
            if (player.hitbox.intersectsBox(enemyBulletList[i].hitbox))
                player.onHit();**/
    }
}