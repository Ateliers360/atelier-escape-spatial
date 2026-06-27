/**
 * @file src/apps/web/app/[locale]/(dashboards)/instructor-hub/page.tsx
 * @description Page de dashboard du hub de l'instructeur, affichant les informations sur les équipes,
 * le scénario et l'historique des événements.
 * @author Nathan Imogo
 * @version 1.0.0
 * @date 2024-06-15
 * Page de dashboard du hub de l'instructeur, affichant :
 * __________________________________________________________________________________
 * | [Badge: SAFE] [STATUT SÉCURITÉ]                [Risque: BAS] [Arrêt Urgence]   |
 * |________________________________________________________________________________|
 * |       CHECKLIST PRÉ-SÉANCE       |           REGISTRE INCIDENTS                |
 * |----------------------------------|---------------------------------------------|
 * | [x] Batteries chargées           | ID: 01 | Chute composant | Mineur | 13:45   |
 * | [x] Zone de vol dégagée          | ID: 02 | Court-circuit   | Modéré | 14:12   |
 * | [ ] Tension 5V vérifiée          |                                             |
 * | [ ] Trousse secours présente     |                                             |
 * |----------------------------------|---------------------------------------------|
 * |       ÉTAT DU MATÉRIEL           |             DOCUMENTS RÉFÉRENCE             |
 * |----------------------------------|---------------------------------------------|
 * | - Rover : OPÉRATIONNEL           | > Manuel de sécurité (PDF)                  |
 * | - Fusée Eau : À RECHARGER        | > Procédure d'urgence (PDF)                 |
 * | - Tablettes : OK (4/4)           | > Contacts Urgence                          |
 * |                                  |                                             |
 * | [ SIGNATURE RESPONSABLE ]        | [ GÉNÉRER RAPPORT SÉCURITÉ ]                |
 * |__________________________________|_____________________________________________|
 *
 */
import { TeamControlCenter } from '../../../../components/instructor-hub/TeamControlCenter';
import { ScenarioMaster } from '../../../../components/instructor-hub/ScenarioMaster';
import { EventHistory } from '../../../../components/instructor-hub/EventHistory';
import { Users, LayoutGrid, ClipboardList, Settings } from 'lucide-react';
import { Button, CyberPanel } from '@repo/ui';

export default function InstructorHub() {
  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Colonne Gauche : Surveillance Équipes */}
      <div className="col-span-12 lg:col-span-4">
        <CyberPanel title="Surveillance Équipes" icon={Users} subtitle="Real-time Team Pulse">
          <TeamControlCenter />
        </CyberPanel>
      </div>

      {/* Colonne Centrale : Contrôle du Scénario */}
      <div className="col-span-12 lg:col-span-4">
        <CyberPanel title="Maitre du Scénario" icon={LayoutGrid} subtitle="Incident Injection">
          <ScenarioMaster />
        </CyberPanel>
      </div>

      {/* Colonne Droite : Historique et Paramètres */}
      <div className="col-span-12 lg:col-span-4 space-y-6">
        <CyberPanel title="Journal d'Évènements" icon={ClipboardList}>
          <EventHistory />
        </CyberPanel>

        <CyberPanel title="Contrôles Session" icon={Settings}>
          <div className="grid grid-cols-2 gap-2">
            <Button className="p-3 border border-mission-red text-mission-red hover:bg-mission-red/10 uppercase text-[10px] font-bold">
              Emergency Reset
            </Button>
            <Button className="p-3 border border-mission-cyan text-mission-cyan hover:bg-mission-cyan/10 uppercase text-[10px] font-bold">
              Pause Timer
            </Button>
          </div>
        </CyberPanel>
      </div>
    </div>
  );
}
