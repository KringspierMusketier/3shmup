    bShape = new THREE.Shape();
    bShape.moveTo(0, 0, -1);
    bShape.lineTo(-Math.sin(72 / 180 * Math.pi), 0, -Math.cos(72 / 180 * Math.pi));
    bShape.lineTo(-Math.sin(144 / 180 * Math.pi), 0, -Math.cos(144 / 180 * Math.pi));
    bShape.bezierCurveTo(-Math.sin(216 / 180 * Math.pi), 0, -Math.cos(216 / 180 * Math.pi));
    bShape.lineTo(-Math.sin(288 / 180 * Math.pi), 0, -Math.cos(288 / 180 * Math.pi));
    bShape.lineTo(0, 0, -1);

extrudeSettings = {
    steps: 2,
    amount: 1.5,
    bevelEnabled: false
    };

playerBulletList = [];


class PlayerBullet{

    constructor(posX, posZ) {

        this.direction = new THREE.Vector3;
        this.direction.set(0, 0, -1);
        this.clock = new THREE.Clock();
        this.speed = 2.5;
        //var geo = new THREE.ExtrudeGeometry(bShape, extrudeSettings);
        var geo = new THREE.CubeGeometry(1, 1, 1);
        var mat = new THREE.MeshBasicMaterial(0x551A8B);
        this.pBullet = new THREE.Mesh(geo, mat);
        this.pBullet.position.set(posX, 0, posZ);
        scene.add(this.pBullet);
        playerBulletList.push(this);
        //this.checkWorldBounds = true;
    }


    movement() {
        this.pBullet.position.z -= this.speed;
    }
}

function playerBulletMovement() {
    for (var i = 0; i < playerBulletList.length; i++) {
        playerBulletList[i].movement();
    }
}