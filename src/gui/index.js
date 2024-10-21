import Target from "./Components/Target.js";
import DeviceInterface from "./Components/DeviceInterface.js";
import Start from "./Components/Start.js";
import Menu from "./Components/Menu.js";
import "./styles.css";
export default function GUI({lockedPlayer, setLockedPlayer}){

    return(
        <>
            <DeviceInterface 
            lockedPlayer={lockedPlayer}
            setLockedPlayer={setLockedPlayer}
            />
            <Target
            lockedPlayer={lockedPlayer}
            />
            <Start/>
            <Menu/>
        </>
    )

}