<script lang="ts">
	import type { AnnouncementWithCategory } from '$lib/types';
	import AnnouncementCard from '$lib/components/AnnouncementCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, Bell } from '@lucide/svelte';

	let { announcements }: { announcements: AnnouncementWithCategory[] } = $props();
</script>

<section class="relative overflow-hidden py-20 md:py-28">
	<!-- Background Decorative Elements -->
	<div
		class="absolute right-1/2 bottom-0 -z-10 h-[500px] w-full translate-x-1/2 rounded-full bg-primary/5 blur-[120px]"
	></div>

	<div class="relative container mx-auto px-4">
		<div class="flex flex-col items-center text-center">
			<div
				class="mb-4 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase"
			>
				<Bell class="h-3.5 w-3.5" />
				Stay Informed
			</div>

			<h2
				class="bg-linear-to-b from-foreground to-foreground/70 bg-clip-text font-vt323 text-5xl font-bold tracking-tight text-transparent sm:text-7xl"
			>
				Latest Announcements
			</h2>

			<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground/80">
				Stay updated with scholarship opportunities, upcoming events, volunteer programs, and
				exciting meetings that can shape your future.
			</p>
		</div>

		<div class="mx-auto mt-20 max-w-4xl space-y-8">
			{#if announcements}
				{#each announcements as announcement (announcement.id)}
					<AnnouncementCard {announcement} />
				{/each}
			{/if}
		</div>

		<div class="mt-16 text-center">
			<a href="/announcements">
				<Button
					variant="outline"
					class="group h-12 gap-2 border-primary/20 bg-background px-8 font-bold transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
				>
					View all announcements
					<ArrowRight class="h-4 w-4 transition-transform group-hover:translate-x-1" />
				</Button>
			</a>
		</div>
	</div>
</section>
