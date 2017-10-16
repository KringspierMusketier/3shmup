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
        this.speed = 3;
        //var geo = new THREE.ExtrudeGeometry(bShape, extrudeSettings);
        var geo = new THREE.CubeGeometry(1, 1, 1);
        var mat = new THREE.MeshBasicMaterial(0x551A8B);
        this.pBullet = new THREE.Mesh(geo, mat);
        scene.add(this.pBullet);
        playerBulletList.push(this.pBullet);
        //this.checkWorldBounds = true;
    }

    movement() {
        this.pBullet.position.z -= speed * 20 * clock.getDelta();
        this.pBullet.rotation.add(3, 3, 3);
    }
}