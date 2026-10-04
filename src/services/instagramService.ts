import { SocialUpdate } from '../types';
import { socialUpdatesData } from '../data/siteData';

/**
 * Service to manage Instagram live syncing and automatic post population.
 */
export const InstagramService = {
  /**
   * Fetches latest posts from Instagram Graph API if token is provided,
   * otherwise falls back to cached verified feed.
   */
  async fetchLatestPosts(): Promise<SocialUpdate[]> {
    const token = (import.meta as any).env?.VITE_INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
      return socialUpdatesData;
    }

    try {
      // Query Meta Instagram Graph API
      const res = await fetch(
        `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${token}`
      );
      if (!res.ok) {
        console.warn('Instagram Graph API request returned non-200:', res.status);
        return socialUpdatesData;
      }

      const data = await res.json();
      if (!data.data || !Array.isArray(data.data)) {
        return socialUpdatesData;
      }

      // Transform Instagram Graph API media objects into SocialUpdate
      const remotePosts: SocialUpdate[] = data.data.map((item: any) => {
        const shortcodeMatch = item.permalink?.match(/(?:instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+))/i);
        const shortcode = shortcodeMatch ? shortcodeMatch[1] : undefined;
        const caption = item.caption || '';
        const tags = caption.match(/#[a-zA-Z0-9_]+/g) || ['#inspirestemgirls', '#girlsinstem'];

        return {
          id: `instagram-api-${item.id}`,
          platform: 'instagram',
          author: 'Inspire STEM Girls Initiative',
          authorHandle: '@inspirestem_girls',
          date: new Date(item.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
          timeAgo: 'Live Synced',
          category: 'workshop',
          categoryLabel: 'Live Instagram Update',
          image: item.media_url || item.thumbnail_url || '/instagram/Dd8oKlKDODg.jpg',
          content: caption,
          tags,
          likes: 250,
          commentsCount: 24,
          sharesCount: 30,
          url: item.permalink || `https://www.instagram.com/p/${shortcode}/`,
          shortcode,
          isOfficialEmbed: true,
          verified: true,
        };
      });

      return [...remotePosts, ...socialUpdatesData];
    } catch (err) {
      console.error('Error fetching live Instagram Graph API feed:', err);
      return socialUpdatesData;
    }
  },

  /**
   * Helper to parse any Instagram post link into a formatted SocialUpdate.
   */
  parsePostUrl(url: string, category: 'workshop' | 'mentorship' | 'student-spotlight' | 'milestone' = 'milestone'): SocialUpdate | null {
    const match = url.match(/(?:instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+))/i);
    if (!match) return null;

    const shortcode = match[1];
    return {
      id: `instagram-import-${shortcode}`,
      platform: 'instagram',
      author: 'Inspire STEM Girls Initiative',
      authorHandle: '@inspirestem_girls',
      date: 'Live Post',
      timeAgo: 'Auto-Synced',
      category,
      categoryLabel: category === 'workshop' ? 'Hands-On STEM Lab' : 'Community Milestone',
      image: shortcode === 'Dd8oKlKDODg' ? '/instagram/Dd8oKlKDODg.jpg' : '/instagram/Dd8oKlKDODg.jpg',
      content: `Live post from @inspirestem_girls (Post ID: ${shortcode}). Automatically populated into the community feed! Follow our journey as we empower girls across Nigeria with STEM opportunities. 🇳🇬💜`,
      tags: ['#inspirestemgirls', '#girlsinstem', '#nigeria', '#womenintech'],
      likes: 150,
      commentsCount: 20,
      sharesCount: 35,
      url: `https://www.instagram.com/p/${shortcode}/`,
      shortcode,
      isOfficialEmbed: true,
      verified: true,
    };
  },
};
