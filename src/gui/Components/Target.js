import { useContext } from "react";
import { GameStateContext } from "../../state/GameState";
import { FaCrosshairs } from "react-icons/fa";
import { FaRegHandPointer } from "react-icons/fa";
import { FaRegHandPaper } from "react-icons/fa";
import { RiShutDownLine } from "react-icons/ri";
export default function Target() {
    const gameState = useContext(GameStateContext);
    if (!gameState.player.lockedOn) {
        return (
            <div 
            id="target"
            >
                {!gameState.player.lockedOn && 
                <>
                    {gameState.hover === "none" && <FaCrosshairs />}
                    {gameState.hover === "Switch" && <FaRegHandPointer style={{ position: "relative", top: "15px", left: "5px" }} />}
                    {gameState.hover === "Door" && <FaRegHandPaper />}
                    {gameState.hover === "SmartHome" && <RiShutDownLine />}
                    {gameState.hover === "Monitor" && <RiShutDownLine />}
                    {gameState.hover === "PC" && <RiShutDownLine />}
                    {gameState.hover === "SmartTV" && <RiShutDownLine />}
                </>
                }
            </div>
        );
    }
}