# MammyZone

Next.js app for MammyZone (public site, booking/contact flows, and admin dashboard).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Database (local)

- Copy `.env.example` to `.env` and set `DATABASE_URL` for Neon or local Postgres.
- **Migrations (preferred):** `npm run db:migrate`
- **Push schema without migration history (dev fallback):** `npm run db:push`
- **Seed:** `npm run db:seed`
- **Studio:** `npm run db:studio`

### Admin (local)

Set `ADMIN_SESSION_SECRET`, `ADMIN_USERNAME`, and `ADMIN_PASSWORD` in `.env`. Sign in at `/admin/login`.

## Production (Vercel + Neon)

1. Create a Neon database and set `DATABASE_URL` on Vercel (Production).
2. Set `NEXT_PUBLIC_SITE_URL`, `ADMIN_SESSION_SECRET` (24+ chars recommended on Vercel production), `ADMIN_USERNAME`, and `ADMIN_PASSWORD`.
3. Build: `npm run build` (runs after `postinstall` → `prisma generate`).
4. Apply schema: `npx prisma migrate deploy` (from CI/CD or a controlled release step).
5. Optional: `npm run db:seed` on a fresh DB if you rely on seed data.

See **[docs/production-db-admin.md](docs/production-db-admin.md)** for full detail and **[docs/admin-security-checklist.md](docs/admin-security-checklist.md)** before go-live.

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run lint` | ESLint |
| `npm run build` | Production build |
| `npm run db:generate` | `prisma generate` |
| `npm run db:migrate` | `prisma migrate dev` (local) |
| `npm run db:migrate:deploy` | `prisma migrate deploy` (CI/production) |
| `npm run db:push` | `prisma db push` (dev fallback) |
| `npm run db:seed` | Seed database |

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
