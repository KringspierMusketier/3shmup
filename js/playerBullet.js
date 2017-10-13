bShape = new THREE.Shape();
bShape.moveTo(0, 0, -1);
bShape.lineTo(-sin(72 / 180 * Math.PI), 0, -cos(72 / 180 * Math.PI));
bShape.lineTo(-sin(144 / 180 * Math.PI), 0, -cos(144 / 180 * Math.PI));
bShape.bezierCurveTo(-sin(216 / 180 * Math.PI), 0, -cos(216 / 180 * Math.PI));
bShape.lineTo(-sin(288 / 180 * Math.PI), 0, -cos(288 / 180 * Math.PI));
bShape.lineTo(0, 0, -1);

extrudeSettings = {
    sept: 2,
    amount: 1.5,
    bevelEnabled: false
};

class PlayerBullet extends Bullet {
    constructor(posX, posZ) {

        this.direction = new THREE.Vector3;
        this.direction.set(0, 0, -1);
        this.speed = new THREE.Vector3;
        var geo = new THREE.ExtrudeGeometry(bShape, extrudeSettings);
        var mat = new THREE.MeshBasicMaterial(0x551A8B);
        this.pBullet = new THREE.Mesh(geo, mat);

        this.checkWorldBounds = true;
    }

    movement() {
        this.pBullet.position.z -= speed * 20 * clock.getDelta();
    }
}