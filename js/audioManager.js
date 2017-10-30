

class audio {
    constructor() {
        this.listener = new THREE.AudioLIstener();
        camera.add(listener);
        this.audioLoader = new THREE.audioLoader();
    }
    playerDeath() {
        var sound = new THREE.Audio(this.listener);
        audioLoader.load('/sound/playerDeath.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.7);
            sound.play();
        });
    }

    playerShot() {
        var sound = new THREE.Audio(this.listener);
        audioLoader.load('/sound/playerShot.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.4);
            sound.play();
        });
    }

    playerImpact() {
        var sound = new THREE.Audio(this.listener);
        audioLoader.load('/sound/playerImpact.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.4);
            sound.play();
        });
    }

    playerShotAlt() {
        var sound = new THREE.Audio(this.listener);
        audioLoader.load('/sound/playerShotAlt.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.4);
            sound.play();
        });
    }
    enemyDeath() {
        var sound = new THREE.Audio(this.listener);
        audioLoader.load('/sound/enemyDeath.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.4);
            sound.play();
        });
    }
    enemyImpact() {
        var sound = new THREE.Audio(this.listener);
        audioLoader.load('/sound/enemyImpact.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.4);
            sound.play();
        });
    }

    powerup() {
        var sound = new THREE.Audio(this.listener);
        audioLoader.load('/sound/powerup.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.4);
            sound.play();
        });
    }

}
