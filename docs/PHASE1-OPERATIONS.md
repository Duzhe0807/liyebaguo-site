# Phase 1 operations

Phase 1 uses Next.js 16, PostgreSQL and Prisma. It runs with mock payment only. Do not set `TICKETING_DEPLOY_READY=true` until the acceptance environment is prepared and backed up.

## Confirmed schedules and prices

| Session | Garden | Dinner show | Guest | VIP | SVIP |
| --- | --- | --- | ---: | ---: | ---: |
| Lunch | 11:30-12:10 | 12:30-14:20 | CNY 238 | CNY 296 | CNY 496 |
| Dinner | 18:00-18:40 | 19:00-20:50 | CNY 316 | CNY 458 | CNY 596 |

The default online inventory is 20 per show. Physical capacity remains 160. Admin may change online inventory and prices, but cannot set online capacity below held plus sold tickets.

## Required services

- Next.js runs as an unprivileged service user on `127.0.0.1:3000`.
- Nginx terminates HTTPS and proxies to Next.js. Do not expose port 3000 publicly.
- PostgreSQL listens only on localhost/private network and uses a least-privilege application user.
- `pnpm worker:expire` runs every minute to expire unpaid orders and release held inventory.
- `pnpm worker:email` runs every minute to deliver one queued confirmation email with retry.
- Database backups run daily, are encrypted, copied off-server and restored in a scheduled test.

## Deployment gate

The GitHub workflow is intentionally skipped until the repository variable `TICKETING_DEPLOY_READY` equals `true`. Before enabling it:

1. Create `/etc/liyebaguo/app.env` with permissions `600`; never commit or paste its values into chat.
2. Install Node.js 22 and pnpm 11 on the Tencent Cloud website server.
3. Create the `liyebaguo-web.service` systemd unit and the two maintenance timers.
4. Configure PostgreSQL, apply the migration and run the seed with an explicit show date range.
5. Configure Nginx proxy limits, HTTPS, rate limiting and access-log redaction for sensitive paths.
6. Run the PostgreSQL concurrency test using `TEST_DATABASE_URL` and verify a backup restore.
7. Keep `MOCK_PAYMENT_ENABLED=true`; formal providers stay disabled.

Deployments use timestamped releases in `/opt/liyebaguo/releases`, switch an atomic `current` symlink, retain five releases and verify both database health and the Chinese homepage.

## Production No-Go conditions

Formal payment remains No-Go if any required provider webhook verification, active payment query fallback, sandbox end-to-end test, inventory concurrency test, database restore test, admin MFA test, or Critical/High security finding is incomplete.