# undersea-expeditions

## Docker development

The default Docker workflow starts Astro, Payload CMS, and an isolated Postgres
database together:

```bash
docker compose up --build -d
```

Services:

- Frontend: `http://localhost:4321`
- CMS admin: `http://localhost:3001/admin`
- Postgres: `127.0.0.1:55632`

Docker Desktop can start and stop the Compose project after its first build. The
Docker environment is stored in the ignored `.env.docker` file. Copy
`.env.docker.example` when setting up another checkout.

Refresh the container after dependency or Dockerfile changes:

```bash
docker compose up --build -d
```

### Vercel Blob in development

The local CMS supports the same Vercel Blob adapter as production. Keep the
database local, then set these values in `.env.docker` using a Blob-only token:

```env
ENABLE_VERCEL_BLOB=true
BLOB_READ_WRITE_TOKEN=your-blob-token
```

Do not copy the production database URL into this file. Local migrations, saves,
and deletes must remain isolated from the deployed database.

### Refresh development data from production

This command takes a read-only production snapshot, replaces only the Docker
development database, and restarts the local CMS and frontend:

```powershell
.\scripts\sync-prod-to-dev.ps1
```

The script reads the production connection from the ignored
`apps/cms/.env.production.local`. Production is never restored to or migrated by
this workflow.

## Frontend rendering

`astro dev` renders pages on demand so CMS edits are visible immediately during
Docker development. `astro build` prerenders the complete site as static HTML,
including trip detail and legacy redirect routes. Production visitors therefore
do not wait for or contact Payload on each page request.

Static production content updates when the frontend is rebuilt. Configure a
Vercel Deploy Hook for the frontend project and trigger it after publishing CMS
changes if editors need a one-click publish workflow.

The CMS automatically calls the hook after production changes to trips, media,
regions, countries, stays, FAQs, and frontend page globals. In the Vercel
frontend project, create a Production Deploy Hook for `main`, then add its URL to
the CMS project's Production environment as:

```env
FRONTEND_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
```

The hook is ignored in local development and Vercel preview deployments. A
failed rebuild request is logged by Payload but does not prevent content from
being saved.

To reset the isolated local database volume:

```bash
docker compose down -v
```

If you make breaking schema changes and want a clean CMS database, use the same command above to wipe Postgres and recreate it from scratch on next startup.

If the Payload admin ever reports missing components in the import map, regenerate the CMS artifacts with:

```bash
cd apps/cms
npm run generate:payload
```

If you want to open the CMS or frontend from another device on your LAN, set the root `.env` to your machine's actual IP. Example:

```env
CMS_PUBLIC_URL=http://192.168.86.144:3001
FRONTEND_PUBLIC_URL=http://192.168.86.144:4321
FRONTEND_PAYLOAD_API_URL=http://192.168.86.144:3001/api
PAYLOAD_PUBLIC_ORIGINS=http://localhost:3001,http://127.0.0.1:3001,http://localhost:4321,http://192.168.86.144:3001,http://192.168.86.144:4321
ALLOWED_DEV_ORIGINS=localhost,127.0.0.1,192.168.86.144
```
