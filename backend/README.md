# Smart Gram Panchayat API

## Run

```powershell
pnpm backend:dev
```

The API runs at `http://localhost:3001` and uses Supabase for Auth and PostgreSQL data.

Before starting the API:

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in `.env`.
4. Set `VITE_API_URL=http://localhost:3001` for the frontend.

The service-role key must stay on the server and must never be added to frontend environment variables.

## Accounts

Citizens create accounts through the registration form. Create an admin user in Supabase Auth, then set that user's profile role to `admin` using the SQL comment at the bottom of `supabase/schema.sql`.

## Main endpoints

- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET/PATCH /api/me`
- `GET/POST /api/complaints`
- `PATCH /api/complaints/:id` (admin)
- `GET /api/households/me`
- `GET /api/households` (admin)
- `GET/POST /api/applications`
- `GET /api/news`
- `GET/POST/PATCH/DELETE /api/admin/news` (admin)
- `GET /api/admin/dashboard` (admin)
- `GET /api/health`
