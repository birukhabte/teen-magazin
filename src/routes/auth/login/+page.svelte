<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { ArrowLeft, Sparkles } from '@lucide/svelte';
</script>

<div
	class="relative flex min-h-screen w-full items-start justify-center overflow-hidden px-4 py-12 md:py-36"
>
	<!-- Decorative Background -->
	<div class="pointer-events-none absolute inset-0 -z-10">
		<div
			class="absolute -top-[10%] -left-[10%] h-[60%] w-[60%] rounded-full bg-primary/10 blur-[120px]"
		></div>
		<div
			class="absolute -right-[10%] -bottom-[10%] h-[60%] w-[60%] rounded-full bg-secondary/10 blur-[120px]"
		></div>
		<div
			class="absolute top-1/2 left-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]"
		></div>
	</div>

	<div class="fixed top-8 left-8">
		<a
			href="/"
			class="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
		>
			<ArrowLeft class="h-4 w-4" />
			Back to home
		</a>
	</div>

	<div class="w-full max-w-[400px] space-y-8">
		<!-- Branding -->
		<div class="text-center">
			<div
				class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/20"
			>
				<Sparkles class="h-6 w-6" />
			</div>
			<h1 class="font-vt323 text-5xl font-bold tracking-tight text-foreground">Teen Ethiopia</h1>
			<p class="mt-2 text-muted-foreground italic">Your voice, your community, your magazine.</p>
		</div>

		<!-- Login Card -->
		<Card.Root
			class="overflow-hidden border-primary/10 bg-background/60 shadow-2xl backdrop-blur-xl"
		>
			<Card.Header class="space-y-1 pb-6 text-center">
				<Card.Title class="text-2xl font-bold tracking-tight">Welcome back</Card.Title>
				<Card.Description>Use your Google account to continue.</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-6">
				<Button
					href="/auth/login/google"
					variant="outline"
					class="relative h-12 w-full overflow-hidden border-primary/20 bg-background/40 transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
				>
					<div class="flex items-center justify-center gap-3">
						<svg class="h-5 w-5" viewBox="0 0 24 24">
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.07-3.71 1.07-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-5.38z"
								fill="#EA4335"
							/>
						</svg>
						<span class="font-semibold">Login with Google</span>
					</div>
				</Button>

				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<span class="w-full border-t border-primary/10"></span>
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-transparent px-2 text-muted-foreground backdrop-blur-sm"
							>Secure Authentication</span
						>
					</div>
				</div>
			</Card.Content>
			<Card.Footer
				class="flex flex-col gap-4 border-t border-primary/10 bg-primary/5 py-4 text-center text-xs text-muted-foreground"
			>
				<p>
					By continuing, you agree to our <a href="/terms" class="underline hover:text-primary"
						>Terms of Service</a
					>
					and <a href="/privacy" class="underline hover:text-primary">Privacy Policy</a>.
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
