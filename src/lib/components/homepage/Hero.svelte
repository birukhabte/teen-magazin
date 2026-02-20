<script lang="ts">
	import type { Edition } from '$lib/types';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowRight, Files, BanknoteX, BookOpen } from '@lucide/svelte';
	let { edition }: { edition: Edition | null } = $props();
</script>

<section class="relative overflow-hidden pt-20 pb-12 md:pt-32 md:pb-20 lg:pt-40 lg:pb-24">
	<!-- Decorative Background Elements -->
	<div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
		<div
			class="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]"
		></div>
		<div
			class="absolute top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-secondary/5 blur-[120px]"
		></div>
		<div
			class="absolute -bottom-[10%] left-[20%] h-[30%] w-[30%] rounded-full bg-primary/5 blur-[100px]"
		></div>
	</div>

	<div class="container mx-auto px-4">
		<div class="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
			<!-- Hero Content -->
			<div class="flex-1 text-center lg:text-left">
				{#if edition}
					<div
						class="mb-6 inline-flex items-center gap-x-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary"
					>
						<span class="relative flex h-2 w-2">
							<span
								class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"
							></span>
							<span class="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
						</span>

						<span>
							Latest Issue - {new Date(edition.published_at).toLocaleDateString('en-US', {
								month: 'long',
								year: 'numeric'
							})}
						</span>
					</div>
				{/if}

				<h1
					class="font-vt323 text-6xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl"
				>
					Teen Ethiopia
				</h1>
				<p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground lg:mx-0">
					Discover the latest trends, career advice, scholarship opportunities, and inspiring
					stories from teens that are making a difference in Ethiopia and beyond.
				</p>

				<ul
					class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start lg:gap-8"
				>
					<li class="flex items-center gap-2 text-muted-foreground">
						<div class="rounded-full bg-primary/10 p-1.5 text-primary">
							<Files strokeWidth={2} size={18} />
						</div>
						<span class="font-medium">Multiple editions</span>
					</li>
					<li class="flex items-center gap-2 text-muted-foreground">
						<div class="rounded-full bg-primary/10 p-1.5 text-primary">
							<BanknoteX strokeWidth={2} size={18} />
						</div>
						<span class="font-medium">Free access</span>
					</li>
				</ul>

				<div
					class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
				>
					<a href="/editions" class="w-full sm:w-auto">
						<Button size="lg" class="group w-full px-8 sm:w-auto">
							Explore Editions
							<ArrowRight class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Button>
					</a>
					<a href="/auth/login" class="w-full sm:w-auto">
						<Button size="lg" variant="outline" class="w-full px-8 sm:w-auto"
							>Join Our Community</Button
						>
					</a>
				</div>
			</div>

			<!-- Hero Image/Display -->
			<div class="flex flex-1 items-center justify-center lg:justify-end">
				{#if edition}
					<div class="group perspective-1000 relative max-w-md">
						<a
							href={`/editions/${edition.id}`}
							class="relative block overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-rotate-y-6"
						>
							<img
								src={edition.cover_image_url}
								alt="Cover of the latest issue"
								class="aspect-[3/4] h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
							/>

							<!-- Action Overlay -->
							<div
								class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100"
							>
								<div
									class="translate-y-4 rounded-full bg-white px-6 py-2.5 font-bold text-black transition-transform duration-300 group-hover:translate-y-0"
								>
									Read Latest Issue
								</div>
							</div>
						</a>

						<!-- Floating Badge -->
						<div
							class="absolute -top-4 -right-4 rounded-xl bg-primary px-4 py-2 font-vt323 text-xl text-primary-foreground shadow-lg transition-transform group-hover:-translate-y-2"
						>
							FREE
						</div>
					</div>
				{:else}
					<div
						class="mx-auto flex aspect-[3/4] h-auto w-full max-w-sm items-center justify-center rounded-2xl border-2 border-dashed border-muted bg-muted/30 text-muted-foreground shadow-inner"
					>
						<div class="text-center">
							<BookOpen class="mx-auto mb-2 h-8 w-8 opacity-20" />
							<p class="font-medium">No issues yet.</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	.perspective-1000 {
		perspective: 1000px;
	}

	:global(.hover\:-rotate-y-6:hover) {
		transform: rotateY(-6deg) scale(1.02);
	}
</style>
