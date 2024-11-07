import Target from "./Components/Target.js";
import DeviceInterface from "./Components/DeviceInterface.js";
import Start from "./Components/Start.js";
import Menu from "./Components/Menu.js";
import "./styles.css";
export default function GUI(){

    return(
        <>
            <DeviceInterface />
            <Target />
            <Start />
            <Menu />
        </>
    )

}