import { useState, useEffect, useContext, Suspense } from "react";
import Scene from "./Scene/index.jsx";
import GUI from "./gui/index.js";
import { GameStateContext } from "./state/GameState.jsx";
import "./styles.css";

export default function App() {
    //const [start, setStart] = useState(false);
    const gameState = useContext(GameStateContext);
    const [hovered, setHovered] = useState("none");
    const Fallback = <div
    style={{
        position:"absolute",
        top:0,
        left:0,
        width:"100%",
        height:"100%",
        fontSize:"20vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        color:"white",
        background:"black",
        zIndex:"100"
    }}
    >Loading...</div>;
    const handleEscape = (e) => {
        if (e.key === "Escape" && !gameState.paused) {
            console.log("Escape pressed");
            gameState.setPaused(true);
        }
    }
 
    useEffect(() => {
        document.addEventListener("keydown", (e) => handleEscape(e));
        return () => {
            document.removeEventListener("keydown", (e) => handleEscape(e));
        }
    }, [gameState.paused]);


    return (
        <Suspense fallback={null}>
            <Scene />
            <GUI />
        </Suspense>
    );
}