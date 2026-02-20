<script lang="ts">
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import MenuIcon from '@lucide/svelte/icons/menu';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Profile } from '$lib/types.js';

	let { session, profile }: { session: any; profile: Profile | null } = $props();
	const isAdmin = $derived(profile?.role === 'admin');
</script>

<header
	class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
>
	<div class="container mx-auto flex h-16 items-center justify-between px-4">
		<!-- Logo -->
		<a href="/" class="flex items-center space-x-2">
			<img src="/brand-logo.png" alt="brand-logo" class="w-[80px] md:w-[100px]" />
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden md:flex md:flex-grow md:items-center md:justify-end md:gap-4">
			<NavigationMenu.Root viewport={false}>
				<NavigationMenu.List class="gap-4">
					<NavigationMenu.Item>
						<NavigationMenu.Link href="/editions">Editions</NavigationMenu.Link>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Link href="/announcements">Announcements</NavigationMenu.Link>
					</NavigationMenu.Item>

					{#if session?.user}
						<NavigationMenu.Item>
							<NavigationMenu.Trigger>
								<Avatar.Root class="h-8 w-8">
									<Avatar.Image src={session.user.user_metadata.avatar_url} alt="user avatar" />
									<Avatar.Fallback>{session.user.email?.slice(0, 1).toUpperCase()}</Avatar.Fallback>
								</Avatar.Root>
								<span class="ml-2 hidden lg:inline-block">{session.user.user_metadata.name}</span>
							</NavigationMenu.Trigger>
							<NavigationMenu.Content>
								<ul class="grid min-w-[150px] gap-1 p-2">
									{#if isAdmin}
										<li>
											<NavigationMenu.Link href="/admin-dashboard"
												>Admin Dashboard</NavigationMenu.Link
											>
										</li>
									{:else}
										<li>
											<NavigationMenu.Link href="/account">My Account</NavigationMenu.Link>
										</li>
									{/if}
									<li>
										<NavigationMenu.Link href="/auth/logout">Logout</NavigationMenu.Link>
									</li>
								</ul>
							</NavigationMenu.Content>
						</NavigationMenu.Item>
					{:else}
						<NavigationMenu.Item>
							<a href="/auth/login" class="ml-2">
								<Button variant="default" size="sm">Login</Button>
							</a>
						</NavigationMenu.Item>
					{/if}
				</NavigationMenu.List>
			</NavigationMenu.Root>

			<!-- Theme Toggler (Desktop) -->
			<Button onclick={toggleMode} variant="ghost" size="icon">
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>

		<!-- Mobile Navigation -->
		<div class="flex items-center gap-2 md:hidden">
			<Button onclick={toggleMode} variant="ghost" size="icon">
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>

			<Sheet.Root>
				<Sheet.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="ghost" size="icon">
							<MenuIcon class="h-6 w-6" />
							<span class="sr-only">Toggle menu</span>
						</Button>
					{/snippet}
				</Sheet.Trigger>
				<Sheet.Content side="right" class="w-[300px] sm:w-[400px]">
					<nav class="flex flex-col gap-4 px-4 py-8">
						<a href="/" class="mb-4">
							<img src="/brand-logo.png" alt="brand-logo" class="w-[100px]" />
						</a>
						<a href="/editions" class="text-lg font-semibold hover:underline">Editions</a>
						<a href="/announcements" class="text-lg font-semibold hover:underline">Announcements</a>
						<hr class="my-2" />
						{#if session?.user}
							<div class="flex items-center gap-3 py-2">
								<Avatar.Root class="h-10 w-10">
									<Avatar.Image src={session.user.user_metadata.avatar_url} alt="user avatar" />
									<Avatar.Fallback>{session.user.email?.slice(0, 1).toUpperCase()}</Avatar.Fallback>
								</Avatar.Root>
								<div class="flex flex-col">
									<span class="font-bold">{session.user.user_metadata.name}</span>
									<span class="text-sm text-muted-foreground">{session.user.email}</span>
								</div>
							</div>
							{#if isAdmin}
								<a href="/admin-dashboard" class="text-lg hover:underline">Admin Dashboard</a>
							{:else}
								<a href="/account" class="text-lg hover:underline">My Account</a>
							{/if}
							<a href="/auth/logout" class="text-lg text-destructive hover:underline">Logout</a>
						{:else}
							<a href="/auth/login" class="text-lg font-semibold hover:underline">Login</a>
						{/if}
					</nav>
				</Sheet.Content>
			</Sheet.Root>
		</div>
	</div>
</header>
