var scene, renderer, camera, controls, gui, player;
var height = 640;
var width = 480;
var stats = new Stats();
stats.setMode(0);

function onLoad() {

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 15, 0);
    //camera.rotation.set(1 / 2 * Math.PI, 0, 0);
    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    renderer.shadowMapSoft = false;
    renderer.setClearColor(0x262626, 1);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enablePan = true;
    controls.enableZoom = true;

    var canvasContainer = document.getElementById('canvas_inner');
    canvasContainer.appendChild(renderer.domElement);
    
    var statsContainter = document.getElementById('statsBox');
    statsContainter.appendChild(stats.domElement);

    gui = new Gui();
    player = new Player(0,0);
    camera.lookAt(0,0,0);

    draw();
};

function draw() {
    stats.begin();
    controls.update();
    stats.end();
    requestAnimationFrame(draw);
    
    renderer.render(scene, camera);
};
