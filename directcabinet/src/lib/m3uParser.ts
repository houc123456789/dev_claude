import { M3UChannel, M3UPlaylist, M3UParserOptions } from '@/types/iptv';

/**
 * Parser M3U avancé pour les playlists IPTV
 * Supporte les formats M3U standard et étendu (#EXTM3U)
 */

interface ExtInfData {
  duration: number;
  attributes: Record<string, string>;
  title: string;
}

/**
 * Parse une ligne #EXTINF pour extraire les métadonnées
 */
function parseExtInf(line: string): ExtInfData {
  const result: ExtInfData = {
    duration: -1,
    attributes: {},
    title: '',
  };

  // Format: #EXTINF:duration [attributes],title
  const match = line.match(/^#EXTINF:(-?\d+)\s*(.*?),(.*)$/);
  if (!match) {
    // Format alternatif sans durée
    const altMatch = line.match(/^#EXTINF:(.*?),(.*)$/);
    if (altMatch) {
      result.title = altMatch[2].trim();
      // Parse les attributs du premier groupe
      parseAttributes(altMatch[1], result.attributes);
    }
    return result;
  }

  result.duration = parseInt(match[1], 10);
  result.title = match[3].trim();

  // Parse les attributs
  parseAttributes(match[2], result.attributes);

  return result;
}

/**
 * Parse les attributs d'une ligne EXTINF
 */
function parseAttributes(str: string, attributes: Record<string, string>): void {
  // Regex pour capturer les attributs: key="value" ou key=value
  const attrRegex = /([a-zA-Z0-9_-]+)=["']?([^"'\s]+(?:\s+[^"'\s=]+)*)["']?/g;
  let match;

  while ((match = attrRegex.exec(str)) !== null) {
    const key = match[1].toLowerCase().replace(/-/g, '_');
    attributes[key] = match[2];
  }
}

/**
 * Génère un ID unique pour une chaîne
 */
function generateChannelId(name: string, url: string): string {
  const hash = (str: string): number => {
    let h = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      h = ((h << 5) - h) + char;
      h = h & h;
    }
    return Math.abs(h);
  };
  return `ch_${hash(name + url)}`;
}

/**
 * Détermine le type de contenu basé sur le groupe ou l'URL
 */
function determineContentType(group: string, url: string): 'live' | 'movie' | 'series' {
  const lowerGroup = group.toLowerCase();
  const lowerUrl = url.toLowerCase();

  if (lowerGroup.includes('vod') || lowerGroup.includes('movie') || lowerGroup.includes('film')) {
    return 'movie';
  }
  if (lowerGroup.includes('series') || lowerGroup.includes('série')) {
    return 'series';
  }
  if (lowerUrl.includes('/movie/') || lowerUrl.includes('/vod/')) {
    return 'movie';
  }
  if (lowerUrl.includes('/series/')) {
    return 'series';
  }
  return 'live';
}

/**
 * Parse une playlist M3U complète
 */
