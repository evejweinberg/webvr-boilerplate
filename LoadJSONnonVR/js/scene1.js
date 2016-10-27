if ( havePointerLock ) {

  var element = document.body;

  var pointerlockchange = function ( event ) {

    if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {

      controlsEnabled = true;
      controls.enabled = true;

      blocker.style.display = 'none';

    } else {

      controls.enabled = false;

      blocker.style.display = '-webkit-box';
      blocker.style.display = '-moz-box';
      blocker.style.display = 'box';

      instructions.style.display = '';

    }

  };

  var pointerlockerror = function ( event ) {

    instructions.style.display = '';

  };

  // Hook pointer lock state change events
  document.addEventListener( 'pointerlockchange', pointerlockchange, false );
  document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
  document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

  document.addEventListener( 'pointerlockerror', pointerlockerror, false );
  document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
  document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

  instructions.addEventListener( 'click', function ( event ) {

    instructions.style.display = 'none';

    // Ask the browser to lock the pointer
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

    if ( /Firefox/i.test( navigator.userAgent ) ) {

      var fullscreenchange = function ( event ) {

        if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {

          document.removeEventListener( 'fullscreenchange', fullscreenchange );
          document.removeEventListener( 'mozfullscreenchange', fullscreenchange );

          element.requestPointerLock();
        }

      };

      document.addEventListener( 'fullscreenchange', fullscreenchange, false );
      document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );

      element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

      element.requestFullscreen();

    } else {

      element.requestPointerLock();

    }

  }, false );

} else {

  instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';

}

init()




animate()

