# Lockkedn

Lockkedn turns product links into shoppable short-form content concepts, publishing plans, and feedback loops for creator-led commerce teams.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/lockkedn/src/App.tsx` — product surface, local state, routing, and interactive flows
- `artifacts/lockkedn/src/index.css` — Lockkedn visual tokens, typography, layout utilities, and motion
- `artifacts/lockkedn/.replit-artifact/artifact.toml` — artifact routing and managed web workflow
- `attached_assets/Lockkedn_SaaS_Blueprint_1790606502001.pdf` — original product blueprint

## Architecture decisions

- The first build is frontend-first and uses browser local storage so the core workflow can be explored without connecting social or commerce accounts.
- The product surface is organized around the product-to-content loop: intake, concept generation, queue progression, scheduling, and analytics feedback.
- The nine AI agents in the blueprint are represented as user-facing workflow capabilities first; they are not split into separate services until real provider and account integrations are defined.
- The responsive shell keeps the command center dense on desktop and switches to a focused bottom navigation on smaller screens.

## Product

Users can add product links, review a small product library, generate content concepts for TikTok, Instagram, or YouTube, move ideas through queue states, schedule them on a publishing calendar, inspect performance signals, and manage connected-account, brand-kit, and AI preferences views.

## User preferences

None recorded.

## Gotchas

- The current MVP persists data in the browser under `lockkedn-state`; it is intentionally not multi-user or server-backed yet.
- Artifact typecheck is the reliable local verification command; the root workspace build also includes unrelated scaffold packages that require their own workflow environment.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
