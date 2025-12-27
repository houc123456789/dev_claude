'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Mission {
  id: string;
  title: string;
  client: string;
  location: string;
  remote: 'full' | 'hybrid' | 'onsite';
  tjmMin: number;
  tjmMax: number;
  duration: string;
  skills: string[];
  description: string;
  urgency: 'normal' | 'urgent';
  postedDays: number;
}

const MISSIONS: Mission[] = [
  {
    id: '1',
    title: 'Data Engineer Senior - Plateforme Data',
    client: 'Grande Banque Francaise',
    location: 'Paris',
    remote: 'hybrid',
    tjmMin: 650,
    tjmMax: 750,
    duration: '12 mois',
    skills: ['Python', 'Spark', 'Airflow', 'GCP', 'BigQuery'],
    description: 'Construction de pipelines data pour une plateforme de donnees clients. Equipe de 8 data engineers.',
    urgency: 'urgent',
    postedDays: 2,
  },
  {
    id: '2',
    title: 'DevOps / SRE - Infrastructure Cloud',
    client: 'Leader E-commerce',
    location: 'Lyon',
    remote: 'full',
    tjmMin: 600,
    tjmMax: 700,
    duration: '6 mois renouvelable',
    skills: ['Kubernetes', 'Terraform', 'AWS', 'GitLab CI', 'Prometheus'],
    description: 'Migration vers Kubernetes et mise en place de l\'observabilite. Contexte scale-up en forte croissance.',
    urgency: 'normal',
    postedDays: 5,
  },
  {
    id: '3',
    title: 'Architecte Cloud AWS',
    client: 'Groupe Industriel CAC40',
    location: 'Paris La Defense',
    remote: 'hybrid',
    tjmMin: 750,
    tjmMax: 850,
    duration: '18 mois',
    skills: ['AWS', 'Architecture', 'Serverless', 'CDK', 'Well-Architected'],
    description: 'Definition et mise en oeuvre de l\'architecture cloud pour un programme de transformation digitale.',
    urgency: 'normal',
    postedDays: 1,
  },
  {
    id: '4',
    title: 'Lead Developer Backend Node.js',
    client: 'Fintech en Serie B',
    location: 'Paris',
    remote: 'hybrid',
    tjmMin: 600,
    tjmMax: 700,
    duration: '9 mois',
    skills: ['Node.js', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
    description: 'Lead technique d\'une equipe de 4 developpeurs. Refonte de l\'API core banking.',
    urgency: 'urgent',
    postedDays: 3,
  },
  {
    id: '5',
    title: 'Data Scientist - Computer Vision',
    client: 'Startup HealthTech',
    location: 'Bordeaux',
    remote: 'full',
    tjmMin: 550,
    tjmMax: 650,
    duration: '6 mois',
    skills: ['Python', 'PyTorch', 'OpenCV', 'MLOps', 'AWS SageMaker'],
    description: 'Developpement de modeles de detection d\'anomalies sur images medicales.',
    urgency: 'normal',
    postedDays: 7,
  },
  {
    id: '6',
    title: 'Expert Cybersecurite - SOC',
    client: 'Ministere',
    location: 'Paris',
    remote: 'onsite',
    tjmMin: 700,
    tjmMax: 800,
    duration: '24 mois',
    skills: ['SIEM', 'SOC', 'Incident Response', 'Threat Intelligence', 'MITRE ATT&CK'],
    description: 'Renforcement du SOC et mise en place de procedures de reponse aux incidents.',
    urgency: 'normal',
    postedDays: 4,
  },
];

const REMOTE_LABELS: Record<string, string> = {
  full: 'Full remote',
  hybrid: 'Hybride',
  onsite: 'Sur site',
};

const REMOTE_COLORS: Record<string, string> = {
  full: 'bg-emerald-100 text-emerald-700',
  hybrid: 'bg-sky-100 text-sky-700',
  onsite: 'bg-amber-100 text-amber-700',
};

export default function MissionsPage() {
  const [remoteFilter, setRemoteFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMissions = MISSIONS.filter((mission) => {
    const matchesRemote = remoteFilter === 'all' || mission.remote === remoteFilter;
    const matchesSearch = searchQuery === '' ||
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRemote && matchesSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-300">{MISSIONS.length} missions disponibles</span>
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Missions Grands Comptes
          </h1>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            Acces direct aux meilleures opportunites. Commission de 5% uniquement.
          </p>
        </div>
      </section>

      {/* Filters & List */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="card-premium p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Rechercher par titre ou competence..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white transition-colors"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'full', 'hybrid', 'onsite'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setRemoteFilter(filter)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      remoteFilter === filter
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {filter === 'all' ? 'Tous' : REMOTE_LABELS[filter]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">
            {filteredMissions.length} mission(s) trouvee(s)
          </p>

          {/* Missions Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredMissions.map((mission) => (
              <div
                key={mission.id}
                className="card-premium p-6 hover:shadow-xl transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {mission.urgency === 'urgent' && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                          Urgent
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${REMOTE_COLORS[mission.remote]}`}>
                        {REMOTE_LABELS[mission.remote]}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {mission.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">{mission.client}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600">
                      {mission.tjmMin}-{mission.tjmMax} EUR
                    </div>
                    <div className="text-xs text-gray-400">par jour</div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {mission.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {mission.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {mission.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {mission.duration}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400">
                    Il y a {mission.postedDays} jour{mission.postedDays > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {filteredMissions.length === 0 && (
            <div className="card-premium p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500">Aucune mission ne correspond a vos criteres</p>
            </div>
          )}

          {/* CTA */}
          <div className="mt-12 card-premium p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Interesse par ces missions ?
            </h2>
            <p className="text-gray-400 mb-6">
              Inscrivez-vous pour acceder a toutes les opportunites et postuler en direct
            </p>
            <Link href="/inscription" className="btn-primary inline-block">
              Rejoindre DirectCabinet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
