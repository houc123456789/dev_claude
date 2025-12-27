'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimateOnScroll } from '@/hooks/useScrollAnimation';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  // Fonctionnement
  {
    category: "Fonctionnement",
    question: "Comment fonctionne DirectCabinet ?",
    answer: "DirectCabinet est un cabinet de placement IT nouvelle generation. Nous mettons en relation des freelances qualifies avec des missions grands comptes (CAC40, SBF120). La difference ? Nous prenons seulement 5% de commission au lieu des 30-50% habituels des ESN. Vous gardez donc 95% de votre TJM."
  },
  {
    category: "Fonctionnement",
    question: "Quelle est la difference avec une ESN traditionnelle ?",
    answer: "Une ESN traditionnelle prend 30 a 50% de marge sur votre TJM sans vous le dire. Exemple : le client paie 900 EUR, vous recevez 550 EUR. Chez DirectCabinet, c'est transparent : 5% de commission, point final. Sur le meme exemple, vous recevez 855 EUR. Sur l'annee, ca represente plus de 40 000 EUR de difference."
  },
  {
    category: "Fonctionnement",
    question: "Comment vous trouvez les missions ?",
    answer: "Nous avons des partenariats directs avec les directions achats de grands groupes francais. Nous accedons aux memes missions que les grandes ESN, mais sans les intermediaires multiples qui gonflent les prix. Nos clients font confiance a notre modele transparent."
  },
  // Inscription
  {
    category: "Inscription",
    question: "L'inscription est-elle gratuite ?",
    answer: "Oui, l'inscription est 100% gratuite. Nous ne prenons notre commission de 5% que lorsque vous etes en mission. Pas de frais caches, pas d'abonnement, pas de cotisation."
  },
  {
    category: "Inscription",
    question: "Quels sont les criteres pour rejoindre DirectCabinet ?",
    answer: "Nous recherchons des profils IT seniors (3+ ans d'experience) dans les domaines suivants : Data (Engineer, Scientist, Analyst), DevOps/SRE, Developpement (Backend, Frontend, Fullstack, Mobile), Cloud/Architecture, Cybersecurite, Product Management. Nous verifions chaque profil pour garantir la qualite a nos clients."
  },
  {
    category: "Inscription",
    question: "Combien de temps prend la verification du profil ?",
    answer: "Nous verifions votre profil sous 48h ouvrables. Une fois valide, vous recevez un email de confirmation et pouvez commencer a recevoir des propositions de missions adaptees a votre profil."
  },
  // Missions
  {
    category: "Missions",
    question: "Quels types de missions proposez-vous ?",
    answer: "Nous proposons des missions longue duree (6 mois a 2 ans) chez les grands comptes francais : banques (BNP, SG, Credit Agricole), energie (Total, EDF, Engie), telecom (Orange, SFR), luxe (LVMH, L'Oreal), et bien d'autres. La majorite sont en mode hybride (2-3 jours sur site, reste en remote)."
  },
  {
    category: "Missions",
    question: "Je peux refuser une mission proposee ?",
    answer: "Bien sur. Vous etes freelance, vous restez maitre de vos choix. Nous vous proposons des missions, vous decidez d'accepter ou non. Aucune obligation, aucune penalite."
  },
  {
    category: "Missions",
    question: "Je suis deja en mission, puis-je m'inscrire ?",
    answer: "Absolument. Beaucoup de nos freelances s'inscrivent en avance pour anticiper la fin de leur mission actuelle. Des que votre mission se termine, nous pouvons vous proposer de nouvelles opportunites immediatement."
  },
  // Paiement
  {
    category: "Paiement",
    question: "Comment fonctionne le paiement ?",
    answer: "Vous facturez DirectCabinet directement. Nous garantissons le paiement a 30 jours, meme si le client final met plus longtemps a nous payer. Vous n'avez pas a vous soucier des relances ou des retards de paiement."
  },
  {
    category: "Paiement",
    question: "Que se passe-t-il si le client ne paie pas ?",
    answer: "C'est notre probleme, pas le votre. Nous garantissons votre paiement. Si le client final a des difficultes, nous prenons le risque. C'est l'un des avantages de passer par un cabinet, mais sans la marge excessive."
  },
  {
    category: "Paiement",
    question: "Je dois etre en portage salarial ?",
    answer: "Non, vous pouvez facturer en tant qu'auto-entrepreneur, en SASU, ou via une societe de portage si vous preferez. C'est vous qui choisissez votre statut juridique. Nous nous adaptons."
  },
  // Juridique
  {
    category: "Juridique",
    question: "Y a-t-il un risque de requalification ?",
    answer: "Non. Nous gerons les contrats pour garantir votre independance. Vous n'etes pas sous la subordination du client final. Nous veillons a ce que les conditions de votre mission respectent le cadre legal du freelancing."
  },
  {
    category: "Juridique",
    question: "Quelle est la duree d'engagement ?",
    answer: "Aucun engagement de duree avec DirectCabinet. Vous pouvez arreter de travailler avec nous quand vous voulez. Pour les missions, les durees sont definies avec le client (generalement 6 mois minimum renouvelables)."
  },
];

const CATEGORIES = [...new Set(FAQS.map(faq => faq.category))];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFAQs = activeCategory === 'all'
    ? FAQS
    : FAQS.filter(faq => faq.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimateOnScroll animation="fadeInUp">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
              <span className="text-sm text-gray-300">Questions frequentes</span>
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              FAQ
            </h1>
            <p className="text-xl text-gray-400 max-w-xl mx-auto">
              Tout ce que vous devez savoir sur DirectCabinet
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filters */}
          <AnimateOnScroll animation="fadeInUp">
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                Toutes les questions
              </button>
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-slate-900 text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimateOnScroll>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <AnimateOnScroll key={index} animation="fadeInUp" delay={index * 50}>
                <div className="card-premium overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-lg">
                        {faq.category}
                      </span>
                      <span className="font-semibold text-slate-900">{faq.question}</span>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-5">
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* CTA */}
          <AnimateOnScroll animation="fadeInUp">
            <div className="mt-12 card-premium p-8 text-center bg-gradient-to-r from-slate-900 to-slate-800">
              <h2 className="text-2xl font-bold text-white mb-2">
                Vous avez d'autres questions ?
              </h2>
              <p className="text-gray-400 mb-6">
                Notre equipe est disponible pour repondre a toutes vos interrogations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/inscription" className="btn-primary inline-block">
                  Rejoindre DirectCabinet
                </Link>
                <a
                  href="mailto:contact@directcabinet.fr"
                  className="px-6 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
                >
                  Nous contacter
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
