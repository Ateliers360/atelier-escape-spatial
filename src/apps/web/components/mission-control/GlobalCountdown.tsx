// Horloge massive gérée par un Web Worker (pour la précision) avec affichage des millisecondes.

import { useEffect, useState } from 'react';

export default function GlobalCountdown() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const worker = new Worker(new URL('./countdown.worker', import.meta.url));
    worker.postMessage('start');
    worker.onmessage = ({ data }) => {
      setTime(data);
    };
    return () => {
      worker.postMessage('stop');
      worker.terminate();
    };
  }, []);

  return (
    <div className="flex items-center justify-center">
      <p className="text-9xl font-bold">{time}</p>
    </div>
  );
}
