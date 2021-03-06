models = [];
enemyModels = [];
bulletModels = [];

//Hier worden de modellen geladen van .json bestanden gemaakt in Blender.
//De achtergronden worden in backgroundPreload.js gemaakt voor overzicht.

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
            mesh.scale.set(0.5, 0.5, 0.5);
            var object = mesh.clone();
            models.push(object);
        });

        loader.load('models/mediumbad_v1_1.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0x2661b5),
                wireframe: true
            }))
            mesh.scale.set(4, 4, 4);
            var object = mesh.clone();
            enemyModels.push(object);
        });
        loader.load('models/bigbad/bigbadBody.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                color: new THREE.Color(0x2661b5),
                wireframe: true
            }))
            var object = mesh.clone();
            enemyModels[1] = object;
        });
        loader.load('models/bigbad/bigbadCannon.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0x00FFFF),
                wireframe: true
            }))
            var object = mesh.clone();
            enemyModels[2] = object;
        });
        loader.load('models/bigbad/bigbadHead.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0x00FFFF),
                wireframe: true
            }))
            var object = mesh.clone();
            enemyModels[3] = object;
        });
    }

}