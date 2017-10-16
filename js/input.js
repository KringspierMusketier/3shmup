keyboard = new THREEx.KeyboardState();

class Input {
    constructor() {

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
        if(keyboard.pressed("shift"))
            player.speed = 0.5;
        if(!keyboard.pressed("shift"))
            player.speed = 1.0;
        if (keyboard.pressed("z"))
            player.shoot();
    }
}