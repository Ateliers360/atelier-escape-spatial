// src/apps/web/i18n.ts
import { getRequestConfig, type GetRequestConfigParams } from 'next-intl/server';
import { notFound } from 'next/navigation';

// On définit les locales supportées ici aussi pour la cohérence
const locales = ['fr', 'en'];

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {

  const locale = await requestLocale;

  // On vérifie que la locale est bien supportée
  if (!locale || !locales.includes(locale)) notFound();

  try {
    return {
      locale,
      // Importation dynamique du fichier JSON correspondant
      messages: (await import(`./messages/${locale}.json`)).default
    };
  } catch {
    // Si le fichier JSON n'existe pas, on renvoie une erreur 404
    notFound();
  }
});
