// Liste de contacts d'urgence avec des boutons d'appel rapide (simulés).
'use client';

import React from 'react';
import { PhoneForwarded, Radio } from 'lucide-react';
import { Button } from '@repo/ui/button';

const CONTACTS = [
  { id: 'earth', name: 'Huston Control', role: 'Directeur de Vol' },
  { id: 'base', name: 'Base Tranquillity', role: 'Logistique Lunaire' },
  { id: 'medical', name: 'Bio-Med Unit', role: 'Urgence Médicale' },
];

export const EmergencyContacts = () => {
  const handleCall = (name: string) => {
    alert(`Établissement du lien sécurisé avec ${name}...`);
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {CONTACTS.map((contact) => (
        <div key={contact.id} className="flex items-center justify-between p-3 bg-space-950/40 border border-space-800 hover:border-mission-red/30 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-space-800 text-mission-cyan group-hover:text-mission-red transition-colors">
              <Radio size={16} />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase">{contact.name}</span>
              <span className="text-[9px] opacity-40 uppercase">{contact.role}</span>
            </div>
          </div>
          <Button
            variant="critical"
            className="h-8 w-8 p-0 flex items-center justify-center"
            onClick={() => handleCall(contact.name)}
          >
            <PhoneForwarded size={14} />
          </Button>
        </div>
      ))}
    </div>
  );
};
