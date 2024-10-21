import { useContext } from "react";
import { GameStateContext } from "../../state/GameState";
export default function Start() {
    const gameState = useContext(GameStateContext);
    if (!gameState.start) {
        return (
            <button
                id="start"
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
                onClick={() => gameState.setStart(true)}
            >Start
            </button>
        );
    } else {
        return null
    }
}