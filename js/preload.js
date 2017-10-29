models = [];
enemyModels = [];
bulletModels = [];

class Preload {
    constructor() {
        //BackGroundPreload();
        var loader = new THREE.JSONLoader(manager);

        loader.load('models/playerShip_v1_4.json', function(geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0xDD4444),
                wireframe: true,
            }))
            var object = mesh.clone();
            models.push(object);
        });

        loader.load('models/playerHitbox_v1_1.json', function(geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0x00FFFF),
                wireframe: true
            }))
            mesh.scale.set(0.7, 0.7, 0.7);
            var object = mesh.clone();
            models.push(object);
        });

        loader.load('models/mediumbad_v1_1.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0xDDDD00),
                wireframe: true
            }))
            mesh.scale.set(4, 4, 4);
            var object = mesh.clone();
            enemyModels.push(object);
        });
    }

}