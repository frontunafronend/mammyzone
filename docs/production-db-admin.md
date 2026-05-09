# Production database and admin (MammyZone)

This document describes how to run Postgres (Neon), apply Prisma migrations, seed optional data, and operate the env-based admin on Vercel.

## Neon setup

1. Create a Neon project and a database branch for production.
2. Copy the connection string (use the **pooled** host if Neon recommends it for serverless).
3. Ensure `sslmode=require` (or equivalent) is present in the URL.

Never commit real `DATABASE_URL` values to git.

## Vercel environment variables

Set these in the Vercel project (Production environment):

| Variable | Required | Notes |
|----------|----------|--------|
| `DATABASE_URL` | Yes | Neon Postgres connection string (server only). |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site origin, e.g. `https://example.com` (no trailing slash required). |
| `ADMIN_SESSION_SECRET` | Yes | **24+ characters** recommended on Vercel production (or legacy `ADMIN_ACCESS_KEY` 16+). |
| `ADMIN_USERNAME` | Yes | Operator username (min 2 characters). |
| `ADMIN_PASSWORD` | Yes | Strong password; policy enforced (min length, weak patterns blocked). |
| `LEADS_STORAGE_DRIVER` | No | Defaults to Prisma/Neon when `DATABASE_URL` is set. |

The app validates Vercel production env at startup (see `src/server/config/env.ts` and `src/instrumentation.ts`).

## Prisma: generate

Install dependencies (runs `postinstall` → `prisma generate`). Locally or in CI:

```bash
npm install
npx prisma generate
```

## Prisma: migrations (production)

**Preferred:** committed migrations under `prisma/migrations/`.

```bash
npx prisma migrate deploy
```

Add to release automation or Vercel **Build Command** only if you run migrations from the same pipeline (many teams run `migrate deploy` as a separate step/job).

**Development:** use `npm run db:migrate` (`prisma migrate dev`) to create and apply migrations.

**Fallback / local only:** `npm run db:push` (`prisma db push`) does not replace versioned migrations for production.

## Prisma: seed

Optional demo or baseline data:

```bash
npm run db:seed
```

Run after migrations on a fresh database if your team relies on seed content.

## Admin login

1. Set `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `ADMIN_SESSION_SECRET` (or legacy key) as above.
2. Open `/admin/login` on the deployed site.
3. Sign in with the configured credentials.

Failed attempts are rate-limited (in-memory per instance) and return a generic error (no user enumeration).

## Rollback notes

- **Application:** revert the Vercel deployment to a previous production deployment.
- **Database:** Prisma does not auto-rollback schema changes. To undo a migration, restore the database from a Neon backup/snapshot taken before the migration, or add a forward migration that reverses the change. Plan breaking schema changes carefully.

## Secret rotation

1. **Database:** In Neon, rotate credentials and update `DATABASE_URL` in Vercel; redeploy or restart so new connections pick up the value.
2. **Admin password:** Update `ADMIN_PASSWORD` in Vercel; no DB migration required.
3. **Session signing:** Change `ADMIN_SESSION_SECRET` (or legacy `ADMIN_ACCESS_KEY`). All existing admin sessions invalidate immediately; operators must sign in again.
4. **Leaked env in logs:** Rotate any exposed secret; never log `DATABASE_URL` or passwords.

## Related docs

- [Admin security checklist](./admin-security-checklist.md)
