<script lang="ts">
	import type { Edition } from '$lib/types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowRight, Calendar } from '@lucide/svelte';

	let { edition }: { edition: Edition } = $props();

	// Format the date for display
	const formattedDate = new Date(edition.published_at).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long'
	});
</script>

<Card.Root
	class="group relative flex h-full flex-col overflow-hidden border-primary/10 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl"
>
	<a href={`/editions/${edition.id}`} class="block overflow-hidden">
		<div class="aspect-[3/4] overflow-hidden">
			<img
				src={edition.cover_image_url || '/placeholder-cover.jpg'}
				alt={`Cover for ${edition.title}`}
				class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
			/>
		</div>

		<!-- Date Badge -->
		<div
			class="absolute top-4 right-4 z-10 flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-[10px] font-bold tracking-wider text-primary backdrop-blur-md transition-transform group-hover:scale-110"
		>
			<Calendar class="h-3 w-3" />
			{formattedDate.toUpperCase()}
		</div>
	</a>

	<Card.Header class="flex-grow pb-4">
		<Card.Title
			class="line-clamp-2 font-vt323 text-3xl leading-tight font-bold decoration-primary/30 decoration-2 transition-all group-hover:text-primary group-hover:underline"
		>
			{edition.title}
		</Card.Title>
		<Card.Description class="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
			{edition.description ||
				'Step into the latest stories and insights designed for the modern teen.'}
		</Card.Description>
	</Card.Header>

	<Card.Footer class="pt-0">
		<a href={`/editions/${edition.id}`} class="w-full">
			<Button
				variant="outline"
				class="group/btn flex w-full items-center justify-center gap-2 border-primary/20 bg-primary/5 py-2.5 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
			>
				READ NOW
				<ArrowRight class="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
			</Button>
		</a>
	</Card.Footer>
</Card.Root>
