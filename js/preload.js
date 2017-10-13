class Preload {
    constructor() {
        var loader = new THREE.JSONLoader(manager);
        var models = [];
        var bulletModels= [];

        loader.load('models/playerShip_v1_4.json', function(geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0x00ff00),
                wireframe: true
            }))
            mesh.scale.set(0.1,0.1,0.1);
            var object = mesh.clone();
            models.push(object);
            scene.add(object);
        });
    }
}