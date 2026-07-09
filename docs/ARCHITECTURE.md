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
two can be built, deployed, and scaled independently — see §7.

## 2. Stack and rationale

| Choice | Why |
|---|---|
| **Next.js 14 (App Router) + TypeScript** | Pages are server-rendered (SSR/SSG), so search engines get full HTML immediately — important for local searches like "CCTV installation Pakistan." TypeScript catches mistakes (wrong prop, typo'd field) at compile time instead of in production. |
| **Tailwind CSS** | Keeps spacing, color, and typography consistent across every page without hand-rolled CSS files drifting out of sync. |
| **Typed content files** (`lib/data/*.ts`) instead of a database | The catalog and services list are just content to display, not transactional data. Plain TypeScript objects are simpler to read, edit, and type-check than standing up a database for content that changes rarely. If the catalog grows large enough that non-developers need a UI to edit it, migrate these files to a headless CMS (see §7) — the page components wouldn't need to change, only the data-fetching layer. |
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
  data/                 Content: company.ts, products.ts, services.ts, blog.ts, testimonials.ts, offices.ts
  validations/          Zod schemas (contact.ts, newsletter.ts) + tests
  env.ts                Single source of truth for env vars (SITE_CONFIG, API_CONFIG)
  endpoints.ts          Single source of truth for backend API route paths (ENDPOINTS)
  api-client.ts         Shared fetch client (apiClient) — base URL, headers, error handling in one place
  cn.ts                 Tiny classnames helper
docs/
  ARCHITECTURE.md        This file
```

## 4. Content model

Everything a non-developer would want to change lives in `lib/data/`:

- **`company.ts`** — name, tagline, phone, email, address, WhatsApp number,
  store URL, social links. Every page reads from here, so updating contact
  info means editing one file.
- **`products.ts`** — an array of categories, each with a list of products.
  Each product/category has a `name`, `description`, and an `icon` (a key
  into `components/ui/Icon.tsx`'s icon map — see below).
- **`services.ts`** — an array of services, each with a `name`, `description`,
  a bullet list of `features`, and an `icon`.

### Why icons instead of photos

There are no product photos yet. Rather than link to broken/placeholder image
files (which look unfinished to a visitor), every product and category uses a
Lucide icon in a colored badge. This is intentional and looks deliberate
rather than "under construction."

**To switch to real photos later:** add an `image: string` field to the
`Product`/`ProductCategory` types in `lib/data/products.ts`, drop images in
`public/images/`, and swap the `<Icon>` usage in `ProductCard.tsx` and
`CategorySection.tsx` for a Next.js `<Image>`.

## 5. How to add content

**Add a product:** open `lib/data/products.ts`, find the right category's
`products` array, and add an object with `slug`, `name`, `description`, and
`icon` (pick any key from `components/ui/Icon.tsx`, or add a new one there
first if none fits — Lucide has hundreds of icons available).

**Add a whole category:** add a new object to the `productCategories` array
in the same file, following the shape of the existing ones. It automatically
appears on the homepage, the Products page, and the footer's category list.

**Add a service:** same idea, in `lib/data/services.ts`.

**Update contact info, store link, or socials:** edit `lib/data/company.ts`.
Every page (header, footer, contact page) pulls from this one file.

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

**Environment variables** (`.env.example` documents both):
- `NEXT_PUBLIC_SITE_URL` — used for SEO metadata, sitemap, robots.txt.
- `NEXT_PUBLIC_API_URL` — base URL of the corporate-portfolio-api backend.

Both are read in exactly one place, `lib/env.ts`, which groups them into
`SITE_CONFIG` (`SITE_CONFIG.URL`) and `API_CONFIG` (`API_CONFIG.URL`) — the
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

## 7. How the contact form works

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

**No database, no third-party SDK client in this repo:** this frontend
doesn't hold any credentials or open any external connections itself (see
§9). The one external connection — Resend, for sending contact-form
emails — lives entirely in corporate-portfolio-api's `lib/resend.ts`, which
already builds a single shared client instance instead of constructing one
per file. If this frontend ever needs its own external service client
(analytics SDK, etc.), follow the same pattern: one module that constructs
the client once and exports the instance, imported wherever it's needed.

## 8. Future extension points

- **Real product photos** — see §4.
- **CMS for content** — if editing `lib/data/*.ts` files directly becomes
  inconvenient for non-developers, migrate to a headless CMS (e.g. Sanity,
  Contentful) that exposes the same shape of data; only the fetching layer in
  each page needs to change, not the components.
- **Domain** — connect via Vercel's Domains tab once the site is live (see §6).
- **Linking the real online store** — update `storeUrl` in
  `lib/data/company.ts`; every "Visit Our Store" / "Shop on our Store" link
  across the site reads from this single value.
- **Analytics** — add Vercel Analytics or a privacy-respecting alternative in
  `app/layout.tsx` once the domain is live, to see which product categories
  and services get the most interest.

## 9. Decision log

- **No database.** The site is informational, not transactional — a database
  would add operational overhead (hosting, backups, migrations) for content
  that changes rarely and doesn't need to be queried dynamically.
- **SQLite/Postgres were considered and rejected** for the same reason — there
  is no transactional data to store.
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
  (see §7) and a CORS hop that a same-repo API route wouldn't need.
