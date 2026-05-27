import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Countries } from "./src/collections/Countries";
import { FAQs } from "./src/collections/FAQs";
import { Galleries } from "./src/collections/Galleries";
import { Media } from "./src/collections/Media";
import { Regions } from "./src/collections/Regions";
import { Stays } from "./src/collections/Stays";
import { Trips } from "./src/collections/Trips";
import { Users } from "./src/collections/Users";
import { ContactPage } from "./src/globals/ContactPage";
import { FAQPage } from "./src/globals/FAQPage";
import { GalleryPage } from "./src/globals/GalleryPage";
import { HomePage } from "./src/globals/HomePage";
import { SiteSettings } from "./src/globals/SiteSettings";
import { TripsPage } from "./src/globals/TripsPage";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const serverURL = process.env.SERVER_URL || "http://localhost:3001";
const frontendURL = process.env.FRONTEND_URL || "http://localhost:4321";
const extraAllowedOrigins = (process.env.PAYLOAD_PUBLIC_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = Array.from(
  new Set([serverURL, frontendURL, "http://localhost:3001", "http://127.0.0.1:3001", ...extraAllowedOrigins]),
);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, Regions, Countries, Stays, Trips, Galleries, FAQs],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URL ||
        "postgresql://undersea_cms:undersea_cms_dev_password@127.0.0.1:55432/undersea_payload",
    },
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings, HomePage, TripsPage, GalleryPage, FAQPage, ContactPage],
  routes: {
    admin: "/admin",
    api: "/api",
  },
  secret: process.env.PAYLOAD_SECRET || "replace-me-in-env",
  serverURL,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
});
