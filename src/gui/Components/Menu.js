import { useEffect, useState, useContext } from "react";
import { GameStateContext } from "../../state/GameState";

export default function Menu() {
    const [subMenu, setSubMenu] = useState("none");
    const gameState = useContext(GameStateContext);

    if (gameState.paused) {
        return (
            <div id="menu">{
                subMenu === "none" &&
                <>
                <h1>Menu</h1>
                    <button id="resumeGame"
                        onClick={() => gameState.setPaused(!gameState.paused)}
                    >
                        Resume
                    </button>
                    <button
                        id="debugButton"
                        onClick={() => setSubMenu("Debug")}
                    >
                        Debug
                    </button>
                </>
            }
                {subMenu === "Debug" &&
                    <>
                        <button
                            id="returnButton"
                            onClick={() => setSubMenu("none")}>
                            Return
                        </button>
                    </>}
            </div>
        )
    }
    return null;
}