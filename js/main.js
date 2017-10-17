var scene, renderer, camera, controls, gui, player, input, preload, progressBar, enemy;
var height = 640;
var width = 480;
var stats = new Stats();
var debug = false;
var loaded = false;
stats.setMode(0);

var manager = new THREE.LoadingManager();
manager.onStart = function(url, itemsLoaded, itemsTotal) {
    console.log("Started loading: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + "files.");
};

manager.onLoad = function() {
    console.log("Loading complete");
    gui.show(document.getElementById('mainMenu'));
};

manager.onProgress = function(url, itemsLoaded, itemsTotal) {
    console.log("Loading file: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + " files.");
};

manager.onError = function(url) {
    console.log("error loading " + url);
}

function onLoad() {

    preload = new Preload();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 50, 0);
    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    renderer.shadowMapSoft = false;
    renderer.setClearColor(0x262626, 1);

    var clock = new THREE.Clock();
    clock.start();

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;

    var canvasContainer = document.getElementById('canvas_inner');
    canvasContainer.appendChild(renderer.domElement);
    
    var statsContainer = document.getElementById('statsBox');
    statsContainer.appendChild(stats.domElement);

    gui = new Gui();
    camera.lookAt(0,0,0);
};

function draw() {
    stats.begin();
    controls.update();
    game.update();
    stats.end();

    document.getElementById('posX').innerHTML = ("posX: " + player.ship.position.x);
    document.getElementById('posZ').innerHTML = ("posZ: " + player.ship.position.z);

    requestAnimationFrame(draw);

    renderer.render(scene, camera);
};