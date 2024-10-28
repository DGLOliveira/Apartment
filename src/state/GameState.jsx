import { createContext, useState } from 'react';

export const GameStateContext = createContext({
  start: false,
  setStart: () => { },
  paused: false,
  setPaused: () => { },
  hover: "none",
  setHover: () => { },
  player: {
    lockedOn: false,
    position: [0, 0, 0],
    target: [0, 0, 0],
    targetName: "",
    zoom: 1
  },
  setPlayer: () => { },
  settings: {},
  setSettings: () => { }
})


export function GameStateProvider({ children }) {
  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState("none");
  const [player, setPlayer] = useState({
    lockedOn: false,
    position: [0, 0, 0],
    target: [0, 0, 0],
    name: "",
    zoom: 1
  });
  const [settings, setSettings] = useState({
    debugPhysics: false,
    debugAnimations: false
  });
  const contextValue = {
    start,
    setStart,
    paused,
    setPaused,
    hover,
    setHover,
    player,
    setPlayer
  };

  return (
    <GameStateContext.Provider value={contextValue}>
      {children}
    </GameStateContext.Provider>
  );
}
export default GameStateProvider;
