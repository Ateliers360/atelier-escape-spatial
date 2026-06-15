/**
 * @file src/apps/web/app/[locale]/(dashboards)/orbital/page.tsx
 * @description Page de dashboard de l'orbital, affichant les informations sur les orbites et trajectoires.
 * @author Nathan Imogo
 * @version 1.0.0
 * @date 2024-06-15
 * Page de dashboard de l'orbital, affichant :
 * __________________________________________________________________________________
 * | [Badge: ORBIT] [MISSION LUNA-315]              [Clock: T+ 00:42:15] [STABLE] |
 * |________________________________________________________________________________|
 *  PARAMÈTRES PHYSIQUES (INPUTS)   |         VISUALISATION TRAJECTOIRE           |
 * |----------------------------------|---------------------------------------------|
 * | [ ] Masse Module : [ 1500 ] kg   |  /-----------------------------------\      |
 * | [ ] Poussée Moteur: [ 4500 ] N   |  |        ( Graphique Central )       |      |
 * | [ ] Angle Entrée : [ -12.4] °    |  |     Courbe de descente réelle      |      |
 * | [ ] Coeff. Freinage: [ 0.82 ]    |  |      vs Courbe théorique (dot)     |      |
 * |                                  |  \-----------------------------------/      |
 * | < SIMULER TRAJECTOIRE > (Bouton) |                                             |
 * |----------------------------------|---------------------------------------------|
 * |  RÉSULTATS DE SIMULATION         |         INDICATEURS DE MANŒUVRE             |
 * |----------------------------------|---------------------------------------------|
 * | [ Δv Requis ]    [ Carburant ]   | [ Fenêtre de Tir ] [ Point d'Impact ]       |
 * |    312 m/s           42.5 kg     |     Dans 04:12s         LZ-Alpha            |
 * |                                  |                                             |
 * | [ Impact Vel. ]  [ G-Force ]     | [ Stabilité ]      [ Alunissage ]           |
 * |    1.2 m/s           1.4 G       |     98% (OK)           OPTIMAL              |
 * |__________________________________|_____________________________________________|
 *
 */
import { CyberPanel } from '@repo/ui/CyberPanel';
import { OrbitCanvas } from '../../../../components/orbital/OrbitCanvas';
import { TrajectoryParamsForm } from '../../../../components/orbital/TrajectoryParamsForm';
import { DeltaVDisplay } from '../../../../components/orbital/DeltaVDisplay';
import { Compass, Zap, Target } from 'lucide-react';

export default function OrbitalPage() {
  return (
    <div className="grid grid-cols-12 gap-4 h-[calc(100vh-120px)]">
      {/* Colonne Gauche : Visualisation */}
      <div className="col-span-8 flex flex-col gap-4">
        <CyberPanel title="Vue Orbitale" icon={Target} containerClassName="flex-1">
          <OrbitCanvas />
        </CyberPanel>
      </div>

      {/* Colonne Droite : Contrôles */}
      <div className="col-span-4 flex flex-col gap-4">
        <CyberPanel title="Simulation" icon={Zap} subtitle="Maneuver Computer">
          <TrajectoryParamsForm />
        </CyberPanel>

        <CyberPanel title="Navigation Data" icon={Compass}>
          <DeltaVDisplay />
        </CyberPanel>
      </div>
    </div>
  );
}
