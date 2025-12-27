import { NextRequest, NextResponse } from 'next/server';
import { getAllInscriptions, addInscription, updateInscriptionStatus, deleteInscription } from '@/lib/store';

// Mot de passe admin simple (a remplacer par une vraie auth en production)
const ADMIN_PASSWORD = 'directcabinet2025';

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader) return false;
  const password = authHeader.replace('Bearer ', '');
  return password === ADMIN_PASSWORD;
}

// GET - Recuperer toutes les inscriptions (protege)
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  const inscriptions = getAllInscriptions();
  return NextResponse.json(inscriptions);
}

// POST - Nouvelle inscription (public)
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validation basique
    if (!data.name || !data.email || !data.specialty) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    const inscription = addInscription({
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      linkedin: data.linkedin || '',
      specialty: data.specialty,
      experience: data.experience || '',
      tjm: data.tjm || '',
      availability: data.availability || '',
      remote: data.remote || '',
      skills: data.skills || '',
      bio: data.bio || '',
    });

    return NextResponse.json({ success: true, id: inscription.id });
  } catch {
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

// PATCH - Mettre a jour le statut (protege)
export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  try {
    const { id, status } = await request.json();
    const updated = updateInscriptionStatus(id, status);

    if (!updated) {
      return NextResponse.json({ error: 'Inscription non trouvee' }, { status: 404 });
    }

    return NextResponse.json({ success: true, inscription: updated });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE - Supprimer une inscription (protege)
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Non autorise' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    const deleted = deleteInscription(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Inscription non trouvee' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
