import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import bg from '../assets/space/bg.jpg';
import bg8k from '../assets/space/bg8k.jpg';
import sun from '../assets/space/sun.jpg';
import sun_blue from '../assets/space/sun(5).png';

import mercury from '../assets/planets/mercury.jpg';
import venus from '../assets/planets/venus.jpg';
import mars from '../assets/planets/mars.jpg'
import jupiter from '../assets/planets/jupiter.jpg';
import saturn from '../assets/planets/saturn.jpg';
import saturnRings from '../assets/planets/saturn_rings.png';
import uranus from '../assets/planets/uranus.jpg';
import neptune from '../assets/planets/neptune.jpg';

import first from '../assets/space/first.jpg'; 
import second from '../assets/space/2.jpg'; 
import ice from '../assets/space/ice.jpg'; 
import weird from '../assets/space/weird.jpg'; 
import today from '../assets/space/today.jpg'; 
import future from '../assets/space/future.jpg'; 

import moon from '../assets/space/moon.jpg';

export default function solarSystem() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 20, 8000);
    camera.position.set(200, 500 * (1536 / window.innerWidth), 700);
    // camera.position.set(0, 0, 800);

    const homePageEle = document.getElementById("homepage");
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(homePageEle.offsetWidth, homePageEle.offsetHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    homePageEle.appendChild(renderer.domElement);

    // const axesHelper = new THREE.AxesHelper(5);
    // scene.add(axesHelper);
    // camera.position.z = 5;

    // renderer.render(scene, camera);

    const ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff);
    scene.add(pointLight);

    // const sphereSize = 5;
    // const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
    // scene.add( pointLightHelper );

    // const controls = new OrbitControls(camera, renderer.domElement);
    // controls.enableDamping = true;
    // controls.dampingFactor = 0.05;

    const textureLoader = new THREE.TextureLoader();

    const bgGeometry = new THREE.SphereGeometry(4000, 100, 100);
    const bgMaterial = new THREE.MeshStandardMaterial({
        // map: textureLoader.load(bg),
        map: textureLoader.load(bg8k),
        side: THREE.DoubleSide,
    });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    scene.add(bgMesh);

    // renderer.render(scene, camera);

    // sun
    const sunGeometry = new THREE.SphereGeometry(109,200,200);
    const sunMaterial = new THREE.MeshStandardMaterial({
        // emissive: 0x63ccf5,
        emissive: 0xffffff,
        emissiveMap: textureLoader.load(sun_blue),
        emissiveIntensity: 1,
    });
    const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sunMesh);
    
    const r = 25;
    const s = 50;
    const tilt = 0.41;
    
    const axisPoints = [
        new THREE.Vector3(0, 35, 0),
        new THREE.Vector3(0, -35, 0)
    ]

    const axisGeom = new THREE.BufferGeometry().setFromPoints(axisPoints);
    const axis = new THREE.Line(
        axisGeom, 
        new THREE.LineBasicMaterial({ color: 0x330000, transparent: true, opacity: 0 })
    );
    // axis.rotation.z = tilt
    
    // mercury

    const mercurySystem = new THREE.Object3D();

    const mercuryGeometry = new THREE.SphereGeometry(0.3829*r, 100, 100);
    const mercuryMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(mercury),
        emissiveIntensity: 0.3,
    });

    const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    mercurySystem.add(mercuryMesh);
    mercurySystem.add(axis.clone());

    mercurySystem.rotation.z = tilt;
    scene.add(mercurySystem);

    const mercury_curve = new THREE.EllipseCurve(
        0, 0,
        200, 150,
        0 + Math.PI/6, 2 * Math.PI + Math.PI/6,
    );

    const mercury_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            mercury_curve.getSpacedPoints(200)
        ), 
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    mercury_orbit.rotateX(-Math.PI/2);
    scene.add(mercury_orbit);

    // venus

    const venusSystem = new THREE.Object3D();

    const venusGeometry = new THREE.SphereGeometry(0.949*r, 100, 100);
    const venusMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(venus),
        emissiveIntensity: 0.3,
    });

    const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
    venusSystem.add(venusMesh);
    venusSystem.add(axis.clone());

    venusSystem.rotation.z = tilt;
    scene.add(venusSystem);

    const venus_curve = new THREE.EllipseCurve(
        0, 0,
        300, 250,
        0 + 4*Math.PI/6, 2 * Math.PI + 4*Math.PI/6,
    );

    const venus_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            venus_curve.getSpacedPoints(200)
        ), 
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    venus_orbit.rotateX(-Math.PI/2);
    scene.add(venus_orbit);

    // moon
    const moonGeometry = new THREE.SphereGeometry(5, 40, 20);
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(moon),
    })

    // first earth system
    
    const firstEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    firstEarthMoonMesh.position.set(40, 0, 0);

    const firstEarthSystem = new THREE.Object3D();

    // firstEarth
    const firstEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const firstEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(first),
        emissiveIntensity: 0.3,
    });
    const firstEarthMesh = new THREE.Mesh(firstEarthGeometry, firstEarthMaterial);
    firstEarthSystem.add(firstEarthMesh);

    // firstEarth axis
    firstEarthSystem.add(axis.clone());

    firstEarthSystem.add(firstEarthMoonMesh);
    firstEarthSystem.rotation.z = tilt;
    scene.add(firstEarthSystem);

    const firstEarth_curve = new THREE.EllipseCurve(
        0, 0,
        400, 350,
        0, 2 * Math.PI,
    );

    const firstEarth_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            firstEarth_curve.getSpacedPoints(200)
        ), 
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    firstEarth_orbit.rotateX(-Math.PI/2);
    scene.add(firstEarth_orbit);

    // second earth system
    
    const secondEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    secondEarthMoonMesh.position.set(40, 0, 0);

    const secondEarthSystem = new THREE.Object3D();

    // secondEarth
    const secondEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const secondEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(second),
        emissiveIntensity: 0.3,
    });
    const secondEarthMesh = new THREE.Mesh(secondEarthGeometry, secondEarthMaterial);
    secondEarthSystem.add(secondEarthMesh);

    // secondEarth axis
    secondEarthSystem.add(axis.clone());

    secondEarthSystem.add(secondEarthMoonMesh);
    secondEarthSystem.rotation.z = tilt;
    scene.add(secondEarthSystem);

    const secondEarth_curve = new THREE.EllipseCurve(
        0, 0,
        400, 350,
        0 + (2*Math.PI/5), 2 * Math.PI + (2*Math.PI/5),
    );

    // third earth system
    
    const thirdEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    thirdEarthMoonMesh.position.set(40, 0, 0);

    const thirdEarthSystem = new THREE.Object3D();

    // thirdEarth
    const thirdEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const thirdEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(ice),
        emissiveIntensity: 0.3,
    });
    const thirdEarthMesh = new THREE.Mesh(thirdEarthGeometry, thirdEarthMaterial);
    thirdEarthSystem.add(thirdEarthMesh);

    // thirdEarth axis
    thirdEarthSystem.add(axis.clone());

    thirdEarthSystem.add(thirdEarthMoonMesh);
    thirdEarthSystem.rotation.z = tilt;
    scene.add(thirdEarthSystem);

    const thirdEarth_curve = new THREE.EllipseCurve(
        0, 0,
        400, 350,
        0 + (4*Math.PI/5), 2 * Math.PI + (4*Math.PI/5),
    );

    // fourth earth system
    
    const fourthEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    fourthEarthMoonMesh.position.set(40, 0, 0);

    const fourthEarthSystem = new THREE.Object3D();

    // fourthEarth
    const fourthEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const fourthEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(today),
        emissiveIntensity: 0.3,
    });
    const fourthEarthMesh = new THREE.Mesh(fourthEarthGeometry, fourthEarthMaterial);
    fourthEarthSystem.add(fourthEarthMesh);

    // fourthEarth axis
    fourthEarthSystem.add(axis.clone());

    fourthEarthSystem.add(fourthEarthMoonMesh);
    fourthEarthSystem.rotation.z = tilt;
    scene.add(fourthEarthSystem);

    const fourthEarth_curve = new THREE.EllipseCurve(
        0, 0,
        400, 350,
        0 + (6*Math.PI/5), 2 * Math.PI + (6*Math.PI/5),
    );

    // fifth earth system
    
    const fifthEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    fifthEarthMoonMesh.position.set(20, 0, 0);

    const fifthEarthSystem = new THREE.Object3D();

    // fifthEarth
    const fifthEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const fifthEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(future),
        emissiveIntensity: 0.3,
    });
    const fifthEarthMesh = new THREE.Mesh(fifthEarthGeometry, fifthEarthMaterial);
    fifthEarthSystem.add(fifthEarthMesh);

    // fifthEarth axis
    fifthEarthSystem.add(axis.clone());

    fifthEarthSystem.add(fifthEarthMoonMesh);
    fifthEarthSystem.rotation.z = tilt;
    scene.add(fifthEarthSystem);

    const fifthEarth_curve = new THREE.EllipseCurve(
        0, 0,
        400, 350,
        0 + (8*Math.PI/5), 2 * Math.PI + (8*Math.PI/5),
    );

    // mars

    const marsSystem = new THREE.Object3D();

    const marsGeometry = new THREE.SphereGeometry(0.532*r, 100, 100);
    const marsMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(mars),
        emissiveIntensity: 0.3,
    });

    const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
    marsSystem.add(marsMesh);
    marsSystem.add(axis.clone());

    marsSystem.rotation.z = tilt;
    scene.add(marsSystem);

    const mars_curve = new THREE.EllipseCurve(
        0, 0,
        500, 450,
        0 - 2*Math.PI/6, 2 * Math.PI - 2*Math.PI/6,
    );

    const mars_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            mars_curve.getSpacedPoints(200)
        ), 
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    mars_orbit.rotateX(-Math.PI/2);
    scene.add(mars_orbit);

    // jupiter

    const jupiterSystem = new THREE.Object3D();

    const jupiterGeometry = new THREE.SphereGeometry(2*r, 100, 100);
    const jupiterMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(jupiter),
        emissiveIntensity: 0.3,
    });

    const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    jupiterSystem.add(jupiterMesh);
    jupiterSystem.add(axis.clone());

    jupiterSystem.rotation.z = tilt;
    scene.add(jupiterSystem);

    const jupiter_curve = new THREE.EllipseCurve(
        0, 0,
        850, 800,
        0 + 6*Math.PI/6, 2 * Math.PI + 6*Math.PI/6,
    );

    const jupiter_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            jupiter_curve.getSpacedPoints(200)
        ), 
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    jupiter_orbit.rotateX(-Math.PI/2);
    scene.add(jupiter_orbit);

    // saturn

    const saturnSystem = new THREE.Object3D();

    const saturnGeometry = new THREE.SphereGeometry(1.5*r, 100, 100);
    const saturnMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(saturn),
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
        0, 0,
        1000, 950,
        0 - Math.PI/6, 2 * Math.PI - Math.PI/6,
    );

    const saturn_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            saturn_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    saturn_orbit.rotateX(-Math.PI/2);
    scene.add(saturn_orbit);
    
    // uranus

    const uranusSystem = new THREE.Object3D();

    const uranusGeometry = new THREE.SphereGeometry(1.2*r, 100, 100);
    const uranusMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(uranus),
        emissiveIntensity: 0.3,
    });

    const uranusMesh = new THREE.Mesh(uranusGeometry, uranusMaterial);
    uranusSystem.add(uranusMesh);
    uranusSystem.add(axis.clone());

    uranusSystem.rotation.z = tilt;
    scene.add(uranusSystem);

    const uranus_curve = new THREE.EllipseCurve(
        0, 0,
        1200, 1100,
        0 + 4*Math.PI/6, 2 * Math.PI + 4*Math.PI/6,
    );
        
    const uranus_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            uranus_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    uranus_orbit.rotateX(-Math.PI/2);
    scene.add(uranus_orbit);

    // neptune
    
    const neptuneSystem = new THREE.Object3D();

    const neptuneGeometry = new THREE.SphereGeometry(1.2*r, 100, 100);
    const neptuneMaterial = new THREE.MeshStandardMaterial({
        emissive: 0x7f838a,
        map: textureLoader.load(neptune),
        emissiveIntensity: 0.3,
    });

    const neptuneMesh = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
    neptuneSystem.add(neptuneMesh);
    neptuneSystem.add(axis.clone());

    neptuneSystem.rotation.z = tilt;
    scene.add(neptuneSystem);

    const neptune_curve = new THREE.EllipseCurve(
        0, 0,
        1400, 1300,
        0 + 2*Math.PI/6, 2 * Math.PI + 2*Math.PI/6,
    );

    const neptune_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            neptune_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    neptune_orbit.rotateX(-Math.PI/2);
    scene.add(neptune_orbit);

    const loopTime = 1;
    var EarthOrbitSpeed = 0.00001;
    const planetOrbitSpeed = 0.00001;
    const moonOrbitRadius = 55;
    const moonOrbitSpeed = 80;

    let time2;
    let t2;
    let autoScroll = false;

    function animate() {
        const time = planetOrbitSpeed * performance.now();
        const t = (time % loopTime) / loopTime;

        sunMesh.rotation.y += 0.0008

        // mercury

        let mercury_p = mercury_curve.getPoint(t);
        // console.log(mercury_p, t);

        mercurySystem.position.x = mercury_p.x;
        mercurySystem.position.z = mercury_p.y;

        mercuryMesh.rotation.y += 0.0008

        // venus

        let venus_p = venus_curve.getPoint(t);
        // console.log(venus_p, t);

        venusSystem.position.x = venus_p.x;
        venusSystem.position.z = venus_p.y;

        venusMesh.rotation.y += 0.0008

        if (EarthOrbitSpeed!=0) {
            time2 = EarthOrbitSpeed * performance.now();
            t2 = (time2 % loopTime) / loopTime;
        }

        // console.log(time2);

        let firstEarth_p;
        firstEarth_p = firstEarth_curve.getPoint(t2);
        // console.log(firstEarth_p, t);

        firstEarthSystem.position.x = firstEarth_p.x;
        firstEarthSystem.position.z = firstEarth_p.y;
        
        firstEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        firstEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        firstEarthMesh.rotation.y += 0.0008
        firstEarthMoonMesh.rotation.y += 0.0001

        // second earth

        let secondEarth_p = secondEarth_curve.getPoint(t2);
        // console.log(secondEarth_p, t);
        
        secondEarthSystem.position.x = secondEarth_p.x;
        secondEarthSystem.position.z = secondEarth_p.y;

        secondEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        secondEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        secondEarthMesh.rotation.y += 0.0008
        secondEarthMoonMesh.rotation.y += 0.0001

        // third earth

        let thirdEarth_p = thirdEarth_curve.getPoint(t2);
        // console.log(thirdEarth_p, t);
        
        thirdEarthSystem.position.x = thirdEarth_p.x;
        thirdEarthSystem.position.z = thirdEarth_p.y;

        thirdEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        thirdEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        thirdEarthMesh.rotation.y += 0.0008
        thirdEarthMoonMesh.rotation.y += 0.0001

        // fourth earth

        let fourthEarth_p = fourthEarth_curve.getPoint(t2);
        // console.log(fourthEarth_p, t);
        
        fourthEarthSystem.position.x = fourthEarth_p.x;
        fourthEarthSystem.position.z = fourthEarth_p.y;

        fourthEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        fourthEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        fourthEarthMesh.rotation.y += 0.0008
        fourthEarthMoonMesh.rotation.y += 0.0001

        // fifth earth

        let fifthEarth_p = fifthEarth_curve.getPoint(t2);
        // console.log(fifthEarth_p, t);
        
        fifthEarthSystem.position.x = fifthEarth_p.x;
        fifthEarthSystem.position.z = fifthEarth_p.y;

        fifthEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed*2) * moonOrbitRadius * 0.7;
        fifthEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed*2) * moonOrbitRadius * 0.7;

        fifthEarthMesh.rotation.y += 0.0008
        fifthEarthMoonMesh.rotation.y += 0.0001

        // mars

        let mars_p = mars_curve.getPoint(t);
        // console.log(mars_p, t);

        marsSystem.position.x = mars_p.x;
        marsSystem.position.z = mars_p.y;

        marsMesh.rotation.y += 0.0008

        // jupiter

        let jupiter_p = jupiter_curve.getPoint(t);
        // console.log(jupiter_p, t);

        jupiterSystem.position.x = jupiter_p.x;
        jupiterSystem.position.z = jupiter_p.y;

        jupiterMesh.rotation.y += 0.0008

        // saturn

        let saturn_p = saturn_curve.getPoint(t);

        saturnSystem.position.x = saturn_p.x;
        saturnSystem.position.z = saturn_p.y;

        saturnMesh.rotation.y += 0.0008

        // uranus

        let uranus_p = uranus_curve.getPoint(t);

        uranusSystem.position.x = uranus_p.x;
        uranusSystem.position.z = uranus_p.y;

        uranusMesh.rotation.y += 0.0008

        // neptune

        let neptune_p = neptune_curve.getPoint(t);

        neptuneSystem.position.x = neptune_p.x;
        neptuneSystem.position.z = neptune_p.y;

        neptuneMesh.rotation.y += 0.0008

        requestAnimationFrame(animate);
        camera.lookAt(150,0,0);
        // camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    }

    animate();

    const camY = camera.position.y;
    const camLookAty = -200
    let camLookAt = [200, -200, -100];

    const cameraInitial = [200, camY, 700];
    const cameraFinal = [450, 0, 400];

    const earthDesiredPosition = [150, 0, 300];

    const updateCameraPosition = (deltaY) => {

        const slopeX = (cameraFinal[0] - cameraInitial[0]) / (cameraFinal[1] - cameraInitial[1]);
        const slopeZ = (cameraFinal[2] - cameraInitial[2]) / (cameraFinal[1] - cameraInitial[1]);

        camera.position.x = Math.max(cameraInitial[0], Math.min(cameraFinal[0], camera.position.x + slopeX * (deltaY / 10)));
        camera.position.y = Math.min(cameraInitial[1], Math.max(cameraFinal[1], camera.position.y - (deltaY / 10)));
        camera.position.z = Math.min(cameraInitial[2], Math.max(cameraFinal[2], camera.position.z - slopeZ * (deltaY / 10)));
    }

    let stepSize = 75;
    let zoomTime = 10;

    const handleScroll = (e) => {
        // console.log(autoScroll);

            if (e.deltaY>0 && camera.position.y-(e.deltaY/10) < 0.95*camY) {
                // auto down scroll
                if (!autoScroll) {
                    autoScroll = true;
                    EarthOrbitSpeed = 0;
                }

                setTimeout(() => {
                    if (camera.position.y - 5 <= 0) {
                        // the last update before scrolling is enabled again
                        autoScroll = false;
                        updateCameraPosition(stepSize);
                        // EarthOrbitSpeed = planetOrbitSpeed;
                    }
                    else {
                        // a normal update
                        updateCameraPosition(stepSize);
                        handleScroll(e);
                    }

                    time2 += 1;
                }, zoomTime);
            }

            else if (e.deltaY<0 && camera.position.y-(e.deltaY/10) > 0.05*camY) {
                // auto up scroll
                if (!autoScroll) {
                    autoScroll = true;
                    EarthOrbitSpeed = planetOrbitSpeed;
                }
                    
                setTimeout(() => {
                    if (camera.position.y + 5 >= camY) {
                        // the last update before scrolling is enabled again
                        autoScroll = false;
                        updateCameraPosition(-1*stepSize);
                    }
                    else {
                        updateCameraPosition(-1*stepSize);
                        handleScroll(e);
                    }
                }, zoomTime);
            }

            else if (camera.position.y>0.95*camY || camera.position.y<0.05*camY) {
                updateCameraPosition(e.deltaY);
            }
    }

    // homePageEle.addEventListener('wheel', (e) => {
    //     if (!autoScroll) handleScroll(e);
    // });

    //responsive
    window.onresize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(homePageEle.offsetWidth, homePageEle.offsetHeight);
    };
}