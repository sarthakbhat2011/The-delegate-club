import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  allowedDevOrigins: ["169.254.22.155", "localhost", "169.254.22.155:3000", "localhost:3000"],
  typescript: {
    // Skip typescript validation on build to save memory
    ignoreBuildErrors: true,
  },
  eslint: {
    // Skip eslint validation on build to save memory
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Optimize memory during build
    webpackMemoryOptimizations: true,
  },
  optimizePackageImports: [
    "lucide-react",
    "framer-motion",
    "@react-three/drei",
    "@react-three/fiber",
    "gsap",
    "lenis"
  ],
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {},
});

export default withMDX(nextConfig);
