# Undersea Expeditions CMS

Payload runs here as a separate Next.js app and now uses PostgreSQL.

In production, uploaded media can be stored in Vercel Blob by setting `BLOB_READ_WRITE_TOKEN`. The CMS is configured to use the official Payload Vercel Blob adapter for the `media` collection when `NODE_ENV=production`.

## Local setup

1. Copy `.env.example` to `.env`.
2. Start Postgres:

```bash
docker compose up -d
```

3. Install dependencies:

```bash
npm install
```

4. Start the CMS:

```bash
npm run dev
```

If the Payload admin schema or editor setup changes, the CMS now regenerates its Payload types and admin import map automatically before `dev`, `build`, and `start`.

Manual recovery commands, if you ever need them:

```bash
npm run generate:types
npm run generate:importmap
```

The Payload admin will be available at `http://localhost:3001/admin`.

The repo-local Postgres is exposed on `127.0.0.1:55632` and uses a repo-specific user/password to avoid colliding with any other local Postgres instance.

## Frontend connection

The Astro frontend reads from `PUBLIC_PAYLOAD_API_URL`.

If you want to point the frontend somewhere other than the local default, set:

```bash
PUBLIC_PAYLOAD_API_URL=http://127.0.0.1:3001/api
```
