/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow images from any HTTPS source (loosen for dev; tighten for prod)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Silences the "missing suspense boundary" warning for useSearchParams
  // used in search/page.js and login/page.js
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
