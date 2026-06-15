// Graphique en radar (Spider Chart) pour comparer plusieurs gaz ou pressions simultanément.
// *Utilisant Recharts ou Chart.js avec des styles personnalisés.*
'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface AtmosphericRadarProps {
  data: { subject: string; value: number; fullMark: number }[];
}

export const AtmosphericRadar = ({ data }: AtmosphericRadarProps) => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#1e3a5a" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#4a7aaa", fontSize: 8, fontFamily: 'monospace' }}
          />
          <Radar
            name="Atmosphere"
            dataKey="value"
            stroke="#22d4f5"
            fill="#22d4f5"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
