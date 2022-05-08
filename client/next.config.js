/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // async rewrites() {
    //     return [
    //         {
    //           source: "/:path*",
    //           destination: `${process.env.DESTINATION_URL}/:path*`, // Proxy to Backend
    //         },
    //       ];
    // },
}

module.exports = nextConfig
