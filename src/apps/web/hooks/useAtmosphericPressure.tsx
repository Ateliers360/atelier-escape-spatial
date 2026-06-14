// Hook pour récupérer la pression atmosphérique.

import { useState, useEffect } from 'react';

export function useAtmosphericPressure() {
  const [atmosphericPressure, setAtmosphericPressure] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setAtmosphericPressure((prevPressure) => prevPressure + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return atmosphericPressure;
}
