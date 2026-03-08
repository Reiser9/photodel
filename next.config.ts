import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
    },
    reactStrictMode: false,
    output: "standalone",
    images: {
        remotePatterns: [{ hostname: "http://localhost:9000" }],
        unoptimized: true,
    },
};

export default nextConfig;
