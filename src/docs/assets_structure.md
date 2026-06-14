# Pour un escape game immersif, la gestion des assets est cruciale. Le dossier `/public` de Next.js doit être organisé de manière logique pour que les composants puissent y accéder facilement, tout en gérant les variations de langue (i18n) pour les voix ou les documents

Voici la structure recommandée pour `apps/web/public/` :

## 📂 Organisation du dossier `/public`

```text
public/
├── audio/
│   ├── ui/                 # Bruitages d'interface (bips, clics)
│   ├── ambient/            # Musiques d'ambiance (vibration vaisseau, espace)
│   ├── alerts/             # Alarmes (urgence, panne, succès)
│   └── sfx/                # Effets spéciaux (moteurs, explosion, air)
├── video/
│   ├── backgrounds/        # Vidéos de fond (nébuleuses, étoiles en mouvement)
│   └── cutscenes/          # Séquences narratives (décollage, crash, alunissage)
├── images/
│   ├── mission/            # Logos, badges, photos d'équipage
│   ├── schematics/         # Schémas techniques (SVG de préférence)
│   └── textures/           # Overlays (poussière d'écran, rayures CRT)
├── docs/                   # Manuels pédagogiques (PDF)
└── locales/                # Assets spécifiques à la langue (Voix, Docs traduits)
    ├── fr/
    │   ├── audio/          # Voix-off "Bienvenue à bord..."
    │   └── docs/           # Manuel-Pilotage-FR.pdf
    └── en/
        ├── audio/          # Voice-over "Welcome aboard..."
        └── docs/           # Pilot-Manual-EN.pdf
```

---

### 📝 Liste détaillée des assets à préparer

#### 1. Audio (Le moteur de l'immersion)

* **`ambient/engine-hum.mp3`** : Un son de basse fréquence constant (vibration des moteurs) à jouer en boucle.
* **`ui/terminal-type.mp3`** : Petit son sec pour l'effet machine à écrire du Radio Log.
* **`alerts/emergency-alarm.mp3`** : Sirène stridente pour les incidents critiques.
* **`locales/fr/audio/intro.mp3`** : Message de briefing vocal au lancement de la mission.

#### 2. Vidéo (L'aspect "Fenêtre sur l'espace")

* **`backgrounds/starfield.webm`** : Boucle de 30s d'étoiles défilant lentement (format `.webm` pour la légèreté).
* **`cutscenes/landing-success.mp4`** : Vidéo de récompense finale vue depuis le cockpit.

#### 3. Images & SVG (Précision technique)

* **`schematics/propulsion-system.svg`** : Un schéma du moteur où vous pourrez changer les couleurs des pièces en CSS (via `id`).
* **`textures/crt-grain.png`** : Une texture de grain/bruit pour l'effet vieux moniteur.
* **`images/mission/luna-315-patch.svg`** : Le logo de la mission affiché sur le Mission Control.

#### 4. Documents (Support physique/digital)

* **`locales/fr/docs/manuel-ingenieur.pdf`** : Le livret que les élèves peuvent consulter sur leur tablette (ou imprimer).

---

### 💡 Conseils techniques pour les assets

1. **Formats de fichiers :**
    * **Images :** Utilisez le format **SVG** pour tout ce qui est schémas (plus léger et manipulable en code). Utilisez **WebP** pour les photos.
    * **Audio :** Le format **MP3** est universel, mais prévoyez des versions **OGG** pour une meilleure boucle (loop) sans coupure audible.
    * **Vidéo :** Le format **WebM** est bien mieux compressé que le MP4 pour le web.

2. **Naming Convention :**
    * Utilisez toujours le **kebab-case** (`emergency-alert-01.mp3`) pour éviter les problèmes de casse entre Windows/Mac et les serveurs Linux.

3. **Préchargement :**
    * Pour un escape game, vous ne voulez pas qu'un son d'alerte mette 2 secondes à charger au moment critique. Utilisez des balises `<link rel="preload">` dans votre layout pour les sons d'alertes.

### Comment accéder aux assets i18n en code ?

Voici une astuce pour votre code Next.js :

```tsx
import { useLocale } from 'next-intl';

export function VoiceIntro() {
  const locale = useLocale(); // 'fr' ou 'en'

  const playIntro = () => {
    const audio = new Audio(`/locales/${locale}/audio/intro.mp3`);
    audio.play();
  };

  return <button onClick={playIntro}>Start Briefing</button>;
}
```
