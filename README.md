# Smart Gram Panchayat

React/Vite frontend with an Express API backed by Supabase Auth and PostgreSQL.

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

## Accounts

Citizens register through the app. Admin access is granted by setting the matching row in `public.users` to `role = 'admin'` in Supabase.

## Production checks

```powershell
pnpm build
pnpm exec tsc --noEmit --module NodeNext --moduleResolution NodeNext --target ES2022 --strict --skipLibCheck backend/db.ts backend/server.ts
```

Start the API in production with:

```powershell
pnpm backend
```

Run `supabase/schema.sql` in the Supabase SQL Editor before starting the API.
Keep `SUPABASE_SERVICE_ROLE_KEY` private on the server. Only `VITE_API_URL` belongs in the frontend environment.