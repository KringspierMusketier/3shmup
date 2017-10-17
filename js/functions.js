function getRndNext(min, max) {
    return Math.random() * (max - min) + min;
  }

function playerBulletMovement() {
    for (var i = 0; i < playerBulletList.length; i++) {
        playerBulletList[i].movement();
    }
}

function enemyUpdates() {
    for (var i = 0; i < enemies.length; i++)
        enemies[i].update();
}