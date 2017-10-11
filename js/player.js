class Player {
    constructor(posX, posZ) {
        var loader = new THREE.JSONLoader();
        loader.load('models/playerShip_v1_4.json', function(geometry) {
            var ship = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0x00ff00),
                wireframe: true
            }))
            ship.position.set(posX, 0, posZ);
            ship.scale.set(0.1,0.1,0.1)
            scene.add(ship);
        });

        loader.load('models/playerHitbox_v1_1.json', function(geometry) {
            var hitbox = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0xffffff),
                wireframe: true
            }))
            hitbox.position.set(posX, 0, posZ);
            hitbox.scale.set(0.1,0.1,0.1);
            scene.add(hitbox);
        })

        /**this.geometry = new THREE.CubeGeometry(1,1,1);
        this.material = new THREE.MeshBasicMaterial({color: 0xff0000});
        this.testMesh = new THREE.Mesh(this.geometry, this.material);
        this.testMesh.position.set(posX, 5, posZ);
        scene.add(this.testMesh);**/

        this.direction = new THREE.Vector3();
        this.direction.set(0,0,0);
        this.direction.normalize();

        this.state = 'dead';
    }
}