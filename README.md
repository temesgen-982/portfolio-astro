# Portfolio – Astro & Svelte

A modern, fast, and fully customizable developer portfolio built with [Astro](https://astro.build/), [Svelte](https://svelte.dev/), and [Tailwind CSS](https://tailwindcss.com/).

## 🛠️ Technologies Used

- Astro
- Svelte
- Tailwind CSS
- TypeScript
- Octokit (GitHub API)
- Resend (email API)
- Zod (form validation)
- astro-icon, lucide-svelte (icons)

## 🚀 Getting Started

### Installation
```bash
git clone https://github.com/temesgen-982/portfolio-astro.git
cd portfolio-astro
pnpm install
```

### Environment Variables
Create a `.env` file in the root with the following (get your own API keys):

```
GITHUB_TOKEN=your_github_token
DEV_TO_API_KEY=your_devto_api_key
DEV_TO_USERNAME=your_devto_username
RESEND_API_KEY=your_resend_api_key
```

### Development
```bash
pnpm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 📁 Project Structure

```
/
├── public/                # Static assets
├── src/
│   ├── assets/            # Images, SVGs
│   ├── components/        # Astro & Svelte components
│   ├── content/           # Content collections (work, education)
│   ├── layouts/           # Layout components
│   ├── lib/               # Utility libraries (GitHub, posts, skills)
│   ├── pages/             # Astro pages (index, blog, projects, contact)
│   └── styles/            # Global CSS (Tailwind)
├── package.json
└── astro.config.mjs
```

## 📝 Customization

- **Add work experience:** Add markdown files to `src/content/work/`.
- **Add education:** Add markdown files to `src/content/education/`.
- **Update skills:** Edit `src/lib/skills.ts`.
- **Update social links:** Edit `src/components/Hero.astro` and `Footer.astro`.

## ☁️ Deployment

This project is ready to deploy on platforms like **Vercel** or **Netlify**.
