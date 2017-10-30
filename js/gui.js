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
    audio.menuClick();
    game = new Game();
    draw();
}

Gui.prototype.showHelp = function() {
    this.hide(document.getElementById('mainMenu'));
    this.show(document.getElementById('help'));
    audio.menuClick();
}

Gui.prototype.returnMenu = function() {
    this.hide(document.getElementById('help'));
    this.show(document.getElementById('mainMenu'));
    audio.menuClick();
}