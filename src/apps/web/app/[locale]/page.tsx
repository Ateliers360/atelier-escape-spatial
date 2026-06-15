'use client';

import { useTranslations } from 'next-intl';
import { useMissionStore } from '../../store/useMissionStore';
import { CyberPanel } from '@repo/ui/CyberPanel';
import { Button } from '@repo/ui/button';
import { BlinkingDot } from '@repo/ui/BlinkingDot';
import {
  Rocket,
  ShieldAlert,
  Cpu,
  Navigation,
  Activity,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function MissionHomePage() {
  const t = useTranslations('Index');
  const tCommon = useTranslations('Common');
  const { status, telemetry, currentPhase, teams, incidents } = useMissionStore();
  const pathname = usePathname();
  const locale = pathname.split('/')[1]; // Récupère 'fr' ou 'en'

  // Liens vers les différents postes
  const stations = [
    { id: 'control', path: 'mission-control', icon: Activity, color: 'text-mission-cyan' },
    { id: 'engineering', path: 'engineering', icon: Cpu, color: 'text-mission-amber' },
    { id: 'orbital', path: 'orbital', icon: Navigation, color: 'text-mission-violet' },
    { id: 'rover', path: 'rover', icon: Rocket, color: 'text-mission-green' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in zoom-in duration-1000">

      {/* 1. HERO SECTION : STATUT GLOBAL */}
      <section className="relative py-12 px-8 border-2 border-mission-cyan/20 bg-space-900/40 backdrop-blur-md overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Rocket size={200} />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-4">
            <BlinkingDot variant={status === 'EMERGENCY' ? 'critical' : 'nominal'} />
            <span className="text-xs font-mono uppercase tracking-[0.5em] opacity-60">
              {t('mission_id')} : LUNA-315
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-mono font-black italic text-mission-cyan glow-cyan leading-tight">
            {t('welcome_title')}
          </h1>

          <p className="max-w-2xl text-lg opacity-70 leading-relaxed">
            {t('mission_description')}
          </p>

          <div className="flex gap-4 pt-4">
            <div className="px-4 py-2 border border-mission-cyan/30 bg-mission-cyan/5">
              <span className="block text-[10px] uppercase opacity-50">Status</span>
              <span className="font-mono font-bold">{status}</span>
            </div>
            <div className="px-4 py-2 border border-mission-cyan/30 bg-mission-cyan/5">
              <span className="block text-[10px] uppercase opacity-50">Phase</span>
              <span className="font-mono font-bold">{currentPhase} / 10</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. GRID DES POSTES DE TRAVAIL */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stations.map((station) => (
          <Link key={station.id} href={`/${locale}/${station.path}`}>
            <CyberPanel
              title={t(`station_${station.id}_title`)}
              variant="nominal"
              containerClassName="hover:border-mission-cyan transition-all cursor-pointer group h-full"
            >
              <div className="flex flex-col items-center justify-center py-6 gap-4">
                <station.icon className={`${station.color} group-hover:scale-110 transition-transform`} size={48} />
                <Button variant="nominal" className="w-full text-[10px]">
                  {tCommon('join_station')}
                </Button>
              </div>
            </CyberPanel>
          </Link>
        ))}
      </div>

      {/* 3. RÉSUMÉ TECHNIQUE & ALERTES */}
      <div className="grid grid-cols-12 gap-6">

        {/* Télémétrie de bord */}
        <div className="col-span-12 lg:col-span-8">
          <CyberPanel title={t('live_telemetry')} icon={Activity}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-4">
              {[
                { label: 'Altitude', val: `${(telemetry.altitude / 1000).toFixed(1)} km` },
                { label: 'Vitesse', val: `${telemetry.velocity.toFixed(0)} m/s` },
                { label: 'Fuel', val: `${telemetry.fuel.toFixed(1)}%` },
                { label: 'Oxygène', val: `${telemetry.oxygen.toFixed(1)}%` },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-[10px] uppercase opacity-40 block">{item.label}</span>
                  <span className="text-xl font-mono font-bold text-mission-cyan">{item.val}</span>
                </div>
              ))}
            </div>
          </CyberPanel>
        </div>

        {/* Status Équipes & Incidents */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <CyberPanel title={t('active_incidents')} variant={incidents.length > 0 ? "critical" : "nominal"}>
            <div className="min-h-[100px] flex flex-col justify-center items-center text-center">
              {incidents.length > 0 ? (
                <div className="space-y-2">
                  <ShieldAlert className="text-mission-red mx-auto" size={32} />
                  <span className="text-mission-red font-bold animate-pulse">
                    {incidents.length} {t('incidents_detected')}
                  </span>
                </div>
              ) : (
                <span className="opacity-30 italic text-sm">{t('no_incidents')}</span>
              )}
            </div>
          </CyberPanel>
        </div>

      </div>
    </div>
  );
}
