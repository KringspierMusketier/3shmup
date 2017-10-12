class Input {
    constructor() {
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
    }

    onKeyDown(event) {
        switch(event.keyCode) {
            case 37: this.moveLeft = true; break;
            case 39: this.moveRight = true; break;
            case 38: this.moveUp = true; break;
            case 40: this.moveDown = true; break;
        }
    }

    onKeyUp(event) {
        switch(event.keyCode) {
            case 37: this.moveLeft = false; break;
            case 39: this.moveRight = false; break;
            case 38: this.moveUp = false; break;
            case 40: this.moveDown = false; break;
        }
    }

    update() {
        if(this.moveLeft)
            player.moveLeft();
        if(this.moveRight)
            player.moveRight();
        if(this.moveUp)
            player.moveUp();
        if(this.moveDown)
            player.moveDown();
    }
}