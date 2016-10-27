// Request animation frame loop function
var lastRender = 0;
var controls;

var raycaster;
var objects = [];
var canvas, hemiLight, dirLight, directionalLight2, directionalLightR, directionalLight;
var container, renderer;
var serverObject;
var allBrains = []
var xCenter;
var zCenter;
var newServ;
var hexyCenter;
var numberOfservers = 15;
var spacing = 360 / numberOfservers;
var ServersInRows = 10;
var radius = 3
var brainHeight = .1
var cube;
var camera, scene;
var blocker = document.getElementById( 'blocker' );
var instructions = document.getElementById( 'instructions' );
var controlsEnabled = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var d = 200;
var prevTime = performance.now();
var velocity = new THREE.Vector3();

var r = "img/";

var urls = [
    r + "px.jpg", r + "nx.jpg",
    r + "py.jpg", r + "ny.jpg",
    r + "pz.jpg", r + "nz.jpg"
];

var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
