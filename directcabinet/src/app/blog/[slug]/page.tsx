'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';
import { getArticleBySlug, getAllArticles } from '@/lib/articles';

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getArticleBySlug(slug);
  const allArticles = getAllArticles();
  const otherArticles = allArticles.filter(a => a.slug !== slug).slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Article non trouve</h1>
          <Link href="/blog" className="text-emerald-600 hover:underline">
            Retour au blog
          </Link>
        </div>
      </div>
    );
  }

  // Convert markdown-like content to HTML
  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // H2
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-bold text-slate-900 mt-10 mb-4">
              {line.replace('## ', '')}
            </h2>
          );
        }
        // H3
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-bold text-slate-900 mt-8 mb-3">
              {line.replace('### ', '')}
            </h3>
          );
        }
        // Bold list items
        if (line.startsWith('- **')) {
          const match = line.match(/- \*\*(.+?)\*\*\s*:?\s*(.*)/);
          if (match) {
            return (
              <li key={index} className="ml-6 mb-2 text-gray-700">
                <strong className="text-slate-900">{match[1]}</strong>
                {match[2] && `: ${match[2]}`}
              </li>
            );
          }
        }
        // Regular list items
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="ml-6 mb-2 text-gray-700">
              {line.replace('- ', '')}
            </li>
          );
        }
        // Numbered list
        if (/^\d+\.\s/.test(line)) {
          return (
            <li key={index} className="ml-6 mb-2 text-gray-700 list-decimal">
              {line.replace(/^\d+\.\s/, '')}
            </li>
          );
        }
        // Table row
        if (line.startsWith('|')) {
          return null; // Skip tables for simplicity
        }
        // Bold text in paragraph
        if (line.includes('**')) {
          const parts = line.split(/\*\*(.+?)\*\*/g);
          return (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {parts.map((part, i) =>
                i % 2 === 1 ? (
                  <strong key={i} className="text-slate-900 font-semibold">{part}</strong>
                ) : (
                  part
                )
              )}
            </p>
          );
        }
        // Regular paragraph
        if (line.trim()) {
          return (
            <p key={index} className="text-gray-700 leading-relaxed mb-4">
              {line}
            </p>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimateOnScroll animation="fadeInUp">
            <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour au blog
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-medium rounded-full">
                {article.category}
              </span>
              <span className="text-gray-400 text-sm">{article.readTime} min de lecture</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-gray-400">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-full flex items-center justify-center text-white font-bold">
                DC
              </div>
              <div>
                <div className="text-white font-medium">{article.author}</div>
                <div className="text-gray-400 text-sm">
                  {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <article className="prose prose-lg max-w-none">
              {formatContent(article.content)}
            </article>
          </AnimateOnScroll>

          {/* CTA */}
          <AnimateOnScroll animation="fadeInUp">
            <div className="mt-16 card-premium p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Pret a maximiser vos revenus ?
              </h3>
              <p className="text-gray-400 mb-6">
                Rejoignez DirectCabinet et gardez 95% de votre TJM.
              </p>
              <Link href="/inscription" className="btn-primary inline-block">
                Rejoindre DirectCabinet
              </Link>
            </div>
          </AnimateOnScroll>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-gray-500 text-sm mb-4">Partager cet article</p>
            <div className="flex gap-3">
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://directcabinet.fr/blog/${article.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://directcabinet.fr/blog/${article.slug}`)}&text=${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other articles */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Articles similaires</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {otherArticles.map((otherArticle, index) => (
              <AnimateOnScroll key={otherArticle.slug} animation="fadeInUp" delay={index * 100}>
                <Link href={`/blog/${otherArticle.slug}`} className="block">
                  <div className="card-premium p-6 group hover:shadow-xl transition-shadow">
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg">
                      {otherArticle.category}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-4 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {otherArticle.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{otherArticle.excerpt}</p>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
