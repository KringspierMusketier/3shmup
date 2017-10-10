var scene, renderer, camera, controls, game;
var height = window.innerHeight;
var width = window.innerWidth;
var debug = false;
var balls = [];
var stats = new Stats();
stats.setMode(0);
var gui;

gui.show(document.getElementById('mainMenu'));
var canvasContainer = document.getElementById('canvas');
canvasContainer.appendChild(renderer.domElement);
draw();

function onLoad() {

    gui = new Gui();
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.set(0, 250, 0);
    scene = new THREE.Scene();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = false;
    renderer.setClearColor(0x262626, 1);

    addLights();

    //laat je de camera met de muis controlleren
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    //controls.enableZoom = true;
    //controls.enablePan = true;

    //voegt test vierkant toe in het midden
    var test = new THREE.BoxGeometry(1,1,1);
    var testM = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var testMesh = new THREE.Mesh(test, testMesh);
    scene.add(testMesh);
    testMesh.position.x = 0;
    testMesh.position.y = 0;
    testMesh.position.z = 0;

    game = new Game();
    game.balls[1].direction.x = -1;
    game.balls[0].direction.x = 1;

    camera.lookAt(new THREE.Vector3(0,0,0));
};

function draw() {
    stats.begin();
    controls.update();
    stats.end();
    requestAnimationFrame(draw);

    game.balls[1].sphere.position.add(game.speed.copy(game.balls[1].direction).multiplyScalar(0.5));
    game.balls[0].sphere.position.add(game.speed.copy(game.balls[0].direction).multiplyScalar(0.5));
    game.balls[1].sphere.rotation.setFromVector3(game.balls[0].sphere.rotation.toVector3().add(game.rotationVector));

    for(var i = 0; i < game.balls.length; i++){
        for(var j = 0; j < game.balls.length; j++){
            if(game.balls[i].isColliding(game.balls[j])){
                game.balls[i].collision(game.balls[j]);
            }
        }
    }

    window.addEventListener( 'resize', onWindowResize, false );
    renderer.render(scene, camera);
};

//voegt lichten toe
function addLights() {
    var light = new THREE.AmbientLight(0x0d0d0d);
    scene.add(light);
    var tableLight1 = new TableLight(278 / 4, 150, 0);
    var tableLight2 = new TableLight(-278 / 4, 150, 0);
};

//resizes window after window size changed
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
};