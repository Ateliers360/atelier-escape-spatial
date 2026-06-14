# Pour construire une architecture robuste et immersive avec **Next.js** et **Tailwind CSS**, nous allons diviser le projet en **Atomes** (composants unitaires), **Molécules** (groupes fonctionnels) et **Organismes** (les tableaux de bord complets)

Voici la liste exhaustive des composants à développer :

---

## 1. Les Composants Transverses (Atomes)

*Ce sont les éléments de base réutilisables partout pour maintenir l'esthétique "Espace/Sci-Fi".*

* **`CrtOverlay`** : Un composant fixe qui applique un dégradé de lignes de balayage (scanlines), un léger scintillement (flicker) et une distorsion "fish-eye" sur tout l'écran via CSS.
* **`DigitalGlowText`** : Texte avec un `text-shadow` néon. Gère les couleurs selon l'état (`cyan` pour nominal, `amber` pour warning, `red` pour critique).
* **`BlinkingDot`** : Petit indicateur de statut (LED) animé avec une opacité pulsée.
* **`CyberPanel`** : Conteneur avec des bordures découpées (clip-path), un fond semi-transparent (`backdrop-blur`) et une bordure lumineuse fine.
* **`FrameCorner`** : Petit élément décoratif aux coins des panneaux pour renforcer l'aspect "interface militaire".
* **`MonoBadge`** : Badge utilisant une police monospace, fond sombre, texte contrasté pour les étiquettes (ex: `T+ 00:45`).

* **`Card`** : Carte avec une bordure et un fond sombre.
* **`Button`** : Bouton avec un effet de survol lumineux et un état "disabled" grisé.
* **`Input`** : Input avec un effet de survol lumineux et un état "focus" avec un halo néon.
* **`Slider`** : Curseur avec un style néon et un effet de survol lumineux.
* **`Code`** : Bloc de code avec un fond sombre, une police monospace et un léger effet de surbrillance sur le texte.

---

## 2. Le Groupe "Visualisation Data" (Graphiques)

*Utilisant Recharts ou Chart.js avec des styles personnalisés.*

* **`TelemetryLineChart`** : Graphique en ligne temps réel.
  * *Effet :* Zone remplie en dégradé sous la ligne, points de données masqués, grille très fine.
* **`OxygenGauge`** : Jauge circulaire (Ring Chart).
  * *Effet :* Segmenter la jauge en "blocs" pour un look digital rétro.
* **`PowerBar`** : Barre de progression segmentée.
  * *Effet :* Animation de remplissage fluide lors de la réception de données Socket.io.
* **`AtmosphericRadar`** : Graphique en radar (Spider Chart) pour comparer plusieurs gaz ou pressions simultanément.

---

## 3. Composants par Tableau de Bord (Organismes)

### A. Mission Control (Central)

* **`GlobalCountdown`** : Horloge massive gérée par un Web Worker (pour la précision) avec affichage des millisecondes.
* **`MissionTimeline`** : Barre de progression horizontale avec des étapes cliquables (Steppers) et état "Done / In-Progress / Locked".
* **`RadioLogTerminal`** : Liste défilante de messages.
  * *Logique :* Auto-scroll vers le bas, typage automatique lettre par lettre (effet machine à écrire) pour les nouveaux messages.
* **`IncidentMarquee`** : Bandeau clignotant en bas d'écran affichant l'alerte la plus prioritaire.

### B. Orbital / Simulation

* **`OrbitCanvas`** : Un composant utilisant `Three.js` ou `HTML5 Canvas` pour dessiner la trajectoire du module autour de la lune.
* **`TrajectoryParamsForm`** : Groupe d'inputs (Sliders néon) pour modifier la masse, la poussée et l'angle.
* **`DeltaVDisplay`** : Calculateur dynamique affichant la différence de vitesse requise par rapport à la trajectoire cible.

#### C. Engineering (Sous-systèmes)

* **`ModuleSchematic`** : Image SVG interactive du vaisseau.
  * *Temps réel :* Les zones du SVG changent de couleur (Fill) selon les données de santé reçues.
* **`SubsystemCard`** : Carte unitaire affichant (Nom, % de santé, icône, bouton de diagnostic).
* **`InventoryGrid`** : Tableau minimaliste listant les pièces de rechange avec un compteur d'inventaire.

#### D. Rover & Terrain

* **`TacticalMapGrid`** : Grille 2D (CSS Grid) représentant le terrain lunaire.
* **`RoverPointer`** : Icône animée sur la carte avec vecteur de direction.
* **`EnvironmentalSensors`** : Groupe de petits afficheurs digitaux (Température sol, Radiation, Luminosité).
* **`NavigationConsole`** : Groupe de boutons directionnels (D-Pad) envoyant des commandes au serveur.

#### E. Instruction Hub (Admin)

* **`TeamControlCenter`** : Liste des équipes avec boutons de "Force Win", "Trigger Incident", ou "Mute".
* **`ScenarioMaster`** : Sélecteur d'incidents prédéfinis (Panne moteur, Fuite O2, etc.) avec bouton d'envoi global.
* **`EventHistory`** : Table de logs détaillée pour débriefer la séance plus tard.

---

### 4. Couche "Temps Réel & Logique" (Hooks Next.js)

* **`useSocket`** : Hook personnalisé pour gérer la connexion WebSocket et distribuer les messages vers les composants via un contexte React.
* **`useMissionState`** : Context API ou Zustand Store pour synchroniser l'état global (phase actuelle, temps restant, score) entre tous les tableaux de bord.
* **`useIncidentManager`** : Logique de déclenchement des alertes sonores et visuelles lors d'un incident.

---

### 5. Effets Visuels (Le "Space Polish")

Pour obtenir l'effet **écran d'ordinateur spatial**, créez un fichier `globals.css` avec ces classes :

```css
/* Effet de scanline */
.scanline-effect {
  background: linear-gradient(
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.25) 50%
  ),
  linear-gradient(
    90deg,
    rgba(255, 0, 0, 0.06),
    rgba(0, 255, 0, 0.02),
    rgba(0, 0, 255, 0.06)
  );
  background-size: 100% 4px, 3px 100%;
}

/* Flicker (scintillement) */
@keyframes flicker {
  0% { opacity: 0.97; }
  5% { opacity: 0.95; }
  10% { opacity: 0.9; }
  100% { opacity: 1; }
}

.crt-monitor {
  animation: flicker 0.15s infinite;
  box-shadow: inset 0 0 10rem rgba(0,0,0,0.5), 0 0 5rem rgba(34, 212, 245, 0.1);
}
```
