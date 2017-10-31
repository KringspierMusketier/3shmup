keyboard = new THREEx.KeyboardState();

//hier wordt gezocht naar keyboard inputs. De snelheid wordt ook gehalveerd voor 'focus mode'.
//De functies van de ingedrukte knoppen worden uitgevoerd in player.
class Input {
    constructor() {
        this.focus = false;
    }

    update() {
        if(keyboard.pressed("left"))
            player.moveLeft();
        if(keyboard.pressed("right"))
            player.moveRight();
        if(keyboard.pressed("up"))
            player.moveUp();
        if(keyboard.pressed("down"))
            player.moveDown();
        if(keyboard.pressed("shift") && !this.focus) {
            player.speed = player.speed / 2;
            this.focus = true;
        }
        if(!keyboard.pressed("shift") && this.focus) {
            player.speed = player.speed * 2;
            this.focus = false;
        }
        if (keyboard.pressed("z"))
            player.shoot();

        if (keyboard.pressed("r"))
            restart();
    }
}