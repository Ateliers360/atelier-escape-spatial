import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirige automatiquement vers la langue par défaut (fr)
  redirect('/fr');
}
