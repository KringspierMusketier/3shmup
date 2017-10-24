bgchunk = [];

class BackgroundPreload {
    constructor() {
        var loader = new THREE.JSONLoader(manager);

        loader.load('models/loopbackground.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                color: new THREE.Color(0x653311)
            }))
            bgchunk.push(mesh.clone());
        });
    }

}