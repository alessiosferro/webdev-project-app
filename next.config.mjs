import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'loywoviwfotlcofcfoiu.supabase.co'
            }
        ]
    }
};

export default withNextIntl(nextConfig);