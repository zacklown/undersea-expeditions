# undersea-expeditions

## Docker dev

Run the frontend, Payload CMS, and Postgres together from the repo root:

```bash
copy .env.example .env
docker compose up --build
```

Services:

- Frontend: `http://localhost:4321`
- CMS admin: `http://localhost:3001/admin`
- Postgres: `127.0.0.1:55632`

To reset the database volume:

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
