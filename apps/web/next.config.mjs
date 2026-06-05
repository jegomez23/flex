/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL) : null;

const nextConfig = {
  images: {
    remotePatterns: [
      ...(supabaseUrl
        ? [
            {
              protocol: supabaseUrl.protocol.replace(":", ""),
              hostname: supabaseUrl.hostname,
              port: supabaseUrl.port,
              pathname: "/storage/v1/object/public/**",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
