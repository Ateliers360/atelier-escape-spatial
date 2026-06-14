// Un composant fixe qui applique un dégradé de lignes de balayage (scanlines),
// un léger scintillement (flicker) et une distorsion "fish-eye" sur tout l'écran via CSS.
'use client';

import React from 'react';

export const CrtOverlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      {/* Lignes de balayage (Scanlines) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%]" />

      {/* Scintillement global (Flicker) */}
      <div className="animate-flicker absolute inset-0 bg-mission-cyan/5 opacity-[0.03]" />

      {/* Distorsion de coin (Vignette) */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
    </div>
  );
};
