function getRndNext(min, max) {
    return Math.random() * (max - min) + min;
  }

function playerBulletMovement() {
    for (var i = 0; i < playerBulletList.length; i++) {
        playerBulletList[i].movement();
    }
}

function enemyBulletUpdate() {
    for (var i = 0; i < eBullList.length; i++)
        eBullList[i].update();
}

function enemyUpdates() {
    for (var i = 0; i < enemies.length; i++)
        enemies[i].update();
}

function particleUpdate() {
    for (var i = 0; i < particles.length; i++)
        particles[i].update();
}

function outOfBound(mesh) {
    if (mesh.position.x < -30 || mesh.position.x > 30 || mesh.position.z < -40 || mesh.position.z > 40) {
        return true;
    } else {
        return false;
    }
}

function restart() {
    location = location;
}