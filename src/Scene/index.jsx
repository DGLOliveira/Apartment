import React, { useState, useEffect, useMemo, useRef, Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Stars, Sky } from "@react-three/drei";
import { Physics, Debug } from "@react-three/cannon";
//import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Perf } from "r3f-perf";

import { Player } from "./Physics/Player.js";
import { Obstacles } from "./Physics/Obstacles.js";
import Apartment from "./Objects/Apartment.jsx";
import PC from "./Devices/PC/PC.js";
//import { Paintings } from "./Components/Paintings.js";
import TV from "./Devices/TV/TV.js";
//import { Computer } from "./Components/Computer.js";

export default function Scene() {

    const [materialList, setMaterialList] = useState({
        WoodTexture: "",
        WallTexture: "",
        GraniteTexture: "",
        RugTexture: ""
    });
    let [obstacleObjects, setObstacleObjects] = useState(null);

    return (
        <Suspense fallback={null}>
            <Canvas
                shadows={{ enabled: true, type: THREE.PCFShadowMap }}
                gl={{
                    powerPreference: "high-performance",
                    alpha: false,
                    antialias: true,
                    stencil: false,
                    preserveDrawingBuffer: true
                }}
            >
                <Perf />
                <Apartment
                    obstacleObjects={obstacleObjects}
                    setObstacleObjects={setObstacleObjects}
                />
                <PC />
                <TV />
                <Physics>
                    <Player />
                    <Debug color="red" scale={1.005} >
                        {obstacleObjects && <Obstacles obstacleObjects={obstacleObjects} />}
                    </Debug>
                </Physics>
                <Stars radius={400} />
                <Sky
                    distance={450000}
                    azimuth={0.25}
                    inclination={0}
                    turbidity={0.3}
                    rayleigh={50}
                    exposure={200}
                />
            </Canvas>
        </Suspense>
    );
}
