import type { NextConfig } from "next";

// Static site. Set BASE_PATH (e.g. BASE_PATH=/juliocesar) when it is served
// from a sub-path such as a GitHub Pages project site; leave it unset for a
// root domain or local dev.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  // Emit /skills/index.html instead of /skills.html so static hosts serve it
  trailingSlash: true,
  basePath,
  // No image optimization server in a static export
  images: { unoptimized: true },
  // next/link applies basePath itself; plain asset URLs (the photo) need it too
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
