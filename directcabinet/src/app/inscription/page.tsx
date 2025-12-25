'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function InscriptionContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  const [userType, setUserType] = useState<'entreprise' | 'freelance'>(
    typeParam === 'freelance' ? 'freelance' : 'entreprise'
  );
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeParam === 'freelance') {
      setUserType('freelance');
    } else if (typeParam === 'entreprise') {
      setUserType('entreprise');
    }
  }, [typeParam]);

  const [entrepriseData, setEntrepriseData] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    size: '',
    need: '',
    skills: '',
    budget: '',
    startDate: '',
    duration: '',
    description: ''
  });

  const [freelanceData, setFreelanceData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    specialty: '',
    experience: '',
    tjm: '',
    availability: '',
    location: '',
    remote: '',
    skills: '',
    bio: ''
  });

  const handleEntrepriseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setEntrepriseData({ ...entrepriseData, [e.target.name]: e.target.value });
  };

  const handleFreelanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFreelanceData({ ...freelanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', userType === 'entreprise' ? entrepriseData : freelanceData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 py-20">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {userType === 'entreprise' ? 'Demande envoyee !' : 'Inscription recue !'}
          </h1>
          <p className="text-gray-600 mb-8">
            {userType === 'entreprise'
              ? 'Notre equipe analyse votre besoin. Vous recevrez 3 profils sous 48h.'
              : 'Notre equipe va verifier votre profil. Vous serez contacte sous 48h.'}
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retour a l accueil
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className={`py-16 ${userType === 'entreprise' ? 'bg-gradient-to-br from-blue-900 to-blue-700' : 'bg-gradient-to-br from-emerald-800 to-emerald-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {userType === 'entreprise' ? 'Trouvez votre prochain freelance' : 'Rejoignez DirectCabinet'}
          </h1>
          <p className="text-xl text-white/80">
            {userType === 'entreprise'
              ? '3 profils verifies en 48h. Premier placement gratuit.'
              : 'Acces aux missions grands comptes. Gardez 95% de votre TJM.'}
          </p>
        </div>
      </section>

      {/* Toggle */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-xl p-1 shadow-sm flex">
            <button
              onClick={() => { setUserType('entreprise'); setStep(1); }}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                userType === 'entreprise'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Je suis une entreprise
            </button>
            <button
              onClick={() => { setUserType('freelance'); setStep(1); }}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                userType === 'freelance'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Je suis freelance
            </button>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            {/* Progress */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 1 ? (userType === 'entreprise' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white') : 'bg-gray-200 text-gray-600'
                }`}>1</div>
                <div className={`w-16 h-1 ${step >= 2 ? (userType === 'entreprise' ? 'bg-blue-600' : 'bg-emerald-600') : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= 2 ? (userType === 'entreprise' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white') : 'bg-gray-200 text-gray-600'
                }`}>2</div>
              </div>
              <span className="text-sm text-gray-500">Etape {step}/2</span>
            </div>

            {userType === 'entreprise' ? (
              <>
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Informations entreprise</h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l entreprise *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={entrepriseData.company}
                        onChange={handleEntrepriseChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Votre entreprise"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Votre nom *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={entrepriseData.name}
                          onChange={handleEntrepriseChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email professionnel *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={entrepriseData.email}
                          onChange={handleEntrepriseChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="jean@entreprise.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telephone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={entrepriseData.phone}
                          onChange={handleEntrepriseChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Taille entreprise
                        </label>
                        <select
                          name="size"
                          value={entrepriseData.size}
                          onChange={handleEntrepriseChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selectionnez</option>
                          <option value="1-10">1-10 employes</option>
                          <option value="11-50">11-50 employes</option>
                          <option value="51-200">51-200 employes</option>
                          <option value="201-500">201-500 employes</option>
                          <option value="500+">500+ employes</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Continuer
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Votre besoin</h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de profil recherche *
                      </label>
                      <select
                        name="need"
                        required
                        value={entrepriseData.need}
                        onChange={handleEntrepriseChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Selectionnez</option>
                        <option value="data-engineer">Data Engineer</option>
                        <option value="data-scientist">Data Scientist</option>
                        <option value="devops">DevOps / SRE</option>
                        <option value="backend">Developpeur Backend</option>
                        <option value="frontend">Developpeur Frontend</option>
                        <option value="fullstack">Developpeur Fullstack</option>
                        <option value="mobile">Developpeur Mobile</option>
                        <option value="cloud">Architecte Cloud</option>
                        <option value="security">Expert Cybersecurite</option>
                        <option value="pm">Product Manager / Owner</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Competences cles
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={entrepriseData.skills}
                        onChange={handleEntrepriseChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Python, Spark, AWS, etc."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Budget TJM max
                        </label>
                        <select
                          name="budget"
                          value={entrepriseData.budget}
                          onChange={handleEntrepriseChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selectionnez</option>
                          <option value="400-500">400-500 euros/j</option>
                          <option value="500-600">500-600 euros/j</option>
                          <option value="600-700">600-700 euros/j</option>
                          <option value="700-800">700-800 euros/j</option>
                          <option value="800+">800+ euros/j</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duree estimee
                        </label>
                        <select
                          name="duration"
                          value={entrepriseData.duration}
                          onChange={handleEntrepriseChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Selectionnez</option>
                          <option value="1-3">1-3 mois</option>
                          <option value="3-6">3-6 mois</option>
                          <option value="6-12">6-12 mois</option>
                          <option value="12+">12+ mois</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description du besoin
                      </label>
                      <textarea
                        name="description"
                        rows={4}
                        value={entrepriseData.description}
                        onChange={handleEntrepriseChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Decrivez le contexte et les missions du freelance..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Retour
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Envoyer ma demande
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Vos informations</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={freelanceData.name}
                          onChange={handleFreelanceChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="Jean Dupont"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={freelanceData.email}
                          onChange={handleFreelanceChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="jean@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Telephone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={freelanceData.phone}
                          onChange={handleFreelanceChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Profil LinkedIn
                        </label>
                        <input
                          type="url"
                          name="linkedin"
                          value={freelanceData.linkedin}
                          onChange={handleFreelanceChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="linkedin.com/in/..."
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialite principale *
                      </label>
                      <select
                        name="specialty"
                        required
                        value={freelanceData.specialty}
                        onChange={handleFreelanceChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      >
                        <option value="">Selectionnez</option>
                        <option value="data-engineer">Data Engineer</option>
                        <option value="data-scientist">Data Scientist</option>
                        <option value="devops">DevOps / SRE</option>
                        <option value="backend">Developpeur Backend</option>
                        <option value="frontend">Developpeur Frontend</option>
                        <option value="fullstack">Developpeur Fullstack</option>
                        <option value="mobile">Developpeur Mobile</option>
                        <option value="cloud">Architecte Cloud</option>
                        <option value="security">Expert Cybersecurite</option>
                        <option value="pm">Product Manager / Owner</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Continuer
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Votre profil</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Annees d experience *
                        </label>
                        <select
                          name="experience"
                          required
                          value={freelanceData.experience}
                          onChange={handleFreelanceChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Selectionnez</option>
                          <option value="3-5">3-5 ans</option>
                          <option value="5-7">5-7 ans</option>
                          <option value="7-10">7-10 ans</option>
                          <option value="10+">10+ ans</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          TJM souhaite *
                        </label>
                        <select
                          name="tjm"
                          required
                          value={freelanceData.tjm}
                          onChange={handleFreelanceChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Selectionnez</option>
                          <option value="400-500">400-500 euros/j</option>
                          <option value="500-600">500-600 euros/j</option>
                          <option value="600-700">600-700 euros/j</option>
                          <option value="700-800">700-800 euros/j</option>
                          <option value="800+">800+ euros/j</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Disponibilite
                        </label>
                        <select
                          name="availability"
                          value={freelanceData.availability}
                          onChange={handleFreelanceChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Selectionnez</option>
                          <option value="immediate">Immediate</option>
                          <option value="1-month">Dans 1 mois</option>
                          <option value="2-months">Dans 2 mois</option>
                          <option value="3-months">Dans 3+ mois</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mode de travail prefere
                        </label>
                        <select
                          name="remote"
                          value={freelanceData.remote}
                          onChange={handleFreelanceChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        >
                          <option value="">Selectionnez</option>
                          <option value="remote">Full remote</option>
                          <option value="hybrid">Hybride</option>
                          <option value="onsite">Sur site</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Competences techniques
                      </label>
                      <input
                        type="text"
                        name="skills"
                        value={freelanceData.skills}
                        onChange={handleFreelanceChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Python, Spark, AWS, etc."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Presentez-vous en quelques lignes
                      </label>
                      <textarea
                        name="bio"
                        rows={4}
                        value={freelanceData.bio}
                        onChange={handleFreelanceChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="Votre parcours, vos expertises, ce que vous recherchez..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Retour
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Rejoindre DirectCabinet
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </form>

          {/* Benefits reminder */}
          <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4">
              {userType === 'entreprise' ? 'Ce qui vous attend' : 'Vos avantages'}
            </h3>
            <ul className="space-y-2">
              {userType === 'entreprise' ? (
                <>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    3 profils verifies en 48h
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Sourcing gratuit, vous ne payez que si vous signez
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    30% d economie vs cabinets traditionnels
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Acces aux missions grands comptes
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    95% du TJM pour vous (vs 65% en ESN)
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-emerald-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Paiement garanti meme si client retard
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default function InscriptionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    }>
      <InscriptionContent />
    </Suspense>
  );
}
