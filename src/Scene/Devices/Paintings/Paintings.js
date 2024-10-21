import * as THREE from "three";
import { Plane } from "@react-three/drei";

export const Paintings = () => {
  const uniforms1 = {
    color1: {
      value: new THREE.Color("#FF0000")
    },
    color2: {
      value: new THREE.Color("#0000FF")
    },
    color3: {
      value: new THREE.Color("#008800")
    }
  };
  const vertexShader1 = `
      varying vec2 vUv;
  
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`;

  const fragmentShader1 = `
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
    
      varying vec2 vUv;
      
      void main() {
        
        gl_FragColor = vec4(mix(mix(color1,color2,vUv.y), color3, vUv.x), 1.0);
      }`;
  const uniforms2 = {
    color1: {
      value: new THREE.Color("green")
    },
    color2: {
      value: new THREE.Color("blue")
    }
  };
  const vertexShader2 = `
          varying vec2 vUv;
      
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }`;

  const fragmentShader2 = `
          uniform vec3 color1;
          uniform vec3 color2;
        
          varying vec2 vUv;
          
          void main() {
            
            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
          }`;
  return (
    <group>
      <Plane args={[0.6, 1.28]} position={[-1.65, 1.645, -2.47]}>
        <shaderMaterial
          uniforms={uniforms1}
          vertexShader={vertexShader1}
          fragmentShader={fragmentShader1}
        />
      </Plane>
      <Plane args={[0.6, 1.28]} position={[1.65, 1.645, -2.47]}>
        <shaderMaterial
          uniforms={uniforms2}
          vertexShader={vertexShader2}
          fragmentShader={fragmentShader2}
        />
      </Plane>
    </group>
  );
};
