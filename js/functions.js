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

function emptyBullets() {
    for (var i = 0; i < eBullList.length; i++) {
        eBullList[i].destroy();
    }
}

function outOfBound(mesh) {
    if (mesh.position.x < -30 || mesh.position.x > 30 || mesh.position.z < -40 || mesh.position.z > 40) {
        return true;
    } else {
        return false;
    }
}

function rndColor() {

}

function restart() {
    location = location;
}

function timeline(timer) {
    switch (timer) {
        case 120: {
            enemies.push(new Triangle());
            enemies.push(new Triangle());
            break;
        }
        case 160: {
            enemies.push(new Triangle());
            break;
        }
        case 320: {
            enemies.push(new Triangle());
            enemies.push(new Triangle());
            enemies.push(new Triangle());
            break;
        }
        case 360: {
            enemies.push(new Triangle());
            enemies.push(new Triangle());
            break;
        }
        case 480: {
            enemies.push(new Triangle(20));
            enemies.push(new Triangle(-20));
            break;
        }
        case 520: {
            enemies.push(new Triangle(-16));
            enemies.push(new Triangle(16));
            break;
        }
        case 560: {
            enemies.push(new Triangle(-12));
            enemies.push(new Triangle(12));
            break;
        }
        case 600: {
            enemies.push(new Triangle(-8));
            enemies.push(new Triangle(8));
            break;
        }
        case 640: {
            enemies.push(new Triangle(-4));
            enemies.push(new Triangle(4));
            break;
        }
        case 760: {
            enemies.push(new Cube(0));
            break;
        }
        case 880: {
            enemies.push(new Cube(-15));
            enemies.push(new Cube(15));
            break;
        }
        case 1080: {
            enemies.push(new Cube(0));
            enemies.push(new Triangle(-20));
            enemies.push(new Triangle(-15));
            enemies.push(new Triangle(15));
            enemies.push(new Triangle(20));
            break;
        }

        case 1260: {
            enemies.push(new Cube(20));
            enemies.push(new Triangle(15));
            enemies.push(new Triangle(-15));
            enemies.push(new Cube(-20));
            break;
        }

        case 1340: {
            enemies.push(new Cube(21));
            enemies.push(new Cube(13));
            enemies.push(new Cube(4));
            break;
        }
        case 1400: {
            enemies.push(new Cube(17));
            enemies.push(new Cube(12));
            enemies.push(new Triangle(-20));
            enemies.push(new Triangle(-15));
            break;
        }
        case 1430: {
            enemies.push(new Triangle(-17));
            break;
        }

        case 1630: {
            enemies.push(new Triangle(20));
            enemies.push(new Triangle(10));
            break;
        }
        case 1650: {
            enemies.push(new Triangle(15));
            enemies.push(new Triangle(5));
            enemies.push(new Triangle(-15));
            enemies.push(new Triangle(-5));
            break;
        }
        case 1710: {
            enemies.push(new Triangle(-20));
            enemies.push(new Triangle(-10));
            break;
        }

        case 1840: {
            enemies.push(new Triangle(-5));
            enemies.push(new Triangle(5));
            break;
        }

        case 1860: {
            enemies.push(new Cube(-5));
            enemies.push(new Cube(5));
            break;
        }

        case 2200: {
            enemies.push(new Cone(0));
            break;
        }

        case 2320: {
            enemies.push(new Cone(-15));
            enemies.push(new Cone(15));
            break;
        }

        case 2560: {
            enemies.push(new Cone(-20));
            enemies.push(new Triangle(25));
            enemies.push(new Triangle(20));
            enemies.push(new Triangle(15));
            enemies.push(new Triangle(10));
            break;
        }
        case 2600: {
            enemies.push(new Triangle(12));
            enemies.push(new Triangle(17));
            enemies.push(new Triangle(21));
            break;
        }
        case 2640: {
            enemies.push(new Triangle(25));
            enemies.push(new Triangle(20));
            enemies.push(new Triangle(15));
            enemies.push(new Triangle(10));
            break;
        }
        case 2680: {
            enemies.push(new Triangle(12));
            enemies.push(new Triangle(17));
            enemies.push(new Triangle(21));
            break;
        }
        case 2800: {
            enemies.push(new Cone(20));
            enemies.push(new Cube(-25));
            enemies.push(new Cube(-15));
            break;
        }

        case 2980: {
            enemies.push(new Cone(0));
            break;
        }

        case 3040: {
            enemies.push(new Cone(-15));
            enemies.push(new Cone(15));
            break;
        }

        case 3200: {
            enemies.push(new Triangle(-20));
            enemies.push(new Triangle(-10));
            enemies.push(new Triangle(10));
            enemies.push(new Triangle(20));
            break;
        }

        case 3660: {
            enemies.push(new Spinner(1, -60));
            break;
        }
    }
}