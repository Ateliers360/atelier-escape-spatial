// Physique du jeu (Formules trajectoire, collisions, etc...)
import { TelemetryData } from "../socket/events";

const GRAVITY = 1.62; // Lune m/s²
const THRUST_MAX = 4.5; // Puissance max moteur
const FUEL_CONSUMPTION_RATE = 0.15; // Par seconde à 100%

export const calculateNextState = (
  current: TelemetryData,
  thrustPower: number,
  dt: number
): TelemetryData => {
  if (current.altitude <= 0) return { ...current, altitude: 0, velocity: 0 };
  if (current.fuel <= 0) thrustPower = 0;

  // Calcul de l'accélération (Gravité - Poussée)
  const acceleration = GRAVITY - (thrustPower * THRUST_MAX);

  // Nouvelle vitesse
  const newVelocity = current.velocity + acceleration * dt;

  // Nouvelle altitude
  const newAltitude = Math.max(0, current.altitude - newVelocity * dt);

  // Consommation carburant
  const fuelBurned = thrustPower * FUEL_CONSUMPTION_RATE * dt;
  const newFuel = Math.max(0, current.fuel - fuelBurned);

  let status = current.status;
  if (newAltitude === 0) {
    status = newVelocity > 5 ? 'CRASHED' : 'LANDED';
  } else if (newFuel < 10 || newAltitude < 500) {
    status = 'CRITICAL';
  }

  return {
    altitude: newAltitude,
    velocity: newVelocity,
    fuel: newFuel,
    oxygen: current.oxygen - (0.01 * dt), // Consommation O2 constante
    status
  };
};
