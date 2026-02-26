# 📖 Teen Magazine

A modern, high-performance digital magazine platform built for the next generation. Featuring interactive editions, real-time announcements, and a premium administrative suite.

## ✨ Features

- **Digital Editions**: High-fidelity digital magazine browser with interactive flipbook capabilities.
- **Live Announcements**: Real-time updates on scholarships, events, and opportunities.
- **Premium UI/UX**: State-of-the-art design across all pages, utilizing glassmorphism, gradient aesthetics, and responsive layouts.
- **Admin Dashboard**: Comprehensive management system for users, magazine editions, and announcements.
- **Secure Authentication**: Robust user authentication and role-based access control powered by Supabase.

## 🚀 Tech Stack

- **Framework**: [Svelte 5](https://svelte.dev/) & [SvelteKit](https://kit.svelte.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Backend/Auth**: [Supabase](https://supabase.com/)
- **UI Components**: [shadcn-svelte](https://shadcn-svelte.com/)
- **Icons**: [Lucide Svelte](https://lucide.dev/)
- **Typography**: VT323 & Inter

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18+)
- pnpm (recommended) or npm
- **Docker** (required for local Supabase development)

### Installation

1. Clone the repository:
   ```sh
  https://github.com/birukhabte/teen-magazin.git
   ```

2. Install dependencies:
   ```sh
   pnpm install
   ```

3. Configure environment variables:
   Create a `.env` file based on `.env.example`:
   ```sh
   cp .env.example .env
   ```

### 🗄️ Supabase Local Development

This project uses Supabase for authentication and database management. To set up the local environment:

1. Ensure Docker is running.
2. Initialize and start the Supabase containers:
   ```sh
   pnpm dlx supabase start
   ```
3. Once started, the local Supabase dashboard and API will be available. The terminal output will provide your local `SUPABASE_URL` and `SUPABASE_ANON_KEY`, which you should add to your `.env` file.

4. To stop the local environment:
   ```sh
   pnpm dlx supabase stop
   ```

### 🏃 Running the App

Start the development server:
```sh
pnpm run dev
```

## 🏗️ Building for Production

To create an optimized production build:

```sh
pnpm run build
```

Preview the production build:

```sh
pnpm run preview
```
