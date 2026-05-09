# Admin and database security checklist

Use this before go-live and after any incident involving credentials or access.

## Credentials and secrets

- [ ] **Rotate exposed database password** — In Neon, create new role/password or rotate connection string; update `DATABASE_URL` in Vercel; confirm old credentials are revoked or unused.
- [ ] **Change admin password** — Update `ADMIN_PASSWORD` to a long, unique value that passes the server password policy (no common substrings, not containing username).
- [ ] **Set `ADMIN_SESSION_SECRET`** — Use a long random value (24+ characters on Vercel production). Prefer this over legacy `ADMIN_ACCESS_KEY`.
- [ ] **Never expose `DATABASE_URL`** — Keep it server-only; do not prefix with `NEXT_PUBLIC_`; do not embed in client bundles or client-accessible API responses.

## DNS and edge

- [ ] **Cloudflare (or similar)** — Prefer DNS-only vs proxied only as your architecture requires; if proxied, confirm SSL mode and origin settings so the app and Neon connections remain valid. Document your chosen mode for the team.

## Backups and data

- [ ] **Back up Neon** — Enable Neon’s backup/snapshot features appropriate for your RPO/RTO; test restore on a non-production branch periodically.
- [ ] **Export leads regularly** — Use admin CSV exports (`/api/admin/leads-export`, newsletter and bookings exports) or Neon backups for operational copies; store exports securely.

## Application hygiene

- [ ] **Review audit log** — In admin, check **Audit** (and **System** for DB connectivity) after changes.
- [ ] **Limit admin access** — Share admin credentials only through a password manager; prefer separate environments (preview vs production) with separate secrets.

## After rotation

- [ ] Redeploy or restart so all server instances read new env values.
- [ ] Sign in at `/admin/login` and verify **System** shows database connected.
- [ ] Run `npx prisma migrate deploy` if schema version changed as part of the release.
