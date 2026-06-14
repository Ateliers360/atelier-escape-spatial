// Groupe d'inputs (Sliders néon) pour modifier la masse, la poussée et l'angle.
// Sert de composant pour `OrbitCanvas`.

import { useState } from "react";
import { Input } from "@/packages/ui/src/input";

export function TrajectoryParamsForm() {
  return (
    <div className="flex flex-col gap-2">
      <Input type="range" />
      <Input type="range" />
      <Input type="range" />
    </div>
  );
}
