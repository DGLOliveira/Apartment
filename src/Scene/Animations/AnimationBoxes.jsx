import { Box } from "@react-three/drei";
import { useContext } from "react";
import { GameStateContext } from "../../state/GameState";
export default function AnimationBoxes({ objects }) {
    const gameState = useContext(GameStateContext);
    //console.log(objects);
    let modifiedObjects = objects;
    Object.keys(modifiedObjects).forEach((key) => {
        let args = [];
        let rotation = [];
        if (key.slice(0, 6) === "Window") {
            args = [0.15, 2.6, 1.15];
        } else if (key.slice(0, 4) === "Door") {
            if (key === "DoorHallBathroom") {
                args = [1.25, 2.6, 0.15];
            } else {
                args = [0.15, 2.6, 1.25];
            }
        } else if (key.slice(0, 6) === "Switch") {
            if(key === "SwitchCommonBathroom" || 
                key === "SwitchBackyard1" || 
                key === "SwitchBackyard2" || 
                key === "SwitchPrivateBathroom"){
                args = [0.03, 0.07, 0.07];
            }else if(key === "SwitchDesk"){
                args= [0.07, 0.02, 0.03];
            }
            else{
                args = [0.07, 0.07, 0.015];
            }
        } /*else if(key.slice(0,16) === "KitchenDrawerSet"){
            args = [0.7, 0.2, 0.55];
        }else if(key ==="OvenDoor"){
            args = [0.15, 0.75, 0.75];
        }else if(key.slice(0,17) === "KitchenCabinetTop" ||
            key === "KitchenCabinetBottom1Door"){
            args = [0.15, 0.75, 0.75];
        }else if(key === "KitchenCabinetBottom2Door"){
            args = [0.75, 0.75, 0.15];
        }*/else if(key === "SmartHome"){
            args = [0.32, 0.25, 0.03]
        }else if(key === "SmartTV"){
            args = [2.15, 1.15, 0.05]
            rotation = objects[key].else;
        }else if(key === "TVRemote"){
            args = [0.07, 0.03, 0.15];
        
        }else if(key === "Monitor"){
            args = [1.45, 0.7, 0.03]
        }else if(key === "PC"){
            args = [0.27, 0.5, 0.4]
        }

        modifiedObjects[key] = {
            args: args,
            position: objects[key].position,
            rotation: objects[key].rotation,
            else: objects[key].else
        }
    });
    //Indicates GUI if object with interaction is being hovered
    const hoverHandler = (e, key, type) => {
        e.stopPropagation();
        let obj = null;
        let hovering = "none";
        if (e.distance < 1.8 && type === "move") {
            if (key === "SmartHome") {
                hovering = "SmartHome";
            }
            else if (key === "SmartTV") {
                hovering = "SmartTV";
            }
            else if (key === "TVRemote") {
                hovering = "TVRemote";
            }
            else if (key === "Monitor") {
                hovering = "Monitor";
            }
            else if(key === "PC"){
                hovering = "PC";
            }
            else if (key.slice(0, 6) === "Window" || key.slice(0, 4) === "Door") {
                hovering = "Door";
            }
            else if (key.slice(0, 6) === "Switch") {
                hovering = "Switch";
            }
        }
        if (hovering !== gameState.hover) {
            gameState.setHover(hovering);
            console.log(key);
        }
    };
    return (
        <group>
            {Object.keys(modifiedObjects).map((key) => (
                <Box
                    position={[modifiedObjects[key].position.x, modifiedObjects[key].position.y, modifiedObjects[key].position.z]}
                    args={modifiedObjects[key].args}
                    key={key}
                    onPointerMove={(e) => { hoverHandler(e, key, "move") }}
                    onPointerLeave={(e) => { hoverHandler(e, key, "leave") }}
                    visible={true}
                    
                >
                    <meshBasicMaterial color={"green"} wireframe={true} visible={true}/>
                </Box>
            ))}
        </group>
    );
}