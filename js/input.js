keyboard = new THREEx.KeyboardState();

class Input {
    constructor() {
        this.focus = false;
    }

    update() {
        if(keyboard.pressed("left"))
            player[0].moveLeft();
        if(keyboard.pressed("right"))
            player[0].moveRight();
        if(keyboard.pressed("up"))
            player[0].moveUp();
        if(keyboard.pressed("down"))
            player[0].moveDown();
        if(keyboard.pressed("shift") && !this.focus) {
            player[0].speed = player[0].speed / 2;
            this.focus = true;
        }
        if(!keyboard.pressed("shift") && this.focus) {
            player[0].speed = player[0].speed * 2;
            this.focus = false;
        }
        if (keyboard.pressed("z"))
            player[0].shoot();

        if (keyboard.pressed("r"))
            restart();
    }
}