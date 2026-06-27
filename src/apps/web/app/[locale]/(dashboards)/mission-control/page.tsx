/**
 * @file src/apps/web/app/[locale]/(dashboards)/mission-control/page.tsx
 * @description Page de dashboard de la mission, affichant les informations sur la mission et les statistiques.
 * @author Nathan Imogo
 * @version 1.0.0
 * @date 2024-06-15
 *
 * Page de dashboard de la mission, affichant :
 * _________________________________________________________________________________________
 * | [ MISSION: LUNA-315 ]    [ STATUS: NOMINAL ]    [ PHASE: 06/10 - DÉPLOIEMENT ]         |
 * |_______________________________________________________________________________________|
 * |                                                                                       |
 * |   COUNTDOWN MISSION (TEMPS RESTANT)                     TÉLÉMÉTRIE CRITIQUE           |
 * |   _________________________________                     ___________________________   |
 * |  |                                 |                   | ALTITUDE :   42.5 km      |  |
 * |  |       00 : 45 : 12              |                   | VITESSE  :  1850 m/s      |  |
 * |  |_________________________________|                   | CARBURANT:   64 %         |  |
 * |      T-MINUS TO ALUNISSAGE                             |___________________________|  |
 * |_______________________________________________________________________________________|
 * |                                                                                       |
 * |  PROGRESSION DE LA MISSION (TIMELINE)                                                 |
 * |  [v] Brefing  [v] Calculs  [v] Proto  [v] Électro  [>] CODE  [ ] Tests  [ ] Épreuve   |
 * |  |-----------|-----------|-----------|-----------|---O-------|-----------|            |
 * |_______________________________________________________________________________________|
 * |                                         |
 * |   STATUT DES ÉQUIPES (TEAM PULSE)       |       JOURNAL DES COMMUNICATIONS (RADIO)    |
 * |   ___________________________________   |   _______________________________________   |
 * |  | ALPHA [OK] : Algorithme PID...    |  |  | 14:15 [TX] - MISSION CTRL: Allez-y.   |  |
 * |  | BETA  [!!] : Panne Moteur #2      |  |  | 14:16 [RX] - ALPHA: PID stabilisé.    |  |
 * |  | GAMMA [OK] : Calibration IMU      |  |  | 14:18 [!!] - SYS: Perte de signal...  |  |
 * |  | DELTA [OK] : Analyse Régolithe    |  |  | 14:19 [TX] - BETA: On répare.         |  |
 * |  |___________________________________|  |  |_______________________________________|  |
 * |_________________________________________|_____________________________________________|
 * |                                                                                       |
 * |   ALERTES ACTIVES & INCIDENTS                                                         |
 * |  +---------------------------------------------------------------------------------+  |
 * |  | [!] INCIDENT 04 : SURCHAUFFE COMPARTIMENT ÉLECTRONIQUE (Équipe BETA)            |  |
 * |  +---------------------------------------------------------------------------------+  |
 * |_______________________________________________________________________________________|
 */
'use client';

import { CyberPanel, BlinkingDot } from '@repo/ui';
import { GlobalCountdown } from '../../../../components/mission-control/GlobalCountdown';
import { MissionTimeline } from '../../../../components/mission-control/MissionTimeline';
import { IncidentMarquee } from '../../../../components/mission-control/IncidentMarquee';
import { RadioLogTerminal } from '../../../../components/mission-control/RadioLogTerminal';
import { useTranslations } from 'next-intl';
import { useMissionStore } from '../../../../store/useMissionStore';
import { Activity, Users, Radio, AlertCircle } from 'lucide-react';

