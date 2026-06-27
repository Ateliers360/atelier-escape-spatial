// Middleware pour gérer l'internationalisation avec next-intl (src/apps/web/middleware.ts)
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['fr', 'en'],
  defaultLocale: 'fr',
  localePrefix: 'always'
});

export const config = {
  // Matcher officiel next-intl : on exclut les dossiers internes et les fichiers
  matcher: [
    // Redirige la racine
    '/',
    // Gère les locales (fr/en)
    '/(fr|en)/:path*',
    // Exclut les fichiers statiques et dossiers internes Next.js
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
