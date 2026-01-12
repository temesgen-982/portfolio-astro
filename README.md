# Portfolio – Astro, Svelte & Tina CMS

A modern, high-performance developer portfolio built with [Astro](https://astro.build/), [Svelte](https://svelte.dev/), [Tina CMS](https://tina.io/), and [Tailwind CSS](https://tailwindcss.com/).

**Live Site:** [temesgen.vercel.app](https://temesgen.vercel.app)

## ✨ Features

- **Visual Content Editing** – Manage profile, work experience, education, projects, and blog posts via Tina CMS
- **Contact Form** – Server-side form handling with Astro Actions, Resend email API, Zod validation, and honeypot spam protection
- **Dark Mode** – Full dark/light theme support
- **SEO Optimized** – Auto-generated sitemap and robots.txt
- **Responsive Design** – Mobile-first layouts with modern CSS

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | [Astro 5](https://astro.build/) |
| **UI Library** | [Svelte 5](https://svelte.dev/) |
| **CMS** | [Tina CMS](https://tina.io/) (Visual Headless CMS) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Email** | [Resend](https://resend.com/) |
| **Validation** | [Zod](https://zod.dev/) |
| **Icons** | [Lucide](https://lucide.dev/) + [Iconify](https://iconify.design/) |
| **Deployment** | [Vercel](https://vercel.com/) |

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/temesgen-982/portfolio-astro.git
cd portfolio-astro
pnpm install
```

### 2. Environment Variables

Create a `.env` file in the root:

```bash
# Email Service (Required for contact form)
RESEND_API_KEY=your_resend_api_key

# Tina CMS (Required for cloud hosting)
NEXT_PUBLIC_TINA_CLIENT_ID=your_tina_client_id
TINA_TOKEN=your_tina_token
```

### 3. Development

```bash
pnpm run dev
```

- **Site:** http://localhost:4321
- **Tina Admin:** http://localhost:4321/admin/index.html

### 4. Build & Preview

```bash
pnpm run build
pnpm run preview
```

## 📁 Project Structure

```
├── public/                  # Static assets & Tina Admin output
├── src/
│   ├── actions/             # Astro server actions (contact form)
│   ├── assets/              # Images, SVGs
│   ├── components/          # Astro & Svelte components
│   ├── content/             # Markdown content (managed by Tina)
│   │   ├── profile/         # Personal info & bio
│   │   ├── work/            # Work experience entries
│   │   ├── education/       # Education entries
│   │   ├── projects/        # Portfolio projects
│   │   └── posts/           # Blog posts
│   ├── layouts/             # Page layouts
│   ├── lib/                 # Utilities (skills data, etc.)
│   ├── pages/               # Astro routes
│   └── styles/              # Global styles
├── tina/                    # Tina CMS configuration & schema
└── astro.config.mjs         # Astro configuration
```

## ✍️ Content Management

Edit content visually through Tina CMS:

1. Run `pnpm run dev`
2. Navigate to `/admin/index.html`
3. Edit your content – changes save directly to markdown files

### Content Collections

| Collection | Description |
|------------|-------------|
| **Profile** | Name, title, location, social links, bio |
| **Work** | Job title, company, dates, location, description |
| **Education** | Degree, school, dates, location |
| **Projects** | Title, description, screenshot, live/GitHub links, tags |
| **Posts** | Blog posts with rich text, hero image, tags |

## 🎨 Customization

- **Skills:** Edit `src/lib/skills.ts` to update skill categories and items
- **CMS Schema:** Modify `tina/config.ts` to add new fields or collections
- **Styling:** Update `src/styles/` or component-level styles
- **Theme Colors:** Configured in Tailwind (linen-white, dark-slate, brand-teal)

## ☁️ Deployment

Optimized for **Vercel** with the `@astrojs/vercel` adapter pre-configured.

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

## 📄 License

MIT
