bgcurrent= null;
bgnext = null;
currentLight = null;

class Background {
    construct() { }

    bginit1() {
        bgcurrent = bgchunk[0].clone();
        bgcurrent.position.y = -180;
        bgcurrent.scale.set(2, 2, 2);
        scene.add(bgcurrent);
        currentLight = new THREE.PointLight(0xffaaaa, 1.5, 200);
        currentLight.position.set(0,20,40);
        scene.add(currentLight)
    }

    update() {
        //if (currentLight != null) {
        //    currentLight.position.x = player.position.x;
        //    currentLight.position.z = player.position.z;
        //}
        if (bgcurrent && currentLight) {
            bgcurrent.rotation.x += 0.1;
        }
        switch (game.timer) {
            case 200:
                this.bginit1();
                console.log("BACKGROUND INIT")
                break;
        }

    }

}

    
