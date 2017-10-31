class Audio {
    constructor() {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.audioLoader = new THREE.AudioLoader();
    }

    startGame() {
        var bgm = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/bgm_new.ogg', function (buffer) {
            bgm.setBuffer(buffer);
            bgm.setLoop(false);
            bgm.setVolume(0.5);
            bgm.play();
        });
    }

    boss() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/boss.mp3', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(true);
            sound.setVolume(0.5);
            sound.play();
        });
    }

    blastOff() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/blastOff.wav', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.5);
            sound.play();
        });
    }

    extend() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/extend.wav', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.9);
            sound.play();
        });
    }

    charge() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/charge.wav', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.4);
            sound.play();
        });
    }

    playerDeath() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/playerDeath.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(1);
            sound.play();
        });
    }

    playerShot() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/playerShot.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.1);
            sound.play();
        });
    }

    playerImpact() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/playerImpact.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.4);
            sound.play();
        });
    }
    menuClick() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/menuClick.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.4);
            sound.play();
        });
    }

    playerShotAlt() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/playerShotAlt.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.2);
            sound.play();
        });
    }
    enemyDeath() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/enemyDeath.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.7);
            sound.play();
        });
    }
    enemyImpact() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/enemyImpact.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.3);
            sound.play();
        });
    }

    powerup() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/powerup.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.2);
            sound.play();
        });
    }

    bigExplosion() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/bigExplosion.wav', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(1);
            sound.play();
        });
    }

    playerShotAlt2() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/playerShotAlt2.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.4);
            sound.play();
        });
    }

    playerDeathAlt() {
        var sound = new THREE.Audio(this.listener);
        this.audioLoader.load('sound/playerDeathAlt.ogg', function (buffer) {
            sound.setBuffer(buffer);
            sound.setLoop(false);
            sound.setVolume(0.8);
            sound.play();
        });
    }


    

}
    