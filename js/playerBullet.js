    bShape = new THREE.Shape();
    bShape.moveTo(0, 0, -1);
    bShape.lineTo(Math.sin(72 / 180 * Math.pi), 0, Math.cos(72 / 180 * Math.pi));
    bShape.lineTo(Math.sin(144 / 180 * Math.pi), 0, Math.cos(144 / 180 * Math.pi));
    bShape.bezierCurveTo(Math.sin(216 / 180 * Math.pi), 0, Math.cos(216 / 180 * Math.pi));
    bShape.lineTo(Math.sin(288 / 180 * Math.pi), 0, Math.cos(288 / 180 * Math.pi));
    bShape.lineTo(0, 0, -1);

extrudeSettings = {
    steps: 2,
    amount: 1,
    bevelEnabled: false
    };

playerBulletList = [];


class PlayerBullet{

    constructor(shippos, shiprot) {
        this.posX = shippos.x;
        this.posZ = shippos.z;
        this.shipPosz = posZ;
        this.direction = new THREE.Vector3;
        this.direction.set(0, 0, -1);
        this.clock = new THREE.Clock();
        this.speed = 2.25;
        //var geo = new THREE.ExtrudeGeometry(bShape, extrudeSettings);
        var geo = new THREE.TetrahedronGeometry();
        var mat = new THREE.MeshBasicMaterial({ color: 0xCCBCFA, wireframe: true });
        this.pBullet = new THREE.Group();
        this.mpBullet = new THREE.Mesh(geo, mat);
        this.lpBullet = new THREE.Mesh(geo, mat);
        this.rpBullet = new THREE.Mesh(geo, mat);
        this.lpBullet.position.set(this.posX - 2.5 * Math.cos(shiprot), 0, this.posZ + 1);
        this.lpBullet.rotation.y = 0.25 * Math.PI;
        this.mpBullet.position.set(this.posX, 0, this.posZ);
        this.mpBullet.rotation.y = 0.25 * Math.PI;
        this.rpBullet.position.set(this.posX + 2.5 * Math.cos(shiprot), 0, this.posZ + 1);
        this.rpBullet.rotation.y = 0.25 * Math.PI;
        this.pBullet.add(this.lpBullet);
        this.pBullet.add(this.rpBullet);
        this.pBullet.add(this.mpBullet);

        scene.add(this.pBullet);
        playerBulletList.push(this);
        //this.checkWorldBounds = true;
    }


    movement() {
        this.pBullet.position.z -= this.speed;
        this.lpBullet.rotation.x += 0.005;
        if (this.pBullet.position.z < (-45 - this.shipPosz)) {
            scene.remove(this.pBullet);
            playerBulletList[this] = null;
        }
    }
}

function playerBulletMovement() {
    for (var i = 0; i < playerBulletList.length; i++) {
        playerBulletList[i].movement();
    }
}