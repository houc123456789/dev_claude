import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6">
                Le staffing IT reinvente
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Toutes les garanties d&apos;un cabinet.
                <span className="block text-emerald-300">Sans les 30% de marge cachee.</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                DirectCabinet, c&apos;est le premier cabinet de placement IT a marge fixe et transparente.
                Vous payez le TJM du freelance + 50 euros/jour. Point final.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/entreprises"
                  className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-center"
                >
                  Je suis une entreprise
                </Link>
                <Link
                  href="/freelances"
                  className="px-8 py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors text-center"
                >
                  Je suis freelance
                </Link>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-blue-100">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Profils verifies
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Remplacement 7j
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Tarifs publics
                </div>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-white text-xl font-semibold mb-6">Comparez les couts</h3>
                <div className="space-y-4">
                  <div className="bg-red-500/20 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80">Cabinet classique</span>
                      <span className="text-red-300 font-bold">780 euros/jour</span>
                    </div>
                    <div className="text-sm text-white/60">TJM 600 euros + 30% marge cachee</div>
                  </div>
                  <div className="bg-emerald-500/20 rounded-lg p-4 border-2 border-emerald-400">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/80">DirectCabinet</span>
                      <span className="text-emerald-300 font-bold">650 euros/jour</span>
                    </div>
                    <div className="text-sm text-white/60">TJM 600 euros + 50 euros frais fixes</div>
                  </div>
                  <div className="text-center pt-4 border-t border-white/20">
                    <div className="text-emerald-300 text-2xl font-bold">-130 euros/jour</div>
                    <div className="text-white/60 text-sm">d&apos;economies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Le probleme avec les cabinets traditionnels
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vous payez 30% de marge cachee pour des services que vous pourriez avoir a prix transparent.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-red-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Cabinet classique</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">X</span>
                  Marge de 30-50% cachee dans le TJM
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">X</span>
                  Aucune transparence sur le vrai cout freelance
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">X</span>
                  Commercial qui gonfle les CVs
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">X</span>
                  Le freelance perd 200 euros/jour minimum
                </li>
              </ul>
              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <div className="text-red-700 font-semibold">Pour un freelance a 600 euros</div>
                <div className="text-red-600 text-2xl font-bold">Vous payez 780 euros/jour</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-emerald-500">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">DirectCabinet</h3>
              </div>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">OK</span>
                  Marge fixe de 50 euros/jour affichee publiquement
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">OK</span>
                  Vous voyez le vrai TJM du freelance
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">OK</span>
                  Profils verifies avec vraies references
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-2">OK</span>
                  Le freelance garde 95% de son TJM
                </li>
              </ul>
              <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                <div className="text-emerald-700 font-semibold">Pour un freelance a 600 euros</div>
                <div className="text-emerald-600 text-2xl font-bold">Vous payez 650 euros/jour</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Toutes les garanties d&apos;un cabinet premium
            </h2>
            <p className="text-xl text-gray-600">
              Ce qui est inclus dans les 50 euros/jour de frais de service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card-hover bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Sourcing et Matching</h3>
              <p className="text-gray-600">
                Base de freelances verifies, matching IA par competences. 3 profils qualifies en 48h.
              </p>
            </div>

            <div className="card-hover bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verification rigoureuse</h3>
              <p className="text-gray-600">
                Check des references par appel, test technique si besoin, verification SIRET et assurances.
              </p>
            </div>

            <div className="card-hover bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Securisation juridique</h3>
              <p className="text-gray-600">
                Contrats conformes, garantie anti-requalification, clause de remplacement integree.
              </p>
            </div>

            <div className="card-hover bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Gestion administrative</h3>
              <p className="text-gray-600">
                Facturation centralisee, suivi des temps, reporting mensuel automatise.
              </p>
            </div>

            <div className="card-hover bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-rose-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Support continu</h3>
              <p className="text-gray-600">
                Account manager dedie, mediation si conflit, remplacement garanti sous 7 jours.
              </p>
            </div>

            <div className="card-hover bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Paiement securise</h3>
              <p className="text-gray-600">
                On paye le freelance meme si le client tarde. Gestion des litiges, assurance impayes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">50</div>
              <div className="text-blue-200">Euros marge fixe par jour</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">30%</div>
              <div className="text-blue-200">D&apos;economies vs cabinets</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">48h</div>
              <div className="text-blue-200">Pour recevoir 3 profils</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">7j</div>
              <div className="text-blue-200">Garantie remplacement</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ca marche ?
            </h2>
            <p className="text-xl text-gray-600">
              Simple, rapide, transparent
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Decrivez votre besoin</h3>
              <p className="text-gray-600">
                Remplissez notre formulaire avec vos criteres techniques et fonctionnels
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recevez 3 profils</h3>
              <p className="text-gray-600">
                Sous 48h, nous vous envoyons 3 freelances qualifies avec leur vrai TJM
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Rencontrez-les</h3>
              <p className="text-gray-600">
                Entretiens directs avec les freelances. Contact transparent, sans intermediaire
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Demarrez la mission</h3>
              <p className="text-gray-600">
                Contrat signe, mission lancee. Vous payez TJM + 50 euros/jour. C&apos;est tout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils nous font confiance
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                &quot;On economise 2500 euros par mois sur notre equipe de 3 freelances. Et en plus, on voit enfin ce qu&apos;on paie vraiment.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">
                  SC
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Sophie C.</div>
                  <div className="text-gray-500 text-sm">CTO, Scale-up FinTech</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                &quot;Apres 8 ans en ESN, je gardais 65% de mon TJM. Maintenant j&apos;en garde 95%. Je ne reviendrai jamais en arriere.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold mr-4">
                  ML
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Marc L.</div>
                  <div className="text-gray-500 text-sm">Data Engineer Freelance</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6">
                &quot;Enfin un interlocuteur honnete ! Le freelance et moi savons exactement ce que l&apos;autre gagne. Ca change tout.&quot;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-4">
                  AD
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Antoine D.</div>
                  <div className="text-gray-500 text-sm">Directeur Tech, PME Retail</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pret a economiser 30% sur vos freelances ?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Rejoignez les entreprises qui ont choisi la transparence. Premier placement offert.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/inscription?type=entreprise"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Trouver un freelance
            </Link>
            <Link
              href="/inscription?type=freelance"
              className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Rejoindre comme freelance
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
