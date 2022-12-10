import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import bg from "../assets/space/bg.jpg";
// import bg8k from '../assets/space/bg8k.jpg';
// import sun from '../assets/space/sun.jpg';
import sun from "../assets/space/sun.png";

import mercury from "../assets/planets/mercury.jpg";
import venus from "../assets/planets/venus.jpg";
import mars from "../assets/planets/mars.jpg";
import jupiter from "../assets/planets/jupiter.jpg";
import saturn from "../assets/planets/saturn.jpg";
import uranus from "../assets/planets/uranus.jpg";
import neptune from "../assets/planets/neptune.jpg";

import first from "../assets/space/first.jpg";
import second from "../assets/space/2.jpg";
import ice from "../assets/space/ice.jpg";
import today from "../assets/space/today.jpg";
import future from "../assets/space/future.jpg";

import moon from "../assets/space/moon.jpg";

let textures;

function loadTextures(isLoading, setIsLoading) {
    const getTextures = () =>
        new Promise((resolve, reject) => {
            const loader = new THREE.TextureLoader();
            THREE.DefaultLoadingManager.onLoad = () => resolve(textures);
            const textures = [bg, sun, mercury, venus, moon, first, second, ice, today, future, mars, jupiter, saturn, uranus, neptune].map(
                (filename) => loader.load(filename)
            );
        });

    getTextures().then((result) => {
        textures = result;
        console.log("We received,", textures, "!");
        setIsLoading(false);
    });
}

