# Voici la liste exhaustive et structurée des dépendances nécessaires pour transformer votre monorepo en un centre de contrôle spatial fonctionnel, incluant la visualisation de données, le temps réel et les animations

## 1. Core & Internationalisation (Apps/web)

Indispensables pour la structure Next.js et la gestion des langues.

* **`next-intl`** : Pour la gestion du routage et des messages multilingues.
* **`clsx`** & **`tailwind-merge`** : Pour manipuler proprement les classes Tailwind (essentiel pour les variantes d'état `nominal` / `critical`).

```bash
pnpm add next-intl clsx tailwind-merge --filter web
```

### 2. Styling & Effets Visuels (Apps/web & Packages/ui)

Pour créer l'ambiance "ordinateur spatial" (panneaux, glitch, néon).

* **`framer-motion`** : Le moteur d'animation le plus puissant pour React. Parfait pour les transitions de phase, les alertes clignotantes et les entrées de logs.
* **`tailwindcss-animate`** : Pour les animations Tailwind simples (utilisé par shadcn/ui).
* **`lucide-react`** : Bibliothèque d'icônes modernes et légères.

```bash
pnpm add framer-motion lucide-react --filter web
pnpm add tailwindcss-animate --filter @repo/ui
```

### 3. Visualisation de Données (Apps/web)

Pour les graphes de télémétrie, les jauges d'oxygène et la carte orbitale.

* **`recharts`** : Bibliothèque de graphiques basée sur React, très simple à styliser avec Tailwind.
* **`three`** & **`@types/three`** : Pour le rendu 3D (ex: la lune ou le module en mouvement).
* **`@react-three/fiber`** & **`@react-three/drei`** : Pour intégrer Three.js de manière déclarative dans React.

```bash
pnpm add recharts three @react-three/fiber @react-three/drei --filter web
pnpm add -D @types/three --filter web
```

### 4. Temps Réel & État Global (Apps/web)

Pour synchroniser tous les écrans lors d'un incident.

* **`socket.io-client`** : Pour la communication bidirectionnelle avec le serveur de l'animateur.
* **`zustand`** : Gestionnaire d'état ultra-léger. Bien plus performant que Redux pour un jeu où les données changent très vite (télémétrie).
* **`date-fns`** : Pour manipuler et formater les comptes à rebours et les timestamps des logs.

```bash
pnpm add socket.io-client zustand date-fns --filter web
```

### 5. Formulaires & Validation (Apps/web)

Pour les réglages du simulateur ou les commandes de l'animateur.

* **`react-hook-form`** : Gestion performante des formulaires.
* **`zod`** : Validation de schéma (pour s'assurer que les données reçues via Socket.io sont correctes).

```bash
pnpm add react-hook-form zod @hookform/resolvers --filter web
```

### 6. Composants UI de base (Packages/ui)

Si vous voulez gagner du temps, installez les primitives de Radix UI (la base de shadcn/ui).

* **`@radix-ui/react-dialog`** : Pour les fenêtres d'incidents critiques (modales).
* **`@radix-ui/react-progress`** : Pour les barres d'énergie et d'oxygène.
* **`@radix-ui/react-tooltip`** : Pour afficher les détails des boutons techniques.

```bash
pnpm add @radix-ui/react-dialog @radix-ui/react-progress @radix-ui/react-tooltip --filter @repo/ui
```

---

### Récapitulatif : Commande d'installation groupée

Exécutez cette commande à la racine de votre projet pour tout installer d'un coup :

```bash
# Installation dans l'application Web
pnpm add next-intl clsx tailwind-merge framer-motion lucide-react recharts three @react-three/fiber @react-three/drei socket.io-client zustand date-fns react-hook-form zod @hookform/resolvers --filter web

# Installation dans le package UI
pnpm add tailwindcss-animate @radix-ui/react-dialog @radix-ui/react-progress @radix-ui/react-tooltip --filter @repo/ui

# Dépendances de développement (TypeScript & Co)
pnpm add -D @types/three --filter web
```
