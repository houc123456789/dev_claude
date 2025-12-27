'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InscriptionPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    specialty: '',
    experience: '',
    tjm: '',
    availability: '',
    remote: '',
    skills: '',
    bio: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="max-w-md mx-auto text-center px-4">
          <div className="card-premium p-12">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-sky-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Inscription recue !
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Notre equipe va verifier votre profil. Vous serez contacte sous 48h pour discuter des missions disponibles.
            </p>
            <Link href="/" className="btn-primary inline-block">
              Retour a l'accueil
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
            <span className="text-sm text-gray-300">Inscription gratuite</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Rejoignez DirectCabinet
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Acces aux missions grands comptes. Gardez 95% de votre TJM.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-slate-50 -mt-8">
        <div className="max-w-2xl mx-auto px-4">
          <form onSubmit={handleSubmit} className="card-premium p-8 md:p-10">
            {/* Progress */}
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step >= 1 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25' : 'bg-slate-200 text-slate-500'
                }`}>1</div>
                <div className={`flex-1 h-1 mx-3 rounded-full transition-all ${step >= 2 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600' : 'bg-slate-200'}`}></div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step >= 2 ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25' : 'bg-slate-200 text-slate-500'
                }`}>2</div>
              </div>
              <span className="ml-6 text-sm text-gray-500 font-medium">Etape {step}/2</span>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Vos informations</h2>
                  <p className="text-gray-500">Dites-nous qui vous etes</p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Nom complet <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                      placeholder="Jean Dupont"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                      placeholder="jean@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Profil LinkedIn
                    </label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                      placeholder="linkedin.com/in/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Specialite principale <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="specialty"
                    required
                    value={formData.specialty}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                  >
                    <option value="">Selectionnez votre specialite</option>
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
                  className="w-full btn-primary text-center mt-4"
                >
                  Continuer
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Votre profil</h2>
                  <p className="text-gray-500">Aidez-nous a vous trouver les meilleures missions</p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Annees d'experience <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="experience"
                      required
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                    >
                      <option value="">Selectionnez</option>
                      <option value="3-5">3-5 ans</option>
                      <option value="5-7">5-7 ans</option>
                      <option value="7-10">7-10 ans</option>
                      <option value="10+">10+ ans</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      TJM souhaite <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="tjm"
                      required
                      value={formData.tjm}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                    >
                      <option value="">Selectionnez</option>
                      <option value="400-500">400-500 EUR/j</option>
                      <option value="500-600">500-600 EUR/j</option>
                      <option value="600-700">600-700 EUR/j</option>
                      <option value="700-800">700-800 EUR/j</option>
                      <option value="800+">800+ EUR/j</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Disponibilite
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                    >
                      <option value="">Selectionnez</option>
                      <option value="immediate">Immediate</option>
                      <option value="1-month">Dans 1 mois</option>
                      <option value="2-months">Dans 2 mois</option>
                      <option value="3-months">Dans 3+ mois</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Mode de travail
                    </label>
                    <select
                      name="remote"
                      value={formData.remote}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                    >
                      <option value="">Selectionnez</option>
                      <option value="remote">Full remote</option>
                      <option value="hybrid">Hybride</option>
                      <option value="onsite">Sur site</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Competences techniques
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                    placeholder="Python, Spark, AWS, Kubernetes..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Presentez-vous
                  </label>
                  <textarea
                    name="bio"
                    rows={4}
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors resize-none"
                    placeholder="Votre parcours, vos expertises, ce que vous recherchez..."
                  />
                </div>

                <div className="flex gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3.5 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-primary text-center"
                  >
                    Rejoindre DirectCabinet
                  </button>
                </div>
              </div>
            )}
          </form>

          {/* Benefits */}
          <div className="mt-8 card-premium p-6">
            <h3 className="font-semibold text-slate-900 mb-5">Vos avantages</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '🏢', text: 'Acces missions grands comptes' },
                { icon: '💰', text: '95% du TJM pour vous' },
                { icon: '⚡', text: 'Paiement garanti a 30 jours' },
                { icon: '📋', text: 'Gestion admin incluse' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-slate-700">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
