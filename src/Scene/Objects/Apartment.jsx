import React, { useState, useEffect, useMemo, useRef, Suspense, useContext } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useTexture, useAnimations } from "@react-three/drei";

import { LightStateContext } from "../../state/LightState.jsx";
import { GameStateContext } from "../../state/GameState.jsx";
import { DeviceStateContext } from "../../state/DeviceState.jsx";

import Lights from "../Lighting/Lights.jsx";
import AnimationBoxes from "../Animations/AnimationBoxes.jsx";

import { SmartHome } from "../Devices/SmartHome/SmartHome.jsx";


import WoodFloorText from "../Materials/Textures/FloorWood1.png";
import WallText from "../Materials/Textures/Wall.png";
import WhiteRugText from "../Materials/Textures/WhiteRug.png";
import WoodText from "../Materials/Textures/FurnitureWood.png";
import CouchText from "../Materials/Textures/BlueCouch.png";
import PillowText from "../Materials/Textures/WhitePillow.png";
import WhiteWoodText from "../Materials/Textures/WhiteWood.png";
import GlobeText from "../Materials/Textures/physical-world-map.jpg";
import GraniteText from "../Materials/Textures/Granite.png";

import setShadows from "../Lighting/setShadows.js";
import setVisibility from "../Lighting/setVisibility.js"
import setTextures from "../Materials/setTextures.js";
import setColors from "../Materials/setColors.js";

import RoomObj from "./room3.1.glb";

