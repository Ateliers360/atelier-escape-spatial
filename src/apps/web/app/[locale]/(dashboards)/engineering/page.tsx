/**
 * @file src/apps/web/app/[locale]/(dashboards)/engineering/page.tsx
 * @description Page de dashboard de l'engineering, affichant les informations sur les modules et composants.
 * @author Nathan Imogo
 * @version 1.0.0
 * @date 2024-06-15
 * Page de dashboard de l'engineering, affichant :
 * __________________________________________________________________________________
 * | [Badge: ENG] [SCHÉMA SYSTÈME]                  [Alertes: 01] [TEMP: NOMINAL] |
 * |________________________________________________________________________________|
 * |       VUE ÉCLATÉE DU MODULE      |           LISTE DES COMPOSANTS              |
 * |----------------------------------|---------------------------------------------|
 * |           /      \               | 01. Alimentation [||||||||--] 82% (OK)      |
 * |          /  [01]  \              | 02. Propulsion   [||||------] 40% (WARN)    |
 * |         | [02][03] |             | 03. Avionique    [||||||||||] 100% (OK)     |
 * |         |    __    |             | 04. Support Vie  [|||||||||-] 91% (OK)      |
 * |        /|___|  |___|\            |                                             |
 * |       /_/ [04] [05] \_\          | < DIAGNOSTIQUER COMPOSANT > (Bouton)        |
 * |----------------------------------|---------------------------------------------|
 * |      QUEUE DE RÉPARATION         |           INVENTAIRE PIÈCES                 |
 * |----------------------------------|---------------------------------------------|
 * | > Panne Moteur #2 (En cours)     | - Fusible 10A : [ 4 ]   - Capteur IR : [ 1 ]|
 * | > Fuite Thermique (Attente)      | - Câble Jumper: [ 12 ]  - PLA (3D) : [ 200g]|
 * |                                  |                                             |
 * | [VALIDER RÉPARATION] (Bouton)    | [ COMMANDER PIÈCE (LOGISTIQUE) ]            |
 * |__________________________________|_____________________________________________|
 *
 */

'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@repo/ui/button';
import {
  Cpu,
  Power,
  Thermometer,
  Wind,
  Wrench,
  Package,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CyberPanel } from '@repo/ui/CyberPanel';
import { InventoryGrid } from '../../../../components/engineering/InventoryGrid';
import { ModuleSchematic } from '../../../../components/engineering/ModuleSchematic';
import { SubsystemCard } from '../../../../components/engineering/SubsystemCard';

export default function EngineeringPage() {

  const t = useTranslations('Engineering');

  // Simulation de données (Idéalement via useMissionStore)
  const repairQueue = [
    { id: 1, label: "Panne Moteur #2", status: "IN_PROGRESS", severity: "critical" },
    { id: 2, label: "Fuite Thermique", status: "WAITING", severity: "warning" },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-700">

      {/* SECTION SUPÉRIEURE : VUE ÉCLATÉE & COMPOSANTS */}
      <div className="grid grid-cols-12 gap-6">

        {/* GAUCHE : VUE ÉCLATÉE DU MODULE */}
        <div className="col-span-12 lg:col-span-5 h-[500px]">
          <CyberPanel
            title="Vue Éclatée du Module"
            subtitle="Structure ID: LUNA-OBJ-01"
            icon={Wrench}
            containerClassName="h-full"
          >
            <ModuleSchematic />
          </CyberPanel>
        </div>

        {/* DROITE : LISTE DES COMPOSANTS */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
          <CyberPanel
            title="État des Sous-systèmes"
            subtitle="Real-time Health Monitoring"
            icon={Cpu}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SubsystemCard
                name="Alimentation"
                health={82}
                icon={Power}
                onDiagnostic={() => {}}
              />
              <SubsystemCard
                name="Propulsion"
                health={40}
                icon={Wrench}
                onDiagnostic={() => {}}
              />
              <SubsystemCard
                name="Avionique"
                health={100}
                icon={Cpu}
                onDiagnostic={() => {}}
              />
              <SubsystemCard
                name="Support Vie"
                health={91}
                icon={Wind}
                onDiagnostic={() => {}}
              />
            </div>

            <div className="mt-6 flex justify-center">
              <Button variant="nominal" className="w-full md:w-auto px-12">
                Diagnostiquer tous les composants
              </Button>
            </div>
          </CyberPanel>
        </div>
      </div>

      {/* SECTION INFÉRIEURE : RÉPARATION & INVENTAIRE */}
      <div className="grid grid-cols-12 gap-6">

        {/* GAUCHE : QUEUE DE RÉPARATION */}
        <div className="col-span-12 lg:col-span-5">
          <CyberPanel
            title="Queue de Réparation"
            subtitle="Maintenance Buffer"
            icon={AlertTriangle}
            variant={repairQueue.length > 0 ? "warning" : "nominal"}
          >
            <div className="space-y-3 min-h-[200px]">
              {repairQueue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border border-space-800 bg-space-950/50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${item.severity === 'critical' ? 'bg-mission-red animate-pulse' : 'bg-mission-amber'}`} />
                    <span className="text-xs font-mono font-bold uppercase">{item.label}</span>
                  </div>
                  <span className="text-[10px] opacity-50 uppercase font-mono">{item.status}</span>
                </div>
              ))}

              <div className="pt-4 mt-auto">
                <Button variant="nominal" className="w-full text-xs">
                  Valider Réparation (Check-off)
                </Button>
              </div>
            </div>
          </CyberPanel>
        </div>

        {/* DROITE : INVENTAIRE PIÈCES */}
        <div className="col-span-12 lg:col-span-7">
          <CyberPanel
            title="Inventaire Pièces"
            subtitle="Stock & Logistics"
            icon={Package}
          >
            <InventoryGrid />

            <div className="mt-6 flex justify-end gap-4">
              <Button variant="nominal" className="text-[10px] py-1">
                Générer Rapport Inventaire
              </Button>
              <Button variant="warning" className="text-[10px] py-1">
                Commander Pièce (Logistique)
              </Button>
            </div>
          </CyberPanel>
        </div>

      </div>
    </div>
  );
}
