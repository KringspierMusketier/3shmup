function clamp(i, min, max) {
    if (i < min) {
        num = min;
    } else if (num > max) {
        num = max;
    }
    return num;
}

function assign(mesh) {
    player.ship = mesh;
    if (player.ship !== null)
        console.log("success");
}

