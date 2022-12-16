import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { Mesh, TextureLoader, sRGBEncoding, DoubleSide, Vector3, BufferGeometry } from 'three';
import { Stats, Html, useProgress } from "@react-three/drei";

import bg from "../assets/space/bg.jpg";
import sun from "../assets/space/sun2.jpg";

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

import spinner from "../assets/loading/logo.gif";


let bgTexture, sunTexture, mercuryTexture, venusTexture, firstEarthTexture, secondEarthTexture, thirdEarthTexture, fourthEarthTexture, fifthEarthTexture, marsTexture, jupiterTexture, saturnTexture, uranusTexture, neptuneTexture, moonTexture;

const r = 25;
const s = 50;
const tilt = 0.41;


function Loader({setIsLoading}) {
    const { progress } = useProgress()
    if (progress === 100) {
        setIsLoading(false);
    }
    // return <Html center>{progress} % loaded</Html>
    // return <Html center>
    //         <div className="spinner">
    //             <img src={spinner} id = "loader-gif" alt="Loading..." />
    //         </div>
    //     </Html>
}

const Background = (props) => {
    const mesh = useRef();

    // const texture = useLoader(TextureLoader, bg);
    // texture.encoding = sRGBEncoding;

    return (
        <mesh {...props} ref={mesh}>
            <sphereGeometry args={[2000, 100, 100]} />
            <meshStandardMaterial map={bgTexture} side={DoubleSide} />
        </mesh>
    );
}

