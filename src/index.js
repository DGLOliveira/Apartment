import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import GameStateProvider from "./state/GameState.jsx";
import DeviceStateProvider from "./state/DeviceState.jsx";
import LightStateProvider from "./state/LightState.jsx";
import ObjectStateProvider from "./state/ObjectState.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <GameStateProvider>
    <DeviceStateProvider>
      <LightStateProvider>
        <ObjectStateProvider>
          <App />
        </ObjectStateProvider>
      </LightStateProvider>
    </DeviceStateProvider>
  </GameStateProvider>
);
