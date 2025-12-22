# Portfolio – Astro, Svelte & Tina CMS

A modern, high-performance developer portfolio built with [Astro](https://astro.build/), [Svelte](https://svelte.dev/), [Tina CMS](https://tina.io/), and [Tailwind CSS](https://tailwindcss.com/). Managed by a powerful visual editor.

## 🛠️ Technologies Used

- **Framework:** [Astro 5](https://astro.build/)
- **UI library:** [Svelte 5](https://svelte.dev/)
- **CMS:** [Tina CMS](https://tina.io/) (Visual Headless CMS)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Integrations:**
  - `octokit` (GitHub API)
  - `resend` (Email API)
  - `zod` (Validation)
  - `lucide-svelte` & `astro-icon` (Iconography)

## 🚀 Getting Started

### 1. Installation

```bash
git clone https://github.com/temesgen-982/portfolio-astro.git
cd portfolio-astro
pnpm install
```

### 2. Environment Variables

Create a `.env` file in the root and add your API keys:

```bash
# GitHub & Dev.to (Optional)
GITHUB_TOKEN=your_github_token
DEV_TO_API_KEY=your_devto_api_key
DEV_TO_USERNAME=your_devto_username

# Email Service
RESEND_API_KEY=your_resend_api_key

# Tina CMS (For Cloud hosting)
NEXT_PUBLIC_TINA_CLIENT_ID=your_tina_client_id
TINA_TOKEN=your_tina_token
```

### 3. Development

Run the development server which starts both Astro and the Tina CMS local visual editor:

```bash
pnpm run dev
```

- Local Site: `http://localhost:4321`
- **Tina Admin:** `http://localhost:4321/admin/index.html`

### 4. Build & Preview

```bash
pnpm run build
pnpm run preview
```

## ✍️ Content Management (Tina CMS)

This portfolio uses **Tina CMS** for seamless content management. You can edit your profile, work experience, projects, and blog posts directly through a visual interface.

1. Run the project locally (`pnpm run dev`).
2. Navigate to `/admin/index.html`.
3. Log in (for local dev, no login is usually required).
4. Start editing your content visually!

## 📁 Project Structure

```text
/
├── public/                # Static assets & Tina Admin output
├── src/
│   ├── assets/            # Images, SVGs
│   ├── components/        # Svelte & Astro components
│   ├── content/           # Markdown collections managed by Tina
│   ├── layouts/           # Page layouts
│   ├── lib/               # Utilities & logic
│   └── pages/             # Astro routes
├── tina/                  # Tina CMS configuration & schema
├── astro.config.mjs       # Astro configuration
└── package.json           # Dependencies & scripts
```

## 📝 Customization

While most content is managed through **Tina CMS**, you can still customize the underlying logic:

- **CMS Schema:** Modify `tina/config.ts` to add new fields or collections.
- **Styling:** Update `src/styles/` or individual component styles.
- **Logic:** Adjust data fetching in `src/lib/`.

## ☁️ Deployment

This project is ready to deploy on platforms like **Vercel** or **Netlify**.
