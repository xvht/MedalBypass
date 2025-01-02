/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    turbo: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
    },
  },
  async rewrites() {
    return [
      {
        source: "/x/:path",
        destination: `${process.env.API_URL}/:path`,
      },
    ];
  },
};

export default config;
