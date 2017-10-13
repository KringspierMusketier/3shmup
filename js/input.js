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
    }
}