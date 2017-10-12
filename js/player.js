class Player {
    constructor(posX, posZ) {
        var loader = new THREE.JSONLoader();
        this.ship = new THREE.Object3D();
        loader.load('models/playerShip_v1_4.json', function(geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0x00ff00),
                wireframe: true
            }))
            mesh.position.set(posX, 0, posZ);
            mesh.scale.set(0.1,0.1,0.1);
            assign(mesh);
            scene.add(mesh);
        });
        loaded = true;
    }

    moveLeft() {
        this.ship.position.x -= 2.0;
    }

    moveRight() {
        this.ship.position.x += 2.0;
    }
    moveUp() {
        this.ship.position.z -= 2.0;
    }
    moveDown() {
        this.ship.position.z += 2.0;
    }
}