function createScene() {
    const farPoint = 3000;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        20,
        farPoint
    );

    camera.position.set(200, 500 * (1536 / window.innerWidth), 700);
    const homePageEle = document.getElementById("homepage");
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(homePageEle.offsetWidth, homePageEle.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    homePageEle.appendChild(renderer.domElement);
    
    const ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff);
    // console.log(pointLight.position);
    scene.add(pointLight);

    // const sphereSize = 5;
    // const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    // scene.add( pointLightHelper );

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;

    const textureLoader = new THREE.TextureLoader();

    const bgGeometry = new THREE.SphereGeometry(2000, 100, 100);
    const bgMaterial = new THREE.MeshStandardMaterial({
        // map: textureLoader.load(bg),
        map: textures[0],
        side: THREE.DoubleSide,
    });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    scene.add(bgMesh);

    // renderer.render(scene, camera);

    // sun
    const sunSystem = new THREE.Object3D();
    const sunGeometry = new THREE.SphereGeometry(109, 200, 200);
    const sunMaterial = new THREE.MeshStandardMaterial({
        // emissive: 0x63ccf5,
        emissive: 0xffffff,
        emissiveMap: textures[1],
        emissiveIntensity: 1,
    });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    sunSystem.add(sunMesh);
    scene.add(sunSystem);

    const r = 25;
    const s = 50;
    const tilt = 0.41;

    const axisPoints = [
        new THREE.Vector3(0, 35, 0),
        new THREE.Vector3(0, -35, 0),
    ];

    const axisGeom = new THREE.BufferGeometry().setFromPoints(axisPoints);
    const axis = new THREE.Line(
        axisGeom,
        new THREE.LineBasicMaterial({
            color: 0x330000,
            transparent: true,
            opacity: 0,
        })
    );
    // axis.rotation.z = tilt

    // mercury

    const mercurySystem = new THREE.Object3D();

    const mercuryGeometry = new THREE.SphereGeometry(0.3829 * r, 100, 100);
    const mercuryMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[2],
        emissiveIntensity: 0.3,
    });

    const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    mercurySystem.add(mercuryMesh);
    mercurySystem.add(axis.clone());

    mercurySystem.rotation.z = tilt;
    scene.add(mercurySystem);

    const mercury_curve = new THREE.EllipseCurve(
        0,
        0,
        200,
        150,
        0 + Math.PI / 6,
        2 * Math.PI + Math.PI / 6
    );

    const mercury_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            mercury_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.5,
        })
    );
    mercury_orbit.rotateX(-Math.PI / 2);
    scene.add(mercury_orbit);

    // venus

    const venusSystem = new THREE.Object3D();

    const venusGeometry = new THREE.SphereGeometry(0.949 * r, 100, 100);
    const venusMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[3],
        emissiveIntensity: 0.3,
    });

    const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
    venusSystem.add(venusMesh);
    venusSystem.add(axis.clone());

    venusSystem.rotation.z = tilt;
    scene.add(venusSystem);

    const venus_curve = new THREE.EllipseCurve(
        0,
        0,
        300,
        250,
        0 + (4 * Math.PI) / 6,
        2 * Math.PI + (4 * Math.PI) / 6
    );

    const venus_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            venus_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.5,
        })
    );
    venus_orbit.rotateX(-Math.PI / 2);
    scene.add(venus_orbit);

    // moon
    const moonGeometry = new THREE.SphereGeometry(5, 40, 20);
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: textures[4],
    });

    // first earth system

    const firstEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    firstEarthMoonMesh.position.set(40, 0, 0);

    const firstEarthSystem = new THREE.Object3D();

    // firstEarth
    const firstEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const firstEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[5],
        emissiveIntensity: 0.3,
    });
    const firstEarthMesh = new THREE.Mesh(
        firstEarthGeometry,
        firstEarthMaterial
    );
    firstEarthSystem.add(firstEarthMesh);

    // firstEarth axis
    firstEarthSystem.add(axis.clone());

    firstEarthSystem.add(firstEarthMoonMesh);
    firstEarthSystem.rotation.z = tilt;
    scene.add(firstEarthSystem);

    const firstEarth_curve = new THREE.EllipseCurve(
        0,
        0,
        400,
        350,
        0,
        2 * Math.PI
    );

    const firstEarth_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            firstEarth_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.5,
        })
    );
    firstEarth_orbit.rotateX(-Math.PI / 2);
    scene.add(firstEarth_orbit);

    // second earth system

    const secondEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    secondEarthMoonMesh.position.set(40, 0, 0);

    const secondEarthSystem = new THREE.Object3D();

    // secondEarth
    const secondEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const secondEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[6],
        emissiveIntensity: 0.3,
    });
    const secondEarthMesh = new THREE.Mesh(
        secondEarthGeometry,
        secondEarthMaterial
    );
    secondEarthSystem.add(secondEarthMesh);

    // secondEarth axis
    secondEarthSystem.add(axis.clone());

    secondEarthSystem.add(secondEarthMoonMesh);
    secondEarthSystem.rotation.z = tilt;
    scene.add(secondEarthSystem);

    const secondEarth_curve = new THREE.EllipseCurve(
        0,
        0,
        400,
        350,
        0 - (2 * Math.PI) / 5,
        2 * Math.PI - (2 * Math.PI) / 5
    );

    // third earth system

    const thirdEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    thirdEarthMoonMesh.position.set(40, 0, 0);

    const thirdEarthSystem = new THREE.Object3D();

    // thirdEarth
    const thirdEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const thirdEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[7],
        emissiveIntensity: 0.3,
    });
    const thirdEarthMesh = new THREE.Mesh(
        thirdEarthGeometry,
        thirdEarthMaterial
    );
    thirdEarthSystem.add(thirdEarthMesh);

    // thirdEarth axis
    thirdEarthSystem.add(axis.clone());

    thirdEarthSystem.add(thirdEarthMoonMesh);
    thirdEarthSystem.rotation.z = tilt;
    scene.add(thirdEarthSystem);

    const thirdEarth_curve = new THREE.EllipseCurve(
        0,
        0,
        400,
        350,
        0 - (4 * Math.PI) / 5,
        2 * Math.PI - (4 * Math.PI) / 5
    );

    // fourth earth system

    const fourthEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    fourthEarthMoonMesh.position.set(40, 0, 0);

    const fourthEarthSystem = new THREE.Object3D();

    // fourthEarth
    const fourthEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const fourthEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[8],
        emissiveIntensity: 0.3,
    });
    const fourthEarthMesh = new THREE.Mesh(
        fourthEarthGeometry,
        fourthEarthMaterial
    );
    fourthEarthSystem.add(fourthEarthMesh);

    // fourthEarth axis
    fourthEarthSystem.add(axis.clone());

    fourthEarthSystem.add(fourthEarthMoonMesh);
    fourthEarthSystem.rotation.z = tilt;
    scene.add(fourthEarthSystem);

    const fourthEarth_curve = new THREE.EllipseCurve(
        0,
        0,
        400,
        350,
        0 - (6 * Math.PI) / 5,
        2 * Math.PI - (6 * Math.PI) / 5
    );

    // fifth earth system

    const fifthEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    fifthEarthMoonMesh.position.set(20, 0, 0);

    const fifthEarthSystem = new THREE.Object3D();

    // fifthEarth
    const fifthEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const fifthEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[9],
        emissiveIntensity: 0.3,
    });
    const fifthEarthMesh = new THREE.Mesh(
        fifthEarthGeometry,
        fifthEarthMaterial
    );
    fifthEarthSystem.add(fifthEarthMesh);

    // fifthEarth axis
    fifthEarthSystem.add(axis.clone());

    fifthEarthSystem.add(fifthEarthMoonMesh);
    fifthEarthSystem.rotation.z = tilt;
    scene.add(fifthEarthSystem);

    const fifthEarth_curve = new THREE.EllipseCurve(
        0,
        0,
        400,
        350,
        0 - (8 * Math.PI) / 5,
        2 * Math.PI - (8 * Math.PI) / 5
    );

    // mars

    const marsSystem = new THREE.Object3D();

    const marsGeometry = new THREE.SphereGeometry(0.532 * r, 100, 100);
    const marsMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[10],
        emissiveIntensity: 0.3,
    });

    const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
    marsSystem.add(marsMesh);
    marsSystem.add(axis.clone());

    marsSystem.rotation.z = tilt;
    scene.add(marsSystem);

    const mars_curve = new THREE.EllipseCurve(
        0,
        0,
        500,
        450,
        0 - (2 * Math.PI) / 6,
        2 * Math.PI - (2 * Math.PI) / 6
    );

    const mars_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            mars_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.5,
        })
    );
    mars_orbit.rotateX(-Math.PI / 2);
    scene.add(mars_orbit);

    // jupiter

    const jupiterSystem = new THREE.Object3D();

    const jupiterGeometry = new THREE.SphereGeometry(2 * r, 100, 100);
    const jupiterMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[11],
        emissiveIntensity: 0.3,
    });

    const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    jupiterSystem.add(jupiterMesh);
    jupiterSystem.add(axis.clone());

    jupiterSystem.rotation.z = tilt;
    scene.add(jupiterSystem);

    const jupiter_curve = new THREE.EllipseCurve(
        0,
        0,
        850,
        800,
        0 + (6 * Math.PI) / 6,
        2 * Math.PI + (6 * Math.PI) / 6
    );

    const jupiter_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            jupiter_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.5,
        })
    );
    jupiter_orbit.rotateX(-Math.PI / 2);
    scene.add(jupiter_orbit);

    // saturn

    const saturnSystem = new THREE.Object3D();

    const saturnGeometry = new THREE.SphereGeometry(1.5 * r, 100, 100);
    const saturnMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[12],
        emissiveIntensity: 0.3,
    });

    const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial);
    saturnSystem.add(saturnMesh);
    saturnSystem.add(axis.clone());

    // // add saturn rings
    // const geometry = new THREE.RingGeometry(2*r, 3*r, 64);
    // var pos = geometry.attributes.position;
    // var v3 = new THREE.Vector3();
    // for (let i = 0; i < pos.count; i++){
    //     v3.fromBufferAttribute(pos, i);
    //     geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
    // }

    // const saturnRingsMaterial = new THREE.MeshStandardMaterial({
    //     // emissive: 0xffffff,
    //     map: textureLoader.load(saturnRings),
    //     side: THREE.DoubleSide,

    //     // emissiveIntensity: 0.2,
    // });
    // const saturnRingsMesh = new THREE.Mesh(geometry, saturnRingsMaterial);
    // saturnRingsMesh.rotation.x = Math.PI/2;
    // saturnSystem.add(saturnRingsMesh);

    saturnSystem.rotation.z = tilt;
    scene.add(saturnSystem);

    const saturn_curve = new THREE.EllipseCurve(
        0,
        0,
        1000,
        950,
        0 - Math.PI / 6,
        2 * Math.PI - Math.PI / 6
    );

    const saturn_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            saturn_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.5,
        })
    );
    saturn_orbit.rotateX(-Math.PI / 2);
    scene.add(saturn_orbit);

    // uranus

    const uranusSystem = new THREE.Object3D();

    const uranusGeometry = new THREE.SphereGeometry(1.2 * r, 100, 100);
    const uranusMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[13],
        emissiveIntensity: 0.3,
    });

    const uranusMesh = new THREE.Mesh(uranusGeometry, uranusMaterial);
    uranusSystem.add(uranusMesh);
    uranusSystem.add(axis.clone());

    uranusSystem.rotation.z = tilt;
    scene.add(uranusSystem);

    const uranus_curve = new THREE.EllipseCurve(
        0,
        0,
        1200,
        1100,
        0 + (4 * Math.PI) / 6,
        2 * Math.PI + (4 * Math.PI) / 6
    );

    const uranus_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            uranus_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.5,
        })
    );
    uranus_orbit.rotateX(-Math.PI / 2);
    scene.add(uranus_orbit);

    // neptune

    const neptuneSystem = new THREE.Object3D();

    const neptuneGeometry = new THREE.SphereGeometry(1.2 * r, 100, 100);
    const neptuneMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textures[14],
        emissiveIntensity: 0.3,
    });

    const neptuneMesh = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
    neptuneSystem.add(neptuneMesh);
    neptuneSystem.add(axis.clone());

    neptuneSystem.rotation.z = tilt;
    scene.add(neptuneSystem);

    const neptune_curve = new THREE.EllipseCurve(
        0,
        0,
        1400,
        1300,
        0 + (2 * Math.PI) / 6,
        2 * Math.PI + (2 * Math.PI) / 6
    );

    const neptune_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            neptune_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({
            color: 0x333333,
            transparent: true,
            opacity: 0.5,
        })
    );
    neptune_orbit.rotateX(-Math.PI / 2);
    scene.add(neptune_orbit);

    const loopTime = 1;
    var EarthOrbitSpeed = 0.00001;
    const planetOrbitSpeed = 0.00001;
    const moonOrbitRadius = 55;
    const moonOrbitSpeed = 80;

    let time2;
    let t2;
    let delta_t2 = 0;
    let autoScroll = false;
    let autoScrollEarth = false;

    function animate() {
        const time = planetOrbitSpeed * performance.now();
        const t = (time % loopTime) / loopTime;

        sunMesh.rotation.y += 0.0008;

        // mercury

        let mercury_p = mercury_curve.getPoint(t);
        // console.log(mercury_p, t);

        mercurySystem.position.x = mercury_p.x;
        mercurySystem.position.z = mercury_p.y;

        mercuryMesh.rotation.y += 0.0008;

        // venus

        let venus_p = venus_curve.getPoint(t);
        // console.log(venus_p, t);

        venusSystem.position.x = venus_p.x;
        venusSystem.position.z = venus_p.y;

        venusMesh.rotation.y += 0.0008;

        if (EarthOrbitSpeed != 0) {
            time2 = EarthOrbitSpeed * performance.now();
            t2 = ((time2 % loopTime) / loopTime + delta_t2) % loopTime;
        }

        // console.log(t2);

        let firstEarth_p;
        firstEarth_p = firstEarth_curve.getPoint(t2);
        // if (t2 == 0.173) {
        //     console.log(firstEarth_p);
        // }
        // console.log(firstEarth_p, t);

        firstEarthSystem.position.x = firstEarth_p.x;
        firstEarthSystem.position.z = firstEarth_p.y;

        firstEarthMoonMesh.position.x =
            -Math.cos(time * moonOrbitSpeed) * moonOrbitRadius;
        firstEarthMoonMesh.position.z =
            -Math.sin(time * moonOrbitSpeed) * moonOrbitRadius;

        firstEarthMesh.rotation.y += 0.0008;
        firstEarthMoonMesh.rotation.y += 0.0001;

        // second earth

        let secondEarth_p = secondEarth_curve.getPoint(t2);
        // console.log(secondEarth_p, t);

        secondEarthSystem.position.x = secondEarth_p.x;
        secondEarthSystem.position.z = secondEarth_p.y;

        secondEarthMoonMesh.position.x =
            -Math.cos(time * moonOrbitSpeed) * moonOrbitRadius;
        secondEarthMoonMesh.position.z =
            -Math.sin(time * moonOrbitSpeed) * moonOrbitRadius;

        secondEarthMesh.rotation.y += 0.0008;
        secondEarthMoonMesh.rotation.y += 0.0001;

        // third earth

        let thirdEarth_p = thirdEarth_curve.getPoint(t2);
        // console.log(thirdEarth_p, t);

        thirdEarthSystem.position.x = thirdEarth_p.x;
        thirdEarthSystem.position.z = thirdEarth_p.y;

        thirdEarthMoonMesh.position.x =
            -Math.cos(time * moonOrbitSpeed) * moonOrbitRadius;
        thirdEarthMoonMesh.position.z =
            -Math.sin(time * moonOrbitSpeed) * moonOrbitRadius;

        thirdEarthMesh.rotation.y += 0.0008;
        thirdEarthMoonMesh.rotation.y += 0.0001;

        // fourth earth

        let fourthEarth_p = fourthEarth_curve.getPoint(t2);
        // console.log(fourthEarth_p, t);

        fourthEarthSystem.position.x = fourthEarth_p.x;
        fourthEarthSystem.position.z = fourthEarth_p.y;

        fourthEarthMoonMesh.position.x =
            -Math.cos(time * moonOrbitSpeed) * moonOrbitRadius;
        fourthEarthMoonMesh.position.z =
            -Math.sin(time * moonOrbitSpeed) * moonOrbitRadius;

        fourthEarthMesh.rotation.y += 0.0008;
        fourthEarthMoonMesh.rotation.y += 0.0001;

        // fifth earth

        let fifthEarth_p = fifthEarth_curve.getPoint(t2);
        // console.log(fifthEarth_p, t);

        fifthEarthSystem.position.x = fifthEarth_p.x;
        fifthEarthSystem.position.z = fifthEarth_p.y;

        fifthEarthMoonMesh.position.x =
            -Math.cos(time * moonOrbitSpeed * 2) * moonOrbitRadius * 0.7;
        fifthEarthMoonMesh.position.z =
            -Math.sin(time * moonOrbitSpeed * 2) * moonOrbitRadius * 0.7;

        fifthEarthMesh.rotation.y += 0.0008;
        fifthEarthMoonMesh.rotation.y += 0.0001;

        // mars

        let mars_p = mars_curve.getPoint(t);
        // console.log(mars_p, t);

        marsSystem.position.x = mars_p.x;
        marsSystem.position.z = mars_p.y;

        marsMesh.rotation.y += 0.0008;

        // jupiter

        let jupiter_p = jupiter_curve.getPoint(t);
        // console.log(jupiter_p, t);

        jupiterSystem.position.x = jupiter_p.x;
        jupiterSystem.position.z = jupiter_p.y;

        jupiterMesh.rotation.y += 0.0008;

        // saturn

        let saturn_p = saturn_curve.getPoint(t);

        saturnSystem.position.x = saturn_p.x;
        saturnSystem.position.z = saturn_p.y;

        saturnMesh.rotation.y += 0.0008;

        // uranus

        let uranus_p = uranus_curve.getPoint(t);

        uranusSystem.position.x = uranus_p.x;
        uranusSystem.position.z = uranus_p.y;

        uranusMesh.rotation.y += 0.0008;

        // neptune

        let neptune_p = neptune_curve.getPoint(t);

        neptuneSystem.position.x = neptune_p.x;
        neptuneSystem.position.z = neptune_p.y;

        neptuneMesh.rotation.y += 0.0008;

        requestAnimationFrame(animate);
        camera.lookAt(150, 0, 0);
        // camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    }

    animate();

    const camY = camera.position.y;
    const camLookAty = -200;
    let camLookAt = [200, -200, -100];

    const cameraInitial = [200, camY, 700]; // initial camera position
    const cameraFinal = [240, 0, 400]; // camera position for planet closeup
    const earthDesiredPosition = [186.0604312309834, 0, 309.8309589663593];

    // const targetObject = new THREE.Object3D();
    // targetObject.position.set(cameraFinal[0], cameraFinal[1], cameraFinal[2]);
    // scene.add(targetObject);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0);
    directionalLight.position.set(
        cameraFinal[0],
        cameraFinal[1],
        cameraFinal[2]
    );
    directionalLight.target = sunSystem;
    scene.add(directionalLight);

    const firstEarthDesiredT = 0.173;
    const secondEarthDesiredT = 0.373;
    const thirdEarthDesiredT = 0.573;
    const fourthEarthDesiredT = 0.773;
    const fifthEarthDesiredT = 0.973;

    const updateCameraPosition = (deltaY) => {
        const slopeX =
            (cameraFinal[0] - cameraInitial[0]) /
            (cameraFinal[1] - cameraInitial[1]);
        const slopeZ =
            (cameraFinal[2] - cameraInitial[2]) /
            (cameraFinal[1] - cameraInitial[1]);

        camera.position.x = Math.max(
            cameraInitial[0],
            Math.min(
                cameraFinal[0],
                camera.position.x - slopeX * (deltaY / 10)
            )
        );
        camera.position.y = Math.min(
            cameraInitial[1],
            Math.max(cameraFinal[1], camera.position.y - deltaY / 10)
        );
        camera.position.z = Math.min(
            cameraInitial[2],
            Math.max(
                cameraFinal[2],
                camera.position.z - slopeZ * (deltaY / 10)
            )
        );
    };

    let stepSize = 75;
    let zoomTime = 10;
    let scrollLimit = 0;

    let old_t2;
    let tx1, tx2;
    let reachedLastEarth = false;

    const scrollEle = document.getElementById("scroll-down");

    const handleScroll = (e) => {
        // console.log(autoScroll);
        // console.log("scrolling");
        if (
            e.deltaY > 0 &&
            camera.position.y - e.deltaY / 10 < 0.95 * camY &&
            (autoScroll || camera.position.y > 0.05 * camY) &&
            !reachedLastEarth
        ) {
            // down scroll kiya and ek limit ke neeche
            // console.log(1);
            // auto down scroll
            if (!autoScroll) {
                autoScroll = true;
                old_t2 = t2;
                EarthOrbitSpeed = 0;
            }

            setTimeout(() => {
                if (camera.position.y - 5 <= 0) {
                    // the last update before scrolling is enabled again
                    autoScroll = false;
                    updateCameraPosition(stepSize);
                    // EarthOrbitSpeed = planetOrbitSpeed;
                } else {
                    // a normal update
                    updateCameraPosition(stepSize);
                    handleScroll(e);
                }
                // move t2 from old_t2 to desired t2
                // in case old_t2 is ahead of firstEarthDesiredT
                if (old_t2 > firstEarthDesiredT) {
                    let prev_t2 = t2;
                    t2 =
                        (old_t2 +
                            (1 - (old_t2 - firstEarthDesiredT)) *
                                (1 - camera.position.y / camY)) %
                        loopTime;
                    if (
                        prev_t2 <= firstEarthDesiredT &&
                        t2 > firstEarthDesiredT
                    ) {
                        t2 = firstEarthDesiredT;
                    }
                    // console.log(t2);
                } else {
                    t2 =
                        (old_t2 +
                            (firstEarthDesiredT - old_t2) *
                                (1 - camera.position.y / camY)) %
                        loopTime;
                    t2 = Math.min(t2, firstEarthDesiredT);
                    // console.log(t2);
                }

                // change directionalLight intensity from 0 to 1
                // sunMaterial.emissiveIntensity = camera.position.y / camY;
                pointLight.intensity = camera.position.y / camY;
                directionalLight.intensity =
                    0.5 * (1 - camera.position.y / camY);

                // change sun emissive intensity from 1 to 0.5
                sunMaterial.emissiveIntensity =
                    0.75 + 0.25 * (camera.position.y / camY);
                // sunMaterial.emissiveIntensity = 0.3;
            }, zoomTime);
        } else if (
            e.deltaY < 0 &&
            camera.position.y - e.deltaY / 10 > 0.05 * camY &&
            (autoScroll || camera.position.y < 0.95 * camY) &&
            !reachedLastEarth
        ) {
            // console.log(2);
            // auto up scroll
            if (!autoScroll) {
                // executed the first time we come into auto scrolling
                autoScroll = true;
                EarthOrbitSpeed = planetOrbitSpeed;
                delta_t2 =
                    (loopTime +
                        firstEarthDesiredT -
                        ((planetOrbitSpeed * performance.now()) %
                            loopTime) /
                            loopTime) %
                    loopTime;
                // console.log(delta_t2);
            }

            setTimeout(() => {
                if (camera.position.y + 5 >= camY) {
                    // the last update before scrolling is enabled again
                    // console.log(2.1)
                    autoScroll = false;
                    updateCameraPosition(-1 * stepSize);
                } else {
                    // console.log(2.2)
                    updateCameraPosition(-1 * stepSize);
                    handleScroll(e);
                }
                // (current - initial) / (final - initial) = (current - 0) / (1 - 0)

                // change directionalLight intensity from 0 to 1
                // sunMaterial.emissiveIntensity = camera.position.y / camY;
                pointLight.intensity = camera.position.y / camY;
                directionalLight.intensity =
                    0.5 * (1 - camera.position.y / camY);

                // change sun emissive intensity from 0.5 to 1
                sunMaterial.emissiveIntensity =
                    0.75 + 0.25 * (camera.position.y / camY);
            }, zoomTime);
        } else if (camera.position.y === 0 && !reachedLastEarth) {
            // console.log(3);
            if (
                t2 == firstEarthDesiredT &&
                e.deltaY < 0 &&
                !autoScrollEarth
            ) {
                updateCameraPosition(e.deltaY);
            } else if (
                (scrollLimit >= 200 && e.deltaY > 0) ||
                (scrollLimit <= -200 && e.deltaY < 0)
            ) {
                // console.log(3.1);

                if (!autoScrollEarth) {
                    // console.log(1.3);

                    if (e.deltaY > 0) {
                        if (t2 == firstEarthDesiredT) {
                            tx1 = firstEarthDesiredT;
                            tx2 = secondEarthDesiredT;
                        } else if (t2 == secondEarthDesiredT) {
                            tx1 = secondEarthDesiredT;
                            tx2 = thirdEarthDesiredT;
                        } else if (t2 == thirdEarthDesiredT) {
                            tx1 = thirdEarthDesiredT;
                            tx2 = fourthEarthDesiredT;
                        } else if (t2 == fourthEarthDesiredT) {
                            tx1 = fourthEarthDesiredT;
                            tx2 = fifthEarthDesiredT;
                        }
                    } else {
                        if (t2 == fifthEarthDesiredT) {
                            tx1 = fifthEarthDesiredT;
                            tx2 = fourthEarthDesiredT;
                        } else if (t2 == fourthEarthDesiredT) {
                            tx1 = fourthEarthDesiredT;
                            tx2 = thirdEarthDesiredT;
                        } else if (t2 == thirdEarthDesiredT) {
                            tx1 = thirdEarthDesiredT;
                            tx2 = secondEarthDesiredT;
                        } else if (t2 == secondEarthDesiredT) {
                            tx1 = secondEarthDesiredT;
                            tx2 = firstEarthDesiredT;
                        }
                    }

                    autoScrollEarth = true;
                    old_t2 = tx1;
                    // console.log("Old_t2: " + old_t2);
                }

                setTimeout(() => {
                    if (t2 == tx2 && autoScrollEarth) {
                        // the last update before scrolling is enabled again
                        // console.log("boowomp");
                        autoScrollEarth = false;
                        scrollLimit = 0;
                        if (t2 == fifthEarthDesiredT)
                            reachedLastEarth = true;
                    } else {
                        // if (t2 <= 0.25*(tx2-tx1) + tx1) {
                        //     // starting off
                        //     t2 += (tx2 - tx1) / 100;
                        // }
                        // else if (t2 >= 0.75*(tx2-tx1) + tx1) {
                        //     // ending
                        //     t2 += (tx2 - tx1) / 100;
                        // }
                        // else {
                        //     t2 += (tx2 - tx1) / 50;
                        // }

                        t2 += (tx2 - tx1) / 100;

                        if (e.deltaY > 0) {
                            t2 = Math.min(t2, tx2);
                        } else {
                            t2 = Math.max(t2, tx2);
                        }

                        // console.log(old_t2, t2);
                        handleScroll(e);
                    }
                }, zoomTime);
            } else {
                // console.log(1.1)
                scrollLimit += e.deltaY;
                // console.log(scrollLimit);
            }
        } else if (reachedLastEarth && e.deltaY > 0) {
            // console.log(4)
            // // zooming out to show footer
            // camera.position.y += 30;
            // // change camera x and z to 0 smoothly
            // camera.position.x = Math.max(0, camera.position.x - cameraFinal[0] / 100);
            // camera.position.z = Math.max(0, camera.position.z - cameraFinal[2] / 100);

            // zooming out to show footer
            if (scrollLimit >= 200) {
                autoScroll = true;
                // handleScroll(e);
            } else {
                scrollLimit += e.deltaY;
            }
            if (autoScroll) {
                // console.log("boowomp");
                setTimeout(() => {
                    if (camera.position.y > 3100) {
                        autoScroll = false;
                        scrollLimit = 0;
                    } else {
                        handleScroll(e);

                        let step_y = 20;

                        camera.position.y += step_y;
                        // change camera x and z to 0 smoothly
                        camera.position.x = Math.max(
                            0,
                            camera.position.x -
                                cameraFinal[0] / (farPoint / step_y)
                        );
                        camera.position.z = Math.max(
                            0,
                            camera.position.z -
                                cameraFinal[2] / (farPoint / step_y)
                        );

                        // change opacity of ele to 0 smoothly
                        let step_opacity = 0.01;
                        let currentOpacity =
                            window.getComputedStyle(scrollEle).opacity;
                        currentOpacity = parseFloat(currentOpacity);
                        let newOpacity = Math.max(
                            0,
                            currentOpacity - step_opacity
                        );
                        scrollEle.style.opacity = newOpacity;
                        if (newOpacity == 0) {
                            console.log("boowomp");
                            document.getElementById(
                                "scroll-down"
                            ).style.display = "none";
                        }
                    }
                }, zoomTime * 1.5);
            }
        } else if (
            reachedLastEarth &&
            e.deltaY < 0 &&
            camera.position.y > 0
        ) {
            // console.log(5)
            // zooming back after zooming out from last earth
            // camera.position.y = Math.max(cameraFinal[1], camera.position.y - 30);

            // // change camera x and z to 0 smoothly
            // camera.position.x = Math.min(cameraFinal[0], camera.position.x + cameraFinal[0]/100);
            // camera.position.z = Math.min(cameraFinal[2], camera.position.z + cameraFinal[2]/100);
            if (scrollLimit <= -200) {
                autoScroll = true;
                // handleScroll(e);
            } else {
                scrollLimit += e.deltaY;
            }
            if (autoScroll) {
                // console.log("boowomp");
                setTimeout(() => {
                    if (camera.position.y == 0) {
                        autoScroll = false;
                        scrollLimit = 0;
                    } else {
                        handleScroll(e);

                        let step_y = 20;

                        camera.position.y = Math.max(
                            cameraFinal[1],
                            camera.position.y - step_y
                        );

                        // change camera x and z to 0 smoothly
                        camera.position.x = Math.min(
                            cameraFinal[0],
                            camera.position.x +
                                cameraFinal[0] / (farPoint / step_y)
                        );
                        camera.position.z = Math.min(
                            cameraFinal[2],
                            camera.position.z +
                                cameraFinal[2] / (farPoint / step_y)
                        );

                        // change opacity of ele to 1 smoothly
                        document.getElementById(
                            "scroll-down"
                        ).style.display = "block";

                        let step_opacity = 0.01;
                        let newOpacity;
                        let currentOpacity =
                            window.getComputedStyle(scrollEle).opacity;
                        currentOpacity = parseFloat(currentOpacity);
                        if (currentOpacity + step_opacity <= 1)
                            newOpacity = currentOpacity + step_opacity;
                        else newOpacity = 1;
                        scrollEle.style.opacity = newOpacity;
                        console.log(newOpacity);
                    }
                }, zoomTime * 1.5);
            }
        } else if (
            reachedLastEarth &&
            e.deltaY < 0 &&
            camera.position.y == 0
        ) {
            // console.log(6)
            // going back to 4th earth
            reachedLastEarth = false;
            scrollLimit += e.deltaY;
        } else if (
            (camera.position.y > 0.95 * camY ||
                camera.position.y < 0.05 * camY) &&
            !reachedLastEarth
        ) {
            // console.log(7)
            // console.log(3, camera.position);
            updateCameraPosition(e.deltaY);
        }
    };

    // homePageEle.addEventListener('wheel', (e) => {
    //     if (!autoScroll && !autoScrollEarth) handleScroll(e);
    // });

    // // for mobile devices
    // homePageEle.addEventListener('touchmove', (e) => {
    //     if (!autoScroll) handleScroll(e);
    // });

    //responsive
    window.onresize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(homePageEle.offsetWidth, homePageEle.offsetHeight);
    };
}

export {loadTextures, createScene};