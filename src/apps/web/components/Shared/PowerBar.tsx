// Barre de progression segmentée.
// Effet : Animation de remplissage fluide lors de la réception de données Socket.io.
// *Utilisant Recharts ou Chart.js avec des styles personnalisés.*
'use client';

export const PowerBar = ({ value, label }: { value: number, label: string }) => {
  const segments = 10;
  const activeSegments = Math.round((value / 100) * segments);

  return (
    <div className="w-full space-y-1">
      <div className="flex justify-between text-[10px] font-mono uppercase">
        <span className="text-mission-cyan/60">{label}</span>
        <span className="text-mission-cyan">{value}%</span>
      </div>
      <div className="flex gap-1 h-3">
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={`flex-1 transition-all duration-300 ${
              i < activeSegments
                ? (value < 30 ? "bg-mission-red shadow-[0_0_8px_#f54a22]" : "bg-mission-cyan shadow-[0_0_8px_#22d4f5]")
                : "bg-space-800"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
