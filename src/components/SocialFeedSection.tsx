import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { InstagramEmbedStore, InstagramEmbedItem } from '../services/instagramEmbedStore';
import { AnimatedHeading } from './AnimatedHeading';
import {
  Instagram,
  ExternalLink,
  Settings,
  Sparkles,
  ArrowRight,
  PlusCircle,
  RefreshCw,
} from 'lucide-react';

interface SocialFeedSectionProps {
  onNavigate?: (page: PageId) => void;
  className?: string;
}

export const SocialFeedSection: React.FC<SocialFeedSectionProps> = ({
  onNavigate,
  className = '',
}) => {
  const [posts, setPosts] = useState<InstagramEmbedItem[]>([]);

  useEffect(() => {
    let cancelled = false;
    const loadPosts = async () => {
      const nextPosts = await InstagramEmbedStore.getPosts();
      if (!cancelled) {
        setPosts(nextPosts);
      }
    };

    void loadPosts();

    const unsubscribe = InstagramEmbedStore.subscribe((updatedPosts) => {
      if (!cancelled) {
        setPosts(updatedPosts);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, []);

  return (
    <section className={`py-16 sm:py-24 bg-[#EFEFF0]/40 border-b border-[#E3E3E5] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div className="max-w-2xl">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Live From Instagram"
              subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-[#EFEFF0] px-3 py-1 rounded-full border border-[#2C0E40]/15"
              className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-left"
            >
              Recent STEM Activities
            </AnimatedHeading>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Real-time updates directly from our Instagram page (<strong className="text-[#2C0E40]">@inspirestem_girls</strong>). Follow our latest workshops, school visits, and community breakthroughs across Nigeria.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="https://instagram.com/inspirestem_girls"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2C0E40] hover:bg-[#41175E] text-[#F0C747] hover:text-white text-xs font-bold transition-all hover:-translate-y-0.5 active:scale-95 shadow-md hover:shadow-purple-950/25 cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @inspirestem_girls</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>
          </div>
        </div>

        {/* Instagram Post(s) Display */}
        {posts.length === 0 ? (
          /* Empty Placeholder State */
          <div className="max-w-xl mx-auto p-10 text-center rounded-3xl bg-white border border-[#E3E3E5] shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EFEFF0] text-[#2C0E40] flex items-center justify-center mx-auto">
              <Instagram className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No Instagram Post Link Configured Yet
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Paste any Instagram post link (like <code>https://www.instagram.com/p/Dd8oKlKDODg/</code>) on the Admin Page to immediately populate it here.
            </p>
          </div>
        ) : (
          /* Populated Instagram Post Embeds */
          <div
            className={`grid gap-8 justify-center ${
              posts.length === 1
                ? 'grid-cols-1 max-w-xl mx-auto'
                : posts.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#E3E3E5] shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Embedded Instagram Iframe */}
                <div className="relative w-full bg-stone-50 overflow-hidden flex items-center justify-center min-h-[580px]">
                  <iframe
                    src={`https://www.instagram.com/p/${post.shortcode}/embed/captioned/`}
                    title={`Instagram post ${post.shortcode}`}
                    className="w-full min-h-[580px] border-0"
                    loading="lazy"
                    scrolling="no"
                    allowTransparency={true}
                  />
                </div>

                {/* Direct Link Footer Bar */}
                <div className="p-4 bg-white border-t border-[#EFEFF0] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <Instagram className="w-3.5 h-3.5 text-[#2C0E40]" />
                    <span>@inspirestem_girls</span>
                  </div>

                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#2C0E40] hover:text-[#41175E] transition-colors"
                  >
                    <span>View on Instagram</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span>Synced directly with Instagram (@inspirestem_girls)</span>
          <span aria-hidden="true" className="hidden sm:inline">·</span>
          <span>Updated in real time</span>
        </div>
      </div>
    </section>
  );
};
