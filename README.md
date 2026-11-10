# Portfolio

Personal portfolio of Muhammad Murodjonov, a product designer (UX/UI) with an IT background.

Live site: https://muhammad-murodjonov.vercel.app

## What it is

A fast, accessible portfolio site with a home page, project pages and case study pages. Content is managed in a CMS, so new projects and case studies can be added without touching the code.

## Stack

- **Site:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Content:** Sanity CMS (Studio hosted separately on sanity.studio)
- **Hosting:** Vercel, deployed automatically from the `main` branch
- **SEO:** dynamic metadata, canonical URLs, Open Graph image, `sitemap.xml`, `robots.txt`, JSON-LD

## How it works

1. The owner edits content in Sanity Studio and presses Publish.
2. Sanity sends a signed webhook to `/api/revalidate` on the site.
3. The site checks the signature and refreshes the affected pages.

The site only reads published content. It has no write access to the CMS and no tokens in the code.

## Repository structure

```text
web/      Next.js site (this is what Vercel builds)
studio/   Sanity Studio (schemas and configuration)
```

## Local development

Requirements: Node.js 20.9 or newer.

Site:

```bash
cd web
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Studio:

```bash
cd studio
npm install
npm run dev                  # http://localhost:3333
```

Checks before pushing:

```bash
cd web
npx tsc --noEmit
npm run lint
npm run build
```

## Environment variables

Defined in `web/.env.example`. Real values go in `web/.env.local` (never committed) and in the Vercel project settings.

| Name | Purpose | Secret |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project identifier | No |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (`production`) | No |
| `SANITY_REVALIDATE_SECRET` | Verifies webhooks sent by Sanity | **Yes** |

## Content model

- **Project:** title, slug, short description, categories, featured, display order, role, type, tools, scope, overview, highlights, cover image, gallery, prototype link.
- **Case study:** linked to a project. Optional sections: overview, problem, goals, target users, research, process, design decisions, final UI, design system, prototype, outcomes. Empty sections are not shown.
- **Site settings:** name, tagline, description, email, LinkedIn, Telegram, CV file.

Images require alt text. Only published documents appear on the site; drafts are never public.

## Adding a project

1. Open the Studio and go to Projects, then Create.
2. Fill in the required fields (title, slug, short description, at least one category, display order).
3. Turn on Featured to show it in Selected work on the home page.
4. Press Publish. The page appears on the site within a minute or two.

## Deployment

1. Import the repository in Vercel and set **Root Directory** to `web`.
2. Add the three environment variables above.
3. In Sanity (Manage, API, Webhooks) create a webhook:
   - URL: `https://<your-domain>/api/revalidate`
   - Dataset: `production`; trigger on create, update and delete
   - Filter: `_type in ["project", "caseStudy", "siteSettings"]`
   - Projection: `{_type}`
   - Drafts and versions: off
   - Secret: the same value as `SANITY_REVALIDATE_SECRET`
4. Deploy the Studio with `npx sanity deploy` from the `studio` folder.

## Security notes

- Editing is limited to project members in Sanity; the site itself has no admin area.
- The webhook endpoint rejects requests without a valid signature.
- Secrets live only in environment variables.
- Security headers are set in `web/next.config.ts`.
