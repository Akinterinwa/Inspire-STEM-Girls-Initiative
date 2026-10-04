import React, { useState, useEffect } from 'react';
import { PageId } from '../../types';
import {
  InstagramEmbedStore,
  InstagramEmbedItem,
  extractInstagramShortcode,
} from '../../services/instagramEmbedStore';
import { AnimatedHeading } from '../AnimatedHeading';
import {
  Instagram,
  PlusCircle,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  Link,
  Eye,
  RefreshCw,
  Copy,
  Check,
} from 'lucide-react';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [posts, setPosts] = useState<InstagramEmbedItem[]>(() => InstagramEmbedStore.getPosts());
  const [postUrlInput, setPostUrlInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = InstagramEmbedStore.subscribe((updatedPosts) => {
      setPosts(updatedPosts);
    });
    return unsubscribe;
  }, []);

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const input = postUrlInput.trim();
    if (!input) {
      setErrorMessage('Please enter an Instagram post URL.');
      return;
    }

    const shortcode = extractInstagramShortcode(input);
    if (!shortcode) {
      setErrorMessage(
        'Invalid Instagram link format. Please provide a link like: https://www.instagram.com/p/Dd8oKlKDODg/'
      );
      return;
    }

    const res = InstagramEmbedStore.addPost(input);
    if (!res.success) {
      setErrorMessage(res.message || 'Could not add this post.');
      return;
    }

    setPostUrlInput('');
    setSuccessMessage(`Post [${shortcode}] successfully embedded and published to the main website!`);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleRemovePost = (id: string, shortcode: string) => {
    InstagramEmbedStore.removePost(id);
    setSuccessMessage(`Post [${shortcode}] removed from the main website.`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleResetDefault = () => {
    InstagramEmbedStore.resetToDefault();
    setSuccessMessage('Reset to the official default Instagram post (Dd8oKlKDODg).');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleCopyLink = (url: string, idx: number) => {
    navigator.clipboard?.writeText?.(url);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="py-12 sm:py-16 bg-[#EFEFF0]/30 min-h-[85vh] selection:bg-[#2C0E40] selection:text-[#F0C747]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Navigation & Header */}
        <div>
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#2C0E40] hover:text-[#41175E] mb-6 transition-all hover:-translate-x-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Main Website</span>
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <AnimatedHeading
                as="h1"
                accent
                subtitle="Website Administration"
                subtitleClassName="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2C0E40] bg-white px-3 py-1 rounded-full border border-[#2C0E40]/15"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-left"
              >
                Instagram Feed Manager
              </AnimatedHeading>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
                Paste any Instagram post link below to immediately populate and display it on the main website homepage.
              </p>
            </div>

            <button
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2C0E40] hover:bg-[#41175E] text-[#F0C747] hover:text-white text-xs font-bold transition-all shadow-md hover:-translate-y-0.5 active:scale-95 cursor-pointer self-start sm:self-auto"
            >
              <Eye className="w-4 h-4" />
              <span>View On Main Website</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert Banners */}
        {successMessage && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in duration-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Main Embed Link Input Card */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E3E3E5] shadow-lg space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2C0E40] text-[#F0C747] flex items-center justify-center font-bold shadow-sm">
              <Instagram className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Embed Instagram Post
              </h2>
              <p className="text-xs text-slate-500">
                Put the link here only — it immediately populates on the main website homepage
              </p>
            </div>
          </div>

          <form onSubmit={handleAddPost} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Instagram Post Link
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Link className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={postUrlInput}
                  onChange={(e) => {
                    setPostUrlInput(e.target.value);
                    setErrorMessage(null);
                  }}
                  placeholder="Paste Instagram post link (e.g. https://www.instagram.com/p/Dd8oKlKDODg/)"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-stone-300 text-sm focus:border-[#2C0E40] focus:ring-2 focus:ring-[#2C0E40]/20 outline-none bg-stone-50/50 font-medium transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setPostUrlInput(
                      'https://www.instagram.com/p/Dd8oKlKDODg/?utm_source=ig_web_copy_link'
                    )
                  }
                  className="px-3 py-1.5 rounded-xl border border-stone-200 text-slate-600 hover:text-[#2C0E40] hover:bg-[#EFEFF0] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Fill Sample Post (Dd8oKlKDODg)
                </button>

                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 text-slate-500 hover:text-slate-800 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Restore Default</span>
                </button>
              </div>

              <button
                type="submit"
                className="px-6 py-3.5 rounded-xl bg-[#2C0E40] hover:bg-[#41175E] text-[#F0C747] hover:text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Embed & Populate on Website</span>
              </button>
            </div>
          </form>
        </div>

        {/* Current Active Embeds Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Currently Live on Website ({posts.length})
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <span className="text-xs text-slate-500">
              Changes reflect immediately on the main homepage
            </span>
          </div>

          {posts.length === 0 ? (
            <div className="p-10 text-center rounded-3xl bg-white border border-[#E3E3E5] space-y-3">
              <p className="text-sm font-semibold text-slate-600">
                No Instagram post links are currently active.
              </p>
              <p className="text-xs text-slate-400">
                Use the box above to paste a post link and populate the feed.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post, idx) => (
                <div
                  key={post.id}
                  className="p-6 bg-white rounded-3xl border border-[#E3E3E5] shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                >
                  {/* Left: Info */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#2C0E40] text-[#F0C747]">
                        Post #{idx + 1}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Live on Homepage
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        ID: {post.shortcode}
                      </span>
                    </div>

                    <div className="text-xs text-slate-700 font-mono truncate max-w-xl">
                      {post.url}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span>Handle: @inspirestem_girls</span>
                      <span aria-hidden="true">·</span>
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2C0E40] hover:underline font-semibold inline-flex items-center gap-1"
                      >
                        <span>Open on Instagram</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(post.url, idx)}
                      className="flex-1 md:flex-initial px-3.5 py-2.5 rounded-xl border border-stone-200 hover:bg-[#EFEFF0] text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Copy link"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemovePost(post.id, post.shortcode)}
                      className="flex-1 md:flex-initial px-3.5 py-2.5 rounded-xl border border-red-200 hover:bg-red-50 text-red-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Remove post from main website"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Preview of the First/Primary Post */}
        {posts.length > 0 && (
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E3E3E5] shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#EFEFF0] pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Live Preview (As Shown on Main Website)
                </h3>
                <p className="text-xs text-slate-500">
                  Direct Instagram official embed widget using post shortcode <strong>{posts[0].shortcode}</strong>
                </p>
              </div>

              <button
                onClick={() => onNavigate('home')}
                className="text-xs font-bold text-[#2C0E40] hover:text-[#41175E] underline cursor-pointer"
              >
                Go to Homepage
              </button>
            </div>

            <div className="flex justify-center p-4 bg-[#EFEFF0]/40 rounded-2xl">
              <iframe
                src={`https://www.instagram.com/p/${posts[0].shortcode}/embed/captioned/`}
                title={`Instagram post ${posts[0].shortcode}`}
                className="w-full max-w-[540px] min-h-[580px] rounded-2xl border border-stone-200 shadow-md bg-white"
                loading="lazy"
                scrolling="no"
                allowTransparency={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
