import { useEffect, useState, useContext} from "react";
import { GameStateContext } from "../../state/GameState";

export default function Menu() {
    const [subMenu, setSubMenu] = useState("none");
    const gameState = useContext(GameStateContext);

    if (gameState.paused) {
        return (
                <button id="resumeGame"
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "20vh",
                    height: "10vh",
                    fontSize: "5vh",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    zIndex: "5",
                    borderRadius: "4vh",
                    borderWidth: "5px",
                    background: "hsl(0, 0%, 20%)",
                    color: "white",
                    cursor: "pointer",
                }}
                    onClick={() => gameState.setPaused(!gameState.paused)}
                >
                    Resume
                </button>
        )
    }
    return null;
}