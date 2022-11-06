import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import bg from '../assets/space/bg.jpg';
import sun from '../assets/space/sun.jpg';
import today from '../assets/space/today.jpg'; 
import future from '../assets/space/future.jpg'; 
import moon from '../assets/space/future.jpg';

export default function solarSystem() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 20, 4000);
    camera.position.set(0, 30, 500);

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
    scene.add(pointLight);

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

    // earth

    const earthGeometry = new THREE.SphereGeometry(109,200,400);
    const earthMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffd700,
        emissiveMap: textureLoader.load(today),
        emissiveIntensity: 1,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earthMesh);

    // const earthSystem = new THREE.Group();

    // const earthGeometry = new THREE.SphereGeometry(r, s, s);
    // const earthMaterial = new THREE.MeshPhongMaterial({
    //     map: textureLoader.load(future),
    // });
    // const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    // earthMesh.rotation.z = tilt;
    // earthSystem.add(earthMesh);

    // earth axis
    // const axisPoints = [
    //     new THREE.Vector3(0, 35, 0),
    //     new THREE.Vector3(0, -35, 0)
    // ]

    // const axisGeom = new THREE.BufferGeometry().setFromPoints(axisPoints);
    // const axis = new THREE.Line(
    //     axisGeom, 
    //     new THREE.LineBasicMaterial({ color: 0x330000, transparent: true, opacity: 0.5 })
    // );
    // axis.rotation.z = tilt
    // earthSystem.add(axis);

    // // moon
    // const moonGeometry = new THREE.SphereGeometry(5, 40, 20);
    // const moonMaterial = new THREE.MeshStandardMaterial({
    //     map: textureLoader.load(moon),
    // })
    // const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

    // moonMesh.position.set(40, 0, 0);
    // earthSystem.add(moonMesh);

    // scene.add(earthSystem);

    const curve = new THREE.EllipseCurve(
        0, 0,
        250, 300,
        0, 2 * Math.PI,
    );

    const points = curve.getSpacedPoints(200);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 });

    const orbit = new THREE.Line(geometry, material);
    orbit.rotateX(-Math.PI/2);
    scene.add(orbit);

    const loopTime = 1;
    const earthOrbitSpeed = 0.00001;
    // const moonOrbitRadius = 55;
    // const moonOrbitSpeed = 80;


    function animate() {
        const time = earthOrbitSpeed * performance.now();
        const t = (time % loopTime) / loopTime;

        let p = curve.getPoint(t);
        // console.log(p, t)
        
        earthMesh.position.x = p.x;
        earthMesh.position.z = p.z;

        // moonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        // moonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        sunMesh.rotation.y += 0.0008
        earthMesh.rotation.y += 0.0008
        // moonMesh.rotation.y += 0.0001
        
        requestAnimationFrame(animate);
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