/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Phase3でアフィリエイト画像・ASP画像を扱う際に外部ドメインをここへ追加
    remotePatterns: [
      // { protocol: 'https', hostname: 'example.com' },
    ],
  },
};

export default nextConfig;
