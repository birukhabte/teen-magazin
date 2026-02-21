/**
 * Vite Configuration
 * 
 * This file configures the Vite build tool.
 * It includes plugins for Tailwind CSS and SvelteKit integration.
 */
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});
