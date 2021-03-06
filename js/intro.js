done = false;

//Deze klasse laat de intro afspelen door middel van tween.js, waarmee we de camera en het schip in allerlei richtingen kunnen bewegen maar het ook laten afzwakken wanneer de tween bijna voorbij is
class Intro {
    constructor() {
        this.started = false;
        this.tor = new THREE.Object3D();

        //laat het schip van bovenaf in het scherm komen
        this.tween0 = new TWEEN.Tween(player.ship.position)
            .to({y: 0}, 1600)
            .easing(TWEEN.Easing.Quartic.Out)
            .delay(500);
        
        //camera beweegt langzaam naar achter het schip
        this.tweenA = new TWEEN.Tween(camera.position)
            .to({x: 1.3, y: 0, z: 50}, 2300)
            .easing(TWEEN.Easing.Quartic.Out)
            .delay(400)
            .onStart(function () {
                audio.charge();
            });

        //camera springt opeens snel naar achteren om te simuleren dat het schip afneemt, daarnaast wordt een stofwolk rondom het schip gemaakt
        this.tweenB = new TWEEN.Tween(camera.position)
            .to({z: 500}, 400)
            .easing(TWEEN.Easing.Quartic.Out)
            .onStart(function() {
                var torGeometry = new THREE.TorusGeometry(10, 1, 7, 30);
                var torMaterial = new THREE.MeshBasicMaterial({color: 0xfe7722});
                var torMesh = new THREE.Mesh(torGeometry, torMaterial);
                torMesh.position.set(player.ship.position.x, player.ship.position.y, player.ship.position.z);
                audio.blastOff();
                this.tor = torMesh.clone();
                scene.add(this.tor);
            });

        //camera blijft voor deze tween in dezelfde plaats, maar hier gaat de stofwolk snel in de richting van de camera en de camera draait een rondje
        this.tweenBa = new TWEEN.Tween(camera.position)
            .to({z: 501}, 1000)
            .easing(TWEEN.Easing.Quartic.Out)
            .onStart(function() {
                new TWEEN.Tween(camera.rotation).to({z: 360*Math.PI/180}, 2200).easing(TWEEN.Easing.Quartic.Out).start();
            })
            .onUpdate(function() {
                this.tor.position.z += 8;
            });

        //camera orienteert zich terug boven de speler terwijl het lijkt dat de stofwolk door de camera heengaat
        this.tweenC = new TWEEN.Tween(camera.position)
            .to({x: 0, y: 50, z: 0}, 1200)
            .easing(TWEEN.Easing.Quartic.Out)
            .onStart(function() {
                this.tor.position.z += 15;
            })
            .onUpdate(function() {
                this.tor.position.z += 15;
            })
            .onComplete(function () {
                scene.remove(this.tor);
                done = true;
            });

        //als het schip geraakt wordt, dan wordt er heel snel een witte plane in het achtergrond geplaatst zodat het lijkt alsof het flitst, en er wordt ook nog een bol om het schip gemaakt die snel rood en wit flitst
        this.tweenHit = new TWEEN.Tween(player.ship.rotation)
            .to({z: 360*Math.PI/180}, 2000)
            .easing(TWEEN.Easing.Quartic.Out)
            .onStart(function() {
                this.hitClock = new THREE.Clock();
                this.hitClock.start();
                this.pMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});
                this.pGeometry = new THREE.PlaneGeometry(700, 700);
                this.pMesh = new THREE.Mesh(this.pGeometry, this.pMaterial);
                this.pMesh.position.y = -5;
                this.pMesh.rotation.x = 90*Math.PI/180;
                scene.add(this.pMesh);
                player.ship.children[3].material.color.set(0xffffff);
            })
            .onUpdate(function() {
                if (this.hitClock.getElapsedTime() >= 0.10 && this.hitClock.getElapsedTime() < 0.20) {
                    scene.remove(this.pMesh);
                    player.ship.children[3].material.color.set(0xff0000);
                }
                else if (this.hitClock.getElapsedTime() >= 0.20 && this.hitClock.getElapsedTime() < 0.30)
                    player.ship.children[3].material.color.set(0xffffff);
                else if (this.hitClock.getElapsedTime() >= 0.30 && this.hitClock.getElapsedTime() < 0.40)
                    player.ship.children[3].material.color.set(0xff0000);
                else if (this.hitClock.getElapsedTime() >= 0.40 && this.hitClock.getElapsedTime() < 0.50)
                    player.ship.children[3].material.color.set(0xffffff);
                else if (this.hitClock.getElapsedTime() >= 0.50 && this.hitClock.getElapsedTime() < 0.60)
                    player.ship.children[3].material.color.set(0xff0000);
                else if (this.hitClock.getElapsedTime() >= 0.60 && this.hitClock.getElapsedTime() < 0.70)
                    player.ship.children[3].material.color.set(0xffffff);
                else if (this.hitClock.getElapsedTime() >= 0.70 && this.hitClock.getElapsedTime() < 0.80)
                    player.ship.children[3].material.color.set(0xff0000);
                else if (this.hitClock.getElapsedTime() >= 0.80 && this.hitClock.getElapsedTime() < 0.90)
                    player.ship.children[3].material.color.set(0xffffff);
                else if (this.hitClock.getElapsedTime() >= 0.90 && this.hitClock.getElapsedTime() < 1.00)
                    player.ship.children[3].material.color.set(0xff0000);
                else if (this.hitClock.getElapsedTime() >= 1.00 && this.hitClock.getElapsedTime() < 1.10)
                    player.ship.children[3].material.color.set(0xffffff);
            });

        this.tween0.chain(this.tweenA);
        this.tweenA.chain(this.tweenB);
        this.tweenB.chain(this.tweenBa);
        this.tweenBa.chain(this.tweenC);
    }

    start() {
        this.tween0.start();
        this.started = true;
    }

    hit() {
        this.tweenHit.start();
    }
}