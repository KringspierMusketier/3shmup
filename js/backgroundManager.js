bglist= [];
currentLight = new THREE.PointLight(0xFFFFFF, 3, 500, 2.5);
currentLight.position.set(20, 125, 0);
bgspeed = 2;
accelerate = false;
decelerate = false;
holetilt = false;
change = 0.02;
sea = null;
seacolor = false;

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
        if (chunk == 7) bglist[bglist.length - 1].position.x = 20;
        if (chunk == 6) bglist[bglist.length - 1].position.x = Math.random() * 60 - 30;
        bglist[bglist.length - 1].position.z = -offset;
        bglist[bglist.length - 1].rotation.y = rotation / 180 * Math.PI;
        bglist[bglist.length - 1].scale.set(scale, scale, scale);
        scene.add(bglist[bglist.length - 1]);
    }


    update() {
        var offset = 1400;

        switch (game.timer) {
        //phase 1: air and sea
            case 1:
                break;
            case 20:
                bgspeed = 0.3;
                this.bginit(7, 80, 58, 10, 1);
                break;
                

            case 600:
                bgspeed = 2;

                scene.remove(game.tempLight);
                scene.add(currentLight);
                sea = new THREE.Mesh(new THREE.CubeGeometry(500, 5, 500), new THREE.MeshBasicMaterial({ color: 0x4890d8}));
                sea.position.set(0, -80, -500);
                scene.add(sea);
                break;
            case 900:
                seacolor = true;

                break;
                

            case 1300:
                renderer.setClearColor(sea.material.color.getHex());
                //console.log("LOOK HERE"+ sea.material.color.getHex());
                scene.remove(sea);

                this.bginit(6, 150, 0, 70, 5);
                this.bginit(6, 250, 50, 70, 8);
                break;

        //phase 2: land
            case offset:

                this.bginit(2, 630, 270, 90, 12);
                //console.log("BACKGROUND INIT")
                this.bginit(5, 1350, 0, 75, 12);
                break;
            case 300 + offset:
                scene.remove(bglist[bglist.length - 4]);
                scene.remove(bglist[bglist.length - 3]);
                bglist.splice(bglist.length - 4, 2);
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

            case 600 + offset:
                this.bginit(5, 800, 0, 75, 12);
                break;
            case 735 + offset:

                renderer.setClearColor(0x333333);
                break;
            case 924 + offset:
                this.bginit(0, 600, 90, 80, 8);
                bgspeed += 1;
                accelerate = false;
                break;
            case 1051 + offset:

                var plane = new THREE.Mesh(new THREE.CubeGeometry(300, 1, 1000), new THREE.MeshBasicMaterial({ color: 0x333333 }));
                plane.position.set(0, -80, -800);
                bglist.push(plane);
                scene.add(plane);
                decelerate = true;
                break;
            case 1200 + offset:
                this.bginit(0, 570, 90, 80, 8);
                break;

         
            case 1350 + offset:
                renderer.setClearColor(0x000000,1);
                this.bginit(3, 920, 0, 80, 7);
                bgspeed++;
                break;
            case 1670 + offset:
                holetilt = true;
                //bgspeed = 0.5;
                break;

            //phase 3: underground
            case 1780 + offset:
                scene.remove(currentLight)
                bglist[bglist.length - 1].position.x = 500;
                this.bginit(4, -10, 0, 340, 4)

                currentLight = new THREE.PointLight(0x9999AA, 0, 80, 1);
                currentLight.position.set(0, -50, 0);
                scene.add(currentLight)

                break;



        }
        if (sea) {
            sea.position.z += 0.5;
            //console.log(sea.material.color.getHex() + "," + game.timer);
            if (seacolor&&sea.material.color.getHex() >= 0x006994){
                var cspeed = 150;
            sea.material.color.sub(new THREE.Color(0.28125 / cspeed, 0.12891 / cspeed, 0.26562 / cspeed));
            }

        }
        if (game.timer-offset<1780) {
            for (var i = 0; i < bglist.length; i++) {
                if (bglist[i]) {
                    bglist[i].position.z += bgspeed;
                    if (accelerate) bgspeed += 0.0013;
                    if (decelerate) {
                        bgspeed -= 0.0015;
                        if (bgspeed < 2) {
                            bgspeed = 2;
                            decelerate = false;
                        }
                    }
                    if (holetilt) {
                        bglist[bglist.length - 1].rotation.x += 0.0005;
                        currentLight.intensity -= 0.001;
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
            //console.log(player.ship.position);
            //console.log(currentLight.position);
            bglist[bglist.length - 1].rotation.x += change;
            if (change < 0.03) {
                change += 0.00005;
            }
            if (currentLight.intensity < 2) {
                currentLight.intensity += 0.02;
            }

        }
    }

    }


    
