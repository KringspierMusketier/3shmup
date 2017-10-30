bgchunk = [];

beach = new THREE.MeshLambertMaterial({ color: 0xC2B280 });
dirt = new THREE.MeshLambertMaterial({ color: 0x573B0C });
class BackgroundPreload {
    constructor() {
        var loader = new THREE.JSONLoader(manager);
        

        loader.load('models/bg/BGbeach.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, beach.clone())
            bgchunk[2] = mesh.clone();
        });

        loader.load('models/bg/BGforrest.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
                color: new THREE.Color(0x228B22)
            }))
            bgchunk[5] = mesh.clone();
        });

        loader.load('models/bg/BGcity.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
                color: new THREE.Color(0x888888)
            }))
            bgchunk[0] = mesh.clone();
        });

        loader.load('models/bg/BGhole.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, dirt);
            bgchunk[3] = mesh.clone();
        });

        loader.load('models/bg/BGstarrysky.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
                color: new THREE.Color(0xffffff)
            }))
            bgchunk[1] = mesh.clone();
        });

        loader.load('models/bg/BGisland.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, beach.clone());
            bgchunk[6] = mesh.clone();
        });

        loader.load('models/bg/loopbackground.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, dirt);
            bgchunk[4] = mesh.clone();
        });
       

        loader.load('models/bg/BGSata.json', function (geometry) {
            var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
                color: new THREE.Color(0x444444)
            }))
            bgchunk[7] = mesh.clone();
        });
        
        
    }
}