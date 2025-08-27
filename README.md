## Sanity v3 Blog — Next.js 13 App Router

Modern blog platform built with Next.js 13 (App Router) and Sanity v3. It features live preview, ISR, rich text rendering, category filtering, and a fully branded Sanity Studio at `/studio`.

### Why this project

- Demonstrates a production-ready CMS-driven blog with preview workflows
- Showcases modern Next.js patterns: App Router, server components, ISR, image optimization
- Highlights CMS customization: themed Studio, custom navbar, live iframe preview

---

## Features

- **CMS-driven content**: Sanity v3 schemas for `post`, `author`, `category`, `blockContent`
- **Next.js 13 App Router**: colocated routes, `generateStaticParams`, `revalidate`
- **Incremental Static Regeneration**: per-post regeneration (`revalidate = 60`)
- **Live Preview**: `/api/preview` toggles preview; real-time data via `next-sanity/preview`
- **Rich Text Rendering**: Portable Text with custom components (images, headings, lists, links)
- **Optimized Images**: `next/image` + Sanity Image CDN via `@sanity/image-url`
- **Themed Studio**: Custom theme, logo, and navbar; iframe content preview in Desk Tool
- **TypeScript-first**: Strongly-typed components and GROQ queries
- **Tailwind CSS**: Utility-first styling and responsive layout

---

## Tech Stack

- **Framework**: Next.js 13 (App Router), React 18
- **CMS**: Sanity v3, `next-sanity`, `@sanity/vision`, `@sanity/code-input`
- **Styling**: Tailwind CSS, `@tailwindcss/line-clamp`
- **Images**: `@sanity/image-url`, `next/image`
- **Icons**: `@heroicons/react`
- **Lang/Tooling**: TypeScript, PostCSS, Autoprefixer

---

## Skills Demonstrated

- **Content Modeling**: Author, Category, Post, and Portable Text blocks
- **Data Fetching**: GROQ queries with `next-sanity` client, server components
- **Rendering Strategies**: SSG/ISR for posts and lists; preview with client hooks
- **DX & Theming**: Custom Studio theme (`theme.ts`), nav (`StudioNavbar`), and logo
- **Performance**: Image optimization, CDN usage, and incremental revalidation
- **Routing**: App Router layouts, group routes, and dynamic segments

---

## Project Objectives

- Build a CMS-backed blog with a smooth editorial experience
- Implement live preview without rebuilding
- Keep runtime fast and accessible with modern Next.js features
- Provide clean, readable, and maintainable TypeScript code

---

## Architecture & Key Decisions

- **App Router**: Pages and layout under `app/`, not `pages/` (except legacy API routes)
- **ISR**: Configure `revalidate` for freshness without sacrificing performance
- **Preview**: `definePreview` from `next-sanity` for instant synced drafts in the UI
- **Portable Text**: Custom `RichTextComponents` for semantic, styled rich content
- **Studio Customization**: Branded theme, logo, and navbar; iframe preview inside Desk Tool

---

## Content Model (Sanity Schemas)

- `post`: title, description, slug, author, mainImage, categories[], publishedAt, body, exampleUsage (code)
- `author`: name, slug, image, bio (Portable Text)
- `category`: title, description
- `blockContent`: headings, lists, links, images

---

## Routes

- **User-facing**
  - `/` — Blog index with latest posts (`app/(user)/page.tsx`)
  - `/post/[slug]` — Post detail with Portable Text (`app/(user)/post/[slug]/page.tsx`)
- **Studio**
  - `/studio` — Sanity Studio (Next Studio wrapper at `app/(admin)/studio/[[...index]]/page.tsx`)
- **API**
  - `/api/preview` — Enables Next.js Preview Mode
  - `/api/exit-preview` — Disables Preview Mode

---

## Environment Variables

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-10-01
# Full origin (with protocol) for iframe preview inside Studio; e.g. https://your-app.vercel.app
NEXT_PUBLIC_VERCEL_URL=https://your-app.vercel.app
```

Notes:

- `NEXT_PUBLIC_*` variables are used by both the app and the Studio.
- The dataset must be readable publicly or via CORS rules for preview and client fetches.

---

## Getting Started

1. Install dependencies
   ```bash
   yarn
   # or npm install / pnpm install
   ```
2. Create a Sanity project and dataset (if you do not have one)
   ```bash
   npm create sanity@latest
   ```
   - Copy your `projectId` and `dataset` into `.env.local`.
3. Run the development server
   ```bash
   yarn dev
   ```
4. Open the app and Studio
   - App: `http://localhost:3000`
   - Studio: `http://localhost:3000/studio`

---

## Preview Mode

- Visit `http://localhost:3000/api/preview` to enable preview; `exit-preview` to disable.
- While preview is on, the blog index uses `usePreview` to stream draft content in real time.
- Production best practice: protect `/api/preview` with a secret and role checks.

---

## Deployment

- The app is optimized for deployment on Vercel.
- Ensure `NEXT_PUBLIC_VERCEL_URL` is set to your public site URL (with protocol) for Studio iframe preview.
- Configure `next.config.js` `images.domains` to include Sanity CDN (`cdn.sanity.io`).

---

## Project Structure

```text
app/
  (user)/layout.tsx         # Public site layout (Header, Banner)
  (user)/page.tsx           # Blog index
  (user)/post/[slug]/       # Post page + Portable Text components
  (admin)/studio/[[...index]]/page.tsx  # Embedded Sanity Studio
components/
  blog/                     # Blog UI components (List, Header, Banner)
  studio/                   # Studio customizations (Logo, Navbar)
lib/                        # Sanity client, preview hook, image URL builder
schemas/                    # Sanity v3 schema definitions
pages/api/                  # Preview API routes
```

---

## Available Scripts

- `yarn dev` — start Next.js in development
- `yarn build` — build for production
- `yarn start` — run production build

---

## License

MIT — feel free to use this as a starting point for your own projects.

---

## Contact

If you have questions or want to collaborate, reach out:

- Website: https://www.ymizrahi.com
- LinkedIn/GitHub: replace with your profiles if you fork this template
