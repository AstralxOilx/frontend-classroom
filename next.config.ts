import type { NextConfig } from "next"; 

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [{ 
      protocol:"https",
      hostname: "localhost",
      port: "4000",
      pathname: "/**"
    }]
  }

};

export default nextConfig;
