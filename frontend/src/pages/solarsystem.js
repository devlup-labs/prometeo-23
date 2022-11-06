import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import bg from '../assets/space/bg.jpg';
import sun from '../assets/space/sun.jpg';

import first from '../assets/space/first.jpg'; 
import future from '../assets/space/future.jpg'; 

import moon from '../assets/space/ice.jpg';

export default function solarSystem() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 20, 4000);
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

    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff);
    // pointLight.position.set(800, 0, 0);
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
        map: textureLoader.load(bg),
        side: THREE.DoubleSide,
    });
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    scene.add(bgMesh);

    // renderer.render(scene, camera);

    // sun
    const sunGeometry = new THREE.SphereGeometry(109,200,400);
    const sunMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffd700,
        emissiveMap: textureLoader.load(sun),
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
        new THREE.LineBasicMaterial({ color: 0x330000, transparent: true, opacity: 0.5 })
    );
    // axis.rotation.z = tilt
    
    // moon
    const moonGeometry = new THREE.SphereGeometry(5, 40, 20);
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(moon),
    })
    const firstEarth_moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

    firstEarth_moonMesh.position.set(40, 0, 0);

    // first earth system
    const firstEarthSystem = new THREE.Object3D();

    // firstEarth
    const firstEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const firstEarthMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(first),
    });
    const firstEarthMesh = new THREE.Mesh(firstEarthGeometry, firstEarthMaterial);
    firstEarthSystem.add(firstEarthMesh);

    // firstEarth axis
    firstEarthSystem.add(axis.clone());

    firstEarthSystem.add(firstEarth_moonMesh);
    firstEarthSystem.rotation.z = tilt;
    scene.add(firstEarthSystem);

    const firstEarth_curve = new THREE.EllipseCurve(
        0, 0,
        250, 300,
        0, 2 * Math.PI,
    );

    // const points = futureEarth_curve.getSpacedPoints(200);
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const material = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 });

    const firstEarth_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            firstEarth_curve.getSpacedPoints(200)
        ), 
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    firstEarth_orbit.rotateX(-Math.PI/2);
    scene.add(firstEarth_orbit);

    // future earth system
    const futureEarthSystem = new THREE.Group();

    // futureEarth
    const futureEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const futureEarthMaterial = new THREE.MeshPhongMaterial({
        map: textureLoader.load(future),
    });
    const futureEarthMesh = new THREE.Mesh(futureEarthGeometry, futureEarthMaterial);
    // futureEarthMesh.rotation.z = tilt;
    futureEarthSystem.add(futureEarthMesh);

    // futureEarth axis
    futureEarthSystem.add(axis);

    const futureEarth_moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    futureEarth_moonMesh.position.set(40, 0, 0);
    futureEarthSystem.add(futureEarth_moonMesh);

    futureEarthSystem.rotation.z = tilt
    scene.add(futureEarthSystem);

    const futureEarth_curve = new THREE.EllipseCurve(
        0, 0,
        400, 500,
        0 + Math.PI/2, 2 * Math.PI + Math.PI/2,
    );

    // const points = futureEarth_curve.getSpacedPoints(200);
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const material = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 });

    const futureEarth_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            futureEarth_curve.getSpacedPoints(200)
        ), 
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    futureEarth_orbit.rotateX(-Math.PI/2);
    scene.add(futureEarth_orbit);

    const loopTime = 1;
    const firstEarthOrbitSpeed = 0.00001;
    const futureEarthOrbitSpeed = 0.00001;
    const moonOrbitRadius = 55;
    const moonOrbitSpeed = 80;


    function animate() {
        const time = futureEarthOrbitSpeed * performance.now();
        const t = (time % loopTime) / loopTime;

        let firstEarth_p = firstEarth_curve.getPoint(t);
        // console.log(firstEarth_p, t);

        firstEarthSystem.position.x = firstEarth_p.x;
        firstEarthSystem.position.z = firstEarth_p.y;
        
        firstEarth_moonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        firstEarth_moonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        let futureEarth_p = futureEarth_curve.getPoint(t);
        // console.log(futureEarth_p, t)
        
        futureEarthSystem.position.x = futureEarth_p.x;
        futureEarthSystem.position.z = futureEarth_p.y;

        futureEarth_moonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        futureEarth_moonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        sunMesh.rotation.y += 0.0008

        firstEarthMesh.rotation.y += 0.0008
        firstEarth_moonMesh.rotation.y += 0.0001
        
        futureEarthMesh.rotation.y += 0.0008
        futureEarth_moonMesh.rotation.y += 0.0001

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