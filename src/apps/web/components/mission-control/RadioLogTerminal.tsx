// Liste défilante de messages.
// Logique : Auto-scroll vers le bas, typage automatique lettre par lettre (effet machine à écrire) pour les nouveaux messages.
'use client';

import { useEffect, useRef } from 'react';
import { useMissionStore } from '../../store/useMissionStore';
import { motion, AnimatePresence } from 'framer-motion';

export const RadioLogTerminal = () => {
  const logs = useMissionStore((state) => state.logs);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="h-64 bg-space-950/80 border border-mission-cyan/20 rounded p-4 font-mono text-sm overflow-hidden flex flex-col">
      <div className="flex justify-between items-center border-b border-mission-cyan/20 pb-2 mb-2 text-[10px] opacity-50">
        <span>COMMS CHANNEL: LUNA-SECURE</span>
        <span className="animate-pulse">● RECORDING</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 scrollbar-hide">
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex gap-3 ${log.type === 'error' ? 'text-mission-red' : log.type === 'warning' ? 'text-mission-amber' : 'text-mission-cyan'}`}
            >
              <span className="opacity-40">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
              <span className="font-bold">{log.sender} &gt;</span>
              <span className="break-words">
                <Typewriter text={log.messageKey} />
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Typewriter = ({ text }: { text: string }) => {
  return (
    <motion.span
      initial={{ width: 0 }}
      animate={{ width: 'auto' }}
      transition={{ duration: 0.5 }}
    >
      {text}
    </motion.span>
  );
};
