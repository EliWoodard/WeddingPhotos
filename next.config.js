// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    output: 'export',
    images: {
      unoptimized: true, // Required for using Next.js images with static exports
    },
    basePath: '/WeddingPhotos', // Change to your GitHub repo name
  };