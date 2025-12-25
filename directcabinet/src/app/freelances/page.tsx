import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pour les Freelances | DirectCabinet',
  description: 'Gardez 95% de votre TJM au lieu de 65%. Accedez aux missions grands comptes sans prospection. Rejoignez DirectCabinet.',
};

export default function FreelancesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Gardez 95% de votre TJM.
              <span className="block text-emerald-200">Pas 65% comme avec les ESN.</span>
            </h1>
            <p className="text-xl text-emerald-100 mb-8">
              DirectCabinet vous place chez les grands comptes qui ne passent QUE par des cabinets.
              Sans prendre 30% de marge sur votre dos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/inscription?type=freelance"
                className="px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors text-center"
              >
                Rejoindre le collectif
              </Link>
              <Link
                href="#avantages"
                className="px-8 py-4 bg-emerald-700 text-white font-semibold rounded-lg border-2 border-white hover:bg-emerald-600 transition-colors text-center"
              >
                Voir les avantages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Le probleme quand on est freelance
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Option 1 : Passer par Malt / Crème</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 text-xl">OK</span>
                  <span className="text-gray-600">Vous gardez 90%+ de votre TJM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl">X</span>
                  <span className="text-gray-600">Mais les grands comptes n y vont JAMAIS</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl">X</span>
                  <span className="text-gray-600">Missions courtes, petits clients</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl">X</span>
                  <span className="text-gray-600">Il faut prospecter en permanence</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Option 2 : Passer par une ESN/Cabinet</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 text-xl">OK</span>
                  <span className="text-gray-600">Acces aux grands comptes (BNP, Total, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 text-xl">OK</span>
                  <span className="text-gray-600">Missions longues, stables</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl">X</span>
                  <span className="text-gray-600">Mais ils prennent 30-50% de marge !</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 text-xl">X</span>
                  <span className="text-gray-600">Vous facturez 600 euros, client paie 900 euros</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 max-w-3xl mx-auto text-center">
            <div className="bg-emerald-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">DirectCabinet = Le meilleur des deux mondes</h3>
              <p className="text-lg text-gray-700">
                Acces aux missions grands comptes <strong>ET</strong> vous gardez 95% de votre TJM.
                On prend 5% maximum. Transparent, affiche, non negociable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Combien vous gardez vraiment ?
            </h2>
            <p className="text-xl text-gray-600">
              Comparaison pour un TJM client de 700 euros/jour
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">ESN / Cabinet classique</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Client paie</span>
                  <span className="font-medium">700 euros</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Marge cabinet</span>
                  <span className="font-medium">-210 euros (30%)</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Vous recevez</span>
                  <span className="font-bold text-xl">490 euros</span>
                </div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-red-700 font-medium">Sur 1 an (200j)</div>
                <div className="text-red-600 text-2xl font-bold">98 000 euros</div>
                <div className="text-red-500 text-sm">42 000 euros partis dans les poches du cabinet</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-emerald-400 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommande
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">DirectCabinet</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Client paie</span>
                  <span className="font-medium">700 euros</span>
                </div>
                <div className="flex justify-between text-emerald-600">
                  <span>Notre part</span>
                  <span className="font-medium">-35 euros (5%)</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Vous recevez</span>
                  <span className="font-bold text-xl text-emerald-600">665 euros</span>
                </div>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <div className="text-emerald-700 font-medium">Sur 1 an (200j)</div>
                <div className="text-emerald-600 text-2xl font-bold">133 000 euros</div>
                <div className="text-emerald-500 text-sm">+35 000 euros vs cabinet traditionnel !</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Malt / Direct</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Client paie</span>
                  <span className="font-medium">700 euros</span>
                </div>
                <div className="flex justify-between text-amber-600">
                  <span>Commission</span>
                  <span className="font-medium">-70 euros (10%)</span>
                </div>
                <div className="flex justify-between border-t pt-3">
                  <span className="font-semibold">Vous recevez</span>
                  <span className="font-bold text-xl">630 euros</span>
                </div>
              </div>
              <div className="text-center p-4 bg-amber-50 rounded-lg">
                <div className="text-amber-700 font-medium">MAIS</div>
                <div className="text-amber-600 text-lg font-bold">Pas d acces grands comptes</div>
                <div className="text-amber-500 text-sm">Missions courtes, prospection permanente</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="avantages" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce qu on vous apporte
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Acces Grands Comptes</h3>
              <p className="text-gray-600">
                BNP, Total, Orange, L Oreal... Des missions chez des clients qui ne vont JAMAIS sur Malt.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">95% pour vous</h3>
              <p className="text-gray-600">
                On prend 5% max. C est ecrit, c est affiche, c est non negociable.
                Fini les marges cachees.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zero prospection</h3>
              <p className="text-gray-600">
                Les missions viennent a vous. Pas de CV a envoyer en masse,
                pas de relances sans reponse.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Paiement garanti</h3>
              <p className="text-gray-600">
                On vous paie meme si le client tarde. Gestion des litiges,
                assurance impayes incluse.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Contact direct client</h3>
              <p className="text-gray-600">
                Pas d intermediaire opaque. Vous connaissez le client,
                le client vous connait. Relation saine.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Communaute freelance</h3>
              <p className="text-gray-600">
                Entraide, partage de missions, conseils entre pairs.
                Vous n etes plus seul.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Qui peut rejoindre ?
            </h2>
            <p className="text-xl text-gray-600">
              On selectionne les profils pour garantir la qualite a nos clients.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-emerald-600 mb-4">Ce qu on recherche</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">OK</span>
                    <span className="text-gray-700">5+ ans d experience dans votre domaine</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">OK</span>
                    <span className="text-gray-700">3+ references verifiables</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">OK</span>
                    <span className="text-gray-700">Specialite claire (Data, DevOps, Cloud, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">OK</span>
                    <span className="text-gray-700">TJM entre 400 et 900 euros</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">OK</span>
                    <span className="text-gray-700">Disponible en IDF ou full remote</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-4">Ce qu on n accepte pas</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">X</span>
                    <span className="text-gray-700">CV gonfle ou experiences inventees</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">X</span>
                    <span className="text-gray-700">Profils junior deguises en senior</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">X</span>
                    <span className="text-gray-700">Freelances sans structure juridique</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">X</span>
                    <span className="text-gray-700">Pas de references verifiables</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ca marche
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inscrivez-vous</h3>
              <p className="text-gray-600">
                5 minutes pour creer votre profil. C est gratuit.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">On vous valide</h3>
              <p className="text-gray-600">
                Verification de vos references et competences. Call de 15 min.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recevez des missions</h3>
              <p className="text-gray-600">
                On vous envoie les opportunites qui matchent votre profil.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Facturez et gagnez</h3>
              <p className="text-gray-600">
                On gere l admin. Vous facturez. On prend 5%. Simple.
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
            Inscription gratuite. On vous recontacte sous 48h.
          </p>
          <Link
            href="/inscription?type=freelance"
            className="inline-block px-8 py-4 bg-white text-emerald-700 font-semibold rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Rejoindre DirectCabinet
          </Link>
        </div>
      </section>
    </>
  );
}
