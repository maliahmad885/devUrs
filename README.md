# DevUrs — Ali Ahmad

Personal portfolio for Ali Ahmad, Full-Stack Developer & Automation Expert
(Ruby on Rails, React / Next.js, Node.js, n8n / Make / Zapier, LangChain).

Live site: https://devurs.com

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS 3, Framer Motion
- React Three Fiber for the decorative 3D background (desktop only)
- Nodemailer (Gmail) for the contact / consultation forms
- Vercel Analytics + Speed Insights (loaded only after the visitor accepts in the banner)

## Local development

```bash
npm install
cp .env.local.example .env.local   # then fill in the values below
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable     | Required | Purpose                                                      |
| ------------ | -------- | ------------------------------------------------------------ |
| `EMAIL_USER` | yes      | Gmail address used to send form submissions                  |
| `EMAIL_PASS` | yes      | Gmail **App Password** for that account (not the login pass) |
| `EMAIL_TO`   | no       | Where submissions are delivered. Defaults to `EMAIL_USER`.   |
| `SITE_URL`   | no       | Overrides the sitemap base URL. Defaults to `https://devurs.com`. |

### Scripts

| Command              | What it does                                        |
| -------------------- | --------------------------------------------------- |
| `npm run dev`        | Dev server with Turbopack                           |
| `npm run build`      | Production build, then regenerates sitemap/robots   |
| `npm run start`      | Serve the production build                          |
| `npm run lint`       | ESLint                                              |
| `npm run type-check` | TypeScript without emitting                         |
| `npm run analyze`    | Bundle analyzer                                     |

## Project layout

```
src/
  app/
    page.tsx                 # Home page (all sections)
    layout.tsx               # Metadata, fonts, analytics, JSON-LD
    opengraph-image.tsx      # Generated social preview image
    privacy/ terms/          # Legal pages
    api/send-wizard-email/   # Contact + wizard submissions (validated, rate limited)
  components/                # Page sections and UI pieces
  lib/
    site.ts                  # Site-wide constants (URL, email, stats, years)
    consent.ts               # Analytics consent helpers
```

Site-wide copy such as the contact email, domain, and headline numbers lives in
`src/lib/site.ts`. Change it there and every page updates.

## Deployment

- **Vercel** (recommended): import the repo, set the environment variables, deploy.
- **Docker**: `docker build -t devurs .` then
  `docker run -p 3000:3000 -e EMAIL_USER=... -e EMAIL_PASS=... devurs`.
