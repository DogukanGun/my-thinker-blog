"use client";

import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";
import { BookOpen, FileText, Code, X, Globe } from "lucide-react";
import { useTranslation } from "../i18n/LanguageContext";
import config from "../config.json";
import { LanguageCode } from "../i18n/translations";

type Blog = {
  id: string;
  problem_id: string;
  title: string;
  content_md: string;
  arxiv_url: string;
  github_url: string;
  created_at: string;
};

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  
  const { t, language, setLanguage } = useTranslation();

  // Apply accent color to CSS variable
  useEffect(() => {
    document.documentElement.style.setProperty("--color-accent", config.accentColor);
  }, []);

  useEffect(() => {
    async function loadBlogs() {
      // Try the live API first, fall back to static JSON (Vercel / static export)
      for (const url of ["/api/blogs", "/data/blogs.json"]) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          setBlogs(data.blogs ?? []);
          setLoading(false);
          return;
        } catch {
          continue;
        }
      }
      setError(true);
      setLoading(false);
    }
    loadBlogs();
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col items-center pt-32 pb-16 px-6">
      {/* Background Mesh */}
      <div className="fixed top-[-50%] left-[-50%] w-[200%] h-[200%] -z-10 pointer-events-none animate-[drift_20s_ease-in-out_infinite_alternate]" style={{
        background: `radial-gradient(circle at 50% 50%, ${config.accentColor}30, transparent 40%),
                     radial-gradient(circle at 80% 20%, rgba(0, 210, 211, 0.1), transparent 30%)`
      }}></div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full glass-card border-b border-white/10 z-50 py-4 px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black tracking-tight font-[family-name:var(--font-outfit)]">
            {config.siteName.substring(0, Math.ceil(config.siteName.length/2))}
            <span style={{ color: config.accentColor }}>
               {config.siteName.substring(Math.ceil(config.siteName.length/2))}
            </span>
          </div>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
            <Globe size={16} className="text-muted" />
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as LanguageCode)}
              className="bg-transparent text-sm font-semibold outline-none cursor-pointer text-white appearance-none"
            >
              <option value="en" className="text-black">English</option>
              <option value="de" className="text-black">Deutsch</option>
              <option value="tr" className="text-black">Türkçe</option>
            </select>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center mb-20 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter font-[family-name:var(--font-outfit)]">
          {t("HERO_TITLE_PREFIX")} <span style={{ background: `linear-gradient(135deg, #fff, ${config.accentColor})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{t("HERO_TITLE_HIGHLIGHT")}</span> {t("HERO_TITLE_SUFFIX")}
        </h1>
        <p className="text-lg text-[#8b8b99]">
          {t("HERO_SUBTITLE")}
        </p>
      </section>

      {/* Blog Grid */}
      <section className="w-full max-w-6xl">
        {loading && <p className="text-center text-muted">{t("FETCHING_RESEARCH")}</p>}
        {error && <p className="text-center text-red-500">{t("FAILED_LOAD")}</p>}
        {!loading && !error && blogs.length === 0 && (
          <p className="text-center text-muted">{t("NO_RESEARCH")}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="glass-card rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-lg" style={{ borderColor: 'var(--color-glass-border)' }}
                 onMouseEnter={(e) => e.currentTarget.style.borderColor = `${config.accentColor}80`}
                 onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--color-glass-border)'}>
              <div className="flex justify-between items-center mb-4 text-xs font-semibold">
                <span className="px-3 py-1 rounded-full" style={{ backgroundColor: `${config.accentColor}30`, color: config.accentColor }}>{t("TAG_RESEARCH")}</span>
                <span className="text-[#8b8b99]">
                  {new Date(blog.created_at).toLocaleDateString(language === 'tr' ? 'tr-TR' : language === 'de' ? 'de-DE' : 'en-US', { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-3 leading-tight font-[family-name:var(--font-outfit)]">{blog.title}</h2>
              <p className="text-[#8b8b99] mb-6 flex-grow line-clamp-3">
                {blog.content_md.substring(0, 150)}...
              </p>
              <button 
                onClick={() => setSelectedBlog(blog)}
                className="w-full py-2.5 rounded-lg border font-semibold transition-all flex items-center justify-center gap-2 hover:text-white"
                style={{ borderColor: config.accentColor, color: "white" }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = config.accentColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <BookOpen size={18} /> {t("READ_POST")}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedBlog(null)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#111116] border rounded-3xl p-8 md:p-12 z-[1001] shadow-2xl" style={{ borderColor: `${config.accentColor}50` }}>
            <button 
              onClick={() => setSelectedBlog(null)}
              className="absolute top-6 right-6 text-[#8b8b99] hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {selectedBlog.arxiv_url && (
                <a href={selectedBlog.arxiv_url} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#00d2d3]/30 bg-[#00d2d3]/10 text-[#00d2d3] font-semibold hover:bg-[#00d2d3]/20 transition-all">
                  <FileText size={18} /> {t("VIEW_ARXIV")}
                </a>
              )}
              {selectedBlog.github_url && (
                <a href={selectedBlog.github_url} target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 text-white font-semibold hover:bg-white/10 transition-all">
                  <Code size={18} /> {t("VIEW_CODE")}
                </a>
              )}
            </div>

            <article 
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: typeof window !== 'undefined' ? DOMPurify.sanitize(marked.parse(selectedBlog.content_md) as string) : '' }}
            ></article>
          </div>
        </div>
      )}
    </main>
  );
}
