'use client';

import { useState, useEffect, useCallback } from 'react';

interface Inscription {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  specialty: string;
  experience: string;
  tjm: string;
  availability: string;
  remote: string;
  skills: string;
  bio: string;
  status: 'new' | 'contacted' | 'validated' | 'rejected';
}

const SPECIALTIES: Record<string, string> = {
  'data-engineer': 'Data Engineer',
  'data-scientist': 'Data Scientist',
  'devops': 'DevOps / SRE',
  'backend': 'Dev Backend',
  'frontend': 'Dev Frontend',
  'fullstack': 'Dev Fullstack',
  'mobile': 'Dev Mobile',
  'cloud': 'Architecte Cloud',
  'security': 'Cybersecurite',
  'pm': 'Product Manager',
  'other': 'Autre',
};

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-amber-100 text-amber-700',
  validated: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
};

const STATUS_LABELS: Record<string, string> = {
  new: 'Nouveau',
  contacted: 'Contacte',
  validated: 'Valide',
  rejected: 'Refuse',
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedInscription, setSelectedInscription] = useState<Inscription | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const fetchInscriptions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/inscriptions', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          setError('Session expiree');
        }
        throw new Error('Erreur de chargement');
      }
      const data = await res.json();
      setInscriptions(data);
    } catch {
      setError('Impossible de charger les inscriptions');
    } finally {
      setLoading(false);
    }
  }, [password]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInscriptions();
    }
  }, [isAuthenticated, fetchInscriptions]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inscriptions', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_password', password);
      } else {
        setError('Mot de passe incorrect');
      }
    } catch {
      setError('Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/inscriptions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchInscriptions();
        if (selectedInscription?.id === id) {
          setSelectedInscription({ ...selectedInscription, status: status as Inscription['status'] });
        }
      }
    } catch {
      setError('Erreur de mise a jour');
    }
  };

  const deleteInscription = async (id: string) => {
    if (!confirm('Supprimer cette inscription ?')) return;

    try {
      const res = await fetch(`/api/inscriptions?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        fetchInscriptions();
        setSelectedInscription(null);
      }
    } catch {
      setError('Erreur de suppression');
    }
  };

  const exportCSV = () => {
    const headers = ['Date', 'Nom', 'Email', 'Telephone', 'Specialite', 'Experience', 'TJM', 'Disponibilite', 'Mode', 'Status'];
    const rows = inscriptions.map(i => [
      new Date(i.createdAt).toLocaleDateString('fr-FR'),
      i.name,
      i.email,
      i.phone,
      SPECIALTIES[i.specialty] || i.specialty,
      i.experience,
      i.tjm,
      i.availability,
      i.remote,
      STATUS_LABELS[i.status],
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inscriptions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredInscriptions = filter === 'all'
    ? inscriptions
    : inscriptions.filter(i => i.status === filter);

  // Check for saved password
  useEffect(() => {
    const saved = localStorage.getItem('admin_password');
    if (saved) {
      setPassword(saved);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
        <div className="card-premium p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">DC</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Admin DirectCabinet</h1>
            <p className="text-gray-500 mt-2">Gestion des inscriptions</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white"
                placeholder="Entrez le mot de passe"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate stats
  const stats = {
    total: inscriptions.length,
    new: inscriptions.filter(i => i.status === 'new').length,
    contacted: inscriptions.filter(i => i.status === 'contacted').length,
    validated: inscriptions.filter(i => i.status === 'validated').length,
    rejected: inscriptions.filter(i => i.status === 'rejected').length,
    thisWeek: inscriptions.filter(i => {
      const date = new Date(i.createdAt);
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return date >= weekAgo;
    }).length,
    conversionRate: inscriptions.length > 0
      ? Math.round((inscriptions.filter(i => i.status === 'validated').length / inscriptions.length) * 100)
      : 0,
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-sky-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">DC</span>
            </div>
            <div>
              <h1 className="font-bold text-slate-900">DirectCabinet Admin</h1>
              <p className="text-xs text-gray-500">{inscriptions.length} inscription(s)</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={exportCSV}
              className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 text-sm font-medium"
            >
              Exporter CSV
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('admin_password');
                setIsAuthenticated(false);
                setPassword('');
              }}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium"
            >
              Deconnexion
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="card-premium p-4">
            <div className="text-2xl font-bold text-slate-900">{stats.total}</div>
            <div className="text-xs text-gray-500">Total inscriptions</div>
          </div>
          <div className="card-premium p-4">
            <div className="text-2xl font-bold text-blue-600">{stats.new}</div>
            <div className="text-xs text-gray-500">Nouveaux</div>
          </div>
          <div className="card-premium p-4">
            <div className="text-2xl font-bold text-amber-600">{stats.contacted}</div>
            <div className="text-xs text-gray-500">Contactes</div>
          </div>
          <div className="card-premium p-4">
            <div className="text-2xl font-bold text-emerald-600">{stats.validated}</div>
            <div className="text-xs text-gray-500">Valides</div>
          </div>
          <div className="card-premium p-4">
            <div className="text-2xl font-bold text-sky-600">{stats.thisWeek}</div>
            <div className="text-xs text-gray-500">Cette semaine</div>
          </div>
          <div className="card-premium p-4">
            <div className="text-2xl font-bold text-violet-600">{stats.conversionRate}%</div>
            <div className="text-xs text-gray-500">Taux de conversion</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['all', 'new', 'contacted', 'validated', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status === 'all' ? 'Tous' : STATUS_LABELS[status]}
              {status !== 'all' && (
                <span className="ml-2 px-2 py-0.5 bg-slate-200 rounded-full text-xs">
                  {inscriptions.filter(i => i.status === status).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2">
            <div className="card-premium overflow-hidden">
              {loading ? (
                <div className="p-12 text-center text-gray-500">Chargement...</div>
              ) : filteredInscriptions.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  Aucune inscription
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredInscriptions.map((inscription) => (
                    <div
                      key={inscription.id}
                      onClick={() => setSelectedInscription(inscription)}
                      className={`p-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                        selectedInscription?.id === inscription.id ? 'bg-emerald-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold text-slate-900">{inscription.name}</div>
                          <div className="text-sm text-gray-500">{inscription.email}</div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs px-2 py-1 bg-slate-100 rounded-full">
                              {SPECIALTIES[inscription.specialty] || inscription.specialty}
                            </span>
                            {inscription.tjm && (
                              <span className="text-xs px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                                {inscription.tjm}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-2 py-1 rounded-full ${STATUS_COLORS[inscription.status]}`}>
                            {STATUS_LABELS[inscription.status]}
                          </span>
                          <div className="text-xs text-gray-400 mt-2">
                            {new Date(inscription.createdAt).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Detail */}
          <div>
            {selectedInscription ? (
              <div className="card-premium p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-lg text-slate-900">Details</h2>
                  <button
                    onClick={() => setSelectedInscription(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Nom</div>
                    <div className="font-medium">{selectedInscription.name}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Email</div>
                    <a href={`mailto:${selectedInscription.email}`} className="text-emerald-600 hover:underline">
                      {selectedInscription.email}
                    </a>
                  </div>
                  {selectedInscription.phone && (
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Telephone</div>
                      <a href={`tel:${selectedInscription.phone}`} className="text-emerald-600 hover:underline">
                        {selectedInscription.phone}
                      </a>
                    </div>
                  )}
                  {selectedInscription.linkedin && (
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">LinkedIn</div>
                      <a href={selectedInscription.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline text-sm break-all">
                        {selectedInscription.linkedin}
                      </a>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Specialite</div>
                      <div className="font-medium">{SPECIALTIES[selectedInscription.specialty] || selectedInscription.specialty}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Experience</div>
                      <div className="font-medium">{selectedInscription.experience || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">TJM</div>
                      <div className="font-medium">{selectedInscription.tjm || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Dispo</div>
                      <div className="font-medium">{selectedInscription.availability || '-'}</div>
                    </div>
                  </div>
                  {selectedInscription.skills && (
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Competences</div>
                      <div className="text-sm">{selectedInscription.skills}</div>
                    </div>
                  )}
                  {selectedInscription.bio && (
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">Presentation</div>
                      <div className="text-sm text-gray-600">{selectedInscription.bio}</div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Statut</div>
                    <div className="grid grid-cols-2 gap-2">
                      {(['new', 'contacted', 'validated', 'rejected'] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => updateStatus(selectedInscription.id, status)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedInscription.status === status
                              ? STATUS_COLORS[status]
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {STATUS_LABELS[status]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteInscription(selectedInscription.id)}
                    className="w-full mt-4 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ) : (
              <div className="card-premium p-12 text-center text-gray-500">
                Selectionnez une inscription pour voir les details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
