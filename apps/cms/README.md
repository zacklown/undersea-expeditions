# Undersea Expeditions CMS

Payload runs here as a separate Next.js app with PostgreSQL.

Upload storage behavior:

- Local development stores media on disk in `apps/cms/media`.
- Production stores media in Vercel Blob and requires `BLOB_READ_WRITE_TOKEN`.

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

Payload regenerates types and the admin import map before `dev`, `build`, and `start`.

If you need to refresh them manually:

```bash
npm run generate:types
npm run generate:importmap
```

The Payload admin will be available at `http://localhost:3001/admin`.

The repo-local Postgres is exposed on `127.0.0.1:55632` and uses a repo-specific user/password to avoid colliding with any other local Postgres instance.

## Production

Set `BLOB_READ_WRITE_TOKEN` in the CMS environment before a Vercel production deploy. The app now fails fast for that deployment path if the variable is missing.

## Frontend connection

The Astro frontend reads from `PUBLIC_PAYLOAD_API_URL`.

If you want to point the frontend somewhere other than the local default, set:

```bash
PUBLIC_PAYLOAD_API_URL=http://127.0.0.1:3001/api
```
