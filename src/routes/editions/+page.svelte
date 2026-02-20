<script lang="ts">
	import EditionCard from '$lib/components/EditionCard.svelte';
	import { BookOpen } from '@lucide/svelte';

	let { data } = $props();
</script>

<div class="relative min-h-screen overflow-hidden py-20 md:py-32">
	<!-- Decorative Background Elements -->
	<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<div
			class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]"
		></div>
		<div
			class="absolute top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-secondary/5 blur-[120px]"
		></div>
	</div>

	<div class="container mx-auto px-4">
		<div class="mb-16 text-center">
			<h1 class="font-vt323 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
				The Archive
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
				Explore our complete collection of digital editions. Each issue is a curated journey through
				inspiring stories, career roadmaps, and global opportunities.
			</p>
		</div>

		{#if data.editions && data.editions.length > 0}
			<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each data.editions as edition (edition.id)}
					<EditionCard {edition} />
				{/each}
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center py-20 text-center">
				<div class="mb-6 rounded-2xl bg-muted/50 p-6 text-muted-foreground/30">
					<BookOpen class="h-16 w-16" />
				</div>
				<h2 class="text-2xl font-bold">No editions found</h2>
				<p class="mt-2 max-w-sm text-muted-foreground">
					The archive is currently empty. Our editorial team is working on the next masterpiece!
				</p>
			</div>
		{/if}
	</div>
</div>
