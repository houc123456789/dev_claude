'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [tjm, setTjm] = useState(700);
  const [days, setDays] = useState(220);

  const esnMargin = 0.35;
  const dcMargin = 0.05;

  const esnAnnual = tjm * (1 - esnMargin) * days;
  const dcAnnual = tjm * (1 - dcMargin) * days;
  const difference = dcAnnual - esnAnnual;

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <span className="text-sm text-gray-300">Tarification transparente</span>
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            5% de commission.
            <span className="block gradient-text mt-2">C'est tout.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Pas de frais caches. Pas de surprise. Vous savez exactement ce que vous gardez.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 -mt-16 relative z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-premium p-8 md:p-12">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Calculez ce que vous gardez vraiment
              </h2>
              <p className="text-gray-500">Ajustez les curseurs pour voir la difference</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700">TJM client</label>
                  <span className="text-2xl font-bold text-emerald-600">{tjm} EUR</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="1200"
                  step="50"
                  value={tjm}
                  onChange={(e) => setTjm(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>400 EUR</span>
                  <span>1200 EUR</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700">Jours travailles / an</label>
                  <span className="text-2xl font-bold text-emerald-600">{days} jours</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="250"
                  step="10"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>100 jours</span>
                  <span>250 jours</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* ESN */}
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Via ESN</div>
                    <div className="text-xs text-gray-500">35% de marge</div>
                  </div>
                </div>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between py-2 border-b border-slate-200">
                    <span className="text-gray-600">Vous recevez/jour</span>
                    <span className="font-medium">{Math.round(tjm * (1 - esnMargin))} EUR</span>
                  </div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <div className="text-xs text-gray-500 mb-1">Revenu annuel</div>
                  <div className="text-2xl font-bold text-red-600">{esnAnnual.toLocaleString()} EUR</div>
                </div>
              </div>

              {/* DirectCabinet */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-2xl blur-lg opacity-20"></div>
                <div className="relative p-6 bg-white rounded-2xl border-2 border-emerald-300 shadow-xl">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-sky-500 text-white text-xs font-semibold rounded-full">
                      DirectCabinet
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-6 mt-2">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Avec nous</div>
                      <div className="text-xs text-gray-500">5% de commission</div>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-gray-600">Vous recevez/jour</span>
                      <span className="font-medium text-emerald-600">{Math.round(tjm * (1 - dcMargin))} EUR</span>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-emerald-50 rounded-xl">
                    <div className="text-xs text-gray-500 mb-1">Revenu annuel</div>
                    <div className="text-2xl font-bold text-emerald-600">{dcAnnual.toLocaleString()} EUR</div>
                  </div>
                </div>
              </div>

              {/* Gain */}
              <div className="p-6 bg-slate-900 rounded-2xl text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold">Votre gain</div>
                    <div className="text-xs text-gray-400">vs une ESN</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Par jour</div>
                    <div className="text-xl font-bold text-emerald-400">+{Math.round(tjm * (esnMargin - dcMargin))} EUR</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Par an</div>
                    <div className="text-3xl font-bold text-emerald-400">+{difference.toLocaleString()} EUR</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link href="/inscription" className="btn-primary text-lg inline-block">
                Garder +{difference.toLocaleString()} EUR cette annee
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Pricing */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-600 text-sm font-medium rounded-full mb-4">
              Notre modele
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple et transparent
            </h2>
          </div>

          <div className="card-premium p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-7xl font-bold gradient-text mb-4">5%</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  C'est tout. Point final.
                </h3>
                <ul className="space-y-4">
                  {[
                    'Inscription gratuite',
                    'Pas d\'abonnement',
                    'Pas de frais d\'entree',
                    'Commission uniquement sur missions signees'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6">
                <h4 className="font-semibold text-slate-900 mb-6">Exemple concret</h4>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-3 border-b border-slate-200">
                    <span className="text-gray-600">Client final paie</span>
                    <span className="font-semibold">800 EUR/jour</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-slate-200">
                    <span className="text-gray-600">Notre commission (5%)</span>
                    <span className="font-semibold text-emerald-600">-40 EUR/jour</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-slate-900 font-semibold">Vous recevez</span>
                    <span className="text-2xl font-bold text-emerald-600">760 EUR/jour</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-slate-200/50 rounded-xl text-center">
                  <span className="text-sm text-gray-600">Avec une ESN, vous auriez touche </span>
                  <span className="font-semibold text-red-500">520 EUR/jour</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-sky-50 text-sky-600 text-sm font-medium rounded-full mb-4">
              Comparatif
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Pourquoi DirectCabinet ?
            </h2>
          </div>

          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left p-6 font-semibold text-slate-600"></th>
                    <th className="p-6 text-center font-semibold text-slate-600">ESN / Cabinet</th>
                    <th className="p-6 text-center font-semibold text-slate-600">Malt / Direct</th>
                    <th className="p-6 text-center font-semibold text-slate-600 bg-emerald-50">DirectCabinet</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: 'Vous gardez', esn: '50-70%', malt: '85-90%', dc: '95%' },
                    { label: 'Acces grands comptes', esn: 'Oui', malt: 'Non', dc: 'Oui' },
                    { label: 'Missions longue duree', esn: 'Oui', malt: 'Rare', dc: 'Oui' },
                    { label: 'Transparence TJM', esn: 'Jamais', malt: 'Oui', dc: 'Totale' },
                    { label: 'Paiement garanti', esn: 'Variable', malt: 'Non', dc: 'Oui' },
                    { label: 'Gestion admin', esn: 'Oui', malt: 'A vous', dc: 'Oui' },
                  ].map((row, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="p-6 font-medium text-slate-900">{row.label}</td>
                      <td className="p-6 text-center">
                        <span className={row.esn === 'Oui' ? 'text-emerald-600' : row.esn === 'Non' || row.esn === 'Jamais' || row.esn === 'Variable' ? 'text-red-500' : 'text-slate-600'}>
                          {row.esn}
                        </span>
                      </td>
                      <td className="p-6 text-center">
                        <span className={row.malt === 'Oui' ? 'text-emerald-600' : row.malt === 'Non' || row.malt === 'Rare' || row.malt === 'A vous' ? 'text-red-500' : 'text-slate-600'}>
                          {row.malt}
                        </span>
                      </td>
                      <td className="p-6 text-center bg-emerald-50">
                        <span className="font-semibold text-emerald-600">{row.dc}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-violet-50 text-violet-600 text-sm font-medium rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Questions frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'Comment vous faites pour prendre seulement 5% ?',
                a: 'On a automatise la plupart des processus (matching, contrats, facturation). Pas de commerciaux a payer. Pas de bureaux dans Paris 8e. On repercute ces economies sur vous.'
              },
              {
                q: 'Comment accedez-vous aux grands comptes ?',
                a: 'On est references chez les grandes entreprises comme cabinet de placement. La difference : on ne prend pas 40% de marge au passage.'
              },
              {
                q: 'Quand est-ce que je suis paye ?',
                a: 'On vous paie a 30 jours apres facture, meme si le client met plus de temps. Vous n\'avez pas a vous soucier des retards de paiement.'
              },
              {
                q: 'Est-ce que je peux negocier mon TJM ?',
                a: 'Oui. Et contrairement aux ESN, on vous dit exactement ce que paie le client. Pas de "budget serre" quand le client paie en realite le double.'
              },
              {
                q: 'Y a-t-il une clause d\'exclusivite ?',
                a: 'Non. Vous etes libre de travailler avec qui vous voulez. On n\'est pas la pour vous enfermer. On est la pour vous trouver des missions bien payees.'
              }
            ].map((item, i) => (
              <div key={i} className="card-premium p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-3">{item.q}</h3>
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Pret a garder 95% ?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Inscription en 5 minutes. Verification sous 48h. Premieres missions dans la semaine.
          </p>
          <Link href="/inscription" className="btn-primary text-lg inline-block">
            Rejoindre DirectCabinet
          </Link>
        </div>
      </section>
    </>
  );
}
