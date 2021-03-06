var scene, renderer, player, audio, camera, controls, gui, input, preload, intro, bg;
var height = 640;
var width = 480;
var score = 00000000;
var lives = 2;
var stats = new Stats();
var debug = false;
var loaded = false;
stats.setMode(0);

//de loadingmanager die in de console zegt of alle modellen wel geladen zijn
var manager = new THREE.LoadingManager();
manager.onStart = function(url, itemsLoaded, itemsTotal) {
    console.log("Started loading: " + url + ".\nLoaded " + itemsLoaded + " of " + itemsTotal + "files.");
};

manager.onLoad = function() {
    console.log("Loading complete");
    bg = new Background();
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
    bgpreload = new BackgroundPreload();
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(-14, -16, 45);
    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    renderer.shadowMapSoft = false;
    renderer.setClearColor(0x000000, 1);

    var clock = new THREE.Clock();
    clock.start();

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;

    var canvasContainer = document.getElementById('canvas_inner');
    canvasContainer.appendChild(renderer.domElement);
    
    var statsContainer = document.getElementById('statsBox');
    statsContainer.appendChild(stats.domElement);

    audio = new Audio();
    gui = new Gui();
    camera.lookAt(0,0,0);
};

function draw() {
    stats.begin();
    controls.update();
    stats.end();
    

        game.update();
        TWEEN.update();
        //tekent de GUI elementen op het scherm wanneer het spel actief is
        document.getElementById('score').innerHTML = ("SC " + score);

        if (lives > -1)
            document.getElementById('lives').innerHTML = ("P1: " + lives + "X");
        else {
            document.getElementById('lives').innerHTML = ("P1: DEAD");
            document.getElementById('endScore').innerHTML = (score + " PTS");
        }

    requestAnimationFrame(draw);

    renderer.render(scene, camera);
};