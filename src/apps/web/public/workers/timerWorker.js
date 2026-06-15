// Worker pour gérer le timer de manière précise sans bloquer le thread principal
let timerId = null;
self.onmessage = (e) => {
  if (e.data === 'START') {
    timerId = setInterval(() => self.postMessage('TICK'), 10); // Précision 10ms
  } else if (e.data === 'STOP') {
    clearInterval(timerId);
  }
};
