import { withNextIntl } from 'next-intl/plugin';

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