export function parseM3U(
  content: string,
  options: M3UParserOptions = {}
): M3UPlaylist {
  const { extractGroups = true, parseExtendedInfo = true } = options;

  const lines = content.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  const channels: M3UChannel[] = [];
  const groupsSet = new Set<string>();

  let currentExtInf: ExtInfData | null = null;
  let currentExtraData: Record<string, string> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Ignorer la première ligne #EXTM3U
    if (line.startsWith('#EXTM3U')) {
      continue;
    }

    // Parser EXTINF
    if (line.startsWith('#EXTINF:') && parseExtendedInfo) {
      currentExtInf = parseExtInf(line);
      continue;
    }

    // Parser les directives additionnelles
    if (line.startsWith('#EXTVLCOPT:')) {
      const vlcOpt = line.substring(11);
      const [key, value] = vlcOpt.split('=');
      if (key && value) {
        currentExtraData[key.trim()] = value.trim();
      }
      continue;
    }

    if (line.startsWith('#KODIPROP:')) {
      const prop = line.substring(10);
      const [key, value] = prop.split('=');
      if (key && value) {
        currentExtraData[key.trim()] = value.trim();
      }
      continue;
    }

    // Ignorer les autres commentaires
    if (line.startsWith('#')) {
      continue;
    }

    // C'est une URL de stream
    if (line.startsWith('http://') || line.startsWith('https://') || line.startsWith('rtmp://') || line.startsWith('rtsp://')) {
      const url = line;
      const attrs = currentExtInf?.attributes || {};
      const group = attrs.group_title || attrs.group || 'Non catégorisé';
      const contentType = determineContentType(group, url);

      const channel: M3UChannel = {
        id: generateChannelId(currentExtInf?.title || url, url),
        name: currentExtInf?.title || `Channel ${channels.length + 1}`,
        logo: attrs.tvg_logo || attrs.logo || undefined,
        group,
        url,
        tvgId: attrs.tvg_id || undefined,
        tvgName: attrs.tvg_name || undefined,
        tvgLogo: attrs.tvg_logo || undefined,
        tvgCountry: attrs.tvg_country || undefined,
        tvgLanguage: attrs.tvg_language || undefined,
        tvgUrl: attrs.tvg_url || undefined,
        catchup: attrs.catchup || undefined,
        catchupSource: attrs.catchup_source || undefined,
        catchupDays: attrs.catchup_days ? parseInt(attrs.catchup_days, 10) : undefined,
        userAgent: currentExtraData['http-user-agent'] || attrs.user_agent || undefined,
        referer: currentExtraData['http-referrer'] || attrs.http_referrer || undefined,
        isLive: contentType === 'live',
        type: contentType,
      };

      channels.push(channel);

      if (extractGroups && group) {
        groupsSet.add(group);
      }

      // Reset pour la prochaine chaîne
      currentExtInf = null;
      currentExtraData = {};
    }
  }

  const groups = Array.from(groupsSet).sort();

  return {
    name: 'Imported Playlist',
    channels,
    groups,
    totalChannels: channels.length,
    loadedAt: new Date(),
  };
}

/**
 * Charge une playlist M3U depuis une URL
 */
export async function loadM3UFromUrl(url: string): Promise<M3UPlaylist> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch playlist: ${response.status} ${response.statusText}`);
    }
    const content = await response.text();
    return parseM3U(content);
  } catch (error) {
    throw new Error(`Error loading M3U from URL: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Valide si le contenu est une playlist M3U valide
 */
export function isValidM3U(content: string): boolean {
  const trimmed = content.trim();
  // Une playlist M3U valide commence par #EXTM3U ou contient des URLs
  if (trimmed.startsWith('#EXTM3U')) {
    return true;
  }
  // Vérifie s'il y a des URLs de streaming
  const hasUrls = /https?:\/\/|rtmp:\/\/|rtsp:\/\//i.test(content);
  return hasUrls;
}

/**
 * Filtre les chaînes par groupe
 */
export function filterChannelsByGroup(
  channels: M3UChannel[],
  group: string
): M3UChannel[] {
  if (!group || group === 'all') {
    return channels;
  }
  return channels.filter(ch => ch.group === group);
}

/**
 * Recherche de chaînes par nom
 */
export function searchChannels(
  channels: M3UChannel[],
  query: string
): M3UChannel[] {
  if (!query.trim()) {
    return channels;
  }
  const lowerQuery = query.toLowerCase();
  return channels.filter(ch =>
    ch.name.toLowerCase().includes(lowerQuery) ||
    ch.group?.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Trie les chaînes par différents critères
 */
export function sortChannels(
  channels: M3UChannel[],
  sortBy: 'name' | 'group' | 'type' = 'name',
  ascending: boolean = true
): M3UChannel[] {
  const sorted = [...channels].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'group':
        comparison = (a.group || '').localeCompare(b.group || '');
        break;
      case 'type':
        comparison = a.type.localeCompare(b.type);
        break;
    }
    return ascending ? comparison : -comparison;
  });
  return sorted;
}

/**
 * Exporte les chaînes au format M3U
 */
export function exportToM3U(channels: M3UChannel[]): string {
  let content = '#EXTM3U\n';

  for (const channel of channels) {
    const attrs: string[] = [];
    if (channel.tvgId) attrs.push(`tvg-id="${channel.tvgId}"`);
    if (channel.tvgName) attrs.push(`tvg-name="${channel.tvgName}"`);
    if (channel.tvgLogo || channel.logo) attrs.push(`tvg-logo="${channel.tvgLogo || channel.logo}"`);
    if (channel.group) attrs.push(`group-title="${channel.group}"`);

    content += `#EXTINF:-1 ${attrs.join(' ')},${channel.name}\n`;
    content += `${channel.url}\n`;
  }

  return content;
}
