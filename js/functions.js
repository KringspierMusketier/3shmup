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
    playing = false;

    while(scene.children.length > 0) {
        scene.remove(scene.children[0])
    }

    enemies = [];
    eBullList = [];
    particles = [];
    playerBulletList = [];
    player = [];
    score = 00000000;
    lives = 2;
    input = null;

    player.push(new Player(0, 20));
    player[0].ship.position.x = 0;
    player[0].ship.position.z = 20;
    input = new Input();
    enemies.push(new Cube(getRndNext(-28, 29), -45));
    enemies.push(new Triangle(0, -45));
    
    playing = true;
}