export default function MissionControlPage() {

  const t = useTranslations('MissionControl');

  const { telemetry, status, teams, currentPhase, incidents } = useMissionStore();

  return (
    <div className="space-y-4 max-w-[1600px] mx-auto">

      {/* 1. TOP BAR STATUS */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 flex justify-between items-center bg-space-900/50 border border-space-800 px-6 py-3">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] opacity-40 font-mono uppercase">ID-Mission</span>
              <span className="text-lg font-bold font-mono text-mission-cyan">LUNA-315</span>
            </div>
            <div className="h-8 w-[1px] bg-space-800" />
            <div className="flex items-center gap-3">
              <BlinkingDot variant={status === 'EMERGENCY' ? 'critical' : 'nominal'} />
              <span className={`text-sm font-bold uppercase ${status === 'EMERGENCY' ? 'text-mission-red' : 'text-mission-green'}`}>
                Status: {status}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] opacity-40 font-mono uppercase block">Phase Actuelle</span>
            <span className="text-sm font-bold text-mission-cyan">{currentPhase}/10 - DÉPLOIEMENT</span>
          </div>
        </div>
      </div>

      {/* 2. CENTRE : COUNTDOWN & TÉLÉMÉTRIE */}
      <div className="grid grid-cols-12 gap-4 h-[350px]">
        <div className="col-span-12 lg:col-span-8">
          <CyberPanel containerClassName="h-full bg-space-950/20">
            <GlobalCountdown />
          </CyberPanel>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <CyberPanel title="Télémétrie Critique" icon={Activity} containerClassName="h-full">
            <div className="space-y-6 pt-4">
              <div className="flex justify-between items-center border-b border-space-800 pb-4">
                <span className="text-xs uppercase opacity-50">Altitude</span>
                <span className="text-2xl font-mono text-mission-cyan">{(telemetry.altitude / 1000).toFixed(1)} <small className="text-xs">KM</small></span>
              </div>
              <div className="flex justify-between items-center border-b border-space-800 pb-4">
                <span className="text-xs uppercase opacity-50">Vitesse Rel.</span>
                <span className="text-2xl font-mono text-mission-cyan">{telemetry.velocity.toFixed(0)} <small className="text-xs">M/S</small></span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs uppercase opacity-50">Carburant</span>
                <span className={`text-2xl font-mono ${telemetry.fuel < 20 ? 'text-mission-red' : 'text-mission-cyan'}`}>{telemetry.fuel}%</span>
              </div>
            </div>
          </CyberPanel>
        </div>
      </div>

      {/* 3. TIMELINE RÉSUMÉE */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <CyberPanel title="Progression de la Mission" icon={Activity}>
            <MissionTimeline />
          </CyberPanel>
        </div>
      </div>

      {/* 4. BAS : TEAMS & RADIO */}
      <div className="grid grid-cols-12 gap-4 h-[300px]">
        <div className="col-span-12 lg:col-span-6">
          <CyberPanel title="Statut des Équipes (Team Pulse)" icon={Users} containerClassName="h-full">
            <div className="grid grid-cols-2 gap-4">
              {teams.map(team => (
                <div key={team.id} className="flex items-center justify-between p-2 bg-space-950/40 border border-space-800">
                  <div className="flex items-center gap-2">
                    <BlinkingDot variant={team.status === 'OK' ? 'nominal' : 'critical'} />
                    <span className="text-[10px] font-bold uppercase">{team.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-mission-cyan opacity-60">
                    {team.status === 'OK' ? 'NOMINAL' : '!! ERROR !!'}
                  </span>
                </div>
              ))}
            </div>
          </CyberPanel>
        </div>

        <div className="col-span-12 lg:col-span-6">
          <CyberPanel title="Journal Communications (Radio)" icon={Radio} containerClassName="h-full">
            <RadioLogTerminal />
          </CyberPanel>
        </div>
      </div>

      {/* 5. FOOTER : INCIDENT MARQUEE */}
      {incidents.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40">
          <IncidentMarquee
            message={`ALERTE SYSTEME : ${incidents[0]?.code} - ${incidents[0]?.severity} PRIORITY - VERIFIER POSTE INGENIERIE`}
          />
        </div>
      )}

    </div>
  );
}
