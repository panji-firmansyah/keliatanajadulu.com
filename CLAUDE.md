# Keliatan Aja Dulu — keliatanajadulu.com

## What is this?
Coming soon landing page + waitlist for "Keliatan Aja Dulu" — a low-cost digital presence service (website, Google Business Profile, review management, WhatsApp integration) for Indonesian SMBs. By Great Tastemaker (GT).

## Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS v4, Framer Motion, Radix UI
- **API**: Vercel Serverless Functions (TypeScript)
- **Database**: Supabase PostgreSQL (`@supabase/supabase-js`)
- **Deployment**: Vercel

## Directory Structure
```
src/              # React frontend
  components/     # UI components (landing/ sections + ui/ primitives)
  pages/          # Route pages (Home, not-found)
  hooks/          # Custom hooks
  lib/            # Utilities
api/              # Vercel serverless functions
  waitlist.ts     # POST /api/waitlist
  waitlist/
    count.ts      # GET /api/waitlist/count
lib/
  supabase.ts     # Supabase client init
```

## Local Development
```bash
pnpm install
pnpm dev          # Vite dev server (frontend only)
vercel dev        # Full stack with API functions
```

## Environment Variables
- `SUPABASE_URL` — Supabase project URL (required for API functions)
- `SUPABASE_SERVICE_ROLE_KEY` — Supabase service role key (required for API functions)

## Database
Tables are managed via Supabase dashboard (supabase.com), not in code.
Current tables: `waitlist_entries` (in Supabase project "gt-tools")

## Key Patterns
- All content is in Indonesian (Bahasa Indonesia)
- Brand colors: Yellow #FBBF24 (primary), Charcoal #1E293B (secondary), Warm White #FAFAF9 (bg)
- Font: Plus Jakarta Sans (headings via CSS), Inter (body via Google Fonts)
- API calls from frontend use direct `fetch()` with React Query (`useMutation`/`useQuery`)
