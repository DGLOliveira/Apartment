import {useContext} from "react";
import {DeviceStateContext} from "../../../state/DeviceState";
import { Html } from "@react-three/drei";
export default function PC() {
    const deviceState = useContext(DeviceStateContext);
    return (
        <Html
        scale={0.05}
        position={[-3.875, 1.48, -2.32]}
        zIndexRange={[0, 2]}
        transform
        occlude
        onClick={(e) => {
          e.stopPropagation();
        }}>
            {deviceState.PC.ON ? <iframe
                style={{border: 0}}
                className="cloud-computer"
                src="https://dgloliveira.github.io/Portfolio"
                width={1544*0.72}
                height={720*0.72}
            />:
            null}
        </Html>
    );
}