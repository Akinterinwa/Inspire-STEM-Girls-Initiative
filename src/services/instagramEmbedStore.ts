export interface InstagramEmbedItem {
  id: string;
  url: string;
  shortcode: string;
  addedAt: string;
}

const STORAGE_KEY = 'isg_instagram_embed_urls_v2';
const DEFAULT_POST_URL = 'https://www.instagram.com/p/Dd8oKlKDODg/?utm_source=ig_web_copy_link';

export function extractInstagramShortcode(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  // Match standard /p/SHORTCODE, /reel/SHORTCODE, /tv/SHORTCODE
  const urlMatch = trimmed.match(/(?:instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+))/i);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }
  // If user just pasted the alphanumeric shortcode (e.g. Dd8oKlKDODg)
  if (/^[a-zA-Z0-9_-]{5,25}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

export const InstagramEmbedStore = {
  getPosts(): InstagramEmbedItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to parse Instagram posts from storage', e);
    }

    // Default item using the user's real Instagram post
    const defaultShortcode = extractInstagramShortcode(DEFAULT_POST_URL) || 'Dd8oKlKDODg';
    return [
      {
        id: `ig-${defaultShortcode}`,
        url: DEFAULT_POST_URL,
        shortcode: defaultShortcode,
        addedAt: new Date().toISOString(),
      },
    ];
  },

  addPost(rawUrl: string): { success: boolean; message?: string; item?: InstagramEmbedItem } {
    const shortcode = extractInstagramShortcode(rawUrl);
    if (!shortcode) {
      return {
        success: false,
        message: 'Invalid Instagram link. Please paste a link like https://www.instagram.com/p/Dd8oKlKDODg/',
      };
    }

    const current = this.getPosts();
    // Check if shortcode already exists
    if (current.some((p) => p.shortcode === shortcode)) {
      return {
        success: false,
        message: 'This Instagram post is already in your feed.',
      };
    }

    const cleanUrl = `https://www.instagram.com/p/${shortcode}/`;
    const newItem: InstagramEmbedItem = {
      id: `ig-${shortcode}-${Date.now()}`,
      url: cleanUrl,
      shortcode,
      addedAt: new Date().toISOString(),
    };

    const updated = [newItem, ...current];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }

    window.dispatchEvent(new CustomEvent('isg_instagram_store_updated', { detail: updated }));
    return { success: true, item: newItem };
  },

  removePost(idOrShortcode: string): void {
    const current = this.getPosts();
    const updated = current.filter((p) => p.id !== idOrShortcode && p.shortcode !== idOrShortcode);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
    window.dispatchEvent(new CustomEvent('isg_instagram_store_updated', { detail: updated }));
  },

  resetToDefault(): void {
    const defaultShortcode = extractInstagramShortcode(DEFAULT_POST_URL) || 'Dd8oKlKDODg';
    const defaultList: InstagramEmbedItem[] = [
      {
        id: `ig-${defaultShortcode}`,
        url: DEFAULT_POST_URL,
        shortcode: defaultShortcode,
        addedAt: new Date().toISOString(),
      },
    ];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultList));
    } catch (e) {
      console.error('Failed to reset storage', e);
    }
    window.dispatchEvent(new CustomEvent('isg_instagram_store_updated', { detail: defaultList }));
  },

  subscribe(callback: (posts: InstagramEmbedItem[]) => void): () => void {
    const listener = () => {
      callback(this.getPosts());
    };
    window.addEventListener('isg_instagram_store_updated', listener);
    window.addEventListener('storage', listener);
    return () => {
      window.removeEventListener('isg_instagram_store_updated', listener);
      window.removeEventListener('storage', listener);
    };
  },
};
