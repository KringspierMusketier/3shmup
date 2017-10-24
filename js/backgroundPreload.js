bgloop;
bgchunk = [];

class BackgroundPreload {
    constructor() {
        var loader = new THREE.JSONLoader(manager);

        loader.load('models/loopbackground.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0xDD4444)
            }))
            bgloop = mesh.clone();
        });
    }
}