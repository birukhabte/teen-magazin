<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Menu } from '@lucide/svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const navItems = [
		{ href: '/admin-dashboard', label: 'Dashboard' },
		{ href: '/admin-editions', label: 'Editions' },
		{ href: '/admin-announcements', label: 'Announcements' },
		{ href: '/admin-users', label: 'Users' }
	];

	function isActive(href: string) {
		return page.url.pathname === href;
	}
</script>

<div class="flex flex-col md:flex-row">
	<!-- Mobile Header -->
	<header class="flex items-center justify-between border-b px-6 py-4 md:hidden">
		<h2 class="text-xl font-bold">Admin Panel</h2>
		<Sheet.Root>
			<Sheet.Trigger>
				<Button variant="outline" size="icon" class="md:hidden">
					<Menu class="h-6 w-6" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left" class="w-[280px] sm:w-[350px]">
				<Sheet.Header class="text-left">
					<Sheet.Title>Admin Panel</Sheet.Title>
				</Sheet.Header>
				<nav class="mt-8 flex flex-col gap-4">
					{#each navItems as item}
						<a
							href={item.href}
							class="rounded-md px-4 py-2 text-lg transition-colors hover:bg-muted {isActive(
								item.href
							)
								? 'bg-muted font-semibold'
								: ''}"
						>
							{item.label}
						</a>
					{/each}
				</nav>
			</Sheet.Content>
		</Sheet.Root>
	</header>

	<!-- Desktop Sidebar -->
	<aside class="hidden min-h-screen w-64 border-r p-8 md:block lg:w-72">
		<h2 class="mb-8 text-2xl font-bold">Admin Panel</h2>
		<nav class="flex flex-col gap-2">
			{#each navItems as item}
				<a
					href={item.href}
					class="rounded-md px-3 py-2 transition-colors hover:bg-muted {isActive(item.href)
						? 'bg-muted font-semibold'
						: ''}"
				>
					{item.label}
				</a>
			{/each}
		</nav>
	</aside>

	<main class="flex-1 p-4 md:p-8 lg:p-12">
		{@render children()}
	</main>
</div>
