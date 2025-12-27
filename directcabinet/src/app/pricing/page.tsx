'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [tjm, setTjm] = useState(700);
  const [duration, setDuration] = useState(220);

  const esnMargin = 0.35;
  const directCabinetMargin = 0.05;

  const esnRevenue = tjm * (1 - esnMargin) * duration;
  const directCabinetRevenue = tjm * (1 - directCabinetMargin) * duration;
  const difference = directCabinetRevenue - esnRevenue;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-900 to-emerald-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            5% de commission. C'est tout.
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto">
            Pas de frais caches. Pas de surprise. Vous savez exactement ce que vous gardez.
          </p>
        </div>
      </section>

      {/* Calculator - Freelance perspective */}
      <section className="py-20 -mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Calculez ce que vous gardez vraiment
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TJM client (ce que le client paie)
                </label>
                <input
                  type="range"
                  min="400"
                  max="1200"
                  step="50"
                  value={tjm}
                  onChange={(e) => setTjm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">400 euros</span>
                  <span className="text-2xl font-bold text-emerald-600">{tjm} euros/jour</span>
                  <span className="text-sm text-gray-500">1200 euros</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jours travailles par an
                </label>
                <input
                  type="range"
                  min="100"
                  max="250"
                  step="10"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">100 jours</span>
                  <span className="text-2xl font-bold text-emerald-600">{duration} jours</span>
                  <span className="text-sm text-gray-500">250 jours</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-2">X</span>
                  Avec une ESN
                </h3>
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Client paie</span>
                    <span>{tjm} euros/j</span>
                  </div>
                  <div className="flex justify-between text-red-600 font-medium">
                    <span>ESN prend 35%</span>
                    <span>-{Math.round(tjm * esnMargin)} euros/j</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Vous recevez</span>
                    <span className="text-red-600">{Math.round(tjm * (1 - esnMargin))} euros/j</span>
                  </div>
                </div>
                <div className="bg-red-100 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600">Sur l'annee</div>
                  <div className="text-2xl font-bold text-red-600">{esnRevenue.toLocaleString()} euros</div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-400 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    DirectCabinet
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm mr-2">OK</span>
                  Avec nous
                </h3>
                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Client paie</span>
                    <span>{tjm} euros/j</span>
                  </div>
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>On prend 5%</span>
                    <span>-{Math.round(tjm * directCabinetMargin)} euros/j</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Vous recevez</span>
                    <span className="text-emerald-600">{Math.round(tjm * (1 - directCabinetMargin))} euros/j</span>
                  </div>
                </div>
                <div className="bg-emerald-100 rounded-lg p-3 text-center">
                  <div className="text-sm text-gray-600">Sur l'annee</div>
                  <div className="text-2xl font-bold text-emerald-600">{directCabinetRevenue.toLocaleString()} euros</div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 text-white">
                <h3 className="font-bold mb-4">Votre gain</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-gray-400 text-sm">Par jour</div>
                    <div className="text-3xl font-bold text-emerald-400">+{Math.round(tjm * (esnMargin - directCabinetMargin))} euros</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Sur l'annee</div>
                    <div className="text-4xl font-bold text-emerald-400">+{difference.toLocaleString()} euros</div>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <div className="text-gray-400 text-sm">Vous gardez</div>
                    <div className="text-2xl font-bold">
                      95% au lieu de 65%
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/inscription"
                className="inline-block px-8 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Garder {difference.toLocaleString()} euros de plus cette annee
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Simple pricing */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre modele est simple
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border-2 border-emerald-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-6xl font-bold text-emerald-600 mb-4">5%</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  C'est tout. Point final.
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Inscription gratuite</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Pas d'abonnement</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Pas de frais d'entree</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-emerald-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>On prend 5% seulement sur les missions signees</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-bold text-gray-900 mb-4">Exemple concret :</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Client final paie</span>
                    <span className="font-medium">800 euros/jour</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-600">Notre commission (5%)</span>
                    <span className="font-medium text-emerald-600">40 euros/jour</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-lg">
                    <span>Vous recevez</span>
                    <span className="text-emerald-600">760 euros/jour</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-500">
                  Avec une ESN, vous auriez touche 520 euros/jour...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comparatif des solutions
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-lg">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4"></th>
                  <th className="p-4 text-center">ESN / Cabinet</th>
                  <th className="p-4 text-center">Malt / Direct</th>
                  <th className="p-4 text-center bg-emerald-50">DirectCabinet</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Vous gardez</td>
                  <td className="p-4 text-center text-red-600 font-bold">50-70%</td>
                  <td className="p-4 text-center text-amber-600 font-bold">85-90%</td>
                  <td className="p-4 text-center text-emerald-600 bg-emerald-50 font-bold">95%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Acces grands comptes</td>
                  <td className="p-4 text-center text-emerald-600">Oui</td>
                  <td className="p-4 text-center text-red-600">Non</td>
                  <td className="p-4 text-center text-emerald-600 bg-emerald-50 font-bold">Oui</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Missions longue duree</td>
                  <td className="p-4 text-center text-emerald-600">Oui</td>
                  <td className="p-4 text-center text-red-600">Rare</td>
                  <td className="p-4 text-center text-emerald-600 bg-emerald-50 font-bold">Oui</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Transparence TJM client</td>
                  <td className="p-4 text-center text-red-600">Jamais</td>
                  <td className="p-4 text-center text-emerald-600">Oui</td>
                  <td className="p-4 text-center text-emerald-600 bg-emerald-50 font-bold">Totale</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Paiement garanti</td>
                  <td className="p-4 text-center text-amber-600">Variable</td>
                  <td className="p-4 text-center text-red-600">Non</td>
                  <td className="p-4 text-center text-emerald-600 bg-emerald-50 font-bold">Oui</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Gestion admin/contrats</td>
                  <td className="p-4 text-center text-emerald-600">Oui</td>
                  <td className="p-4 text-center text-red-600">A votre charge</td>
                  <td className="p-4 text-center text-emerald-600 bg-emerald-50 font-bold">Oui</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions frequentes
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Comment vous faites pour prendre seulement 5% ?
              </h3>
              <p className="text-gray-600">
                On a automatise la plupart des processus (matching, contrats, facturation).
                Pas de commerciaux a payer. Pas de bureaux dans Paris 8e. On repercute ces economies sur vous.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Comment accedez-vous aux grands comptes ?
              </h3>
              <p className="text-gray-600">
                On est referentces chez les grandes entreprises comme cabinet de placement.
                La difference : on ne prend pas 40% de marge au passage.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Quand est-ce que je suis paye ?
              </h3>
              <p className="text-gray-600">
                On vous paie a 30 jours apres facture, meme si le client met plus de temps.
                Vous n'avez pas a vous soucier des retards de paiement.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Est-ce que je peux negocier mon TJM ?
              </h3>
              <p className="text-gray-600">
                Oui. Et contrairement aux ESN, on vous dit exactement ce que paie le client.
                Pas de "budget serre" quand le client paie en realite le double de ce qu'on vous propose.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Y a-t-il une clause d'exclusivite ?
              </h3>
              <p className="text-gray-600">
                Non. Vous etes libre de travailler avec qui vous voulez.
                On n'est pas la pour vous enfermer. On est la pour vous trouver des missions bien payees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pret a garder 95% de votre TJM ?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Inscription en 5 minutes. Verification sous 48h. Premieres missions dans la semaine.
          </p>
          <Link
            href="/inscription"
            className="inline-block px-10 py-5 bg-white text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition-colors text-lg"
          >
            Rejoindre DirectCabinet
          </Link>
        </div>
      </section>
    </>
  );
}
