/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_IMAGE_URL: process.env.NEXT_PUBLIC_URL,
    HELLO_AR_URL: process.env.HELLO_AR_URL,
    SALES_FORCE_URL: process.env.SALES_FORCE_URL,
    CC_AVENUE_URL: process.env.CC_AVENUE_URL,
    CC_AVENUE_URL: process.env.CC_AVENUE_URL,
    NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
    NEXT_PUBLIC_GA__TAG_ID: process.env.NEXT_PUBLIC_GA__TAG_ID,
    // NEXT_PUBLIC_URL: 'http://3.111.141.162:4000/',
    // NEXT_PUBLIC_IMAGE_URL: 'http://3.111.141.162:4000/'
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // runtime: "experimental-edge",
    esmExternals: false,
    // nextScriptWorkers: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: process.env.NEXT_PUBLIC_URL,
        // pathname: 'http://3.111.141.162:4000/',
      },
    ],
  },
  // pwa: {
  //   dest: 'public',
  // },
  // rewrites: async () => [
  //   {
  //     source: "/",
  //     destination: "/pages/l0ev4kba947wqif9i6l8po72xdbr36.html",
  //   },
  // ],


}
// modules: true,
// images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: 'localhost',
//         port: '4000',
//         pathname: '/account123/**',
//       },
//     ],
//     formats: ['image/webp'],
//   } 
// images: {
//     domains: ['http://localhost:4000/']
// }

// async headers() {
//   return [
//     {
//       source: "https://api.helloviewer.io/(.*)",
//       headers: [
//         { key: "Access-Control-Allow-Credentials", value: "true" },
//         {
//           key: "Access-Control-Allow-Origin",
//           value: "https://api.helloviewer.io/",
//         },
//         {
//           key: "Access-Control-Allow-Methods",
//           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
//         },
//         {
//           key: "Access-Control-Allow-Headers",
//           value:
//             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
//         },
//       ],
//     },]
// }
module.exports = nextConfig
