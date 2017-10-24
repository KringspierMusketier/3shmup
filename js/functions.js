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

function setPos(posX, posZ, mesh) {
    if(!posX) {
        if(pside = 0) {
            mesh.position.x = getRndNext(0, 28);
        } else {
            mesh.position.x = getRndNext(-28, 0);
        }
    } else {
        mesh.position.x = posX;
    }

    if(!posZ) {
        mesh.position.z = -45;
    }
    else {
        mesh.position.z = posZ;
    }
}

function restart() {
    location = location;
}

function timeline(timer) {
    switch (timer) {
        case 120: {
            enemies.push(new Triangle());
            enemies.push(new Cube(15));
            break;
        }
        case 240: {
            enemies.push(new Triangle());
            enemies.push(new Cube());
            enemies.push(new Cube(10));
            break;
        }
        case 480: {
            enemies.push(new Triangle());
            enemies.push(new Triangle());
            enemies.push(new Triangle());
            enemies.push(new Triangle());
            break;
        }
    }
}