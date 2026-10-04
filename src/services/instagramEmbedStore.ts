export interface InstagramEmbedItem {
  id: string;
  url: string;
  shortcode: string;
  addedAt: string;
}

const DEFAULT_POST_URL = 'https://www.instagram.com/p/Dd8oKlKDODg/?utm_source=ig_web_copy_link';
const API_ENDPOINT = '/api/instagram-feed';

export function extractInstagramShortcode(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  const urlMatch = trimmed.match(/(?:instagram\.com\/(?:p|reel|tv)\/([a-zA-Z0-9_-]+))/i);
  if (urlMatch && urlMatch[1]) {
    return urlMatch[1];
  }
  if (/^[a-zA-Z0-9_-]{5,25}$/.test(trimmed)) {
    return trimmed;
  }
  return null;
}

function getDefaultPosts(): InstagramEmbedItem[] {
  const defaultShortcode = extractInstagramShortcode(DEFAULT_POST_URL) || 'Dd8oKlKDODg';
  return [
    {
      id: `ig-${defaultShortcode}`,
      url: DEFAULT_POST_URL,
      shortcode: defaultShortcode,
      addedAt: new Date().toISOString(),
    },
  ];
}

const requestJson = async <T>(input: RequestInfo | URL, init?: RequestInit): Promise<T | null> => {
  try {
    const res = await fetch(input, init);
    if (!res.ok) {
      return null;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn('Instagram feed request failed:', error);
    return null;
  }
};

export const InstagramEmbedStore = {
  async getPosts(): Promise<InstagramEmbedItem[]> {
    const data = await requestJson<InstagramEmbedItem[]>(API_ENDPOINT);
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }
    return getDefaultPosts();
  },

  async addPost(rawUrl: string): Promise<{ success: boolean; message?: string; item?: InstagramEmbedItem }> {
    const shortcode = extractInstagramShortcode(rawUrl);
    if (!shortcode) {
      return {
        success: false,
        message: 'Invalid Instagram link. Please paste a link like https://www.instagram.com/p/Dd8oKlKDODg/',
      };
    }

    const current = await this.getPosts();
    if (current.some((p) => p.shortcode === shortcode)) {
      return {
        success: false,
        message: 'This Instagram post is already in your feed.',
      };
    }

    const payload = { action: 'add', url: rawUrl };
    const result = await requestJson<{ success: boolean; message?: string; item?: InstagramEmbedItem }>(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!result) {
      return {
        success: false,
        message: 'Could not save the Instagram post to the shared feed.',
      };
    }

    return result;
  },

  async removePost(idOrShortcode: string): Promise<void> {
    await requestJson(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'remove', id: idOrShortcode }),
    });
  },

  async resetToDefault(): Promise<void> {
    await requestJson(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'reset' }),
    });
  },

  subscribe(callback: (posts: InstagramEmbedItem[]) => void): () => void {
    const sync = async () => {
      callback(await this.getPosts());
    };

    const onChannelMessage = (event: MessageEvent) => {
      if (Array.isArray(event.data)) {
        callback(event.data as InstagramEmbedItem[]);
      }
    };

    const poller = window.setInterval(() => {
      void sync();
    }, 5000);

    window.addEventListener('isg_instagram_store_updated', sync as EventListener);
    if ('BroadcastChannel' in window) {
      const channel = new BroadcastChannel('isg-instagram-feed');
      channel.addEventListener('message', onChannelMessage);
      window.__ISG_BROADCAST_CHANNEL__ = channel;
    }

    void sync();

    return () => {
      window.clearInterval(poller);
      window.removeEventListener('isg_instagram_store_updated', sync as EventListener);
      const channel = (window as Window & { __ISG_BROADCAST_CHANNEL__?: BroadcastChannel }).__ISG_BROADCAST_CHANNEL__;
      if (channel) {
        channel.removeEventListener('message', onChannelMessage);
        channel.close();
      }
    };
  },
};
