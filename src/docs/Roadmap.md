# C'est un excellent réflexe. Pour un projet de cette envergure, la "colle" technologique (le lien entre le matériel, la base de données et l'interface) est ce qui fait passer le projet d'une simple maquette à un simulateur fonctionnel

Voici la **Roadmap d'implémentation finale** pour finaliser le cœur du système :

---

## 🚀 Roadmap : Cœur Logique et Temps Réel

#### Phase 1 : Persistance et Data (Backend & DB)

* **Implémentation du Client DB** : Créer le singleton Drizzle pour connecter `apps/server` et `apps/web` à Supabase.
* **Modèles de données étendus** : Finaliser les fonctions CRUD pour créer une session, ajouter une équipe et enregistrer les scores.
* **Le Moteur de Physique (`game/engine.ts`)** : Coder la boucle de calcul (Tick) qui gère la descente et la consommation de ressources.

#### Phase 2 : État Global et Flux (Frontend Store)

* **`useMissionStore` (Zustand)** : Finaliser le store avec toutes les actions (mise à jour télémétrie, ajout de logs, gestion des incidents).
* **`MissionProvider`** : Créer le composant d'initialisation qui récupère les données de base (infos de l'atelier) au chargement.

#### Phase 3 : Communication Temps Réel (Hooks Socket)

* **`useSocket`** : Implémenter la gestion bas niveau de la connexion (reconnexion automatique, gestion d'erreurs).
* **`useSocketSync`** : Créer le pont qui écoute le serveur et met à jour le store Zustand automatiquement.

#### Phase 4 : Immersion et Effets (Hooks FX)

* **`useIncidentManager`** : Créer le hook qui déclenche les alarmes sonores (Audio API) et les secousses visuelles (CSS/Framer Motion) sur les écrans.
* **`useAtmosphericPressure`** : (Optionnel/Pédagogique) Calculer des données dérivées pour les graphiques de l'ingénieur.

#### Phase 5 : Routes API et Sécurité

* **Endpoints Admin** : Sécuriser les commandes de l'animateur (trigger incident) via Next.js Server Actions ou API Routes.

---

### 🛠️ Étape 1 : Le Client de Base de Données (`packages/database`)

Pour que vos applications puissent parler à Supabase, nous devons instancier le client.

**Fichier : `packages/database/src/client.ts`**

```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const client = postgres(process.env.DATABASE_URL);
export const db = drizzle(client, { schema });
```

---

### 🛠️ Étape 2 : Le Store Zustand Complet (`apps/web/store/useMissionStore.ts`)

C'est ici que l'on gère la logique de "calcul" côté client pour plus de fluidité.

**Fichier : `apps/web/store/useMissionStore.ts`**

```typescript
import { create } from 'zustand';
import { Telemetry, MissionStatus, Team, Incident, LogEntry } from '../types/mission';

interface MissionStore {
  status: MissionStatus;
  telemetry: Telemetry;
  teams: Team[];
  incidents: Incident[];
  logs: LogEntry[];

  // Actions
  updateTelemetry: (data: Partial<Telemetry>) => void;
  addLog: (sender: string, message: string, type?: 'info' | 'error') => void;
  syncFullState: (state: any) => void;
  triggerLocalEffect: (type: string) => void;
}

export const useMissionStore = create<MissionStore>((set) => ({
  status: 'IDLE',
  telemetry: { altitude: 15000, velocity: 500, fuel: 100, oxygen: 100 },
  teams: [],
  incidents: [],
  logs: [],

  updateTelemetry: (data) =>
    set((state) => ({ telemetry: { ...state.telemetry, ...data } })),

  addLog: (sender, message, type = 'info') =>
    set((state) => ({
      logs: [{ id: Date.now().toString(), timestamp: new Date(), sender, messageKey: message, type }, ...state.logs].slice(0, 50)
    })),

  syncFullState: (newState) => set(() => ({ ...newState })),

  triggerLocalEffect: (type) => {
    // Sera utilisé par useIncidentManager
    window.dispatchEvent(new CustomEvent('mission-fx', { detail: type }));
  }
}));
```

---

### 🛠️ Étape 3 : Le Hook de Gestion des Incidents (`apps/web/hooks/useIncidentManager.ts`)

Ce hook transforme un changement d'état (incident) en une expérience sensorielle.

**Fichier : `apps/web/hooks/useIncidentManager.ts`**

```typescript
import { useEffect } from 'react';
import { useMissionStore } from '../store/useMissionStore';

export const useIncidentManager = () => {
  const incidents = useMissionStore((state) => state.incidents);

  useEffect(() => {
    if (incidents.length > 0) {
      // 1. Déclencher l'alarme sonore
      const alarm = new Audio('/audio/alerts/emergency-alarm.mp3');
      alarm.volume = 0.5;
      alarm.play().catch(() => console.log("Audio interaction block"));

      // 2. Ajouter un effet de "secousse" visuelle au body
      document.body.classList.add('animate-shake');
      const timer = setTimeout(() => document.body.classList.remove('animate-shake'), 500);

      return () => {
        alarm.pause();
        clearTimeout(timer);
      };
    }
  }, [incidents.length]); // Se déclenche quand le nombre d'incidents change
};
```

---

### 🛠️ Étape 4 : Le Serveur Standalone Complet (`apps/server/src/game/engine.ts`)

Le moteur qui gère la "vérité" de la simulation.

**Fichier : `apps/server/src/game/engine.ts`**

```typescript
import { Server } from 'socket.io';
import { db } from '@repo/database/client';
import { sessions } from '@repo/database/schema';
import { eq } from 'drizzle-orm';

export const useGameEngine = (io: Server) => {
  const TICK_RATE = 1000; // 1 seconde

  setInterval(async () => {
    // On pourrait récupérer les sessions actives en DB
    // Pour l'exemple, on diffuse une simulation globale

    const telemetryUpdate = {
        altitude: Math.max(0, 15000 - Math.random() * 100),
        velocity: 450 + Math.random() * 10,
        fuel: 99.5,
        oxygen: 99.8
    };

    io.emit('telemetry_update', telemetryUpdate);

    // Logique de fin de mission
    if (telemetryUpdate.altitude <= 0) {
        io.emit('mission_end', { result: 'LANDED' });
    }
  }, TICK_RATE);
};
```

---

### 📊 Résumé des fichiers à créer/compléter immédiatement

1. **`packages/database/src/client.ts`** (Connexion DB)
2. **`apps/web/hooks/useSocket.ts`** (Gestion du tunnel)
3. **`apps/web/hooks/useSocketSync.ts`** (Pont Socket -> Zustand)
4. **`apps/web/context/MissionProvider.tsx`** (Initialisation)
5. **`apps/server/src/routes/admin.ts`** (Commandes GM)

**Par quel fichier souhaitez-vous commencer l'implémentation complète ?** (Je suggère le duo `useSocket.ts` + `useSocketSync.ts` pour voir vos données bouger sur vos écrans).
