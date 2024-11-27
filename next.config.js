/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'trreb-image.ampre.ca',
        }
      ],
    }
}


module.exports = nextConfig
