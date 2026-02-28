<script lang="ts">
	import type { Edition } from '$lib/types';
	import EditionCard from '$lib/components/EditionCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, Sparkles } from '@lucide/svelte';

	let { editions }: { editions: Edition[] } = $props();
</script>

<section class="relative overflow-hidden py-20 md:py-28">
	<!-- Background Decorative Elements -->
	<div
		class="absolute top-0 left-1/2 -z-10 h-[500px] w-full -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]"
	></div>

	<div class="relative container mx-auto px-4">
		<div class="flex flex-col items-center text-center">
			<div
				class="mb-4 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase"
			>
				<Sparkles class="h-3.5 w-3.5" />
				Latest Curations
			</div>

			<h2
				class="bg-linear-to-b from-foreground to-foreground/70 bg-clip-text font-vt323 text-5xl font-bold tracking-tight text-transparent sm:text-7xl"
			>
				Our Editions
			</h2>

			<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground/80">
				Explore our collection of digital editions covering everything tech and entertainment to
				college prep and personal development.
			</p>
		</div>

		<div class="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#if editions}
				{#each editions as edition (edition.id)}
					<EditionCard {edition} />
				{/each}
			{/if}
		</div>

		<div class="mt-16 text-center">
			<a href="/editions">
				<Button
					variant="outline"
					class="group h-12 gap-2 border-primary/20 bg-background px-8 font-bold transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
				>
					View all editions
					<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</a>
		</div>
	</div>
</section>
