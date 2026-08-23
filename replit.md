# ArveX Hosting

Premium futuristic hosting storefront and customer/admin portal for game servers, cloud VPS/VDS, web hosting, bot hosting, and domains.

## Run & Operate

- `pnpm --filter @workspace/arvex-hosting run dev` — run the public web app
- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required secrets for completed order notifications and admin access: `DISCORD_WEBHOOK_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `SESSION_SECRET`.
- `DISCORD_WEBHOOK_URL` must be a Discord webhook created for the order channel; a channel URL cannot receive server-side posts.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

- Public service catalog with responsive animated pages and plan selection.
- Three-step checkout that validates the order server-side and sends a Discord embed to the configured order webhook.
- Customer portal routes for services, orders, invoices, tickets, profile, and security.
- Protected `/admin` control room with session-based sign-in and content/fleet overview controls.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
