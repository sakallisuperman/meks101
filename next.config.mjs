/** @type {import('next').NextConfig} */
const nextConfig = {
  // Three.js ES modülleri Next.js ile çalışması için transpile edilmeli
  transpilePackages: ['three'],
  reactStrictMode: true,
};

export default nextConfig;
