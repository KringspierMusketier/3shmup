class Player {
    constructor(posX, posZ) {
        var loader = new THREE.JSONLoader();
        loader.load('models/playerShip_v1.1.json', function(object) {
            var ship = new THREE.Mesh(object, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0x00ff00),
                wireframe: true
            }))
            ship.position.set(posX, 0, posZ);
            scene.add(ship);
        });

        /**this.geometry = new THREE.CubeGeometry(1,1,1);
        this.material = new THREE.MeshBasicMaterial({color: 0xff0000});
        this.testMesh = new THREE.Mesh(this.geometry, this.material);
        this.testMesh.position.set(posX, 5, posZ);
        scene.add(this.testMesh);**/

        this.state = 'dead';
    }
}