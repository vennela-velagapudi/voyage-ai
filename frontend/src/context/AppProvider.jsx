import { useState } from 'react';
import { AppContext } from './AppContext';

export function AppProvider({ children }) {
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    currency: 'USD',
  });

  return (
    <AppContext.Provider value={{ preferences, setPreferences }}>{children}</AppContext.Provider>
  );
}
