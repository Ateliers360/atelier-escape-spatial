/**
 * @file src/apps/web/app/[locale]/(dashboards)/security-logistic/page.tsx
 * @description Page de dashboard de la logistique de sécurité, affichant les informations sur les opérations et les ressources.
 * @author Nathan Imogo
 * @version 1.0.0
 * @date 2024-06-15
 * Page de dashboard de la logistique de sécurité, affichant :
 * __________________________________________________________________________________
 * | [Badge: SAFE] [STATUT SÉCURITÉ]                [Risque: BAS] [Arrêt Urgence] |
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
import { CyberPanel } from '@repo/ui/CyberPanel';
import { SafetyStatusBadge } from '../../../../components/security-logistic/SafetyStatusBadge';
import { ResourceTracker } from '../../../../components/security-logistic/ResourceTracker';
import { EmergencyContacts } from '../../../../components/security-logistic/EmergencyContacts';
import { SafetyChecklist } from '../../../../components/security-logistic/SafetyChecklist';
import { ShieldAlert, ListChecks, Phone, Activity } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Colonne Gauche : Status & Ressources */}
      <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
        <SafetyStatusBadge status="CAUTION" />

        <CyberPanel title="Suivi des Ressources" icon={Activity}>
          <ResourceTracker />
        </CyberPanel>

        <CyberPanel title="Lignes d'Urgence" icon={Phone}>
          <EmergencyContacts />
        </CyberPanel>
      </div>

      {/* Colonne Droite : Checklist */}
      <div className="col-span-12 lg:col-span-8">
        <CyberPanel title="Checklist Pré-Alunissage" icon={ListChecks} subtitle="Protocol Alpha-9">
          <div className="flex flex-col h-full">
            <p className="text-[10px] uppercase opacity-40 mb-6 font-mono leading-relaxed">
              ATTENTION : Toute validation erronée de la checklist pourra entraîner l&apos;annulation
              immédiate de la mission par le contrôle au sol.
            </p>
            <SafetyChecklist />
          </div>
        </CyberPanel>
      </div>
    </div>
  );
}
