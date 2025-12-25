import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pour les Entreprises | DirectCabinet',
  description: 'Trouvez les meilleurs freelances IT avec 30% d\'économies. Profils vérifiés, remplacement garanti, marge transparente.',
};

export default function EntreprisesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Recrutez les meilleurs freelances IT.
              <span className="block text-emerald-300">Sans payer 30% de marge cachee.</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              DirectCabinet vous donne acces aux memes profils que les grands cabinets,
              avec une marge fixe et transparente de 50 euros/jour.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/inscription?type=entreprise"
                className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center"
              >
                Poster un besoin gratuitement
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg border-2 border-white hover:bg-blue-500 transition-colors text-center"
              >
                Calculer mes economies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              On connait vos problemes avec les cabinets
            </h2>
            <p className="text-xl text-gray-600">
              Vous passez par des cabinets pour de bonnes raisons. Mais vous payez trop cher.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Securite juridique</h3>
              <p className="text-gray-600 mb-4">
                Vous voulez un contrat avec UNE entite, pas 50 freelances. Risque de requalification gere.
              </p>
              <p className="text-emerald-600 font-medium">
                OK DirectCabinet gere tout ca. Contrat unique, zero risque.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Profils verifies</h3>
              <p className="text-gray-600 mb-4">
                Vous ne voulez pas perdre 3 semaines avec un charlatan. Le cabinet a pre-verifie.
              </p>
              <p className="text-emerald-600 font-medium">
                OK On verifie les references, les competences, le SIRET. Rigoureusement.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="text-3xl mb-4">📄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Facturation simplifiee</h3>
              <p className="text-gray-600 mb-4">
                Votre DAF refuse de payer 50 auto-entrepreneurs. Vous voulez UNE facture.
              </p>
              <p className="text-emerald-600 font-medium">
                OK Facturation centralisee, delais de paiement, une seule facture.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="text-3xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Remplacement garanti</h3>
              <p className="text-gray-600 mb-4">
                Si le freelance disparait, vous avez besoin d un remplacant rapidement.
              </p>
              <p className="text-emerald-600 font-medium">
                OK Remplacement sous 7 jours, garanti par contrat.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Zero responsabilite RH</h3>
              <p className="text-gray-600 mb-4">
                Pas de relation directe = pas de probleme de conges, absences, conflits.
              </p>
              <p className="text-emerald-600 font-medium">
                OK On gere la relation. Vous vous concentrez sur le projet.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="text-3xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">MAIS... 30% de marge ?</h3>
              <p className="text-gray-600 mb-4">
                Vous payez 780 euros pour un freelance a 600 euros. Ca fait 10 000+ euros/mois perdus.
              </p>
              <p className="text-emerald-600 font-medium">
                OK Avec nous : 600 euros + 50 euros = 650 euros. Transparent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comparez les couts sur 6 mois
            </h2>
            <p className="text-xl text-gray-600">
              Pour un Data Engineer a 600 euros/jour TJM
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-red-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-red-600">X</span>
                </span>
                Cabinet classique
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">TJM freelance</span>
                  <span className="font-medium">600 euros</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Marge cabinet (30%)</span>
                  <span className="font-medium text-red-600">+180 euros</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <span className="text-gray-900 font-semibold">Cout journalier</span>
                  <span className="font-bold text-red-600">780 euros</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sur 6 mois (120 jours)</span>
                  <span className="font-bold text-2xl text-red-600">93 600 euros</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-emerald-400">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-emerald-600">OK</span>
                </span>
                DirectCabinet
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">TJM freelance</span>
                  <span className="font-medium">600 euros</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Frais fixes</span>
                  <span className="font-medium text-emerald-600">+50 euros</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <span className="text-gray-900 font-semibold">Cout journalier</span>
                  <span className="font-bold text-emerald-600">650 euros</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sur 6 mois (120 jours)</span>
                  <span className="font-bold text-2xl text-emerald-600">78 000 euros</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg text-center">
                <div className="text-emerald-700 font-semibold">Economie sur 6 mois</div>
                <div className="text-emerald-600 text-3xl font-bold">15 600 euros</div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-blue-600 font-medium hover:text-blue-700"
            >
              Calculer avec vos propres chiffres →
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ca fonctionne pour vous
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">1. Decrivez le besoin</h3>
              <p className="text-gray-600">
                Remplissez notre formulaire en 5 minutes. Competences, duree, budget.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">2. Recevez 3 profils</h3>
              <p className="text-gray-600">
                Sous 48h, 3 freelances verifies avec leur VRAI TJM. Pas de surenchere.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">3. Entretiens directs</h3>
              <p className="text-gray-600">
                Vous rencontrez les freelances. Contact direct, transparent.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">4. Mission lancee</h3>
              <p className="text-gray-600">
                Contrat signe, mission lancee. Vous payez TJM + 50 euros/jour.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Nos garanties entreprise
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-white">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">3 profils en 48h</h3>
              <p className="text-blue-100">
                Ou votre premier placement est gratuit
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-2">Remplacement 7j</h3>
              <p className="text-blue-100">
                Si le freelance ne convient pas
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">Contrat securise</h3>
              <p className="text-blue-100">
                Anti-requalification, assurances incluses
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Satisfait ou rembourse</h3>
              <p className="text-blue-100">
                5 premiers jours remboursables
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Pret a trouver votre prochain freelance ?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Premier placement : sourcing gratuit. Vous ne payez que si vous signez.
          </p>
          <Link
            href="/inscription?type=entreprise"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Poster mon besoin gratuitement
          </Link>
        </div>
      </section>
    </>
  );
}
