import * as THREE from "three";
import React, { useRef, useEffect, useState, useContext } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";
import { GameStateContext } from "../../state/GameState";
//import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

import { useSphere } from "@react-three/cannon";

const SPEED = 3;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const speed = new THREE.Vector3();
const keys = {
  KeyQ: "turnR",
  KeyE: "turnL",
  KeyW: "forward",
  KeyS: "backward",
  KeyA: "left",
  KeyD: "right",
  Space: "jump"
};
const moveFieldByKey = (key) => keys[key];

const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    turnR: false,
    turnL: false,
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  });
  useEffect(() => {
    const handleKeyDown = (e) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
    const handleKeyUp = (e) =>
      setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return movement;
};

export const Player = () => {
  const gameState = useContext(GameStateContext);

  const {
    turnR,
    turnL,
    forward,
    backward,
    left,
    right,
    jump
  } = usePlayerControls();
  const { camera } = useThree();

  //const controls = new PointerLockControls( camera, document.body );


  const velocity = useRef([0, 0, 0]);
  const [ref, api] = useSphere(() => ({
    mass: 60,
    type: "Dynamic",
    position: [0, 1.3, 0],
    args: [0.3, 0.3, 0.3],
  }));
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)));
  useEffect(() => {
    if (gameState.player.lockedOn) {
      api.position.set(gameState.player.position[0], gameState.player.position[1], gameState.player.position[2]);
    }
  }, [gameState.player.lockedOn]);
  useFrame((state) => {
    ref.current.getWorldPosition(camera.position);
    if (!gameState.player.lockedOn && !gameState.paused) {
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    camera.rotation.set(
      camera.rotation.x,
      camera.rotation.y,
      camera.rotation.z,
      "XYZ"
    );
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    speed.fromArray(velocity.current);
      camera.position.y += 1.3;
      api.velocity.set(direction.x, velocity.current[1], direction.z);
      camera.zoom = 1;
      camera.updateProjectionMatrix();
    } else {
      api.velocity.set(0, 0, 0);
      camera.position.y = gameState.player.position[1];
      camera.lookAt(gameState.player.target[0], gameState.player.target[1], gameState.player.target[2]);
      camera.zoom = gameState.player.zoom;
      camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      <PointerLockControls
        enabled={!gameState.player.lockedOn}
        selector={["#escapeDevice", "#start", "#resumeGame"]}
      />
      <mesh ref={ref} />
    </>
  );
};
