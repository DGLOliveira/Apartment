import {createContext, useState} from 'react';

export const LightStateContext = createContext({
    LivingRoom: {},
    setLivingRoom: () => {},
    Kitchen: {},
    setKitchen: () => {},
    Bedroom: {},
    setBedroom: () => {},
    Backyard: {},
    setBackyard: () => {},
    PrivateBathroom: {},
    setPrivateBathroom: () => {},
    CommonBathroom: {},
    setCommonBathroom: () => {}
})

export function LightStateProvider({ children }) {

    const [LivingRoom, setLivingRoom] = useState({
        ON: true,
        color: "#FFFFFF",
        power: 70,
        position: [0, 2.95, 0],
        target: [0, 0, 0]
    });
    const [Kitchen, setKitchen] = useState({
        ON: true,
        color: "#FFFFFF",
        power: 70,
        position: [6.5, 2.93, 0],
        target: [6.5, 0, 0]
    });
    const [Bedroom, setBedroom] = useState({
        ON: false,
        color: "#FFFFFF",
        power: 70,
        position: [-3.4, 2.93, 6],
        target: [-3.4, 0, 6]
    });
    const [Backyard, setBackyard] = useState({
        ON: false,
        color: "#FFFFFF",
        power: 70,
        position: [-7.5, 2.95, 2.5],
        target: [-7, 0, 2.5]
    });
    const [PrivateBathroom, setPrivateBathroom] = useState({
        ON: false,
        color: "#FFFFFF",
        power: 70,
        position: [2, 2.93, 7.3],
        target: [2, 0, 7.3]
    });
    const [CommonBathroom, setCommonBathroom] = useState({
        ON: false,
        color: "#FFFFFF",
        power: 70,
        position: [6.5, 2.93, 7.3],
        target: [6.5, 0, 7.3]
    });

  const contextValue = {
    LivingRoom,
    setLivingRoom,
    Kitchen,
    setKitchen,
    Bedroom,
    setBedroom,
    Backyard,
    setBackyard,
    PrivateBathroom,
    setPrivateBathroom,
    CommonBathroom,
    setCommonBathroom
  };

  return (
    <LightStateContext.Provider value={contextValue}>
      {children}
    </LightStateContext.Provider>
  );
}
export default LightStateProvider;
