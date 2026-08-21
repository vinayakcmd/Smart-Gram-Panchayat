# Smart Gram Panchayat

React/Vite frontend with a local Express + SQLite API.

## Requirements

- Node.js 22 or newer
- pnpm 10.34.3

## Install

```powershell
corepack enable
corepack prepare pnpm@10.34.3 --activate
pnpm install
Copy-Item .env.example .env
```

## Run for development

Use two PowerShell terminals:

```powershell
pnpm backend:dev
```

```powershell
pnpm dev
```

Frontend: `http://localhost:8443`

API: `http://localhost:3001`

## Demo accounts

- Citizen: `9876543210` / `demo123`
- Admin: `admin@rahatgaon.gov.in` / `demo123`

## Production checks

```powershell
pnpm build
pnpm exec tsc --noEmit --module NodeNext --moduleResolution NodeNext --target ES2022 --strict --skipLibCheck backend/db.ts backend/server.ts
```

Start the API in production with:

```powershell
pnpm backend
```

The SQLite database is created automatically in `backend/data/panchayat.sqlite`.
Keep `backend/data`, `backend/uploads`, and `.env` private on the server.