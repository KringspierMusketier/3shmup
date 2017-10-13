var scene, renderer, camera, controls, gui, player, input, preload, progressBar;
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
    console.log("attempt 2: " + models[0]);
    player = new Player(0, 20);
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
    //camera.rotation.set(1 / 2 * Math.PI, 0, 0);
    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    renderer.shadowMapSoft = false;
    renderer.setClearColor(0x262626, 1);

    var clock = new THREE.Clock();

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = true;

    var canvasContainer = document.getElementById('canvas_inner');
    canvasContainer.appendChild(renderer.domElement);
    
    var statsContainer = document.getElementById('statsBox');
    statsContainer.appendChild(stats.domElement);

    gui = new Gui();
    input = new Input();
    document.addEventListener("keydown", input.onKeyDown, false );
    document.addEventListener("keyup", input.onKeyUp, false );
    camera.lookAt(0,0,0);

    draw();
};

function draw() {
    stats.begin();
    controls.update();
    input.update();
    stats.end();
    requestAnimationFrame(draw);

    renderer.render(scene, camera);
};