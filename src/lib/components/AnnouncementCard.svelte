<script lang="ts">
	import type { AnnouncementWithCategory } from '$lib/types';
	import { getIconForCategory } from '$lib/category-icons';
	import { slide } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar, User2, ChevronRight, ChevronDown } from '@lucide/svelte';

	let { announcement }: { announcement: AnnouncementWithCategory } = $props();

	let isExpanded = $state(false);

	const categoryName = announcement.announcement_categories?.name ?? 'Announcement';
	const IconComponent = getIconForCategory(categoryName);

	const formattedDate = new Date(announcement.created_at).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<div
	class="group relative flex flex-col gap-8 rounded-2xl border border-primary/10 bg-background/50 p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-primary/30 hover:shadow-xl md:flex-row md:p-8"
>
	<!-- Image Section (Fixed Size for consistency) -->
	<div class="relative flex-shrink-0 md:w-1/3">
		<div class="aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted shadow-inner">
			<img
				src={announcement.image_url || '/announcement-default.png'}
				alt="Announcement visual"
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		</div>

		<!-- Category Badge -->
		<div
			class="absolute -top-3 -left-3 flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-[10px] font-bold tracking-widest text-primary-foreground shadow-lg"
		>
			<IconComponent class="h-3 w-3" />
			{categoryName.toUpperCase()}
		</div>
	</div>

	<div class="flex flex-grow flex-col">
		<div class="flex items-start justify-between">
			<h2
				class="font-vt323 text-3xl leading-tight font-bold tracking-tight text-foreground transition-colors group-hover:text-primary"
			>
				{announcement.title}
			</h2>
		</div>

		<div class="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-foreground">
			<div class="flex items-center gap-1.5">
				<Calendar class="h-3.5 w-3.5 text-primary" />
				<span>{formattedDate}</span>
			</div>

			{#if announcement.published_by}
				<div class="flex items-center gap-1.5">
					<User2 class="h-3.5 w-3.5 text-primary" />
					<span>{announcement.published_by}</span>
				</div>
			{/if}
		</div>

		<div class="relative mt-6 overflow-hidden">
			<div
				class="text-base leading-relaxed whitespace-pre-line text-muted-foreground transition-all duration-500"
				class:line-clamp-3={!isExpanded}
			>
				{#if isExpanded}
					<div transition:slide={{ duration: 300 }}>
						{announcement.message}
					</div>
				{:else}
					{announcement.message}
				{/if}
			</div>

			{#if !isExpanded}
				<div
					class="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-background/50 to-transparent transition-opacity duration-300 group-hover:from-background/80"
				></div>
			{/if}
		</div>

		<div class="mt-8 flex items-center justify-between border-t border-primary/5 pt-6">
			<Button
				variant="ghost"
				size="sm"
				class="group/btn gap-2 font-bold text-primary hover:bg-primary/5"
				onclick={() => (isExpanded = !isExpanded)}
			>
				{isExpanded ? 'Collapse' : 'Full Story'}
				{#if isExpanded}
					<ChevronDown class="h-4 w-4" />
				{:else}
					<ChevronRight class="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
				{/if}
			</Button>

			<div class="text-[10px] font-bold tracking-widest text-muted-foreground/50">
				ID: {announcement.id.slice(0, 8)}
			</div>
		</div>
	</div>
</div>
