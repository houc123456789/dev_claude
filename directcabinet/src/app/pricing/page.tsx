'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function PricingPage() {
  const [tjm, setTjm] = useState(600);
  const [duration, setDuration] = useState(120);

  const cabinetRate = 0.30;
  const directCabinetFee = 50;

  const cabinetCostPerDay = tjm * (1 + cabinetRate);
  const directCabinetCostPerDay = tjm + directCabinetFee;
  const savingsPerDay = cabinetCostPerDay - directCabinetCostPerDay;

  const cabinetTotal = cabinetCostPerDay * duration;
  const directCabinetTotal = directCabinetCostPerDay * duration;
  const totalSavings = cabinetTotal - directCabinetTotal;

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Tarifs 100% transparents
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pas de marge cachee. Pas de surprise. Vous savez exactement ce que vous payez.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 -mt-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Calculez vos economies
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TJM du freelance (euros)
                </label>
                <input
                  type="range"
                  min="300"
                  max="1200"
                  step="50"
                  value={tjm}
                  onChange={(e) => setTjm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">300 euros</span>
                  <span className="text-2xl font-bold text-blue-600">{tjm} euros</span>
                  <span className="text-sm text-gray-500">1200 euros</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duree de la mission (jours)
                </label>
                <input
                  type="range"
                  min="20"
                  max="250"
                  step="10"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-sm text-gray-500">1 mois</span>
                  <span className="text-2xl font-bold text-blue-600">{duration} jours</span>
                  <span className="text-sm text-gray-500">1 an</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-sm mr-2">X</span>
                  Cabinet classique
                </h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">TJM freelance</span>
                    <span>{tjm} euros</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Marge 30%</span>
                    <span>+{Math.round(tjm * cabinetRate)} euros</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Cout/jour</span>
                    <span className="text-red-600">{Math.round(cabinetCostPerDay)} euros</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Total mission</span>
                    <span className="text-xl font-bold text-red-600">{cabinetTotal.toLocaleString()} euros</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-xl p-6 border-2 border-emerald-400 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Recommande
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                  <span className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm mr-2">OK</span>
                  DirectCabinet
                </h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">TJM freelance</span>
                    <span>{tjm} euros</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Frais fixes</span>
                    <span>+{directCabinetFee} euros</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Cout/jour</span>
                    <span className="text-emerald-600">{directCabinetCostPerDay} euros</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Total mission</span>
                    <span className="text-xl font-bold text-emerald-600">{directCabinetTotal.toLocaleString()} euros</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-600 rounded-xl p-6 text-white">
                <h3 className="font-bold mb-4">Vos economies</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-blue-200 text-sm">Par jour</div>
                    <div className="text-3xl font-bold">{Math.round(savingsPerDay)} euros</div>
                  </div>
                  <div>
                    <div className="text-blue-200 text-sm">Sur la mission</div>
                    <div className="text-4xl font-bold">{totalSavings.toLocaleString()} euros</div>
                  </div>
                  <div className="pt-4 border-t border-blue-500">
                    <div className="text-blue-200 text-sm">Soit</div>
                    <div className="text-2xl font-bold">
                      {Math.round((savingsPerDay / cabinetCostPerDay) * 100)}% d economies
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/inscription?type=entreprise"
                className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Economiser {totalSavings.toLocaleString()} euros maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nos formules
            </h2>
            <p className="text-xl text-gray-600">
              Choisissez la formule adaptee a vos besoins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pay per placement */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Pay per placement</h3>
                <p className="text-gray-600 mt-2">Pour les besoins ponctuels</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600">50 euros</div>
                <div className="text-gray-600">/jour facture</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">3 profils en 48h</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Profils verifies</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Remplacement 7j garanti</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Facturation centralisee</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Support email</span>
                </li>
              </ul>
              <Link
                href="/inscription?type=entreprise"
                className="block text-center px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Commencer
              </Link>
            </div>

            {/* Pack Volume */}
            <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-blue-500 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Populaire
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Pack Volume</h3>
                <p className="text-gray-600 mt-2">Pour 5+ freelances</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600">5000 euros</div>
                <div className="text-gray-600">/mois</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Jusqu a 5 freelances</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 font-medium">0 euros de frais/jour</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Account manager dedie</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Remplacement prioritaire</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Reporting mensuel</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Nous contacter
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Enterprise</h3>
                <p className="text-gray-600 mt-2">Pour 10+ freelances</p>
              </div>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600">Sur mesure</div>
                <div className="text-gray-600">tarif negocie</div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Freelances illimites</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Tarifs degr essifs</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Equipe dediee</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">SLA garanti</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Integration API</span>
                </li>
              </ul>
              <Link
                href="/contact"
                className="block text-center px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Freelance Pricing */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pour les freelances
            </h2>
            <p className="text-xl text-gray-600">
              Inscription et acces aux opportunites : gratuit.
            </p>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-8 md:p-12 border-2 border-emerald-200">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  5% sur les missions signees
                </h3>
                <p className="text-gray-700 mb-6">
                  On ne prend notre part QUE quand vous signez une mission via DirectCabinet.
                  Pas d abonnement, pas de frais caches.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Inscription gratuite</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Acces aux opportunites gratuit</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">Paiement garanti</span>
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="text-6xl font-bold text-emerald-600 mb-2">95%</div>
                <div className="text-xl text-gray-700">de votre TJM pour vous</div>
                <div className="mt-6 text-gray-600">
                  Contre 65-70% avec une ESN traditionnelle
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
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
                  <th className="text-left p-4">Critere</th>
                  <th className="p-4 text-center">ESN / Cabinet</th>
                  <th className="p-4 text-center">Malt</th>
                  <th className="p-4 text-center bg-blue-50">DirectCabinet</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Marge prelevee</td>
                  <td className="p-4 text-center text-red-600">30-50%</td>
                  <td className="p-4 text-center text-amber-600">10-15%</td>
                  <td className="p-4 text-center text-emerald-600 bg-blue-50 font-bold">8-10%</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Acces grands comptes</td>
                  <td className="p-4 text-center text-emerald-600">Oui</td>
                  <td className="p-4 text-center text-red-600">Non</td>
                  <td className="p-4 text-center text-emerald-600 bg-blue-50 font-bold">Oui</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Transparence tarifs</td>
                  <td className="p-4 text-center text-red-600">Non</td>
                  <td className="p-4 text-center text-amber-600">Partielle</td>
                  <td className="p-4 text-center text-emerald-600 bg-blue-50 font-bold">Totale</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Profils verifies</td>
                  <td className="p-4 text-center text-amber-600">Variable</td>
                  <td className="p-4 text-center text-red-600">Non</td>
                  <td className="p-4 text-center text-emerald-600 bg-blue-50 font-bold">Oui</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Remplacement garanti</td>
                  <td className="p-4 text-center text-emerald-600">Oui</td>
                  <td className="p-4 text-center text-red-600">Non</td>
                  <td className="p-4 text-center text-emerald-600 bg-blue-50 font-bold">Oui (7j)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Contact direct client</td>
                  <td className="p-4 text-center text-red-600">Non</td>
                  <td className="p-4 text-center text-emerald-600">Oui</td>
                  <td className="p-4 text-center text-emerald-600 bg-blue-50 font-bold">Oui</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions frequentes
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Pourquoi seulement 50 euros/jour ?
              </h3>
              <p className="text-gray-600">
                On a automatise la plupart des processus (matching, contrats, facturation).
                On n a pas de commerciaux a payer. On repercute ces economies sur nos clients.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Comment garantissez-vous la qualite des freelances ?
              </h3>
              <p className="text-gray-600">
                Chaque freelance passe par un process de verification : appel de references (3 minimum),
                verification SIRET et assurances, test technique si necessaire.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Que se passe-t-il si le freelance ne convient pas ?
              </h3>
              <p className="text-gray-600">
                Remplacement garanti sous 7 jours ouvrés. Les 5 premiers jours sont remboursables
                si vous n etes pas satisfait. Zero risque.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Les freelances peuvent-ils devenir CDI chez nous ?
              </h3>
              <p className="text-gray-600">
                Oui, sans frais supplementaires apres 6 mois de mission. Pas de clause d exclusivite
                abusive comme chez certains cabinets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pret a economiser ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Premier placement : sourcing gratuit. Vous ne payez que si vous signez.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inscription?type=entreprise"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Je cherche un freelance
            </Link>
            <Link
              href="/inscription?type=freelance"
              className="px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg border-2 border-white hover:bg-blue-400 transition-colors"
            >
              Je suis freelance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
