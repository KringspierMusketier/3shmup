class Player {
    constructor(posX, posZ) {
        this.ship = new THREE.Mesh();
        this.ship.position.set(posX, 0, posZ);
        this.loader = new THREE.JSONLoader();
        this.loader.load('models/playerShip.json', function(geometry) {
            this.ship = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0x000000),
                wireframe: true
            }))
        });

        this.direction = new THREE.Vector3();
        this.direction.set(0,0,0);
        this.direction.normalize();

        this.state = 'dead';
        scene.add(this.ship);
    }
}