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
    //1: stars
    //2: beach;
    //3: hole;
    //4: underground;
    //5: forrest;
    //6: island 
    //7: satelite


    //Deze functie maakt een achtergrondunit van een chunk, voegt hem toe aan de canvas, en doet nog wat extra processing om alles goed op lijn te krijgen.
    //De acthergrond wordt in de bglist geplaatst. Alles in deze lijst zal verplaatsen, zie r178
    bginit(chunk, offset, rotation, yset, scale) {
        bglist.push(bgchunk[chunk].clone());
        bglist[bglist.length - 1].position.y = -yset;
        //Deze chunks hebben een offset in the X die hier wordt veranderd
        if (chunk == 3) bglist[bglist.length - 1].position.x = -100;
        if (chunk == 7) bglist[bglist.length - 1].position.x = 20;
        //deze chunks (eilanden) kunnen op een willekeurige x coördinaat komen tussen -30 en 30
        if (chunk == 6) bglist[bglist.length - 1].position.x = Math.random() * 60 - 30;
        bglist[bglist.length - 1].position.z = -offset;
        bglist[bglist.length - 1].rotation.y = rotation / 180 * Math.PI;
        bglist[bglist.length - 1].scale.set(scale, scale, scale);
        scene.add(bglist[bglist.length - 1]);
    }


    update() {

        //De offset is er omdat we de tweede helfd (strand tot en met het gat) als eerst hebben gemaakt.
        var offset = 1400;

        switch (game.timer) {
        //Fase 1: Ruimte, lucht en zee. Dit is voor de offset
            case 1:
                //Dit was voor het maken van de baas, wat we als laatst hebben gedaan.
                //game.timer = 1779+offset;
                break;
                //Sateliet toevoegen
            case 20:
                bgspeed = 0.3;
                if (bgchunk[7]) this.bginit(7, 80, 58, 10, 1);
                break;
                
                //Hier verandert de belichting van de belichting die we in de ruimte gebruiken naar de belichting boven de grond. We voegen ook de zee toe, die hier nog een groot plat blok is.
            case 600:
                bgspeed = 2;
                scene.remove(game.tempLight);
                scene.add(currentLight);
                sea = new THREE.Mesh(new THREE.CubeGeometry(500, 5, 500), new THREE.MeshBasicMaterial({ color: 0x4890d8}));
                sea.position.set(0, -80, -500);
                scene.add(sea);
                break;
                //Hier verandert de zee van kleur. Dit geeft de illusie dat de afstand tot de horizon kleiner wordt.
            case 950:
                seacolor = true;

                break;
                
                //Hier wordt het blok van de zee weg gehaald en krijgt de achtergrond de kleur van dit blok. Er worden twee eilandjes gemaakt.
            case 1300:
                renderer.setClearColor(sea.material.color.getHex());
                scene.remove(sea);

                this.bginit(6, 150, 0, 70, 5);
                this.bginit(6, 250, 50, 70, 8);
                break;

        //phase 2: land
            case offset:
                //strand en het eerste bos worden aangemaakt.
                this.bginit(2, 630, 270, 90, 12);
                this.bginit(5, 1350, 0, 75, 12);
                break;
            case 300 + offset:
                //Om één of andere reden zaten de eilanden in de weg waardoor alles te langzaam liep. Dit konden we verhelpen door ze te verwijderen uit de bglist.
                //We weten niet waarom dit werkt, maar het werkt.
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
                //vanaf hier wordt de stad gerenderd. Het schip gaat ook sneller.
            case 924 + offset:
                this.bginit(0, 600, 90, 80, 8);
                bgspeed += 1;
                accelerate = false;
                break;
                //er wordt een plane toegevoegd in de kleur van de achtergrond. Later wordt hier het tegenovergestelde mee gedaan dan wat we met de zee deden.
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

                //Hier is een zwarte achtergrond nodig voor het gat wat geinitieerd wordt, maar de achtergrond van de stad moet nog grijs blijven. De stad ligt hoger dus daarom is die achtergrond een plane.
            case 1350 + offset:
                renderer.setClearColor(0x000000,1);
                this.bginit(3, 920, 0, 80, 7);
                bgspeed++;
                break;
                //Het gat kantelt naar de speler toe. Dit geeft de illusie dat hij in het gat duikt. Zie r191
            case 1670 + offset:
                holetilt = true;
                //bgspeed = 0.5;
                break;

            //phase 3: underground
                //Dit achtergrond is een wiel wat blijft draaien zodat de boss fight zolang kan duren als je wil. De boss fight zit namelijk niet op een timer, maar is inplaats daarvan voorbij als de boss HP op 0 komt.
                //Omdat het in theorie oneindig lang kan duren, blijft de achtergrond ook oneindig draaien. Ook na de wincondition.
            case 1780 + offset:
                scene.remove(currentLight)
                bglist[bglist.length - 1].position.x = 500;
                this.bginit(4, -10, 0, 340, 4)

                currentLight = new THREE.PointLight(0x9999AA, 0, 80, 1);
                currentLight.position.set(0, -50, 0);
                scene.add(currentLight)

                break;



        }
        //De zee komt hier langzaam naar beneden gehaald. Langzamer dan de andere achtergrond voor de illusie van afstand.
        if (sea) {
            sea.position.z += 0.5;
            //hier begint de zee van kleur te veranderen.
            if (seacolor && sea.material.color.getHex() >= 0x006994) {
                //dit is het aantal frames waarin de zee moet overgaan van de ene naar de andere kleur.
                var cspeed = 150;
                //De getallen gekozen zijn het verschil tussen de kleur die we hadden en de kleur die het moest worden.
                sea.material.color.sub(new THREE.Color(0.28125 / cspeed, 0.12891 / cspeed, 0.26562 / cspeed));
            }

        }
        //Hier worden alle achtergrond units mee naar beneden gehaald. Hier wordt ook de snelheid bepaald.
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
                    //en hier draait het gat naar je toe
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

        //Dit is waarin de loop wordt geladen. Deze chunk beweegt niet omlaag, maar in plaats daarvan draait om zijn as. Je vliegt in een groef in de 'band'
            //Het licht gaat hier ook aan en volgt de speler (dus het schip geeft light). Er zit een delay in om de overgang van het gat naar het wiel onzichtbaar te maken.
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


    
