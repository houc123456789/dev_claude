'use client';

import Link from 'next/link';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';
import { getAllArticles } from '@/lib/articles';

const CATEGORIES = ['Tous', 'Conseils', 'Guide', 'Administratif', 'Juridique'];

export default function BlogPage() {
  const articles = getAllArticles();

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimateOnScroll animation="fadeInUp">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
              <span className="text-sm text-gray-300">Ressources pour freelances IT</span>
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Blog & Ressources
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Conseils, guides et astuces pour maximiser vos revenus en freelance IT
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories */}
          <AnimateOnScroll animation="fadeInUp">
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    cat === 'Tous'
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Featured Article */}
          {articles[0] && (
            <AnimateOnScroll animation="fadeInUp">
              <Link href={`/blog/${articles[0].slug}`} className="block mb-12">
                <div className="card-premium p-8 md:p-12 bg-gradient-to-br from-slate-900 to-slate-800 group">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">
                          {articles[0].category}
                        </span>
                        <span className="text-gray-500 text-sm">{articles[0].readTime} min de lecture</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors">
                        {articles[0].title}
                      </h2>
                      <p className="text-gray-400 mb-6 line-clamp-2">
                        {articles[0].excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-emerald-400 font-medium">
                        Lire l'article
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="w-full md:w-64 h-48 bg-gradient-to-br from-emerald-500/20 to-sky-500/20 rounded-2xl flex items-center justify-center">
                      <svg className="w-16 h-16 text-emerald-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          )}

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(1).map((article, index) => (
              <AnimateOnScroll key={article.slug} animation="fadeInUp" delay={index * 100}>
                <Link href={`/blog/${article.slug}`} className="block h-full">
                  <div className="card-premium p-6 h-full flex flex-col group hover:shadow-xl transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg">
                        {article.category}
                      </span>
                      <span className="text-gray-400 text-xs">{article.readTime} min</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs text-gray-400">
                        {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                        Lire
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Newsletter CTA */}
          <AnimateOnScroll animation="fadeInUp">
            <div className="mt-16 card-premium p-8 md:p-12 bg-gradient-to-r from-emerald-500 to-sky-500 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Recevez nos meilleurs conseils
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                Inscrivez-vous a notre newsletter pour recevoir nos guides et conseils pour freelances IT.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:bg-white/30 transition-colors"
                />
                <button className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-white/90 transition-colors">
                  S'inscrire
                </button>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
