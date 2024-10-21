import {createContext, useState} from 'react';

export const DeviceStateContext = createContext({
    PC: {},
    setPC: () => {},
    SmartTV: {},
    setSmartTV: () => {},
    SmartHome: {},
    setSmartHome: () => {}
})

export function DeviceStateProvider({ children }) {
    const [PC, setPC] = useState({
        ON: false,
        lockedOn: false
    });
    const [SmartTV, setSmartTV] = useState({
        ON: false,
        lockedOn: false
    });
    const [SmartHome, setSmartHome] = useState({
        ON: false,
        lockedOn: false
    });

  const contextValue = {
    PC,
    setPC,
    SmartTV,
    setSmartTV,
    SmartHome,
    setSmartHome
  };

  return (
    <DeviceStateContext.Provider value={contextValue}>
      {children}
    </DeviceStateContext.Provider>
  );
}
export default DeviceStateProvider;
