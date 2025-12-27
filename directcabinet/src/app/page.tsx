'use client';

import Link from 'next/link';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero min-h-screen flex items-center relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimateOnScroll animation="fadeInUp" delay={0}>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-sm text-gray-300">La nouvelle ere du freelancing IT</span>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fadeInUp" delay={100}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 text-white tracking-tight">
                  Missions grands comptes.
                  <span className="block gradient-text mt-2">95% du TJM pour vous.</span>
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fadeInUp" delay={200}>
                <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl">
                  Les ESN prennent 30 a 50% de marge sur votre travail. Nous prenons 5%.
                  Meme acces aux missions CAC40. Mais vous gardez votre argent.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fadeInUp" delay={300}>
                <div className="flex flex-col sm:flex-row gap-4 mb-12">
                  <Link href="/inscription" className="btn-primary text-center text-lg">
                    Rejoindre DirectCabinet
                  </Link>
                  <Link href="/missions" className="btn-secondary text-center">
                    Voir les missions
                  </Link>
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll animation="fadeInUp" delay={400}>
                {/* Trust indicators */}
                <div className="flex items-center gap-8">
                  <div className="flex -space-x-3">
                    {['JD', 'ML', 'SC', 'AB'].map((initials, i) => (
                      <div key={i} className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-sm border-2 border-slate-900 ${
                        ['bg-emerald-500', 'bg-sky-500', 'bg-violet-500', 'bg-amber-500'][i]
                      }`}>
                        {initials}
                      </div>
                    ))}
                    <div className="w-11 h-11 rounded-full bg-slate-800 flex items-center justify-center text-white font-semibold text-sm border-2 border-slate-900">
                      +50
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    <span className="text-white font-semibold">50+ freelances</span> nous font confiance
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            {/* Hero Card */}
            <div className="hidden lg:block">
              <AnimateOnScroll animation="fadeInRight" delay={300}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-3xl blur-2xl opacity-20"></div>
                  <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-gray-400 text-sm">Comparaison revenus annuels</span>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-medium rounded-full">En direct</span>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-white font-medium">Via ESN</div>
                            <div className="text-gray-500 text-sm">35% de marge</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-red-400 font-bold text-xl">100 100 EUR</div>
                          <div className="text-gray-500 text-sm">/an</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-white font-medium">DirectCabinet</div>
                            <div className="text-gray-500 text-sm">5% de commission</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-bold text-xl">146 300 EUR</div>
                          <div className="text-gray-500 text-sm">/an</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-700">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Votre gain annuel</span>
                        <span className="text-2xl font-bold text-white">+46 200 EUR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeIn">
            <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-wider font-medium">
              Nos freelances travaillent chez
            </p>
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 opacity-60">
              {['BNP Paribas', 'TotalEnergies', 'Orange', 'L\'Oreal', 'Societe Generale', 'AXA'].map((company) => (
                <span key={company} className="text-xl font-bold text-gray-400">{company}</span>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-full mb-4">
                Le probleme
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Vous connaissez ce scenario ?
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="space-y-6">
            {[
              {
                title: "Le client paie 900 EUR/jour pour vous...",
                desc: "Mais l'ESN vous reverse 550 EUR. Les 350 EUR restants ? Dans leur poche. Pour avoir envoye un email."
              },
              {
                title: "Vous voulez negocier votre TJM ?",
                desc: "\"Desole, le client a un budget serre.\" Mensonge. Le client paie le prix fort. L'ESN garde la difference."
              },
              {
                title: "Malt pour eviter ca ?",
                desc: "Bonne idee. Mais les grands comptes (ceux qui paient bien) n'y sont pas. Ils passent par des cabinets."
              }
            ].map((item, i) => (
              <AnimateOnScroll key={i} animation="fadeInUp" delay={i * 100}>
                <div className="card-premium p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-full mb-4">
                La solution
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Le meilleur des deux mondes
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Acces aux missions grands comptes + Vous gardez 95% de votre TJM
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {/* ESN */}
            <AnimateOnScroll animation="fadeInUp" delay={0}>
              <div className="card-premium p-8 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">ESN / Cabinet</h3>
                  <p className="text-gray-500 mb-6">Modele traditionnel</p>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-gray-600">Client paie</span>
                      <span className="font-semibold">900 EUR</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-gray-600">Marge ESN</span>
                      <span className="font-semibold text-red-500">-35%</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-900 font-semibold">Vous recevez</span>
                      <span className="text-2xl font-bold text-red-500">585 EUR</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Malt */}
            <AnimateOnScroll animation="fadeInUp" delay={100}>
              <div className="card-premium p-8 relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-24 h-24 bg-amber-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6">
                    <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Malt / Direct</h3>
                  <p className="text-gray-500 mb-6">Plateformes freelance</p>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-gray-600">Client paie</span>
                      <span className="font-semibold">Variable</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-slate-100">
                      <span className="text-gray-600">Grands comptes</span>
                      <span className="font-semibold text-amber-500">Rarement</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-gray-900 font-semibold">Probleme</span>
                      <span className="text-lg font-bold text-amber-500">Pas de CAC40</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            {/* DirectCabinet */}
            <AnimateOnScroll animation="fadeInUp" delay={200}>
              <div className="relative h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-3xl blur-xl opacity-20"></div>
                <div className="relative card-premium p-8 border-2 border-emerald-200 overflow-hidden h-full">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-sm font-semibold rounded-full">
                      Recommande
                    </span>
                  </div>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                  <div className="relative mt-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-sky-100 rounded-2xl flex items-center justify-center mb-6">
                      <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">DirectCabinet</h3>
                    <p className="text-gray-500 mb-6">Le meilleur choix</p>
                    <div className="space-y-4">
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-gray-600">Client paie</span>
                        <span className="font-semibold">900 EUR</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-100">
                        <span className="text-gray-600">Notre part</span>
                        <span className="font-semibold text-emerald-600">-5%</span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-gray-900 font-semibold">Vous recevez</span>
                        <span className="text-2xl font-bold text-emerald-600">855 EUR</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Annual Impact */}
          <AnimateOnScroll animation="scaleIn" delay={100}>
            <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">TJM a 700 EUR</div>
                  <div className="text-4xl font-bold text-white stat-number">700 EUR</div>
                  <div className="text-gray-500 mt-1">x 220 jours/an</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Vous gagnez</div>
                  <div className="text-4xl font-bold text-emerald-400 stat-number">+46 200 EUR</div>
                  <div className="text-gray-500 mt-1">vs une ESN</div>
                </div>
                <div>
                  <div className="text-gray-400 text-sm uppercase tracking-wider mb-2">Par mois</div>
                  <div className="text-4xl font-bold text-white stat-number">+3 850 EUR</div>
                  <div className="text-gray-500 mt-1">dans votre poche</div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-sky-50 text-sky-600 text-sm font-medium rounded-full mb-4">
                Comment ca marche
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Simple. Rapide. Efficace.
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Inscription",
                desc: "5 minutes. Gratuit. On verifie votre profil sous 48h.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                )
              },
              {
                step: "02",
                title: "Matching",
                desc: "On vous propose des missions qui correspondent a votre profil.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                )
              },
              {
                step: "03",
                title: "Mission",
                desc: "Vous acceptez. On gere contrats, facturation, paiement.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                )
              },
              {
                step: "04",
                title: "Paiement",
                desc: "95% du TJM pour vous. Paiement garanti a 30 jours.",
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                )
              }
            ].map((item, i) => (
              <AnimateOnScroll key={i} animation="fadeInUp" delay={i * 100}>
                <div className="relative">
                  {i < 3 && (
                    <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-slate-200 to-transparent -translate-x-8"></div>
                  )}
                  <div className="text-center">
                    <div className="relative inline-block mb-6">
                      <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
                        <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <span className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                        {item.step.slice(-1)}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-violet-50 text-violet-600 text-sm font-medium rounded-full mb-4">
                Services inclus
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                On gere tout pour vous
              </h2>
              <p className="text-xl text-gray-600">Pour que vous vous concentriez sur votre mission</p>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Prospection", desc: "On trouve les missions. Vous ne cherchez plus.", color: "emerald" },
              { title: "Contrats", desc: "On redige. Vous signez. C'est tout.", color: "sky" },
              { title: "Paiement garanti", desc: "On vous paie meme si le client tarde.", color: "violet" },
              { title: "Facturation", desc: "On centralise. Vous n'avez rien a gerer.", color: "amber" },
              { title: "Protection juridique", desc: "Anti-requalification. Assurances incluses.", color: "rose" },
              { title: "Support dedie", desc: "Un probleme ? On gere. Vous bossez.", color: "indigo" }
            ].map((item, i) => (
              <AnimateOnScroll key={i} animation="fadeInUp" delay={i * 50}>
                <div className="card-premium p-6 flex items-start gap-4 h-full">
                  <div className={`w-12 h-12 bg-${item.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <svg className={`w-6 h-6 text-${item.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimateOnScroll animation="fadeInUp">
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-full mb-4">
                Temoignages
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Ils ont quitte leur ESN
              </h2>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "8 ans en ESN. Je gardais 65% de mon TJM. Maintenant 95%. Sur l'annee, ca fait 40k de plus. Pour le meme travail.",
                name: "Marc L.",
                role: "Data Engineer",
                exp: "7 ans xp",
                initials: "ML",
                color: "bg-sky-500"
              },
              {
                quote: "J'avais peur de perdre l'acces aux grands comptes en quittant mon ESN. Avec DirectCabinet, j'ai les memes missions. Sans l'intermediaire.",
                name: "Sophie C.",
                role: "DevOps",
                exp: "9 ans xp",
                initials: "SC",
                color: "bg-emerald-500"
              },
              {
                quote: "Mon client ne savait meme pas qu'il payait 850 EUR/jour alors que j'en touchais 500. Maintenant on est tous les deux gagnants.",
                name: "Julien D.",
                role: "Architecte Cloud",
                exp: "12 ans xp",
                initials: "JD",
                color: "bg-violet-500"
              }
            ].map((item, i) => (
              <AnimateOnScroll key={i} animation="fadeInUp" delay={i * 100}>
                <div className="card-premium p-8 h-full">
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, j) => (
                      <svg key={j} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-600 mb-8 leading-relaxed">"{item.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${item.color} rounded-full flex items-center justify-center text-white font-bold`}>
                      {item.initials}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{item.name}</div>
                      <div className="text-gray-500 text-sm">{item.role} - {item.exp}</div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimateOnScroll animation="fadeInUp">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Arretez d'enrichir les ESN.
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Inscription gratuite. Verification sous 48h. Premieres missions dans la semaine.
            </p>
            <Link href="/inscription" className="btn-primary text-lg inline-block">
              Rejoindre DirectCabinet
            </Link>
            <p className="mt-8 text-gray-500">
              Deja 50+ freelances. Missions BNP, Total, Orange, L'Oreal...
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
