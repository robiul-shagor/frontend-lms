/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'example.com',
          // Optional: Specify pathname beginning with a '/'
          // pathname: '/path/to/images/*',
        },
        {
          protocol: 'https',
          hostname: 'trreb-image.ampre.ca',
          // pathname can include wildcards such as '*.jpg'
        }
      ],
    }
}


module.exports = nextConfig
