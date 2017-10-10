class Player {
    constructor(posX, posY, posZ) {
        this.loader = new THREE.JSONLoader();
        loader.load('res/models/player.json', function(geometry) {
            this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0x000000),
                wireframe: true
            }))
        });

        this.mesh.position.x = posX;
        this.mesh.position.y = posY;
        this.mesh.position.z = posZ;

        this.state = 'dead';
    }
}