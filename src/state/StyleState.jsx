import {createContext, useState} from 'react';

export const StyleStateContext = createContext({
})

export function StyleStateProvider({ children }) {
    
    

  const contextValue = {
  };

  return (
    <StyleStateContext.Provider value={contextValue}>
      {children}
    </StyleStateContext.Provider>
  );
}
export default StyleStateProvider;
