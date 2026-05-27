import path from "node:path";
import { fileURLToPath } from "node:url";

import { withPayload } from "@payloadcms/next/withPayload";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const allowedDevOrigins = (process.env.ALLOWED_DEV_ORIGINS || "localhost,127.0.0.1,192.168.86.144")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

/** @type {import("next").NextConfig} */
const nextConfig = {
  allowedDevOrigins,
  reactStrictMode: true,
  turbopack: {
    root: dirname,
  },
};

export default withPayload(nextConfig);
