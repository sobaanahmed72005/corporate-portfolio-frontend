# Architecture

This is the technical reference for the IT Solutions Trade & Service website. If
you're a developer picking this up for the first time — or inspecting the
codebase — start here.

## 1. What this site is (and isn't)

This is a **marketing/portfolio site**, not a store. It showcases the company,
its product categories, and its installation services, and every "buy" action
links out to the company's separate online store. There is no cart, checkout,
database, or admin panel here — deliberately. Adding one of those would be
unjustified complexity for a site whose job is to inform and convert visitors
into store visitors or contact form leads.

This repo is **frontend only**. The contact form's server-side logic lives in
a separate repo, [corporate-portfolio-api](../corporate-portfolio-api), so the
two can be built, deployed, and scaled independently — see §8.

## 2. Stack and rationale

| Choice | Why |
|---|---|
| **Next.js 14 (App Router) + TypeScript** | Pages are server-rendered (SSR/SSG), so search engines get full HTML immediately — important for local searches like "CCTV installation Pakistan." TypeScript catches mistakes (wrong prop, typo'd field) at compile time instead of in production. |
| **Tailwind CSS** | Keeps spacing, color, and typography consistent across every page without hand-rolled CSS files drifting out of sync. |
| **Strapi CMS** for all editorial content and site config | Products/services/blog/testimonials/offices, company info, theme, portfolio, stats, and client logos are all Strapi content types — the whole site is admin-editable with no code change or redeploy needed (see §7). |
| **react-hook-form + Zod** | The one real interactive feature is the contact form. Zod defines the validation rules once client-side for instant feedback; corporate-portfolio-api re-validates with its own copy of the same schema server-side (never trust the client). |
| **Vitest** | Fast unit tests for the one piece of logic worth testing (form validation rules). |
| **Vercel** (recommended host) | Zero-config deploys for Next.js, free tier, automatic HTTPS, easy custom domain hookup later. |

## 3. Folder structure

```
app/
  layout.tsx          Root layout: <Header>, <Footer>, global metadata, JSON-LD
  page.tsx             Home page
  products/page.tsx     Products page (all categories + items)
  services/page.tsx     Services page
  about/page.tsx        About page
  contact/page.tsx       Contact page
  sitemap.ts            Generates /sitemap.xml
  robots.ts             Generates /robots.txt
components/
  ui/                  Generic building blocks: Button, Container, SectionHeading, Icon
  layout/               Header, Footer
  home/                 Homepage sections: Hero, ProductSpotlight, TrustTicker, ProductShowcase,
                        ServicesOverview, WhyChooseUs, LatestUpdates, TestimonialsPreview,
                        OfficesSection, CtaBanner
  products/             ProductCard, CategorySection
  services/             ServiceCard
  contact/              ContactForm (client component)
  layout/               (cont.) NewsletterForm (client component, used in Footer)
lib/
  cms.ts                 Strapi client + types (CompanyInfo, ThemeSettings, Product, ProductCategory,
                        Service, BlogPost, Testimonial, Office, PortfolioCategory, Stat, ClientLogo, ...)
                        — every fetcher falls back to safe placeholder data via withFallback() if the
                        CMS is unreachable, instead of throwing
  theme.ts               Derives the Strapi-picked color palette into CSS custom properties
  markdown.tsx            Small dependency-free renderer for the blog post richtext field
  validations/          Zod schemas (contact.ts, newsletter.ts) + tests
  env.ts                Single source of truth for env vars (SITE_CONFIG, API_CONFIG, CMS_CONFIG)
  endpoints.ts          Single source of truth for backend API route paths (ENDPOINTS)
  api-client.ts         Shared fetch client (apiClient) — base URL, headers, error handling in one place
  cn.ts                 Tiny classnames helper
docs/
  ARCHITECTURE.md        This file
```

## 4. Content model

Most editorial content now lives in **corporate-portfolio-cms** (a separate
Strapi 5 repo/deployment — see §7), not in this repo:

- **Products & product categories, services, blog posts, testimonials,
  offices, portfolio categories/projects, stats, client logos, Company Info,
  and theme settings** — fetched at request/build time via `lib/cms.ts`'s
  typed helpers (`getProductCategories`, `getServices`, `getBlogPosts`,
  `getBlogPost`, `getTestimonials`, `getOffices`, `getPortfolioCategories`,
  `getStats`, `getClientLogos`, `getCompanyInfo`, `getThemeSettings`). Edit
  any of these from the Strapi admin panel; no code change or redeploy
  needed. `lib/cms.ts` also defines the TS types (`Product`,
  `ProductCategory`, `Service`, `BlogPost`, `Testimonial`, `Office`,
  `PortfolioCategory`, `Stat`, `ClientLogo`, `CompanyInfo`, `ThemeSettings`)
  consumed across the app.

There is no `lib/data/` anymore — everything that used to be a static
TypeScript file (company info, portfolio, stats, client logos) has been
migrated into Strapi content types, following the same pattern as the rest
of the content model. The one exception, `training.ts`, was removed
entirely along with its homepage section (this business doesn't offer
certification/training).

### Why icons instead of photos

Product/service/testimonial/office photos are optional (`image`/`photo`
fields in Strapi, `undefined` until set). Rather than link to broken/
placeholder image files (which look unfinished to a visitor), everything
falls back to a Lucide icon in a colored badge, or `components/ui/ImageSlot.tsx`'s
dashed-border empty state, until a real photo is uploaded in the Strapi media
library. This is intentional and looks deliberate rather than "under
construction."

## 5. How to add content

**Add/edit a product, service, blog post, testimonial, or office:** use the
Strapi admin panel (corporate-portfolio-cms, §7) — Content Manager → pick
the type → create or edit an entry. Changes appear on the site within the
`fetch` revalidation window (60s) used by `lib/cms.ts`.

**Update contact info, store link, or socials:** edit the "Company Info"
single type in the Strapi admin. Every page (header, footer, contact page)
pulls from this one CMS entry via `getCompanyInfo()` in `lib/cms.ts`.

## 6. Running, building, deploying

```bash
npm install
cp .env.example .env.local   # fill in values, see below
npm run dev                  # http://localhost:3000
npm run lint                 # ESLint
npm run typecheck            # tsc --noEmit
npm run test                 # Vitest
npm run build                # production build
```

**Environment variables** (`.env.example` documents all of them):
- `NEXT_PUBLIC_SITE_URL` — used for SEO metadata, sitemap, robots.txt.
- `NEXT_PUBLIC_API_URL` — base URL of the corporate-portfolio-api backend.
- `STRAPI_URL` — base URL of the corporate-portfolio-cms Strapi instance.
- `STRAPI_API_TOKEN` — read-only Strapi API token (§7).

These are read in exactly one place, `lib/env.ts`, which groups them into
`SITE_CONFIG` (`SITE_CONFIG.URL`), `API_CONFIG` (`API_CONFIG.URL`), and
`CMS_CONFIG` (`CMS_CONFIG.URL`, `CMS_CONFIG.API_TOKEN`) — the
rest of the app imports these config objects instead of touching
`process.env` directly. Related env vars go in the same config object (e.g.
an SMTP config would be `SMTP_CONFIG = { HOST, PORT }`, not separate
`SMTP_HOST`/`SMTP_PORT` exports), so adding or renaming a var only means
editing that one file.

**Required in production, defaulted in dev:** `lib/env.ts` checks
`NODE_ENV`. In development (`npm run dev`), a missing var falls back to a
hardcoded `localhost` default so the app runs without a `.env.local`. When
`NODE_ENV=production` (`npm run build` / `npm start`, and on Vercel), a
missing var throws immediately instead of silently falling back — a
misconfigured deploy fails loudly rather than quietly pointing at
`localhost`, which would be a real security/correctness risk (SEO metadata,
CORS, and the contact form all derive from these URLs). Still copy
`.env.example` to `.env.local` for local dev so you're testing against the
real values, not the defaults.

**Deployment:** push to a GitHub repo and import it into
[Vercel](https://vercel.com/new) — it detects Next.js automatically. Set
`NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_API_URL` in the Vercel project
settings. Domain hookup (pointing the registered domain at Vercel) is a DNS
step done after the first deploy, from the Vercel project's "Domains" tab.

## 7. How the CMS works

Product/service/blog/testimonial/office content is fetched from
**corporate-portfolio-cms**, a separate Strapi 5 repo/deployment with its
own database (SQLite locally, Postgres/MySQL in production) — same
separate-repo-per-service pattern as the contact-form backend (§8).

- **`lib/cms.ts`** is the single client: typed helpers per content type
  (`getProductCategories`, `getServices`, `getBlogPosts`, `getBlogPost`,
  `getTestimonials`, `getOffices`), each wrapping a `fetch` to Strapi's REST
  API with the `STRAPI_API_TOKEN` bearer token and `next: { revalidate: 60 }`
  (ISR — content edited in Strapi appears within 60s, no redeploy). Components
  never call `fetch` against Strapi directly, same rule as `lib/api-client.ts`
  for the backend.
- **Server vs. client components:** most consumers are Server Components and
  call `await getX()` directly. A few are client components (`Header.tsx`,
  `ProductShowcase.tsx`, `ContactForm.tsx`) — those receive the fetched data
  as props from their nearest Server Component ancestor (`app/layout.tsx` for
  Header, `app/page.tsx` for ProductShowcase, `app/contact/page.tsx` for
  ContactForm) instead of fetching themselves, since Strapi calls must happen
  server-side.
- **Media:** `image`/`photo` fields are optional Strapi media relations.
  `lib/cms.ts`'s `mediaUrl()` helper turns Strapi's relative upload path into
  an absolute URL; when unset, components fall back to an icon badge or
  `components/ui/ImageSlot.tsx`'s empty state (see §4).
- **`STRAPI_URL`/`STRAPI_API_TOKEN`** — read via `CMS_CONFIG` in `lib/env.ts`,
  same required-in-production/dev-default pattern as every other env var
  here. The token is a **read-only** Strapi API token (Settings → API Tokens
  in the Strapi admin) — never use an admin or full-access token here.

## 8. How the contact form works

The contact form's server-side logic is **not in this repo** — it's a
separate deployment, [corporate-portfolio-api](../corporate-portfolio-api),
so the frontend and backend can be built, deployed, and scaled independently.

`components/contact/ContactForm.tsx` is a client component using
`react-hook-form` with `contactFormSchema` (from `lib/validations/contact.ts`,
a duplicate of the backend's copy — see below) for instant client-side
feedback. On submit, it calls `apiClient.post(ENDPOINTS.CONTACT, values)` —
`lib/api-client.ts` is the one place that owns the base URL, headers, and
error handling for every backend call, so components never call `fetch`
directly. This POSTs to the backend, which:

1. Re-validates the payload server-side with its own copy of the Zod schema
   (never trust client-side validation alone).
2. If `RESEND_API_KEY` is set, emails the submission via Resend, with the
   visitor's address set as `replyTo` so you can reply directly.
3. If the key isn't set, logs the submission to the server console instead of
   failing — lets the form work end-to-end before an email provider is wired
   up.

**Keeping the schema in sync:** `lib/validations/contact.ts` is intentionally
duplicated in both repos rather than shared via a package, since the two
repos deploy independently and a shared-package setup would be overkill for
one small schema. If you add a field to the form, update it in both places.

**CORS:** since the frontend and backend are different origins, the backend
sets CORS headers on every response (see its `lib/cors.ts`) and its
`ALLOWED_ORIGIN` env var must match this frontend's deployed origin.

**Adding a new backend route:** add its path to the `ENDPOINTS` object in
`lib/endpoints.ts`, and call it via `apiClient` (`lib/api-client.ts`) —
don't hardcode API paths or call `fetch` directly in components.

**Credentials in this repo:** the frontend holds one secret, `STRAPI_API_TOKEN`
(read-only, §7). The one external write-side connection — Resend, for sending
contact-form emails — lives entirely in corporate-portfolio-api's
`lib/resend.ts`, which already builds a single shared client instance instead
of constructing one per file. If this frontend ever needs its own external
service client (analytics SDK, etc.), follow the same pattern: one module
that constructs the client once and exports the instance, imported wherever
it's needed.

## 9. Future extension points

- **Real product/testimonial/office photos** — see §4 and §7. Upload in the
  Strapi media library; no code change needed.
- **A newsletter backend** — `NewsletterForm.tsx` posts to
  `ENDPOINTS.NEWSLETTER` (`/api/newsletter`), but corporate-portfolio-api
  currently only implements `/api/contact` — this endpoint doesn't exist yet.
  Add it there following the same pattern as the contact route (rate limit,
  honeypot, body-size guard) before this form goes live.
- **On-demand revalidation** — currently ISR (60s) per §7. A Strapi webhook
  calling a Next.js Route Handler that runs `revalidatePath`/`revalidateTag`
  would make edits appear instantly instead of within 60s.
- **Domain** — connect via Vercel's Domains tab once the site is live (see §6).
- **Linking the real online store** — update `storeUrl` on the "Company Info"
  single type in Strapi; every "Visit Our Store" / "Shop on our Store" link
  across the site reads from this single value.
- **Analytics** — add Vercel Analytics or a privacy-respecting alternative in
  `app/layout.tsx` once the domain is live, to see which product categories
  and services get the most interest.

## 10. Decision log

- **No database in this repo.** Content that needs a database now lives in
  corporate-portfolio-cms (Strapi, its own DB) instead — see §7. This repo
  itself still holds no DB connection or transactional data.
- **Strapi over Sanity/Contentful/Directus** — self-hostable (no per-seat or
  usage-based SaaS pricing), code-first content-type modeling fits a project
  with no pre-existing database, and it's Node/TypeScript like the rest of
  this stack.
- **Icons over placeholder photos** — see §4. A deliberate design choice, not
  a shortcut.
- **Resend over a full email service/CMS** — the contact form is the only
  server-side write in the app; a full backend would be overkill for one
  email per submission.
- **Frontend and backend split into separate repos** — the contact API
  (and any future backend work, e.g. auth/DB-backed features) lives in
  corporate-portfolio-api rather than as Next.js Route Handlers in this repo.
  Deliberate: keeps this repo's deploy (static-leaning marketing site) decoupled
  from backend infrastructure changes, and gives the backend its own
  versioning/deployment lifecycle. The trade-off is the duplicated Zod schema
  (see §8) and a CORS hop that a same-repo API route wouldn't need.