function init() {



    // container = document.getElementById('container');


    // Create a three.js scene.
    scene = new THREE.Scene();
    // var SCREEN_WIDTH = window.innerWidth;
    // var SCREEN_HEIGHT = window.innerHeight;

    // Create a three.js camera.
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 0, 10)
    renderer = new THREE.WebGLRenderer({
        alpha: false
            // antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
    renderer.setPixelRatio(window.devicePixelRatio);
    // scene.background = new THREE.Color(0xff0000)
    // renderer.setClearColor(0xff0000, 1);
    // renderer.shadowMapEnabled = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true;
    //
    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = 1000;
    renderer.shadowCameraFov = 50;
    //
    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 512;
    renderer.shadowMapHeight = 512;

    renderer.setClearColor( 0xffffff );
				// renderer.setPixelRatio( window.devicePixelRatio );
				// renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

    // Append the canvas element created by the renderer to document body element.
    // container.appendChild(renderer.domElement);


    controls = new THREE.PointerLockControls( camera );
				scene.add( controls.getObject() );

				var onKeyDown = function ( event ) {
					switch ( event.keyCode ) {
						case 38: // up
						case 87: // w
							moveForward = true;
							break;
						case 37: // left
						case 65: // a
							moveLeft = true; break;
						case 40: // down
						case 83: // s
							moveBackward = true;
							break;
						case 39: // right
						case 68: // d
							moveRight = true;
							break;
						case 32: // space
							if ( canJump === true ) velocity.y += 350;
							canJump = false;
							break;
					}
				};
				var onKeyUp = function ( event ) {
          switch( event.keyCode ) {
          						case 38: // up
          						case 87: // w
          							moveForward = false;
          							break;
          						case 37: // left
          						case 65: // a
          							moveLeft = false;
          							break;
          						case 40: // down
          						case 83: // s
          							moveBackward = false;
          							break;
          						case 39: // right
          						case 68: // d
          							moveRight = false;
          							break;
          					}
          				};
          				document.addEventListener( 'keydown', onKeyDown, false );
          				document.addEventListener( 'keyup', onKeyUp, false );
          				raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

    var light = new THREE.PointLight(0xff0000, 1, 100);
    light.position.set(5, 50, 50);
    scene.add(light);
    var sphereSize = 1;
    var pointLightHelper = new THREE.PointLightHelper(light, light);
    // scene.add(pointLightHelper);
    var light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(-5, 5, 5);
    light.castShadow = true;
    scene.add(light);
    var sphereSize = 1;
    var pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
    // scene.add(pointLightHelper);

    //////LOAD FLOOR ////////
    var loader2 = new THREE.TextureLoader();
    loader2.load('img/Floor.jpg', onTextureLoaded2);

    function onTextureLoaded2(texture) {
        console.log('floor txt loaded')
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(400, 400);

        var geometry = new THREE.BoxGeometry(300, 2, 300);

        var material = new THREE.MeshStandardMaterial({
            roughness: .64,
            metalness: .81,
            transparent: true,
            opacity: .4,
            color: 0xdebe8f,
            emmissive: 0xdebe8f,
            side: THREE.DoubleSide
        });
        var plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        plane.receiveShadow = true;
        plane.position.y = 0;


    } //////////DONE LOADING FLOOR //////////

    var geo = new THREE.BoxGeometry(10, 10, 10)
    var mat = new THREE.MeshBasicMaterial({
        color: 0xb7b7b7
    })
    var mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(0, 0, -30)
        // scene.add(mesh)

    // Add a repeating grid as a skybox.
    var boxSize = 5;
    var loader = new THREE.TextureLoader();
    loader.load('img/bg2.png', onTextureLoaded);

    function onTextureLoaded(texture) {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        var geometry = new THREE.SphereGeometry(boxSize, boxSize, boxSize);
        var material = new THREE.MeshBasicMaterial({
            // map: texture,
            color: 0xffffff,
            side: THREE.BackSide
        });

        var geometry = new THREE.SphereGeometry(380, 32, 32);

        var skysphere = new THREE.Mesh(geometry, material);
        scene.add(skysphere);

    }


    var textureCube = new THREE.CubeTextureLoader().load(urls);
    textureCube.mapping = THREE.CubeReflectionMapping;
    var reflectionMat = new THREE.MeshBasicMaterial({
        color: 0x9be2ff,
        envMap: textureCube,
        refractionRatio: 0.98,
        transparent: true,
        opacity: .2,
        reflectivity: 0.9
    })
    var reflectionMatBrain = new THREE.MeshBasicMaterial({
            color: 0xffc0cb,
            envMap: textureCube,
            refractionRatio: 0.92,
            reflectivity: 0.7
        })
        // for (var j = 2; j <= 10; j += 10) {
    var objectLoader2 = new THREE.ObjectLoader();
    objectLoader2.load("asset_src/model.json", function(obj) {

        //give it a global name, so I can access it later
        serverObject = obj

        serverObject.castShadow = true;
        serverObject.children[1].material = reflectionMat
        serverObject.children[0].material = reflectionMatBrain

        //see what's inside of it
        obj.traverse(function(child) {
            if (child instanceof THREE.Mesh) {
                console.log(child)
            }
        })

        for (var i = 0; i <= numberOfservers; i++) {

            var tempNew = serverObject.clone();

            xCenter = Math.cos(toRadians(i * spacing)) * 7;

            zCenter = Math.sin(toRadians(i * spacing)) * 7;

            tempNew.scale.set(.17, .17, .17);

            tempNew.position.set(xCenter, 1, zCenter);

            allBrains.push(tempNew);

            scene.add(allBrains[i]);

        }

        console.log(allBrains.length)

    });


    // }


    var geo = new THREE.CylinderGeometry(3, 3, .6, 6)
    var material = new THREE.MeshStandardMaterial({
        roughness: .64,
        metalness: .81,
        transparent: true,
        opacity: .4,
        color: 0xdebe8f,
        emmissive: 0xdebe8f,
        side: THREE.DoubleSide
    });
    hexyCenter = new THREE.Mesh(geo, material)
    hexyCenter.position.set(0, 10, 0)
    scene.add(hexyCenter)

    addLights()




    // Create 3D objects.
    var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    var material = new THREE.MeshNormalMaterial();
    cube = new THREE.Mesh(geometry, material);

    // Position cube mesh to be right in front of you.
    cube.position.set(0, 1, -1);

    // scene.add(cube);

    addHelpers(1000, 100, [dirLight])





}
//init over

window.addEventListener('resize', onResize, true);

function toRadians(angle) {
    return angle * (Math.PI / 180);
}




function animate(timestamp) {

  if ( controlsEnabled ) {
    raycaster.ray.origin.copy( controls.getObject().position );
    raycaster.ray.origin.y -= 10;

    var intersections = raycaster.intersectObjects( objects );

    var isOnObject = intersections.length > 0;

    var time = performance.now();
    var delta = ( time - prevTime ) / 1000;

    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

    if ( moveForward ) velocity.z -= 400.0 * delta;
    if ( moveBackward ) velocity.z += 400.0 * delta;

    if ( moveLeft ) velocity.x -= 400.0 * delta;
    if ( moveRight ) velocity.x += 400.0 * delta;

    if ( isOnObject === true ) {
      velocity.y = Math.max( 0, velocity.y );

      canJump = true;
    }

    controls.getObject().translateX( velocity.x * delta );
    controls.getObject().translateY( velocity.y * delta );
    controls.getObject().translateZ( velocity.z * delta );

    if ( controls.getObject().position.y < 10 ) {

      velocity.y = 0;
      controls.getObject().position.y = 10;

      canJump = true;

    }

    prevTime = time;

  }

    hexyCenter.rotation.z += .01
        // console.log('called')

    for (var i in allBrains) {
        if (allBrains[i].children[0].position.z > 7.6) {
            brainHeight = -0.005
        }
        if (allBrains[i].children[0].position.z < 7.3) {
            brainHeight = .005
        }

        allBrains[i].children[0].position.z += brainHeight
    }
    var delta = Math.min(timestamp - lastRender, 500);
    lastRender = timestamp;


    cube.rotation.y += delta * 0.0006;


    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

function render() {
    // stats.update();

    // render using requestAnimationFrame
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function onResize(e) {
  camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
}

function addHelpers(grid_width, dims, light_name) {
    if (light_name) {
        for (var i in light_name) {
            var directionalLightHelper = new THREE.DirectionalLightHelper(light_name[i], 50);
            scene.add(directionalLightHelper)
        }
    }


    var axes = new THREE.AxisHelper(200);
    scene.add(axes);
    var gridXY = new THREE.GridHelper(grid_width, dims, 0xff0000, 0xffffff);
    gridXY.rotation.x = Math.PI;
    gridXY.position.set(0, 0, 0);
    // gridXY.setColors(new THREE.Color(0xff0000), new THREE.Color(0xffffff));
    scene.add(gridXY);
}

function addLights() {
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 500, 0);
    scene.add(hemiLight);

    dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(50);
    scene.add(dirLight);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    var d = 50;
    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;
    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = -0.0001;

    directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 11, 0);
    directionalLight.castShadow = true;
    directionalLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(50, 1, 1200, 2500));
    directionalLight.castShadow = true
        // scene.add(directionalLight);

    directionalLight2 = new THREE.DirectionalLight(0x02f402, .2);
    directionalLight2.position.set(0, 12, 0);
    // directionalLight2.target = allBrains[0]
    directionalLight2.castShadow = true
        // scene.add(directionalLight2);

    directionalLightR = new THREE.DirectionalLight(0xffc1e5, 1);
    directionalLightR.position.set(0, 10, 0);
    // directionalLight2.target.set(0, 0, 0)
    directionalLightR.castShadow = true

    // scene.add(directionalLightR);
}
