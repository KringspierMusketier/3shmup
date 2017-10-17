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
        var geo = new THREE.TetrahedronGeometry();
        var mat = new THREE.MeshBasicMaterial({ color: 0xCCBCFA, wireframe: true });
        this.mpBullet = new THREE.Mesh(geo, mat);
        this.mpBullet.position.set(this.posX, 0, this.posZ);
        this.mpBullet.rotation.y = 0.25 * Math.PI;

        this.hitbox = new THREE.Box3();

        scene.add(this.mpBullet);
        playerBulletList.push(this);
    }


    movement() {
        this.hitbox.setFromObject(this.mpBullet);
        this.mpBullet.position.z -= this.speed;
        if (this.mpBullet.position.z < (-35 - this.shipPosz)) {
            this.destroy();
        }
    }
    destroy() {
        scene.remove(this.mpBullet);
        playerBulletList[this] = null;
    }
}

function playerBulletMovement() {
    for (var i = 0; i < playerBulletList.length; i++) {
        playerBulletList[i].movement();
    }
}