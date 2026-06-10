import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const envFilePath = path.resolve(process.cwd(), ".env.production.local");

if (!existsSync(envFilePath)) {
  console.error(`Missing env file: ${envFilePath}`);
  process.exit(1);
}

const envFile = readFileSync(envFilePath, "utf8");

for (const rawLine of envFile.split(/\r?\n/)) {
  const line = rawLine.trim();

  if (!line || line.startsWith("#")) {
    continue;
  }

  const separatorIndex = line.indexOf("=");

  if (separatorIndex === -1) {
    continue;
  }

  const key = line.slice(0, separatorIndex).trim();
  let value = line.slice(separatorIndex + 1);

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  process.env[key] = value;
}

process.env.NODE_ENV = "production";

if (!process.env.DATABASE_URL && process.env.DATABASE_URL_UNPOOLED) {
  process.env.DATABASE_URL = process.env.DATABASE_URL_UNPOOLED;
}

if (!process.env.POSTGRES_URL_NON_POOLING && process.env.DATABASE_URL_UNPOOLED) {
  process.env.POSTGRES_URL_NON_POOLING = process.env.DATABASE_URL_UNPOOLED;
}

const payloadBinPath = path.resolve(process.cwd(), "node_modules", "payload", "bin.js");
const child = spawn(process.execPath, [payloadBinPath, "migrate"], {
  cwd: process.cwd(),
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
