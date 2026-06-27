/**
 * @file src/apps/web/app/[locale]/(dashboards)/rover/page.tsx
 * @description Page de dashboard du rover, affichant les informations sur les opérations et les ressources.
 * @author Nathan Imogo
 * @version 1.0.0
 * @date 2024-06-15
 * Page de dashboard du rover, affichant :
 * __________________________________________________________________________________
 * | [Badge: ROV] [LUNA-ROVER 1]                     [Signal: 85%] [BAT: 74%]     |
 * |________________________________________________________________________________|
 * |          CARTE TACTIQUE          |            FLUX TÉLÉMÉTRIE                  |
 * |----------------------------------|---------------------------------------------|
 * | (Grille 2D / Map Lunaire)        | [ Distance ]      [ Angle (IMU) ]           |
 * |        [LZ-1]                    |    142.5 m            Roll: 2° Pitch: 1°    |
 * |          |                       |                                             |
 * |          * (Rover)               | [ Vitesse ]       [ Obstacle ]              |
 * |          |                       |    0.4 m/s            Aucun (<2m)           |
 * |    [Target: Cratère]             |                                             |
 * |----------------------------------|---------------------------------------------|
 * |        COMMANDES ROVER           |           ANALYSE ÉCHANTILLONS              |
 * |----------------------------------|---------------------------------------------|
 * |    [ AVANCER ]                   | S1: Régolithe (Basalte)   - En cours...     |
 * | [G] [STOP] [D]                   | S2: Glace d'eau (Traces)  - Validé          |
 * |    [ RECULER ]                   |                                             |
 * |                                  |                                             |
 * | < MODE AUTONOME > (Toggle)       | [ ENREGISTRER POSITION ] (Bouton)           |
 * |__________________________________|_____________________________________________|
 *
 */
import { CyberPanel } from '@repo/ui';
import { TacticalMapGrid } from '../../../../components/rover/TacticalMapGrid';
import { EnvironmentalSensors } from '../../../../components/rover/EnvironmentalSensors';
import { NavigationConsole } from '../../../../components/rover/NavigationConsole';
import { Map, Settings2, Activity } from 'lucide-react';

export default function RoverPage() {
  return (
    <div className="grid grid-cols-12 gap-4 h-full">
      {/* Carte Tactique (Principale) */}
      <div className="col-span-12 lg:col-span-8">
        <CyberPanel title="Navigation de Surface" icon={Map} containerClassName="h-full">
          <TacticalMapGrid />
        </CyberPanel>
      </div>

      {/* Contrôles et Senseurs (Latéral) */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
        <CyberPanel title="Contrôles Manuels" icon={Settings2}>
          <NavigationConsole />
        </CyberPanel>

        <CyberPanel title="Capteurs Environnementaux" icon={Activity}>
          <EnvironmentalSensors />
        </CyberPanel>

        {/* Status de Connexion */}
        <div className="mt-auto p-4 border border-mission-green/20 bg-mission-green/5 rounded flex justify-between items-center">
          <span className="text-[10px] font-mono text-mission-green uppercase">Lien Vidéo HD: OK</span>
          <div className="h-2 w-2 rounded-full bg-mission-green animate-pulse" />
        </div>
      </div>
    </div>
  );
}
