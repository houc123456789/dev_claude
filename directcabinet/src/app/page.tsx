import Link from 'next/link';

export default function Home() {
  return (
    <>
      {/* Hero Section - 100% Freelance */}
      <section className="gradient-hero min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 text-white">
              Pour les freelances IT qui en ont marre de se faire exploiter
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
              Missions grands comptes.
              <span className="block text-emerald-300">95% du TJM pour vous.</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Les ESN prennent 30-50% de marge sur votre dos. Nous, on prend 5%.
              Meme acces aux missions BNP, Total, Orange. Mais vous gardez votre argent.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/inscription"
                className="px-8 py-4 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-colors text-center text-lg"
              >
                Rejoindre DirectCabinet
              </Link>
              <Link
                href="/missions"
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-colors text-center"
              >
                Voir les missions
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-6 text-white/80">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white">JD</div>
                <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white">ML</div>
                <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white">SC</div>
                <div className="w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white">+47</div>
              </div>
              <span>50 freelances nous font deja confiance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Le Probleme */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Vous connaissez ce scenario ?
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-red-500">
              <p className="text-lg text-gray-300">
                <span className="text-red-400 font-bold">"Le client paie 900 euros/jour pour vous..."</span>
              </p>
              <p className="text-gray-400 mt-2">
                Mais l'ESN vous reverse 550 euros. Les 350 euros restants ? Dans leur poche. Pour avoir envoye un email.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-red-500">
              <p className="text-lg text-gray-300">
                <span className="text-red-400 font-bold">"Vous voulez negocier votre TJM ?"</span>
              </p>
              <p className="text-gray-400 mt-2">
                "Desole, le client a un budget serre." Mensonge. Le client paie le prix fort. C'est juste que l'ESN veut garder sa marge.
              </p>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border-l-4 border-red-500">
              <p className="text-lg text-gray-300">
                <span className="text-red-400 font-bold">"Vous passez par Malt pour eviter ca ?"</span>
              </p>
              <p className="text-gray-400 mt-2">
                Super. Mais les grands comptes (ceux qui paient bien) n'y vont jamais. Ils passent par des cabinets. Donc vous etes coince.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* La Solution */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              DirectCabinet = Le meilleur des deux mondes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Acces aux missions grands comptes + Vous gardez 95% de votre TJM
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">X</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ESN / Cabinet</h3>
              <p className="text-gray-600 mb-4">Marge de 30-50%</p>
              <div className="text-red-600 font-bold">
                Client paie 900 euros<br/>
                <span className="text-2xl">Vous recevez 550 euros</span>
              </div>
            </div>

            <div className="text-center p-8 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">~</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Malt / Direct</h3>
              <p className="text-gray-600 mb-4">10% de commission</p>
              <div className="text-amber-600 font-bold">
                Pas d'acces grands comptes<br/>
                <span className="text-2xl">Missions courtes</span>
              </div>
            </div>

            <div className="text-center p-8 bg-emerald-50 rounded-xl shadow-lg border-2 border-emerald-400 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">Recommande</span>
              </div>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-emerald-600">OK</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">DirectCabinet</h3>
              <p className="text-gray-600 mb-4">5% seulement</p>
              <div className="text-emerald-600 font-bold">
                Client paie 900 euros<br/>
                <span className="text-2xl">Vous recevez 855 euros</span>
              </div>
            </div>
          </div>

          {/* Calcul Impact */}
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white text-center">
            <h3 className="text-2xl font-bold mb-8">Sur une mission de 12 mois a 700 euros/jour</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="text-gray-400 mb-2">Avec une ESN (30% marge)</div>
                <div className="text-3xl font-bold text-red-400">98 000 euros</div>
                <div className="text-gray-500">pour vous</div>
              </div>
              <div>
                <div className="text-gray-400 mb-2">Avec DirectCabinet (5%)</div>
                <div className="text-3xl font-bold text-emerald-400">133 000 euros</div>
                <div className="text-gray-500">pour vous</div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700">
              <div className="text-emerald-400 text-4xl font-bold">+35 000 euros</div>
              <div className="text-gray-400">dans votre poche. Pas celle d'un commercial.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ca marche */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comment ca marche
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inscrivez-vous</h3>
              <p className="text-gray-600">5 min. Gratuit. On verifie votre profil sous 48h.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Recevez des missions</h3>
              <p className="text-gray-600">Grands comptes. Longue duree. Bon TJM.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Acceptez ou refusez</h3>
              <p className="text-gray-600">Vous choisissez. Zero obligation. Zero pression.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">4</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Gardez 95%</h3>
              <p className="text-gray-600">On gere l'admin. Vous facturez. On prend 5%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ce qu'on gere */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ce qu'on gere pour vous
            </h2>
            <p className="text-xl text-gray-600">Pour que vous vous concentriez sur votre mission</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Prospection</h3>
                <p className="text-gray-600 text-sm">On trouve les missions. Vous ne cherchez plus.</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Contrats</h3>
                <p className="text-gray-600 text-sm">On redige. Vous signez. C'est tout.</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Paiement garanti</h3>
                <p className="text-gray-600 text-sm">On vous paie meme si le client tarde.</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Facturation</h3>
                <p className="text-gray-600 text-sm">On centralise. Vous n'avez rien a gerer.</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Protection juridique</h3>
                <p className="text-gray-600 text-sm">Anti-requalification. Assurances incluses.</p>
              </div>
            </div>

            <div className="flex items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Support</h3>
                <p className="text-gray-600 text-sm">Un probleme ? On gere. Vous bossez.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Temoignages */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ils ont quitte leur ESN
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
                "8 ans en ESN. Je gardais 65% de mon TJM. Maintenant 95%. Sur l'annee, ca fait 40k de plus. Pour le meme travail."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold mr-4">ML</div>
                <div>
                  <div className="font-semibold text-gray-900">Marc L.</div>
                  <div className="text-gray-500 text-sm">Data Engineer - 7 ans xp</div>
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
                "J'avais peur de perdre l'acces aux grands comptes en quittant mon ESN. Avec DirectCabinet, j'ai les memes missions. Sans l'intermediaire."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold mr-4">SC</div>
                <div>
                  <div className="font-semibold text-gray-900">Sophie C.</div>
                  <div className="text-gray-500 text-sm">DevOps - 9 ans xp</div>
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
                "Le plus fou ? Mon client ne savait meme pas qu'il payait 850 euros/jour alors que j'en touchais 500. Maintenant on est tous les deux gagnants."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold mr-4">JD</div>
                <div>
                  <div className="font-semibold text-gray-900">Julien D.</div>
                  <div className="text-gray-500 text-sm">Architecte Cloud - 12 ans xp</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Arretez d'enrichir les ESN.
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Inscription gratuite. Verification sous 48h. Premieres missions dans la semaine.
          </p>
          <Link
            href="/inscription"
            className="inline-block px-10 py-5 bg-white text-emerald-700 font-bold rounded-lg hover:bg-emerald-50 transition-colors text-lg"
          >
            Rejoindre DirectCabinet
          </Link>
          <p className="mt-6 text-emerald-200 text-sm">
            Deja 50 freelances. Missions BNP, Total, Orange, L'Oreal...
          </p>
        </div>
      </section>
    </>
  );
}
