function clamp(i, min, max) {
    if (i < min) {
        num = min;
    } else if (num > max) {
        num = max;
    }
    return num;
}

function assign(mesh) {
    preload.models.push(mesh);
}

