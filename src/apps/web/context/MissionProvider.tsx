// Store de l'état de la mission
'use client';

import React from 'react';
import { useSocketSync } from '../hooks/useSocketSync';
import { useIncidentManager } from '../hooks/useIncidentManager';

export const MissionProvider = ({ children }: { children: React.ReactNode }) => {
  // On active les écouteurs temps réel
  useSocketSync();

  // On active la gestion des alertes et sons
  useIncidentManager();

  return <>{children}</>;
};
