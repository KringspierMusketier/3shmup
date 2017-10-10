var scene, renderer, camera, controls, gui;
var height = 640;
var width = 480;
var stats = new Stats();
stats.setMode(0);

function onLoad() {

    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 0, 0);
    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = false;
    renderer.setClearColor(0x262626, 1);


    //laat je de camera met de muis controlleren
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enablePan = true;

    var canvasContainer = document.getElementById('canvas_inner');
    canvasContainer.appendChild(renderer.domElement);
    
    var statsContainter = document.getElementById('statsBox');
    statsContainter.appendChild(stats.domElement);

    gui = new Gui();

    draw();
};

function draw() {
    stats.begin();
    controls.update();
    stats.end();
    requestAnimationFrame(draw);

    window.addEventListener( 'resize', onWindowResize, false );
    renderer.render(scene, camera);
};

//resizes window after window size changed
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
};