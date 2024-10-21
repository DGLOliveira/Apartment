import {createContext, useState} from 'react';

export const ObjectStateContext = createContext({
    Windows:{},
    setWindows: () => {},
    Doors:{},
    setDoors: () => {},
    Cabinets:{},
    setCabinets: () => {},
    Drawers:{},
    setDrawers: () => {},
    Appliances:{},
    setAppliances: () => {},
})

export function ObjectStateProvider({ children }) {

  const [Windows, setWindows] = useState({
   BedroomIn: "Closed",
    BedroomOut: "Closed",
    LivingRoomIn: "Closed",
    LivingRoomOut: "Closed"
  });
  const [Doors, setDoors] = useState({
    Bedroom: "Open",
    CommonBathroom: "Open",
    PrivateBathroom: "Open"
  });
  const [Cabinets, setCabinets] = useState({
    Drawer1: "Closed",
    DrawerSet1: "Closed",
    DrawerSet2: "Closed",
    DrawerSet3: "Closed",
    DrawerSet4: "Closed",
  });
  const [Drawers, setDrawers] = useState({
    TopFarRight: "Closed",
      TopRight: "Closed",
      TopLeft: "Closed",
      BottomRight: "Closed",
      BottomLeft: "Closed"
  })
  const [Appliances, setAppliances] = useState({
    Fridge:{
        ON: true,
        DoorTopLeft: "Closed",
        DoorTopRight: "Closed",
        DoorBottomLeft: "Closed",
        DoorBottomRight: "Closed"
    },
    Stove:{
        TopLeft: "Off",
        TopRight: "Off",
        BottomLeft: "Off",
        BottomRight: "Off",
        Center: "Off"
    },
    Oven:{
        ON: false,
        Door: "Closed"
    },
    Microwave:{
        ON: false,
        Door: "Closed"
    },
  });

  const contextValue = {
    Windows,
    setWindows,
    Doors,
    setDoors,
    Cabinets,
    setCabinets,
    Drawers,
    setDrawers,
    Appliances,
    setAppliances
  };

  return (
    <ObjectStateContext.Provider value={contextValue}>
      {children}
    </ObjectStateContext.Provider>
  );
}
export default ObjectStateProvider;
