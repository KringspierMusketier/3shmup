playerBulletList = [];

class PlayerBullet{

    constructor(shippos, shiprot) {
        var posX = shippos.x;
        var posZ = shippos.z;
        this.shipPosz = posZ;
        this.direction = new THREE.Vector3;
        this.direction.set(0, 0, -1);
        this.clock = new THREE.Clock();
        this.speed = 2.25;
        var geo = new THREE.TetrahedronGeometry();
        var mat = new THREE.MeshBasicMaterial({ color: 0xCCBCFA, wireframe: true });
        this.mpBullet = new THREE.Mesh(geo, mat);
        this.mpBullet.position.set(posX, 0, posZ);
        this.mpBullet.rotation.y = 0.25 * Math.PI;

        this.hitbox = new THREE.Box3();

        scene.add(this.mpBullet);
        playerBulletList.push(this);
    }

    destroy() {
        scene.remove(this.mpBullet);
        playerBulletList.splice(playerBulletList.indexOf(this), 1);
    }

    movement() {
        this.hitbox.setFromObject(this.mpBullet);
        this.mpBullet.position.z -= this.speed;
        if (this.mpBullet.position.z < -40) {
            this.destroy();
        }
    }
}