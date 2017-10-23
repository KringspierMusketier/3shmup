class Intro {
    constructor() {
        this.done = false;
        this.started = false;
        this.tor = new THREE.Object3D();

        this.tweenA = new TWEEN.Tween(camera.position)
            .to({x: 1.3, y: 0, z: 50}, 2000)
            .easing(TWEEN.Easing.Quartic.Out)
            .delay(500);

        this.tweenB = new TWEEN.Tween(camera.position)
            .to({z: 500}, 400)
            .easing(TWEEN.Easing.Quartic.Out)
            .onComplete(function() {
                var torGeometry = new THREE.TorusGeometry(10, 1, 7, 30);
                var torMaterial = new THREE.MeshBasicMaterial({color: 0xfe7722});
                var torMesh = new THREE.Mesh(torGeometry, torMaterial);
                torMesh.position.set(player.ship.position.x, player.ship.position.y, player.ship.position.z);
                this.tor = torMesh.clone();
                scene.add(this.tor);
            });
        
        this.tweenBa = new TWEEN.Tween(camera.position)
            .to({z: 501}, 1200)
            .easing(TWEEN.Easing.Quartic.Out)
            .onUpdate(function() {
                this.tor.position.z += 9;
            });

        this.tweenC = new TWEEN.Tween(camera.position)
            .to({x: 0, y: 50, z: 0}, 1200)
            .easing(TWEEN.Easing.Quartic.Out)
            .onStart(function() {
                this.tor.position.z += 15;
            })
            .onUpdate(function() {
                this.tor.position.z += 15;
            });

        this.tweenA.chain(this.tweenB);
        this.tweenB.chain(this.tweenBa);
        this.tweenBa.chain(this.tweenC);
    }

    start() {
        this.tweenA.start();
        this.started = true;
    }
}