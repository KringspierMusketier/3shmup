bglist= [];
currentLight = null;
bgspeed = 2;
accelerate = false;
decelerate = false;
holetilt = false;
change = 0.01;

hexcolor = new THREE.Color(0x000000);

class Background {
    construct() {
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
        if (chunk == 3) bglist[bglist.length - 1].position.x = -100;
        bglist[bglist.length - 1].position.z = -offset;
        bglist[bglist.length - 1].rotation.y = rotation / 180 * Math.PI;
        bglist[bglist.length - 1].scale.set(scale, scale, scale);
        scene.add(bglist[bglist.length - 1]);
    }


    update() {
        var offset = 2000;
        //phase 1: air and sea

            

        //phase 2: land
        switch (game.timer) {
            case offset:
                
                this.bginit(2, 350, 270, 80, 12);
                console.log("BACKGROUND INIT")
                this.bginit(5, 1350, 0, 75, 12);
                currentLight = new THREE.PointLight(0xDDDDFF, 3, 500, 2.5);
                currentLight.position.set(20, 125, 0);
                scene.add(currentLight)
                break;
            case 300 + offset:
                accelerate = true;
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

                renderer.setClearColor(0x555555);
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
            case 1410 + offset:
                renderer.setClearColor(0x000000,1);
                this.bginit(3, 925, 0, 80, 7);
                break;
            case 1770 + offset:
                holetilt = true;
                //bgspeed = 0.5;
                break;

            //phase 3: underground
            case 1860 + offset:
                bglist[bglist.length - 1].position.x = 500;
                this.bginit(4, -10, 0, 340, 4)

                currentLight = new THREE.PointLight(0x9999AA, 0.001, 80, 1);
                currentLight.position.set(0, -50, 0);
                scene.add(currentLight)

                break;



        }
        if (game.timer-offset<1860) {
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
                        bglist[bglist.length - 1].rotation.x += 0.0005;
                        currentLight.intensity -= 0.002;
                    }
                }
            }
            if (game.timer > 400 && game.timer < 830) {
                if (game.timer % 6 == 0) {
                    hexcolor.add(new THREE.Color(0x010203));
                }
                //console.log(hexcolor);
                renderer.setClearColor(hexcolor, 1);
            }

        } else {
            currentLight.position.x = player.ship.position.x;
            currentLight.position.z = player.ship.position.z;
            currentLight.distance = -Math.abs(currentLight.position.z);
            console.log(player.ship.position);
            console.log(currentLight.position);
            bglist[bglist.length - 1].rotation.x += change;
            if (change < 0.05) {
                change += 0.0002;
            }
            if (currentLight.intensity < 2) {
                currentLight.intensity += 0.03;
            }

        }
    }

    }


    
