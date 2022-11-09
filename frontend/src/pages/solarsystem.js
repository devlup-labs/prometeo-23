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
    camera.position.set(300, 100, 800);
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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    const textureLoader = new THREE.TextureLoader();

    const bgGeometry = new THREE.SphereGeometry(2000, 100, 100);
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
        emissive: 0xffffff,
        emissiveMap: textureLoader.load(mercury),
        emissiveIntensity: 0.3,
    });

    const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
    mercurySystem.add(mercuryMesh);
    mercurySystem.add(axis.clone());

    mercurySystem.rotation.z = tilt;
    scene.add(mercurySystem);

    const mercury_curve = new THREE.EllipseCurve(
        0, 0,
        250, 300,
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
        emissive: 0xffffff,
        emissiveMap: textureLoader.load(venus),
        emissiveIntensity: 0.3,
    });

    const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial);
    venusSystem.add(venusMesh);
    venusSystem.add(axis.clone());

    venusSystem.rotation.z = tilt;
    scene.add(venusSystem);

    const venus_curve = new THREE.EllipseCurve(
        0, 0,
        350, 400,
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
        emissive: 0xffffff,
        emissiveMap: textureLoader.load(first),
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
        450, 500,
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
        emissive: 0xffffff,
        emissiveMap: textureLoader.load(second),
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
        450, 500,
        0 + (2*Math.PI/5), 2 * Math.PI + (2*Math.PI/5),
    );

    // third earth system
    
    const thirdEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    thirdEarthMoonMesh.position.set(40, 0, 0);

    const thirdEarthSystem = new THREE.Object3D();

    // thirdEarth
    const thirdEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const thirdEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffffff,
        emissiveMap: textureLoader.load(ice),
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
        450, 500,
        0 + (4*Math.PI/5), 2 * Math.PI + (4*Math.PI/5),
    );

    // fourth earth system
    
    const fourthEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    fourthEarthMoonMesh.position.set(40, 0, 0);

    const fourthEarthSystem = new THREE.Object3D();

    // fourthEarth
    const fourthEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const fourthEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffffff,
        emissiveMap: textureLoader.load(today),
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
        450, 500,
        0 + (6*Math.PI/5), 2 * Math.PI + (6*Math.PI/5),
    );

    // fifth earth system
    
    const fifthEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    fifthEarthMoonMesh.position.set(20, 0, 0);

    const fifthEarthSystem = new THREE.Object3D();

    // fifthEarth
    const fifthEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const fifthEarthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffffff,
        emissiveMap: textureLoader.load(future),
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
        450, 500,
        0 + (8*Math.PI/5), 2 * Math.PI + (8*Math.PI/5),
    );

    // mars

    const marsSystem = new THREE.Object3D();

    const marsGeometry = new THREE.SphereGeometry(0.532*r, 100, 100);
    const marsMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffffff,
        emissiveMap: textureLoader.load(mars),
        emissiveIntensity: 0.3,
    });

    const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
    marsSystem.add(marsMesh);
    marsSystem.add(axis.clone());

    marsSystem.rotation.z = tilt;
    scene.add(marsSystem);

    const mars_curve = new THREE.EllipseCurve(
        0, 0,
        550, 600,
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
        emissive: 0xffffff,
        emissiveMap: textureLoader.load(jupiter),
        emissiveIntensity: 0.3,
    });

    const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
    jupiterSystem.add(jupiterMesh);
    jupiterSystem.add(axis.clone());

    jupiterSystem.rotation.z = tilt;
    scene.add(jupiterSystem);

    const jupiter_curve = new THREE.EllipseCurve(
        0, 0,
        650, 700,
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
    

    const loopTime = 1;
    const firstEarthOrbitSpeed = 0.00001;
    const moonOrbitRadius = 55;
    const moonOrbitSpeed = 80;


    function animate() {
        const time = firstEarthOrbitSpeed * performance.now();
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

        // first earth

        let firstEarth_p = firstEarth_curve.getPoint(t);
        // console.log(firstEarth_p, t);

        firstEarthSystem.position.x = firstEarth_p.x;
        firstEarthSystem.position.z = firstEarth_p.y;
        
        firstEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        firstEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        firstEarthMesh.rotation.y += 0.0008
        firstEarthMoonMesh.rotation.y += 0.0001

        // second earth

        let secondEarth_p = secondEarth_curve.getPoint(t);
        // console.log(secondEarth_p, t);
        
        secondEarthSystem.position.x = secondEarth_p.x;
        secondEarthSystem.position.z = secondEarth_p.y;

        secondEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        secondEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        secondEarthMesh.rotation.y += 0.0008
        secondEarthMoonMesh.rotation.y += 0.0001

        // third earth

        let thirdEarth_p = thirdEarth_curve.getPoint(t);
        // console.log(thirdEarth_p, t);
        
        thirdEarthSystem.position.x = thirdEarth_p.x;
        thirdEarthSystem.position.z = thirdEarth_p.y;

        thirdEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        thirdEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        thirdEarthMesh.rotation.y += 0.0008
        thirdEarthMoonMesh.rotation.y += 0.0001

        // fourth earth

        let fourthEarth_p = fourthEarth_curve.getPoint(t);
        // console.log(fourthEarth_p, t);
        
        fourthEarthSystem.position.x = fourthEarth_p.x;
        fourthEarthSystem.position.z = fourthEarth_p.y;

        fourthEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        fourthEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        fourthEarthMesh.rotation.y += 0.0008
        fourthEarthMoonMesh.rotation.y += 0.0001

        // fifth earth

        let fifthEarth_p = fifthEarth_curve.getPoint(t);
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



        requestAnimationFrame(animate);
        camera.lookAt(300, 100, 0);
        // camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
    }

    animate();

    //responsive
    window.onresize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(homePageEle.offsetWidth, homePageEle.offsetHeight);
    };
}