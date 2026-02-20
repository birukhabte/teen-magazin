<script lang="ts">
	import AnnouncementCard from '$lib/components/AnnouncementCard.svelte';
	import { Megaphone } from '@lucide/svelte';

	let { data } = $props();
</script>

<div class="relative min-h-screen overflow-hidden py-20 md:py-32">
	<!-- Decorative Background Elements -->
	<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<div
			class="absolute -bottom-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-secondary/10 blur-[120px]"
		></div>
		<div
			class="absolute top-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-[120px]"
		></div>
	</div>

	<div class="container mx-auto px-4">
		<div class="mb-16 text-center">
			<h1 class="font-vt323 text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
				Announcements
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
				Stay updated with the latest news, events, and community alerts from the Teen Ethiopia
				editorial team.
			</p>
		</div>

		{#if data.announcements.length > 0}
			<div class="mx-auto max-w-4xl space-y-10">
				{#each data.announcements as announcement (announcement.id)}
					<AnnouncementCard {announcement} />
				{/each}
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center py-20 text-center">
				<div class="mb-6 rounded-2xl bg-muted/50 p-6 text-muted-foreground/30">
					<Megaphone class="h-16 w-16" />
				</div>
				<h2 class="text-2xl font-bold">No announcements yet</h2>
				<p class="mt-2 max-w-sm text-muted-foreground">
					We don't have any announcements at the moment. Keep an eye on this space for updates!
				</p>
			</div>
		{/if}
	</div>
</div>
