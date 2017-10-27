var Gui = function() {

}

Gui.addClass = function (el, className) {
    if (el.classList) {
        el.classList.add(className);
    } else {
        el.className += ' ' + className;
    }
};

Gui.removeClass = function (el, className) {
    if (el.classList) {
        el.classList.remove(className);
    } else {
        el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
};

Gui.prototype.show = function (node) {
    Gui.removeClass(node, 'hide');
};

Gui.prototype.hide = function (node) {
    Gui.addClass(node, 'hide');
};

Gui.prototype.startGame = function() {
    this.hide(document.getElementById('mainMenu'));
    this.show(document.getElementById('hud'));
    this.show(document.getElementById('positions'));
    game = new Game();
    draw();
}

Gui.prototype.showHelp = function() {
    this.hide(document.getElementById('mainMenu'));
    this.show(document.getElementById('help'));
}

Gui.prototype.returnMenu = function() {
    this.hide(document.getElementById('help'));
    this.show(document.getElementById('mainMenu'));
}

Gui.prototype.showHighscore = function() {

}

Gui.prototype.updateLives = function() {

}

Gui.prototype.updateScore = function() {

}

Gui.prototype.gameOver = function() {

}