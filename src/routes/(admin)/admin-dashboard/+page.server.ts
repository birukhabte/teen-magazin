import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    // Fetch total counts
    const [
        { count: editionsCount },
        { count: usersCount },
        { count: announcementsCount },
        { data: recentEditions },
        { data: recentAnnouncements }
    ] = await Promise.all([
        supabase.from('editions').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('announcements').select('*', { count: 'exact', head: true }),
        supabase
            .from('editions')
            .select('id, title, published_at')
            .order('published_at', { ascending: false })
            .limit(5),
        supabase
            .from('announcements')
            .select('id, title, created_at, is_active')
            .order('created_at', { ascending: false })
            .limit(5)
    ]);

    return {
        stats: {
            editions: editionsCount || 0,
            users: usersCount || 0,
            announcements: announcementsCount || 0
        },
        recentEditions: recentEditions || [],
        recentAnnouncements: recentAnnouncements || []
    };
};
