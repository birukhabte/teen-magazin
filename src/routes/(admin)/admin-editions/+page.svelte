<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';

	let { data, form } = $props();
	let { supabase } = $derived(data);

	let isLoading = $state(false);
	let uploadError = $state<string | null>(null);

	const handleSubmit = async ({ formData, cancel }: { formData: FormData; cancel: () => void }) => {
		isLoading = true;
		uploadError = null;

		const coverImageFile = formData.get('cover_image') as File;
		const editionFile = formData.get('edition_file') as File;

		if (!coverImageFile || coverImageFile.size === 0 || !editionFile || editionFile.size === 0) {
			uploadError = 'Please select valid files.';
			isLoading = false;
			cancel();
			return;
		}

		try {
			// 1. Upload Cover Image
			const coverImageName = `${crypto.randomUUID()}-${coverImageFile.name}`;
			const { error: coverError } = await supabase.storage
				.from('cover-images')
				.upload(coverImageName, coverImageFile);

			if (coverError) throw new Error(`Cover upload failed: ${coverError.message}`);

			// 2. Upload Edition File
			const editionFileName = `${crypto.randomUUID()}-${editionFile.name}`;
			const { error: editionError } = await supabase.storage
				.from('edition-files')
				.upload(editionFileName, editionFile);

			if (editionError) {
				// Cleanup cover image if edition fails
				await supabase.storage.from('cover-images').remove([coverImageName]);
				throw new Error(`Edition upload failed: ${editionError.message}`);
			}

			// 3. Replace files with paths in formData
			formData.set('cover_image', coverImageName);
			formData.set('edition_file', editionFileName);
		} catch (err: any) {
			console.error('Upload error:', err);
			uploadError = err.message || 'An unexpected error occurred during upload.';
			isLoading = false;
			cancel();
		}

		return async ({ update }: { update: () => Promise<void> }) => {
			await update();
			isLoading = false;
		};
	};
</script>

<div class="mx-auto w-full max-w-2xl">
	<h1 class="mb-8 text-2xl font-bold">Upload New Edition</h1>

	{#if form?.success}
		<div class="mb-6 rounded-md border border-green-200 bg-green-100 p-4 text-green-800">
			Edition added successfully! You can view it <a href="/editions" class="underline">here</a>.
		</div>
	{:else if form?.error || uploadError}
		<div class="mb-6 rounded-md border border-red-200 bg-red-100 p-4 text-red-800">
			<strong>Error:</strong>
			{form?.error || uploadError}
		</div>
	{/if}

	<form method="POST" enctype="multipart/form-data" use:enhance={handleSubmit}>
		<div class="grid gap-6">
			<div class="grid gap-2">
				<Label for="title">Title</Label>
				<Input type="text" name="title" id="title" required />
			</div>
			<div class="grid gap-2">
				<Label for="description">Description</Label>
				<Textarea name="description" id="description" placeholder="A brief summary..." />
			</div>
			<div class="grid gap-2">
				<Label for="published_at">Publication Date</Label>
				<Input type="date" name="published_at" id="published_at" required />
			</div>

			<div class="grid gap-2">
				<Label for="cover_image">Cover Image (JPG, PNG)</Label>
				<Input
					type="file"
					name="cover_image"
					id="cover_image"
					required
					accept="image/jpeg,image/png"
				/>
			</div>
			<div class="grid gap-2">
				<Label for="edition_file">Edition File (PDF)</Label>
				<Input
					type="file"
					name="edition_file"
					id="edition_file"
					required
					accept="application/pdf"
				/>
			</div>

			<Button type="submit" disabled={isLoading} class="w-full">
				{#if isLoading}
					Uploading...
				{:else}
					Add Edition
				{/if}
			</Button>
		</div>
	</form>
</div>
