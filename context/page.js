"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { getDeviceWidth } from '@/lib/deviceWidth';

const DeviceWidthContext = createContext();

export const DeviceWidthProvider = ({ children }) => {
  const [deviceWidth, setDeviceWidth] = useState('2xl');

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(getDeviceWidth(window.innerWidth));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DeviceWidthContext.Provider value={deviceWidth}>
      {children}
    </DeviceWidthContext.Provider>
  );
};

export const useDeviceWidthContext = () => {
    const context = useContext(DeviceWidthContext);
    return context;
  };