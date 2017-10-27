bgchunk = [];

class BackgroundPreload {
    constructor() {
        var loader = new THREE.JSONLoader(manager);

        //loader.load('models/bg/BGisland.json', function (geometry) {
        //    var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
        //        color: new THREE.Color(0xDDDD22)
        //    }))
        //    bgchunk.push(mesh.clone());
        //});

        loader.load('models/bg/BGbeach.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                color: new THREE.Color(0xDDDD22)
            }))
            bgchunk[2] = mesh.clone();
        });

        loader.load('models/bg/BGforrest.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                color: new THREE.Color(0x22DD22)
            }))
            bgchunk[5] = mesh.clone();
        });

        loader.load('models/bg/BGcity.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                color: new THREE.Color(0xDDDDDD)
            }))
            bgchunk[0] = mesh.clone();
        });

        loader.load('models/bg/BGhole.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                color: new THREE.Color(0x654321)
            }))
            bgchunk[3] = mesh.clone();
        });

        loader.load('models/bg/loopbackground.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                color: new THREE.Color(0x653311)
            }))
            bgchunk[4] = mesh.clone();
        });
        for (var i; i < bgchunk.length; i++)
        {
            console.log("test"+ bgchunk[i].color);
        }
    }
}