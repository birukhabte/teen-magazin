<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Users, BookOpen, Megaphone, Plus, ArrowRight } from '@lucide/svelte';

	let { data } = $props();

	const stats = [
		{
			label: 'Total Users',
			value: data.stats.users,
			icon: Users,
			color: 'text-blue-500',
			href: '/admin-users'
		},
		{
			label: 'Total Editions',
			value: data.stats.editions,
			icon: BookOpen,
			color: 'text-green-500',
			href: '/admin-editions'
		},
		{
			label: 'Announcements',
			value: data.stats.announcements,
			icon: Megaphone,
			color: 'text-orange-500',
			href: '/admin-announcements'
		}
	];
</script>

<div class="flex flex-col gap-8">
	<div>
		<h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
		<p class="text-muted-foreground">Overview of your magazine's performance and management.</p>
	</div>

	<!-- Stats Grid -->
	<div class="grid gap-4 md:grid-cols-3">
		{#each stats as stat}
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between pb-2">
					<Card.Title class="text-sm font-medium">{stat.label}</Card.Title>
					<stat.icon class="h-4 w-4 {stat.color}" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{stat.value}</div>
					<a
						href={stat.href}
						class="mt-2 flex items-center text-xs text-muted-foreground hover:underline"
					>
						View details <ArrowRight class="ml-1 h-3 w-3" />
					</a>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>

	<div class="grid gap-8 lg:grid-cols-2">
		<!-- Quick Actions -->
		<Card.Root>
			<Card.Header>
				<Card.Title>Quick Actions</Card.Title>
				<Card.Description>Common management tasks you can perform.</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4 sm:grid-cols-2">
				<Button variant="outline" class="h-20 flex-col gap-2" href="/admin-editions">
					<Plus class="h-5 w-5" />
					Public New Edition
				</Button>
				<Button variant="outline" class="h-20 flex-col gap-2" href="/admin-announcements">
					<Megaphone class="h-5 w-5" />
					Post Announcement
				</Button>
				<Button variant="outline" class="h-20 flex-col gap-2" href="/admin-users">
					<Users class="h-5 w-5" />
					Manage Users
				</Button>
				<Button variant="outline" class="h-20 flex-col gap-2" href="/">
					<ArrowRight class="h-5 w-5" />
					View Public Site
				</Button>
			</Card.Content>
		</Card.Root>

		<!-- Recent Announcements -->
		<Card.Root>
			<Card.Header>
				<Card.Title>Recent Announcements</Card.Title>
				<Card.Description>The latest updates shared with users.</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="space-y-4">
					{#each data.recentAnnouncements as announcement}
						<div class="flex items-center gap-4">
							<div class="flex-1 space-y-1">
								<p class="text-sm leading-none font-medium">{announcement.title}</p>
								<p class="text-xs text-muted-foreground">
									{new Date(announcement.created_at).toLocaleDateString()}
								</p>
							</div>
							<div class="flex items-center gap-2">
								<span
									class="rounded-full px-2 py-0.5 text-[10px] font-semibold {announcement.is_active
										? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
										: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'}"
								>
									{announcement.is_active ? 'Active' : 'Inactive'}
								</span>
							</div>
						</div>
					{:else}
						<p class="text-sm text-muted-foreground">No recent announcements found.</p>
					{/each}
				</div>
				<Button variant="link" class="mt-4 h-auto p-0" href="/admin-announcements">
					View all announcements <ArrowRight class="ml-1 h-3 w-3" />
				</Button>
			</Card.Content>
		</Card.Root>
	</div>

	<!-- Recent Editions -->
	<Card.Root>
		<Card.Header>
			<Card.Title>Recent Editions</Card.Title>
			<Card.Description>Latest magazine issues published.</Card.Description>
		</Card.Header>
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Title</Table.Head>
						<Table.Head>Published At</Table.Head>
						<Table.Head class="text-right">Action</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each data.recentEditions as edition}
						<Table.Row>
							<Table.Cell class="font-medium">{edition.title}</Table.Cell>
							<Table.Cell>{new Date(edition.published_at).toLocaleDateString()}</Table.Cell>
							<Table.Cell class="text-right">
								<Button variant="ghost" size="sm" href="/admin-editions">Manage</Button>
							</Table.Cell>
						</Table.Row>
					{:else}
						<Table.Row>
							<Table.Cell colspan={3} class="h-24 text-center text-muted-foreground">
								No editions found.
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>
