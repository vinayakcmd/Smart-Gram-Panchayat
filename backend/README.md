# Smart Gram Panchayat API

## Run

```powershell
pnpm backend:dev
```

The API runs at `http://localhost:3001`.

## Demo accounts

- Citizen: identifier `9876543210`, password `demo123`
- Admin: identifier `admin@rahatgaon.gov.in`, password `demo123`

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
