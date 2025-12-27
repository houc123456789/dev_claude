// Store des inscriptions en memoire
// Note: Les donnees sont perdues au redemarrage du serveur
// Pour la production, utiliser une vraie base de donnees (Supabase, PlanetScale, etc.)

export interface Inscription {
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

// Stockage en memoire (remplacer par DB en production)
const inscriptions: Inscription[] = [];

export function getAllInscriptions(): Inscription[] {
  return [...inscriptions].sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function addInscription(data: Omit<Inscription, 'id' | 'createdAt' | 'status'>): Inscription {
  const inscription: Inscription = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'new',
  };
  inscriptions.push(inscription);
  return inscription;
}

export function updateInscriptionStatus(id: string, status: Inscription['status']): Inscription | null {
  const inscription = inscriptions.find(i => i.id === id);
  if (inscription) {
    inscription.status = status;
    return inscription;
  }
  return null;
}

export function deleteInscription(id: string): boolean {
  const index = inscriptions.findIndex(i => i.id === id);
  if (index !== -1) {
    inscriptions.splice(index, 1);
    return true;
  }
  return false;
}

export function getInscriptionById(id: string): Inscription | undefined {
  return inscriptions.find(i => i.id === id);
}
