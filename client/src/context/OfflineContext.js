import React, { createContext, useContext, useState } from 'react';

const OfflineContext = createContext();

export const useOffline = () => {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
};

export const OfflineProvider = ({ children }) => {
  const [isOffline, setIsOffline] = useState(false);

  const setOfflineMode = (offline) => {
    setIsOffline(offline);
  };

  return (
    <OfflineContext.Provider value={{ isOffline, setOfflineMode }}>
      {children}
    </OfflineContext.Provider>
  );
}; 