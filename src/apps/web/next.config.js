// Next.js configuration file (src/apps/web/next.config.js)
import createNextIntlPlugin from 'next-intl/plugin';

// Initialise le plugin (par défaut, il cherche './src/i18n.ts' ou './i18n.ts')
const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Indispensable pour que Turborepo compile les composants de @repo/ui
  transpilePackages: ["@repo/ui", "@repo/database"],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'orzfuxasrbpkcaqvgvah.supabase.co', // Votre stockage Supabase
      },
    ],
  },
};

export default withNextIntl(nextConfig);
