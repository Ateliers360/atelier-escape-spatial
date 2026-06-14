'use client';

import { useEffect } from 'react';
import { NextIntlClientProvider, AbstractIntlMessages } from 'next-intl';
import { useSocketSync } from '../../hooks/useSocketSync';
import { useMissionStore } from '../../store/useMissionStore';

interface Props {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
  locale: string;
}

export default function MissionClientWrapper({ children, messages, locale }: Props) {
  // 1. Synchronisation Socket.io
  useSocketSync();

  // 2. Timer global de la mission
  const tick = useMissionStore((state) => state.tick);

  useEffect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  }, [tick]);

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {/* Effet CRT Global ici pour qu'il soit sur tous les écrans */}
      <div className="crt-monitor min-h-screen bg-space-950 text-mission-cyan selection:bg-mission-cyan selection:text-space-950">
        <div className="scanline-effect pointer-events-none fixed inset-0 z-50 opacity-10" />
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
