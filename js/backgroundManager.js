bglist= [];
currentLight = null;
bgspeed = 2;
accelerate = false;
decelerate = false;
holetilt = false;

class Background {
    construct() { }

    bginit1() {
        bglist.push(bgchunk[2].clone());
        bglist[0].position.y = -80;
        bglist[0].position.z = -350;
        bglist[0].rotation.y = -0.5 * Math.PI;
        bglist[0].scale.set(14, 12, 12);
        scene.add(bglist[0]);
        currentLight = new THREE.PointLight(0xDDDDFF, 3, 500, 2.5);
        currentLight.position.set(20, 125, 0);
        scene.add(currentLight)
        console.log(currentLight.intensity);
    }
    //chunk list:
    //0: city
    //1: island (does not appear)
    //2: beach;
    //3: hole;
    //4: underground;
    //5: forrest;
    //
    //all subject to change

    bginit(chunk, offset, rotation, yset, scale) {
        bglist.push(bgchunk[chunk].clone());
        bglist[bglist.length - 1].position.y = -yset;
        if (chunk == 3) bglist[bglist.length - 1].position.x = -75;
        bglist[bglist.length - 1].position.z = -offset;
        bglist[bglist.length - 1].rotation.y = rotation / 180 * Math.PI;
        bglist[bglist.length - 1].scale.set(scale, scale, scale);
        scene.add(bglist[bglist.length - 1]);
    }


    update() {
        //if (currentLight != null) {
        //    currentLight.position.x = player.position.x;
        //    currentLight.position.z = player.position.z;
        //}
        //if (bglist && currentLight) {
        //    bglist.rotation.x += 0.1;
        //}
        var offset = 0;
        switch (game.timer) {
            case offset:
                this.bginit1();
                console.log("BACKGROUND INIT")
                break;
            case 300 + offset:
                accelerate = true;
                this.bginit(5, 750, 0, 75, 12);
                break;
            case 400 + offset:
                this.bginit(5, 800, 0, 75, 12);
                break;
            case 450 + offset:
                this.bginit(5, 800, 0, 75, 12);
                break;
            case 550 + offset:
                this.bginit(5, 800, 0, 75, 12);
                break;
            case 735 + offset:
                this.bginit(0, 650, 90, 80, 8);
                break;
            case 924 + offset:
                this.bginit(0, 640, 90, 80, 8);
                bgspeed += 1;
                accelerate = false;
                break;
            case 1051 + offset:
                this.bginit(0, 680, 90, 80, 8);
                break;
            case 1200 + offset:
                this.bginit(0, 610, 90, 80, 8);
                break;
            case 1325 + offset:
                this.bginit(0, 670, 90, 80, 8);
                decelerate = true;
                break;
            case 1400 + offset:
                this.bginit(3, 925, 0, 80, 6);
                break;
            case 1800 + offset:
                holetilt = true;
                bgspeed = 0.5;
                break;



        }
        for (var i = 0; i < bglist.length; i++) {
            if (bglist[i]) {
                bglist[i].position.z += bgspeed;
                if (accelerate) bgspeed += 0.001;
                if (decelerate) {
                    bgspeed -= 0.0015;
                    if (bgspeed < 2) {
                        bgspeed = 2;
                        decelerate = false;
                    }
                }
                if (holetilt) {
                    console.log(currentLight.intensity);
                    bglist[bglist.length - 1].rotation.x += 0.0005;
                    currentLight.intensity -= 0.001;
                }
                    //if (game.timer < 2200) {
                    //    console.log(bgspeed);
                    //    console.log(holetilt);
                    //    console.log(game.timer);
                    //}
                }
            }

        }

    }


    
