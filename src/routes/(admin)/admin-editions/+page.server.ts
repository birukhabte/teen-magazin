import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals: { supabase, session } }) => {
		const formData = await request.formData();

		// --- 1. Get all form data ---
		// Now receiving paths (strings) instead of Files for the uploads
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const published_at = formData.get('published_at') as string;
		const coverImageName = formData.get('cover_image') as string;
		const editionFileName = formData.get('edition_file') as string;

		// --- Basic Validation ---
		if (!title || !published_at || !coverImageName || !editionFileName) {
			return fail(400, { error: 'All fields are required.' });
		}

		// --- 2. Get the public URL for the cover image ---
		// The file is already uploaded to the 'cover-images' bucket
		const { data: { publicUrl: cover_image_url } } = supabase.storage
			.from('cover-images')
			.getPublicUrl(coverImageName);

		// --- 3. Insert the metadata into the database ---
		const { error: dbError } = await supabase.from('editions').insert({
			title,
			description,
			published_at,
			cover_image_url: cover_image_url,
			file_url: editionFileName, // Path in the private bucket
			created_by: session?.user.id,
		});

		if (dbError) {
			console.error('Error inserting edition metadata:', dbError);
			// Clean up uploaded files on database error to prevent orphans
			await supabase.storage.from('cover-images').remove([coverImageName]);
			await supabase.storage.from('edition-files').remove([editionFileName]);
			return fail(500, { error: 'Could not save edition to the database.' });
		}

		return { success: true };
	},
};
