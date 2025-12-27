export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  publishedAt: string;
  author: string;
}

export const ARTICLES: Article[] = [
  {
    slug: "comment-negocier-son-tjm-freelance",
    title: "Comment negocier son TJM en freelance IT : le guide complet",
    excerpt: "Decouvrez les techniques pour negocier efficacement votre Taux Journalier Moyen et maximiser vos revenus en tant que freelance IT.",
    category: "Conseils",
    readTime: 8,
    publishedAt: "2024-12-15",
    author: "DirectCabinet",
    content: `
## Pourquoi le TJM est crucial pour votre carriere freelance

Le Taux Journalier Moyen (TJM) est le nerf de la guerre pour tout freelance IT. Une difference de 50 EUR par jour represente plus de 11 000 EUR sur une annee complete. Pourtant, beaucoup de freelances sous-estiment leur valeur ou n'osent pas negocier.

## Etape 1 : Connaitre sa valeur sur le marche

Avant toute negociation, vous devez connaitre les TJM pratiques dans votre domaine :

- **Developpeur Backend Senior** : 550-700 EUR/jour
- **DevOps / SRE** : 600-750 EUR/jour
- **Data Engineer** : 600-750 EUR/jour
- **Architecte Cloud** : 700-900 EUR/jour
- **Lead Tech** : 650-800 EUR/jour

Ces fourchettes varient selon l'experience, les technologies maitrisees et la localisation.

## Etape 2 : Preparer ses arguments

Ne vous contentez pas de demander plus. Preparez des arguments concrets :

1. **Vos realisations** : projets livres, problemes resolus, economies generees
2. **Vos certifications** : AWS, GCP, Azure, Kubernetes...
3. **Votre expertise rare** : technologies de niche, secteurs specifiques
4. **Les references** : clients satisfaits, recommandations

## Etape 3 : Les techniques de negociation

### La technique de l'ancrage
Annoncez un TJM legerement superieur a votre objectif. Si vous visez 650 EUR, demandez 700 EUR. Cela laisse une marge de negociation tout en ancrant la discussion sur un niveau eleve.

### Ne jamais accepter la premiere offre
Meme si l'offre vous convient, demandez toujours une amelioration. Un simple "C'est un peu en dessous de mes attentes, pouvez-vous faire un effort ?" peut rapporter 20-50 EUR/jour.

### Valoriser les avantages non financiers
Si le TJM est bloque, negociez :
- Le remote (economie de temps et transport)
- La duree de la mission (securite)
- Les outils fournis (materiel, licences)

## L'erreur fatale : passer par une ESN

Voici le secret que les ESN ne veulent pas que vous sachiez : quand un client paie 900 EUR/jour pour vous, l'ESN peut garder 30 a 50% de marge.

**Exemple concret :**
- Client paie : 900 EUR/jour
- Marge ESN (35%) : 315 EUR/jour
- Vous recevez : 585 EUR/jour

Sur une annee (220 jours) : **69 300 EUR de marge pour l'ESN**

## La solution : DirectCabinet

Chez DirectCabinet, nous prenons seulement 5% de commission. Sur le meme exemple :
- Client paie : 900 EUR/jour
- Notre commission (5%) : 45 EUR/jour
- Vous recevez : 855 EUR/jour

**Difference annuelle : +59 400 EUR dans votre poche.**

## Conclusion

Negocier son TJM est essentiel, mais le plus important est de choisir le bon intermediaire. Passer par une ESN traditionnelle, c'est accepter de perdre des dizaines de milliers d'euros chaque annee.
    `
  },
  {
    slug: "freelance-vs-esn-comparatif-complet",
    title: "Freelance vs ESN : le comparatif complet pour faire le bon choix",
    excerpt: "ESN ou freelance ? Decouvrez les avantages et inconvenients de chaque statut pour prendre la meilleure decision pour votre carriere IT.",
    category: "Guide",
    readTime: 10,
    publishedAt: "2024-12-10",
    author: "DirectCabinet",
    content: `
## Le dilemme de tout professionnel IT

A un moment de votre carriere, vous vous etes pose la question : dois-je rester salarie en ESN ou me lancer en freelance ? Ce guide vous aide a faire le bon choix.

## Qu'est-ce qu'une ESN ?

Une Entreprise de Services du Numerique (anciennement SSII) est une societe qui place des consultants chez ses clients. Vous etes salarie de l'ESN, mais vous travaillez chez le client final.

### Avantages de l'ESN
- **Securite de l'emploi** : CDI, chomage, conges payes
- **Pas de gestion administrative** : l'ESN gere tout
- **Formation** : certaines ESN investissent dans vos competences
- **Reseau** : acces a des missions variees

### Inconvenients de l'ESN
- **Remuneration limitee** : salaire fixe, peu de marge de negociation
- **Marge cachee enorme** : 30-50% de ce que paie le client
- **Intercontrat** : periodes sans mission, stressantes
- **Manque de transparence** : vous ne savez pas combien le client paie

## Le freelance : liberte et responsabilite

En freelance, vous etes votre propre patron. Vous negociez directement (ou via un intermediaire) avec les clients.

### Avantages du freelance
- **Remuneration superieure** : +30 a +50% vs salariat
- **Liberte** : choix des missions, horaires, lieu de travail
- **Transparence** : vous savez exactement ce que le client paie
- **Fiscalite optimisable** : SASU, dividendes, frais professionnels

### Inconvenients du freelance
- **Pas de securite** : pas de chomage, pas de conges payes
- **Gestion administrative** : comptabilite, facturation, relances
- **Prospection** : trouver ses missions peut etre chronophage
- **Isolement** : pas d'equipe, pas de collegues

## Le vrai comparatif financier

Prenons un profil Data Engineer senior avec 7 ans d'experience.

### En ESN
- Salaire brut annuel : 55 000 EUR
- Net apres impots : ~42 000 EUR
- Ce que le client paie : ~130 000 EUR/an (600 EUR x 220 jours)
- **Marge ESN : ~75 000 EUR/an**

### En freelance via ESN/Cabinet traditionnel
- TJM facture au client : 600 EUR
- TJM recu (apres 35% marge) : 390 EUR
- CA annuel : 85 800 EUR
- Net apres charges : ~55 000 EUR

### En freelance via DirectCabinet
- TJM facture au client : 600 EUR
- TJM recu (apres 5% commission) : 570 EUR
- CA annuel : 125 400 EUR
- Net apres charges : ~82 000 EUR

**Difference : +40 000 EUR/an vs ESN, +27 000 EUR/an vs cabinet traditionnel**

## Quand rester en ESN ?

L'ESN reste pertinente si :
- Vous debutez et avez besoin d'experience
- Vous valorisez la securite de l'emploi avant tout
- Vous ne voulez pas gerer d'administratif
- Vous etes dans une periode de vie necessitant de la stabilite

## Quand passer freelance ?

Le freelance est fait pour vous si :
- Vous avez 3+ ans d'experience
- Vous etes a l'aise avec l'incertitude
- Vous voulez maximiser vos revenus
- Vous valorisez la liberte et l'autonomie

## La solution hybride : DirectCabinet

DirectCabinet offre le meilleur des deux mondes :
- **Acces aux missions grands comptes** (comme une ESN)
- **95% du TJM pour vous** (comme en direct)
- **Gestion administrative simplifiee** (contrats, facturation)
- **Paiement garanti a 30 jours** (securite)

## Conclusion

Le passage en freelance est souvent la meilleure decision financiere de votre carriere IT. Mais le choix de l'intermediaire est crucial : passer par une ESN traditionnelle annule une grande partie des benefices du freelancing.
    `
  },
  {
    slug: "missions-grands-comptes-comment-y-acceder",
    title: "Missions grands comptes : comment y acceder en freelance ?",
    excerpt: "Les missions CAC40 sont les plus remuneratrices. Decouvrez comment y acceder sans passer par une ESN traditionnelle.",
    category: "Guide",
    readTime: 6,
    publishedAt: "2024-12-05",
    author: "DirectCabinet",
    content: `
## Pourquoi viser les grands comptes ?

Les missions chez les grands comptes (CAC40, SBF120) sont les plus recherchees par les freelances IT. Et pour cause :

- **TJM plus eleves** : 600-900 EUR/jour vs 400-550 EUR en startup
- **Missions longues** : 12-24 mois vs 3-6 mois
- **Stabilite** : moins de risque d'arret brutal
- **CV valorisant** : BNP, Total, L'Oreal impressionnent

## Le probleme : l'acces est verrouille

Les grands comptes ne travaillent pas directement avec les freelances. Ils passent par :

1. **Des appels d'offres** auxquels seules les grandes structures repondent
2. **Des panels de fournisseurs** pre-agrees
3. **Des contrats-cadres** avec des ESN/cabinets

Resultat : pour acceder a ces missions, vous devez passer par un intermediaire.

## Les options pour acceder aux grands comptes

### Option 1 : Les ESN traditionnelles
- **Avantage** : Acces garanti aux missions
- **Inconvenient** : 30-50% de marge sur votre dos

### Option 2 : Les plateformes (Malt, Crème)
- **Avantage** : Commission faible (10-15%)
- **Inconvenient** : Tres peu de grands comptes y sont presents

### Option 3 : Le reseau personnel
- **Avantage** : Pas d'intermediaire
- **Inconvenient** : Limite, demande des annees a construire

### Option 4 : DirectCabinet
- **Avantage** : Acces aux grands comptes + 5% de commission seulement
- **Comment** : Nous avons des accords directs avec les directions achats

## Comment fonctionne l'acces via DirectCabinet ?

1. **Vous vous inscrivez** (gratuit, 5 minutes)
2. **On valide votre profil** (sous 48h)
3. **On vous propose des missions** correspondant a vos competences
4. **Vous choisissez** d'accepter ou non
5. **On gere le reste** : contrat, facturation, paiement

## Les grands comptes qui recrutent en ce moment

Nos freelances travaillent actuellement chez :

- **Banque/Finance** : BNP Paribas, Societe Generale, Credit Agricole, AXA
- **Energie** : TotalEnergies, EDF, Engie
- **Telecom** : Orange, SFR, Bouygues Telecom
- **Luxe/Retail** : LVMH, L'Oreal, Carrefour
- **Industrie** : Airbus, Safran, Stellantis

## Les profils les plus demandes

En ce moment, les grands comptes recherchent principalement :

1. **Data Engineers** (Python, Spark, Cloud)
2. **DevOps / SRE** (Kubernetes, Terraform, CI/CD)
3. **Architectes Cloud** (AWS, GCP, Azure)
4. **Developpeurs Backend** (Java, Node.js, Go)
5. **Experts Cybersecurite**

## Conclusion

Acceder aux missions grands comptes en freelance est possible, mais le choix de l'intermediaire determine votre remuneration finale. Avec DirectCabinet, vous gardez 95% de votre TJM tout en accedant aux meilleures missions du marche.
    `
  },
  {
    slug: "portage-salarial-vs-sasu-quel-statut-choisir",
    title: "Portage salarial vs SASU : quel statut choisir en freelance IT ?",
    excerpt: "SASU, portage salarial, auto-entrepreneur... Quel statut juridique choisir pour optimiser vos revenus en freelance ?",
    category: "Administratif",
    readTime: 7,
    publishedAt: "2024-11-28",
    author: "DirectCabinet",
    content: `
## Le casse-tete du statut juridique

Quand on se lance en freelance, le choix du statut juridique est crucial. Il impacte directement votre remuneration nette, votre protection sociale et votre fiscalite.

## Les 3 options principales

### 1. L'auto-entreprise (micro-entreprise)

**Pour qui ?** Les freelances debutants ou avec un CA limite.

**Avantages :**
- Simplicite administrative extreme
- Charges sociales de 22% du CA
- Pas de TVA sous 36 800 EUR de CA

**Inconvenients :**
- Plafond de CA : 77 700 EUR/an
- Pas de deduction de frais
- Protection sociale limitee

**Simulation TJM 500 EUR, 200 jours :**
- CA : 100 000 EUR → Impossible (plafond depasse)

### 2. Le portage salarial

**Pour qui ?** Ceux qui veulent la securite du salariat avec la liberte du freelance.

**Avantages :**
- Statut salarie (chomage, retraite, mutuelle)
- Pas de gestion administrative
- Simplicite totale

**Inconvenients :**
- Frais de gestion : 5-10% du CA
- Charges sociales elevees (~45%)
- Moins optimise fiscalement

**Simulation TJM 500 EUR, 200 jours :**
- CA : 100 000 EUR
- Frais portage (8%) : -8 000 EUR
- Charges sociales (~45%) : -41 400 EUR
- **Net avant IR : ~50 600 EUR**

### 3. La SASU (ou EURL)

**Pour qui ?** Les freelances confirmes voulant optimiser leurs revenus.

**Avantages :**
- Pas de plafond de CA
- Optimisation salaire/dividendes
- Deduction des frais professionnels
- Credibilite aupres des clients

**Inconvenients :**
- Gestion administrative (comptable necessaire)
- Couts fixes (comptable, CFE, etc.)
- Complexite initiale

**Simulation TJM 500 EUR, 200 jours :**
- CA : 100 000 EUR
- Frais pro + comptable : -5 000 EUR
- Salaire net : 36 000 EUR (charges ~15 000 EUR)
- Dividendes : 30 000 EUR (flat tax 30%)
- **Net apres IR : ~57 000 EUR**

## Comparatif synthetique

| Critere | Auto-entreprise | Portage | SASU |
|---------|-----------------|---------|------|
| CA max | 77 700 EUR | Illimite | Illimite |
| Net sur 100k CA | N/A | ~50k EUR | ~57k EUR |
| Complexite | Tres faible | Faible | Moyenne |
| Protection sociale | Faible | Forte | Moyenne |
| Chomage | Non | Oui | Non* |

*Possible avec assurance privee

## Notre recommandation

- **CA < 50 000 EUR** : Auto-entreprise
- **CA 50-80 000 EUR** : Portage salarial
- **CA > 80 000 EUR** : SASU

## Avec DirectCabinet, vous choisissez

Chez DirectCabinet, vous facturez avec le statut de votre choix :
- Auto-entrepreneur
- Portage salarial
- SASU/EURL

On s'adapte a vous, pas l'inverse.

## Conclusion

Le statut ideal depend de votre situation personnelle, de votre CA previsionnel et de votre appetence pour l'administratif. Dans tous les cas, l'important est de maximiser votre TJM en choisissant le bon intermediaire.
    `
  },
  {
    slug: "eviter-requalification-contrat-travail-freelance",
    title: "Comment eviter la requalification en contrat de travail ?",
    excerpt: "La requalification est le cauchemar de tout freelance. Voici comment vous proteger juridiquement.",
    category: "Juridique",
    readTime: 5,
    publishedAt: "2024-11-20",
    author: "DirectCabinet",
    content: `
## Qu'est-ce que la requalification ?

La requalification, c'est quand un juge decide que votre relation freelance est en realite un contrat de travail deguise. Les consequences sont lourdes :

- Pour le client : rappel de charges sociales + penalites
- Pour vous : perte du statut independant

## Les criteres de la requalification

Un juge analysera 3 criteres principaux :

### 1. Le lien de subordination
Etes-vous sous les ordres directs du client ?
- Horaires imposes → Risque
- Lieu de travail impose → Risque
- Validation hierarchique → Risque

### 2. L'integration dans l'organisation
Faites-vous partie de l'equipe ?
- Email @client.com → Risque
- Participation aux reunions internes → Risque moyen
- Badge permanent → Risque

### 3. La dependance economique
Avez-vous un seul client ?
- 100% de CA avec un client → Risque fort
- Mission > 3 ans sans interruption → Risque

## Comment vous proteger ?

### En tant que freelance

1. **Diversifiez vos clients** (au moins 2-3/an)
2. **Gardez votre autonomie** (vos horaires, votre materiel)
3. **Utilisez votre email pro** (pas celui du client)
4. **Facturez au livrable** quand c'est possible

### En choisissant le bon intermediaire

Passer par un cabinet comme DirectCabinet vous protege :

- **Contrat tripartite** : vous n'etes pas lie directement au client
- **Facturation au cabinet** : pas de lien economique direct
- **Clauses protectrices** : nos contrats sont rediges pour eviter la requalification

## Les bonnes pratiques DirectCabinet

Nous veillons a ce que chaque mission respecte le cadre legal :

1. **Contrat de prestation** (pas de contrat de travail deguise)
2. **Autonomie preservee** (pas d'horaires imposes)
3. **Rotation des missions** (pas de dependance a un client)
4. **Facturation claire** (au temps passe ou au livrable)

## Conclusion

La requalification est un risque reel mais evitable. En respectant les bonnes pratiques et en choisissant un intermediaire serieux, vous pouvez exercer en freelance en toute serenite.
    `
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(article => article.slug === slug);
}

export function getAllArticles(): Article[] {
  return ARTICLES.sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
