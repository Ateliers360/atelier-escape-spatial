import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Liste de toutes les locales supportées
  locales: ['fr', 'en'],

  // Locale par défaut si aucune ne correspond
  defaultLocale: 'fr',

  // Optionnel : ne pas ajouter de préfixe pour la langue par défaut (ex: / au lieu de /fr)
  localePrefix: 'always'
});

export const config = {
  // On applique le middleware à toutes les routes sauf API, statics, etc.
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
