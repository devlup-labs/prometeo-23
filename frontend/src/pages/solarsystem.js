import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import bg from '../assets/space/bg.jpg';
import bg8k from '../assets/space/bg8k.jpg';
import sun from '../assets/space/sun.jpg';
import sun_blue from '../assets/space/sun(5).png';

import first from '../assets/space/first.jpg'; 
import second from '../assets/space/2.jpg'; 
import ice from '../assets/space/ice.jpg'; 
import weird from '../assets/space/weird.jpg'; 
import future from '../assets/space/future.jpg'; 

import moon from '../assets/space/ice.jpg';

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
        map: textureLoader.load(bg),
        // map: textureLoader.load(bg8k),
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
    
    // moon
    const moonGeometry = new THREE.SphereGeometry(5, 40, 20);
    const moonMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(moon),
    })

    const firstEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

    firstEarthMoonMesh.position.set(40, 0, 0);

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

    firstEarthSystem.add(firstEarthMoonMesh);
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

    // second earth system

    const secondEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

    secondEarthMoonMesh.position.set(40, 0, 0);

    // second earth system
    const secondEarthSystem = new THREE.Object3D();

    // secondEarth
    const secondEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const secondEarthMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(second),
    });
    const secondEarthMesh = new THREE.Mesh(secondEarthGeometry, secondEarthMaterial);
    secondEarthSystem.add(secondEarthMesh);

    // firstEarth axis
    secondEarthSystem.add(axis.clone());

    secondEarthSystem.add(secondEarthMoonMesh);
    secondEarthSystem.rotation.z = tilt;
    scene.add(secondEarthSystem);

    const secondEarth_curve = new THREE.EllipseCurve(
        0, 0,
        350, 400,
        0 + Math.PI/2, 2 * Math.PI + Math.PI/2,
    );

    // const points = futureEarth_curve.getSpacedPoints(200);
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const material = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 });

    const secondEarth_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            secondEarth_curve.getSpacedPoints(200)
        ), 
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    secondEarth_orbit.rotateX(-Math.PI/2);
    scene.add(secondEarth_orbit);

    // third earth system
    
    const thirdEarth_system = new THREE.Object3D();

    const thirdEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const thirdEarthMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(ice),
    });

    const thirdEarthMesh = new THREE.Mesh(thirdEarthGeometry, thirdEarthMaterial);
    thirdEarth_system.add(thirdEarthMesh);

    // thirdEarth axis
    thirdEarth_system.add(axis.clone());

    const thirdEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    thirdEarthMoonMesh.position.set(40, 0, 0);
    thirdEarth_system.add(thirdEarthMoonMesh);

    thirdEarth_system.rotation.z = tilt;
    scene.add(thirdEarth_system);

    const thirdEarth_curve = new THREE.EllipseCurve(
        0, 0,
        450, 500,
        0 + Math.PI, 2 * Math.PI + Math.PI,
    );

    // const points = futureEarth_curve.getSpacedPoints(200);
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const material = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 });

    const thirdEarth_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            thirdEarth_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    thirdEarth_orbit.rotateX(-Math.PI/2);
    scene.add(thirdEarth_orbit);

    // fourth earth system

    const fourthEarth_system = new THREE.Object3D();

    const fourthEarthGeometry = new THREE.SphereGeometry(r, s, s);
    const fourthEarthMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load(weird),
    });

    const fourthEarthMesh = new THREE.Mesh(fourthEarthGeometry, fourthEarthMaterial);
    fourthEarth_system.add(fourthEarthMesh);

    // fourthEarth axis
    fourthEarth_system.add(axis.clone());

    const fourthEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    fourthEarthMoonMesh.position.set(40, 0, 0);
    fourthEarth_system.add(fourthEarthMoonMesh);

    fourthEarth_system.rotation.z = tilt;
    scene.add(fourthEarth_system);

    const fourthEarth_curve = new THREE.EllipseCurve(
        0, 0,
        550, 600,
        0 + 3*Math.PI/2, 2 * Math.PI + 3*Math.PI/2,
    );

    // const points = futureEarth_curve.getSpacedPoints(200);
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // const material = new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 });

    const fourthEarth_orbit = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(
            fourthEarth_curve.getSpacedPoints(200)
        ),
        new THREE.LineBasicMaterial({ color: 0x333333, transparent: true, opacity: 0.5 })
    );
    fourthEarth_orbit.rotateX(-Math.PI/2);
    scene.add(fourthEarth_orbit);

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

    const futureEarthMoonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
    futureEarthMoonMesh.position.set(40, 0, 0);
    futureEarthSystem.add(futureEarthMoonMesh);

    futureEarthSystem.rotation.z = tilt
    scene.add(futureEarthSystem);

    const futureEarth_curve = new THREE.EllipseCurve(
        0, 0,
        650, 700,
        0 + 2*Math.PI, 2 * Math.PI + 2*Math.PI,
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
    const moonOrbitRadius = 55;
    const moonOrbitSpeed = 80;


    function animate() {
        const time = firstEarthOrbitSpeed * performance.now();
        const t = (time % loopTime) / loopTime;

        sunMesh.rotation.y += 0.0008

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

        thirdEarth_system.position.x = thirdEarth_p.x;
        thirdEarth_system.position.z = thirdEarth_p.y;

        thirdEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        thirdEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        thirdEarthMesh.rotation.y += 0.0008
        thirdEarthMoonMesh.rotation.y += 0.0001

        // fourth earth

        let fourthEarth_p = fourthEarth_curve.getPoint(t);
        // console.log(fourthEarth_p, t);

        fourthEarth_system.position.x = fourthEarth_p.x;
        fourthEarth_system.position.z = fourthEarth_p.y;

        fourthEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed) * moonOrbitRadius;
        fourthEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed) * moonOrbitRadius;

        fourthEarthMesh.rotation.y += 0.0008
        fourthEarthMoonMesh.rotation.y += 0.0001

        // future earth

        let futureEarth_p = futureEarth_curve.getPoint(t);
        // console.log(futureEarth_p, t)
        
        futureEarthSystem.position.x = futureEarth_p.x;
        futureEarthSystem.position.z = futureEarth_p.y;

        futureEarthMoonMesh.position.z = -Math.sin(time*moonOrbitSpeed*4) * moonOrbitRadius/1.5;
        futureEarthMoonMesh.position.x = -Math.cos(time*moonOrbitSpeed*4) * moonOrbitRadius/1.5;

        
        futureEarthMesh.rotation.y += 0.0008
        futureEarthMoonMesh.rotation.y += 0.0005

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