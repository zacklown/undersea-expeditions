import path from "node:path";
import { fileURLToPath } from "node:url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig, type CollectionConfig, type GlobalConfig, type Plugin } from "payload";
import sharp from "sharp";

import { Countries } from "./src/collections/Countries";
import { FAQs } from "./src/collections/FAQs";
import { Media } from "./src/collections/Media";
import { Regions } from "./src/collections/Regions";
import { Stays } from "./src/collections/Stays";
import { Trips } from "./src/collections/Trips";
import { Users } from "./src/collections/Users";
import { AboutPage } from "./src/globals/AboutPage";
import { ContactPage } from "./src/globals/ContactPage";
import { FAQPage } from "./src/globals/FAQPage";
import { HomePage } from "./src/globals/HomePage";
import { SiteSettings } from "./src/globals/SiteSettings";
import { SocialsPage } from "./src/globals/SocialsPage";
import { TripsPage } from "./src/globals/TripsPage";
import {
  triggerFrontendDeployAfterChange,
  triggerFrontendDeployAfterDelete,
  triggerFrontendDeployAfterGlobalChange,
} from "./src/hooks/triggerFrontendDeploy";
import { migrations } from "./src/migrations";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const isProduction = process.env.NODE_ENV === "production";
const isVercelProduction = process.env.VERCEL === "1" && process.env.VERCEL_ENV === "production";

function normalizeOrigin(value?: string | null) {
  if (!value) return "";

  const trimmed = value.trim();

  if (!trimmed) return "";

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.replace(/\/+$/, "");
  }

  return `https://${trimmed.replace(/\/+$/, "")}`;
}

const inferredVercelURL = normalizeOrigin(
  process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL,
);
const serverURL = normalizeOrigin(process.env.SERVER_URL) || inferredVercelURL || "http://localhost:3001";
const frontendURL =
  normalizeOrigin(process.env.FRONTEND_URL) || normalizeOrigin(process.env.NEXT_PUBLIC_SITE_URL) || "http://localhost:4321";
const extraAllowedOrigins = (process.env.PAYLOAD_PUBLIC_ORIGINS || "")
  .split(",")
  .map((origin) => normalizeOrigin(origin))
  .filter(Boolean);
const allowedOrigins = Array.from(
  new Set([
    serverURL,
    frontendURL,
    inferredVercelURL,
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    ...extraAllowedOrigins,
  ]),
);
const databaseURL =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL_UNPOOLED;
const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
const useVercelBlob = isProduction || process.env.ENABLE_VERCEL_BLOB === "true";
const plugins: Plugin[] = [];

function withFrontendDeployHooks(config: CollectionConfig): CollectionConfig {
  return {
    ...config,
    hooks: {
      ...config.hooks,
      afterChange: [...(config.hooks?.afterChange || []), triggerFrontendDeployAfterChange],
      afterDelete: [...(config.hooks?.afterDelete || []), triggerFrontendDeployAfterDelete],
    },
  };
}

function withFrontendDeployGlobalHook(config: GlobalConfig): GlobalConfig {
  return {
    ...config,
    hooks: {
      ...config.hooks,
      afterChange: [...(config.hooks?.afterChange || []), triggerFrontendDeployAfterGlobalChange],
    },
  };
}

if ((isVercelProduction || process.env.ENABLE_VERCEL_BLOB === "true") && !blobToken) {
  throw new Error(
    "BLOB_READ_WRITE_TOKEN must be set when Vercel Blob storage is enabled.",
  );
}

if (useVercelBlob && blobToken) {
  const { vercelBlobStorage } = await import("@payloadcms/storage-vercel-blob");

  plugins.push(
    vercelBlobStorage({
      addRandomSuffix: true,
      collections: {
        media: true,
      },
      token: blobToken,
    }),
  );
}

if (isProduction && !databaseURL) {
  throw new Error(
    "A database connection string must be set in production. Expected one of DATABASE_URL, POSTGRES_URL, POSTGRES_URL_NON_POOLING, or DATABASE_URL_UNPOOLED.",
  );
}

export default buildConfig({
  admin: {
    components: {
      graphics: {
        Icon: "./src/components/AdminBranding#AdminIcon",
        Logo: "./src/components/AdminBranding#AdminLogo",
      },
    },
    meta: {
      titleSuffix: " - Undersea Expeditions CMS",
    },
    user: Users.slug,
  },
  collections: [
    Users,
    ...[Media, Regions, Countries, Stays, Trips, FAQs].map(withFrontendDeployHooks),
  ],
  cors: allowedOrigins,
  csrf: allowedOrigins,
  db: postgresAdapter({
    pool: {
      connectionString: databaseURL || "postgresql://undersea_cms:undersea_cms_dev_password@127.0.0.1:55632/undersea_payload",
    },
    prodMigrations: migrations,
    push: false,
  }),
  editor: lexicalEditor(),
  globals: [
    SiteSettings,
    HomePage,
    TripsPage,
    SocialsPage,
    FAQPage,
    ContactPage,
    AboutPage,
  ].map(withFrontendDeployGlobalHook),
  plugins,
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
