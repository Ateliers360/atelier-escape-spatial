// Graphique en ligne temps réel.
// Effet : Zone remplie en dégradé sous la ligne, points de données masqués, grille très fine.
// *Utilisant Recharts ou Chart.js avec des styles personnalisés.*
'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DataPoint {
  time: string;
  value: number;
}

interface TelemetryLineChartProps {
  data: DataPoint[];
  color?: string; // ex: var(--mission-cyan)
  yDomain?: [number, number];
}

export const TelemetryLineChart = ({ data, color = "#22d4f5", yDomain = [0, 100] }: TelemetryLineChartProps) => {
  return (
    <div className="h-full w-full min-h-[150px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5a" vertical={false} />
          <XAxis
            dataKey="time"
            hide
          />
          <YAxis
            domain={yDomain}
            stroke="#4a7aaa"
            fontSize={10}
            tickFormatter={(value) => value.toFixed(0)}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#060c14', border: '1px solid #0f1e30', fontSize: '10px' }}
            itemStyle={{ color: color }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fillOpacity={1}
            fill="url(#colorValue)"
            isAnimationActive={false} // Important pour le temps réel fluide
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
