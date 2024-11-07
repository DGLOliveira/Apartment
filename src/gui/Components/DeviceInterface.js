import { useContext } from "react";
import { RiShutDownLine } from "react-icons/ri";
import { GameStateContext } from "../../state/GameState";
import { DeviceStateContext } from "../../state/DeviceState";

export default function deviceInterface() {
    const gameState = useContext(GameStateContext);
    const deviceState = useContext(DeviceStateContext);

    const unlockPlayer = () => {
        gameState.setPlayer({ ...gameState.player, lockedOn: false });
    };
    const powerDevice = () => {
        if (gameState.player.targetName === "SmartHome") {
            deviceState.setSmartHome({ ...deviceState.SmartHome, ON: !deviceState.SmartHome.ON });
        }
        else if (gameState.player.targetName === "SmartTV") {
            deviceState.setSmartTV({ ...deviceState.SmartTV, ON: !deviceState.SmartTV.ON });
        }
        else if (gameState.player.targetName === "PC") {
            deviceState.setPC({ ...deviceState.PC, ON: !deviceState.PC.ON });
        }
    }
    if (gameState.player.lockedOn) {
        return (
            <div id="deviceInterface">
                <button
                    id="escapeDevice"
                    onClick={() => unlockPlayer()}
                >X
                </button>
                <button
                    id="powerDevice"
                    style={{ color: deviceState[gameState.player.targetName].ON ? "green" : "red" }}
                    onClick={() => powerDevice()}
                >
                    <RiShutDownLine />
                </button>
            </div>
        )
    }
    else {
        return null
    }
}