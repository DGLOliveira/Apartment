
import * as THREE from "three";
import { useMemo, useContext } from "react";
import { LightStateContext } from "../../state/LightState";

export default function Lights() {
  const lightState = useContext(LightStateContext);
  const shadowBias = -0.004;
  const shadowMapSize = [1024 * 2, 1024 * 2];
  const lightPowerMultiplier = 0.01;
  const lampEmissivityMultiplier = 0.01;
  const angle = 1.45;
  const penumbra = 0.25;

  const lightObjects = {};
  Object.keys(lightState).map((key) => {
    if(key.slice(0,3) !== "set"){
      lightObjects[key] = useMemo(() => new THREE.SpotLight( lightState[key].color, 1, 10, angle, penumbra, 0.5 ),[]);
    }
  });

  return (
    <>
      {Object.keys(lightState).map((key) => {
        if(key.slice(0,3) !== "set"){
          return <group key={key}>
            <primitive
              object={lightObjects[key]}
              position={lightState[key].position}
              intensity={lightState[key].power * lightPowerMultiplier * lightState[key].ON}
              color={lightState[key].color}
              castShadow
              shadow-mapSize={shadowMapSize}
              shadow-bias={shadowBias}
            />
            <primitive 
            object={lightObjects[key].target} 
            position={lightState[key].target} 
            />
            <mesh
              position={lightState[key].position}
              rotation={[Math.PI / 2, 0, 0]}
              receiveShadow
            >
              <sphereBufferGeometry
                args={[0.1, 32, 32]}
              >
              </sphereBufferGeometry>
              <meshStandardMaterial
                color={lightState[key].color}
                emissiveIntensity={lightState[key].power * lampEmissivityMultiplier * lightState[key].ON}
                emissive={lightState[key].color}
              />
            </mesh>
            <mesh
              position={[lightState[key].position[0], lightState[key].position[1] + 0.1, lightState[key].position[2]]}
              rotation={[Math.PI / 2, 0, 0]}
              receiveShadow
            >
              <sphereBufferGeometry
                args={[0.175, 32, 32]}
              >
              </sphereBufferGeometry>
              <meshStandardMaterial
                color="#eee"
              />
            </mesh>
          </group>
          }else{
            return null
          }
      })}
      <ambientLight
        intensity={0.05}
      />
    </>
  );
}