const Sun = (props) => {
    const mesh = useRef();

    // const texture = useLoader(TextureLoader, sun);
    // texture.encoding = sRGBEncoding;

    useFrame(() => (mesh.current.rotation.y += 0.0012));
    
    return (
        <mesh {...props} ref={mesh}>
            <sphereGeometry args={[109, 200, 200]} />
            <meshStandardMaterial
                map={sunTexture}
                // emissive="#4dddda"
                emissive="#ff5700"
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

function Planet({ planet: { textureFile, xRadius, zRadius, size, widthSegments, heightSegments, orbitSpeed, offset = 0 } }) {
    const planetRef = useRef();

    // planetRef.rotation.z = tilt;

    // const texture = useLoader(TextureLoader, textureFile);
    // texture.encoding = sRGBEncoding;

    useFrame(({ clock }) => {
        const t = (orbitSpeed * clock.getElapsedTime()) % (2 * Math.PI) + offset;
        const x = xRadius * Math.sin(t);
        const z = zRadius * Math.cos(t);
        planetRef.current.position.x = -x;
        planetRef.current.position.z = z;
    });

    useFrame(() => {
        planetRef.current.rotation.y += 0.0008;
        planetRef.current.rotation.z = tilt;
    });

    return (
        <>
            <mesh ref={planetRef}>
                <sphereGeometry args={[size, widthSegments, heightSegments]} />
                <meshStandardMaterial
                    map={textureFile}
                    emissive="#7f838a"
                    emissiveIntensity={0.3}
                />
            </mesh>
            <Ecliptic xRadius={xRadius} zRadius={zRadius} />
        </>
    );
}

function EarthMoonSystem({
    earth: { earthTextureFile, xRadius, zRadius, size, widthSegments, heightSegments, earthSpeed, offset = 0 },
    moon: { moonTextureFile, moonRadius, moonSize, moonWidthSegments, moonHeightSegments, moonSpeed, moonOffset = 0 }
}) {
    const earthMoonSystemRef = useRef();
    const earthRef = useRef();
    const moonRef = useRef();

    // const earthTexture = useLoader(TextureLoader, earthTextureFile);
    // earthTexture.encoding = sRGBEncoding;

    // const moonTexture = useLoader(TextureLoader, moonTextureFile);
    // moonTexture.encoding = sRGBEncoding;

    useFrame(({ clock }) => {
        const t = (earthSpeed * clock.getElapsedTime()) % (2 * Math.PI) + offset;
        const x = xRadius * Math.sin(t);
        const z = zRadius * Math.cos(t);
        earthMoonSystemRef.current.position.x = -x;
        earthMoonSystemRef.current.position.z = z;

        // if (offset == 0) console.log(earthMoonSystemRef.current.position);

        const mt = (moonSpeed * clock.getElapsedTime()) % (2 * Math.PI) + moonOffset;
        const mx = -1 * moonRadius * Math.cos(mt);
        const mz = -1 * moonRadius * Math.sin(mt);
        moonRef.current.position.x = mx;
        moonRef.current.position.z = mz;
    });

    useFrame(() => {
        earthRef.current.rotation.y += 0.0008;
        earthMoonSystemRef.current.rotation.z = tilt;
        moonRef.current.rotation.y += 0.0008;
        // moonRef.current.rotation.z = tilt;
    });

    return (
        <>
            <group ref={earthMoonSystemRef}>
                <mesh ref={earthRef}>
                    <sphereGeometry args={[size, widthSegments, heightSegments]} />
                    <meshStandardMaterial
                        map={earthTextureFile}
                        emissive="#7f838a"
                        emissiveIntensity={0.3}
                    />
                </mesh>
                <mesh ref={moonRef} position={[40, 0, 0]}>
                    <sphereGeometry args={[moonSize, moonWidthSegments, moonHeightSegments]} />
                    <meshStandardMaterial
                        map={moonTextureFile}
                        emissive="#7f838a"
                        emissiveIntensity={0.3}
                    />
                </mesh>
            </group>
            <Ecliptic xRadius={xRadius} zRadius={zRadius} />
        </>
    );
}

function Ecliptic({ xRadius = 1, zRadius = 1 }) {
    const points = [];
    for (let index = 0; index < 64; index++) {
        const angle = (index / 64) * 2 * Math.PI;
        const x = xRadius * Math.cos(angle);
        const z = zRadius * Math.sin(angle);
        points.push(new Vector3(x, 0, z));
    }

    points.push(points[0]);

    const lineGeometry = new BufferGeometry().setFromPoints(points);
    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial
                attach="material"
                color="#333333"
                linewidth={1}
                opacity={0.5}
            />
        </line>
    );
}

function CreateScene({setIsLoading}) {
    [bgTexture, sunTexture, mercuryTexture, venusTexture, firstEarthTexture, secondEarthTexture, thirdEarthTexture, fourthEarthTexture, fifthEarthTexture, marsTexture, jupiterTexture, saturnTexture, uranusTexture, neptuneTexture, moonTexture] = useLoader(
        TextureLoader, [bg, sun, mercury, venus, first, second, ice, today, future, mars, jupiter, saturn, uranus, neptune, moon]
    )
    bgTexture.encoding = sRGBEncoding;
    sunTexture.encoding = sRGBEncoding;
    mercuryTexture.encoding = sRGBEncoding;
    venusTexture.encoding = sRGBEncoding;
    firstEarthTexture.encoding = sRGBEncoding;
    secondEarthTexture.encoding = sRGBEncoding;
    thirdEarthTexture.encoding = sRGBEncoding;
    fourthEarthTexture.encoding = sRGBEncoding;
    fifthEarthTexture.encoding = sRGBEncoding;
    marsTexture.encoding = sRGBEncoding;
    jupiterTexture.encoding = sRGBEncoding;
    saturnTexture.encoding = sRGBEncoding;
    uranusTexture.encoding = sRGBEncoding;
    neptuneTexture.encoding = sRGBEncoding;
    moonTexture.encoding = sRGBEncoding;
    
    const PlanetInfo = [
        {
            textureFile: mercuryTexture,
            xRadius: 200,
            zRadius: 150,
            size: 0.3829 * r,
            widthSegments: 100,
            heightSegments: 100,
            orbitSpeed: 0.1,
            offset: 1 * (Math.PI / 6),
        },
        {
            textureFile: venusTexture,
            xRadius: 300,
            zRadius: 250,
            size: 0.949 * r,
            widthSegments: 100,
            heightSegments: 100,
            orbitSpeed: 0.1,
            offset: 4 * (Math.PI / 6),
        },
        // {
        //     textureFile: first,
        //     xRadius: 400,
        //     zRadius: 350,
        //     size: 1*r,
        //     widthSegments: s,
        //     heightSegments: s,
        //     orbitSpeed: 0.1,
        //     offset: 0,
        // },
        // {
        //     textureFile: second,
        //     xRadius: 400,
        //     zRadius: 350,
        //     size: 1*r,
        //     widthSegments: s,
        //     heightSegments: s,
        //     orbitSpeed: 0.1,
        //     offset: 1 * (2 * Math.PI / 5),
        // },
        // {
        //     textureFile: ice,
        //     xRadius: 400,
        //     zRadius: 350,
        //     size: 1*r,
        //     widthSegments: s,
        //     heightSegments: s,
        //     orbitSpeed: 0.1,
        //     offset: 2 * (2 * Math.PI / 5),
        // },
        // {
        //     textureFile: today,
        //     xRadius: 400,
        //     zRadius: 350,
        //     size: 1*r,
        //     widthSegments: s,
        //     heightSegments: s,
        //     orbitSpeed: 0.1,
        //     offset: 3 * (2 * Math.PI / 5),
        // },
        // {
        //     textureFile: future,
        //     xRadius: 400,
        //     zRadius: 350,
        //     size: 1*r,
        //     widthSegments: s,
        //     heightSegments: s,
        //     orbitSpeed: 0.1,
        //     offset: 4 * (2 * Math.PI / 5),
        // },
        {
            textureFile: marsTexture,
            xRadius: 500,
            zRadius: 450,
            size: 0.532 * r,
            widthSegments: 100,
            heightSegments: 100,
            orbitSpeed: 0.1,
            offset: -2 * (Math.PI / 6),
        },
        {
            textureFile: jupiterTexture,
            xRadius: 850,
            zRadius: 800,
            size: 2 * r,
            widthSegments: 100,
            heightSegments: 100,
            orbitSpeed: 0.1,
            offset: 6 * (Math.PI / 6),
        },
        {
            textureFile: saturnTexture,
            xRadius: 1000,
            zRadius: 950,
            size: 1.9 * r,
            widthSegments: 100,
            heightSegments: 100,
            orbitSpeed: 0.1,
            offset: -1 * (Math.PI / 6),
        },
        {
            textureFile: uranusTexture,
            xRadius: 1200,
            zRadius: 1100,
            size: 1.3 * r,
            widthSegments: 100,
            heightSegments: 100,
            orbitSpeed: 0.1,
            offset: 4 * (Math.PI / 6),
        },
        {
            textureFile: neptuneTexture,
            xRadius: 1400,
            zRadius: 1300,
            size: 1.2 * r,
            widthSegments: 100,
            heightSegments: 100,
            orbitSpeed: 0.1,
            offset: 1 * (Math.PI / 6),
        },
    ]

    const EarthInfo = [
        {
            earthTextureFile: firstEarthTexture,
            xRadius: 400,
            zRadius: 350,
            size: 1 * r,
            widthSegments: s,
            heightSegments: s,
            earthSpeed: 0.1,
            offset: 0,
        },
        {
            earthTextureFile: secondEarthTexture,
            xRadius: 400,
            zRadius: 350,
            size: 1 * r,
            widthSegments: s,
            heightSegments: s,
            earthSpeed: 0.1,
            offset: 1 * (2 * Math.PI / 5),
        },
        {
            earthTextureFile: thirdEarthTexture,
            xRadius: 400,
            zRadius: 350,
            size: 1 * r,
            widthSegments: s,
            heightSegments: s,
            earthSpeed: 0.1,
            offset: 2 * (2 * Math.PI / 5),
        },
        {
            earthTextureFile: fourthEarthTexture,
            xRadius: 400,
            zRadius: 350,
            size: 1 * r,
            widthSegments: s,
            heightSegments: s,
            earthSpeed: 0.1,
            offset: 3 * (2 * Math.PI / 5),
        },
        {
            earthTextureFile: fifthEarthTexture,
            xRadius: 400,
            zRadius: 350,
            size: 1 * r,
            widthSegments: s,
            heightSegments: s,
            earthSpeed: 0.1,
            offset: 4 * (2 * Math.PI / 5),
        },
    ]
    
    const { progress } = useProgress()
    if (progress === 100) {
        setIsLoading(false);
    }
    return (
        <>
            <Background />

            <Sun position={[0, 0, 0]} />

            {
                PlanetInfo.map((planet, index) => (
                    <Planet key={index} planet={planet} />
                ))
            }

            {
                EarthInfo.map((earth, index) => (
                    <EarthMoonSystem key={index} earth={earth} 
                        moon={{
                            moonTextureFile: moonTexture,
                            moonRadius: 40,
                            moonSize: 5,
                            moonWidthSegments: 40,
                            moonHeightSegments: 20,
                            moonSpeed: 0.3,
                            moonOffset: index,
                        }} 
                    />
                ))
            }
        </>
    );
}

function UpdateCamera() {
    const { camera } = useThree();
    const camY = 500 * (1536 / window.innerWidth);
    camera.position.set(200, camY, 700);
    camera.lookAt(150, 0, 0);
}

function NewSolarSystem({setIsLoading}) {
    return (
        <Canvas
            id="homepage-solarSystem"
            camera={{
                position: [200, 1000, 200],
                fov: 50,
                near: 100,
                far: 5000
            }}
            style={{
                height: "90vh",
                width: "100%",
            }}
        >
            <Suspense fallback={<Loader setIsLoading={setIsLoading} />}>
                <ambientLight
                    color="#ffffff"
                    intensity={0.2}
                />
                <pointLight color="#ffffff" intensity={1} />

                <CreateScene setIsLoading={setIsLoading} />

                <UpdateCamera />
            </Suspense>
            {/* <Stats /> */}
        </Canvas>
    );
}

export default NewSolarSystem;
