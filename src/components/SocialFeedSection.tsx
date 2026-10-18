import React, { useState, useEffect, useRef } from 'react';
import { PageId } from '../types';
import { InstagramEmbedStore, InstagramEmbedItem } from '../services/instagramEmbedStore';
import { AnimatedHeading } from './AnimatedHeading';
import {
  Instagram,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
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
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const scrollToPost = (index: number) => {
    if (!carouselRef.current) return;
    const clamped = Math.max(0, Math.min(posts.length - 1, index));
    const firstChild = carouselRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : 300;
    carouselRef.current.scrollTo({
      left: clamped * (cardWidth + 16),
      behavior: 'smooth',
    });
  };

  const handleMobileScroll = () => {
    if (!carouselRef.current) return;
    const firstChild = carouselRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstChild ? firstChild.offsetWidth : 300;
    const newIdx = Math.round(carouselRef.current.scrollLeft / (cardWidth + 16));
    setActiveMobileIndex(newIdx);
  };

  return (
    <section className={`py-14 sm:py-24 bg-[#EFEFF0]/40 border-b border-[#E3E3E5] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div className="max-w-2xl">
            <AnimatedHeading
              as="h2"
              accent
              subtitle="Live From Instagram"
              subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-[#EFEFF0] px-3 py-1 rounded-full border border-[#2C0E40]/15"
              className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-900 text-left"
            >
              Recent STEM Activities
            </AnimatedHeading>
            {/* Desktop text */}
            <p className="hidden sm:block mt-3 text-base text-slate-600 leading-relaxed">
              Real-time updates directly from our Instagram page (<strong className="text-[#2C0E40]">@inspirestem_girls</strong>). Follow our latest workshops, school visits, and community breakthroughs across Nigeria.
            </p>
            {/* Mobile text: concise */}
            <p className="block sm:hidden mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Live updates directly from <strong className="text-[#2C0E40]">@inspirestem_girls</strong> workshops and school outreach in Nigeria.
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
            <a
              href="https://instagram.com/inspirestem_girls"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#2C0E40] hover:bg-[#41175E] text-[#FFBD59] hover:text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow @inspirestem_girls</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </a>

            {/* Mobile Prev / Next Controls if multiple posts */}
            {posts.length > 1 && (
              <div className="flex sm:hidden items-center gap-1.5">
                <button
                  onClick={() => scrollToPost(activeMobileIndex - 1)}
                  disabled={activeMobileIndex === 0}
                  aria-label="Previous Instagram post"
                  className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => scrollToPost(activeMobileIndex + 1)}
                  disabled={activeMobileIndex >= posts.length - 1}
                  aria-label="Next Instagram post"
                  className="w-8 h-8 rounded-full border border-slate-300 bg-white flex items-center justify-center text-slate-700 disabled:opacity-35 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Instagram Post(s) Display */}
        {posts.length === 0 ? (
          /* Empty Placeholder State */
          <div className="max-w-xl mx-auto p-8 sm:p-10 text-center rounded-3xl bg-white border border-[#E3E3E5] shadow-sm space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EFEFF0] text-[#2C0E40] flex items-center justify-center mx-auto">
              <Instagram className="w-7 h-7" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              No Instagram Post Link Configured Yet
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Paste any Instagram post link (like <code>https://www.instagram.com/p/Dd8oKlKDODg/</code>) on the Admin Page to immediately populate it here.
            </p>
          </div>
        ) : (
          <>
            {/* DESKTOP GRID (md and above: untouched grid layout) */}
            <div
              className={`hidden md:grid gap-8 justify-center ${
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

            {/* MOBILE CAROUSEL (Visible ONLY on mobile / small devices < md) */}
            <div className="block md:hidden">
              <div
                ref={carouselRef}
                onScroll={handleMobileScroll}
                className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2 -mx-4 px-4"
              >
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="w-[86vw] max-w-[340px] flex-shrink-0 snap-center bg-white rounded-2xl overflow-hidden border border-[#E3E3E5] shadow-md flex flex-col justify-between"
                  >
                    {/* Embedded Instagram Iframe */}
                    <div className="relative w-full bg-stone-50 overflow-hidden flex items-center justify-center min-h-[520px]">
                      <iframe
                        src={`https://www.instagram.com/p/${post.shortcode}/embed/captioned/`}
                        title={`Instagram post ${post.shortcode}`}
                        className="w-full min-h-[520px] border-0"
                        loading="lazy"
                        scrolling="no"
                      />
                    </div>

                    {/* Direct Link Footer Bar */}
                    <div className="p-3.5 bg-white border-t border-[#EFEFF0] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-600 font-medium text-[11px]">
                        <Instagram className="w-3.5 h-3.5 text-[#2C0E40]" />
                        <span>@inspirestem_girls</span>
                      </div>

                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#2C0E40] hover:text-[#41175E] text-[11px] transition-colors"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Dots if multiple posts */}
              {posts.length > 1 && (
                <div className="flex items-center justify-center gap-2 pt-3">
                  {posts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollToPost(idx)}
                      aria-label={`Go to Instagram post ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeMobileIndex === idx ? 'w-6 bg-[#2C0E40]' : 'w-2 bg-slate-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