export default function Apartment({ obstacleObjects, setObstacleObjects, lockedPlayer, setLockedPlayer }) {

    const group = useRef(null);
    const { nodes, materials, animations } = useGLTF(RoomObj);
    const { actions } = useAnimations(animations, group);

    const lightState = useContext(LightStateContext);
    const gameState = useContext(GameStateContext);
    const deviceState = useContext(DeviceStateContext);

    //--------------------------------------------------------------------------------
    //Animation States
    //--------------------------------------------------------------------------------

    const [actionObjects, setActionObjects] = useState(null);
    const [doorState, setDoorState] = useState({});
    const [windowState, setWindowState] = useState({});
    const [kitchenStorage, setKitchenStorage] = useState({});
    const [fridgeState, setFridgeState] = useState({});
    const [ovenState, setOvenState] = useState({});
    const [microwaveState, setMicrowaveState] = useState({});

    //--------------------------------------------------------------------------------
    //Textures & Colors Management
    //--------------------------------------------------------------------------------

    const woodFloorMap = useTexture(WoodFloorText);
    const woodMap = useTexture(WoodText);
    const wallMap = useTexture(WallText);
    const rugMap = useTexture(WhiteRugText);
    const pillowMap = useTexture(PillowText);
    const couchMap = useTexture(CouchText);
    const globeMap = useTexture(GlobeText);
    const whiteWoodMap = useTexture(WhiteWoodText);
    const graniteMap = useTexture(GraniteText);
    const textureList = {
        WoodTexture: woodMap,
        WallTexture: wallMap,
        GraniteTexture: graniteMap,
        RugTexture: rugMap,
        PillowTexture: pillowMap,
        CouchTexture: couchMap,
        GlobeTexture: globeMap,
        WhiteWoodTexture: whiteWoodMap,
    };

    const [apartmentStyle, setApartmentStyle] = useState({
        MainFloorColor: "#DAA520",
        MainFloorTexture: "",
        BathroomFloorColor: "#696969",
        BathroomFloorTexture: "",
        CeilingColor: "#7F7F7F",
        CeilingFloorMap: "none",
        WallColor: "#FFFFFF",
        WallTexture: ""
    });

    useMemo(() => { if (materials) { setTextures(materials, nodes, textureList); } });
    useMemo(() => { if (materials) { setColors(materials, apartmentStyle); } }, [apartmentStyle]);


    //--------------------------------------------------------------------------------
    //Shadows, Rotating Objects and Visibility Management
    //--------------------------------------------------------------------------------

    let actionGroup = {};
    let obstacleGroup = [];
    useMemo(() => {
        console.log(nodes);
        if (nodes) {
            setShadows(nodes);
            setVisibility(nodes);
        }
        //console.log(nodes);
        //console.log(actions);
        nodes.Scene.children.forEach((child) => {
            if (child.type === "Mesh") {
                //Replaces transparent materials with custom physical material from threejs
                if (
                    child.material.name === "SurfaceGlass" ||
                    child.material.name === "Water" ||
                    child.material.name === "WindowGlass"
                ) {
                    child.material = new THREE.MeshPhysicalMaterial({
                        map: child.material.map,
                        color: child.material.color,
                        side: THREE.DoubleSide,
                        transparent: true,
                        reflectivity: 0.9,
                        metalness: 0.9,
                        roughness: 0.6,
                        transmission: 0.4,
                        opacity: 0.4,
                        thickness: 1,
                        iridescence: 1
                    });
                }
            }
            //If the object has an action, capture position for creation of hitbox
            if (child.name.slice(0, 6) === "Switch" ||
                child.name.slice(0, 6) === "Window" ||
                child.name.slice(0, 4) === "Door") {
                if (child.name.slice(0, 10) !== "SwitchBase" &&
            child.name.slice(0, 9) !== "DoorSlide" &&
            child.name.slice(0, 11) !== "WindowFrame") {
                    actionGroup[child.name] = {
                        position: child.position,
                        else: child
                    }
                }
            }
            /*if (child.name === "OvenDoor" ||
                child.name === "MicrowaveDoor" ||
                child.name.slice(0, 10) === "FridgeDoor" ||
                child.name.slice(0, 7) === "Kitchen") {
                actionGroup[child.name] = {
                    position: child.position,
                    else: child
                }
            }*/
           else if(child.type === "Group"){
            if(child.name === "SmartTV" || 
                child.name === "SmartHome" ||
                child.name === "Monitor"){
                child.children.forEach((grandchild) => {
                    if(grandchild.type === "Mesh"){
                        if(grandchild.material.name === "BlackMirror"){
                            grandchild.material = new THREE.MeshPhysicalMaterial({
                                map: grandchild.material.map,
                                color: grandchild.material.color,
                                side: THREE.DoubleSide,
                                transparent: false,
                                reflectivity: 0.8,
                                metalness: 1,
                                roughness: 0.1,
                                transmission: 0,
                                opacity: 1,
                                thickness: 1,
                                iridescence: 1
                            })
                        }
                    }
                })
            }
           }
        });
        //Get positions for device hitboxes and assign to action group
        actionGroup = {
            ...actionGroup,
            SmartHome: {
                position: nodes.SmartHome.position,
                else: nodes.SmartHome
            },
            SmartTV: {
                position: nodes.SmartTV.position,
                else: nodes.SmartTV
            },
            TVRemote: {
                position: nodes.TVRemote.position,
                else: nodes.TVRemote
            },
            Monitor: {
                position: nodes.Monitor.position,
                else: nodes.Monitor
            },
            PC: {
                position: nodes.PC.position,
                else: nodes.PC
            }
        };
        setActionObjects({
            ...actionGroup
        });
        //Get positions for physical obstacles and assign to obstacle group
        nodes.Apartment.children.forEach((child) => {
            obstacleGroup.push(child);
        });
        nodes.WindowBedroomIn.children.forEach((child) => {
            obstacleGroup.push(child);
        });
        nodes.WindowBedroomOut.children.forEach((child) => {
            obstacleGroup.push(child);
        });
        nodes.WindowLivingRoomIn.children.forEach((child) => {
            obstacleGroup.push(child);
        });
        nodes.WindowLivingRoomOut.children.forEach((child) => {
            obstacleGroup.push(child);
        });
        obstacleGroup.push(nodes.DoorBedroom);
        obstacleGroup.push(nodes.DoorHallBathroom);
        obstacleGroup.push(nodes.DoorPrivateBathroom);
        setObstacleObjects(obstacleGroup);
    }, [nodes]);

    //--------------------------------------------------------------------------------
    //Animations
    //--------------------------------------------------------------------------------

    //Animation for globe rotation
    useFrame((state, delta) => {
        nodes.Globe.rotation.y +=  delta * 0.25;
    });
    //Animation for buttons
    const switchAnimation = (animName) => {
        console.log("Animation: " + animName);
        const action = actions[animName];
        action.loop = THREE.LoopOnce;
        action.clampWhenFinished = true;
        action.reset().play();
    };
    //Animation for doors and windows
    const pingpongAnimation = (animName, currAnimState) => {
        const action = actions[animName];
        console.log("Animation: " + animName);
        if (action.time === 0) {
            action.reset();
        }
        if (!currAnimState) {
            action.clampWhenFinished = true;
            action.timeScale = 1;
            action.loop = THREE.LoopOnce;
            action.play();
        } else {
            action.paused = false;
            action.timeScale = -1;
            action.loop = THREE.LoopOnce;
            action.play();
        }
    };

    //--------------------------------------------------------------------------------
    //Actions
    //--------------------------------------------------------------------------------


    const { camera } = useThree();
    //nodes.Scene.add(camera);
    //console.log(camera);


    //Handles interaction with objects
    const clickHandler = (e) => {
        console.log(e);
        e.stopPropagation();
        let obj = null;
        let animName = null;
        let animState = null;
        if (e.object !== null && e.distance < 1.5) {
            obj = e.object;
            console.log("Name: " + obj.name + " Parent: " + obj.parent.name);
            console.log(obj.parent);
            //console.log(obj.parent.name.slice(0, 5));
            if (obj.parent.name.slice(0, 6) === "Switch") {
                animName = obj.parent.name + "Action";
                animState = obj.parent.name.slice(6);
                let setStateKey= "set"+obj.parent.name.slice(6);
                let stateKey = animState;
                //Check if the last character is a number, for cases when multiple switches control the same light
                if(!isNaN(Number(setStateKey.slice(-1)))){
                    setStateKey = setStateKey.slice(0,-1);
                    stateKey = stateKey.slice(0,-1);
                }
                console.log(stateKey);
                lightState[setStateKey]({ ...lightState[stateKey], ON: !lightState[stateKey].ON });
                switchAnimation(animName);
            }  else if (obj.name.slice(0, 4) === "Door") {
                animName = obj.name + "Action";
                animState = obj.name.slice(4);
                setDoorState({ ...doorState, [animState]: !doorState[animState] });
                pingpongAnimation(animName, doorState[animState]);
            } else if (obj.parent.name.slice(0, 6) === "Window") {
                animName = obj.parent.name + "Action";
                animState = obj.parent.name.slice(6);
                setWindowState({
                    ...windowState,
                    [animState]: !windowState[animState]
                });
                pingpongAnimation(animName, windowState[animState]);
            } else if (obj.parent.name.slice(0, 10) === "FridgeDoor") {
                animName = obj.parent.name + "Action";
                animState = obj.parent.name.slice(6);
                setFridgeState({
                    ...fridgeState,
                    [animState]: !fridgeState[animState]
                });
                pingpongAnimation(animName, fridgeState[animState]);
            } else if (obj.parent.name.slice(0, 7) === "Kitchen") {
                animName = obj.parent.name + "Action";
                animState = obj.parent.name.slice(7);
                setKitchenStorage({
                    ...kitchenStorage,
                    [animState]: !kitchenStorage[animState]
                });
                pingpongAnimation(animName, kitchenStorage[animState]);
            } else if (obj.parent.name === "MicrowaveDoor") {
                animName = obj.parent.name + "Action";
                animState = obj.parent.name.slice(9);
                setMicrowaveState({ Door: !microwaveState[animState] });
                pingpongAnimation(animName, microwaveState[animState]);
            } else if (obj.parent.name === "OvenDoor") {
                animName = obj.parent.name + "Action";
                animState = obj.parent.name.slice(4);
                setOvenState({ Door: !ovenState[animState] });
                pingpongAnimation(animName, ovenState[animState]);
            } else if (obj.parent.name === "SmartHome") {
                console.log(obj.parent);
                gameState.setPlayer({
                    lockedOn: !gameState.player.lockedOn,
                    position: [obj.parent.position.x, obj.parent.position.y, obj.parent.position.z + 0.25],
                    target: [obj.parent.position.x, obj.parent.position.y, obj.parent.position.z],
                    targetName: "SmartHome",
                    zoom: 1.5
                });
                if(!gameState.player.lockedOn){
                    document.exitPointerLock();
                }
                /*setLockedPlayer({
                    locked: !lockedPlayer.locked,
                    position: [obj.parent.position.x, obj.parent.position.y, obj.parent.position.z + 0.25],
                    target: [obj.parent.position.x, obj.parent.position.y, obj.parent.position.z],
                    zoom: 1.5
                });
                if (!lockedPlayer.locked) {
                    document.exitPointerLock();
                }*/
            } else if (obj.parent.name === "Monitor") {
                camera.lookAt(obj.parent.position);
                gameState.setPlayer({
                    lockedOn: !gameState.player.lockedOn,
                    position: [obj.parent.position.x, obj.parent.position.y, obj.parent.position.z + 1],
                    target: [obj.parent.position.x, obj.parent.position.y, obj.parent.position.z],
                    targetName: "PC",
                    zoom: 2
                });
                if(!gameState.player.lockedOn){
                    document.exitPointerLock();
                }/*
                setLockedPlayer({
                    locked: !lockedPlayer.locked,
                    position: [obj.parent.position.x, obj.parent.position.y, obj.parent.position.z + 1],
                    target: [obj.parent.position.x, obj.parent.position.y, obj.parent.position.z],
                    zoom: 2
                });
                if (!lockedPlayer.locked) {
                    document.exitPointerLock();
                }*/
            } else if (obj.parent.name === "TVRemote" || obj.parent.name === "SmartTV") {
                camera.lookAt(nodes.SmartTV.position);
                gameState.setPlayer({
                    lockedOn: !gameState.player.lockedOn,
                    position: [nodes.SmartTV.position.x, nodes.SmartTV.position.y - 0.15, nodes.SmartTV.position.z + 2.5],
                    target: [nodes.SmartTV.position.x, nodes.SmartTV.position.y, nodes.SmartTV.position.z],
                    targetName: "SmartTV",
                    zoom: 2.8
                });
                if(!gameState.player.lockedOn){
                    document.exitPointerLock();
                }
                /*setLockedPlayer({
                    locked: !lockedPlayer.locked,
                    position: [nodes.SmartTV.position.x, nodes.SmartTV.position.y - 0.15, nodes.SmartTV.position.z + 2.5],
                    target: [nodes.SmartTV.position.x, nodes.SmartTV.position.y, nodes.SmartTV.position.z],
                    zoom: 2.8
                });
                if (!lockedPlayer.locked) {
                    document.exitPointerLock();
                }*/
            }
        }
    };
    /*const clickEvent=(e)=>{
        e.stopPropagation();
        clickHandler(e.object);
    }
    useEffect(()=>{
        if(group !== null){
            group.current.addEventListener('click', (e) => clickEvent(e));
            return group.current.removeEventListener('click', (e) => clickEvent(e));
        }
    },[group]);*/

    return (
        <>
            <primitive
                ref={group}
                castShadow
                receiveShadow
                object={nodes.Scene}
                position={[0, 0, 0]}
                onClick={(e) => clickHandler(e)}
            />
            <Lights />
            <SmartHome />
            {actionObjects && <AnimationBoxes
                objects={actionObjects}
            />}
        </>
    )
};