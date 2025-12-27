import {
  XtreamCredentials,
  XtreamAuthResponse,
  XtreamCategory,
  XtreamLiveStream,
  XtreamVodStream,
  XtreamSeriesInfo,
  XtreamSeriesDetails,
  M3UChannel,
  M3UPlaylist,
  xtreamToM3UChannel,
  xtreamVodToM3UChannel,
} from '@/types/iptv';

/**
 * Service pour l'API Xtream Code
 * Gère l'authentification et la récupération des contenus
 */

export class XtreamService {
  private credentials: XtreamCredentials;
  private baseUrl: string;

  constructor(credentials: XtreamCredentials) {
    this.credentials = credentials;
    this.baseUrl = this.buildBaseUrl();
  }

  private buildBaseUrl(): string {
    const { server, port } = this.credentials;
    let url = server;

    // Ajouter le protocole si manquant
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `http://${url}`;
    }

    // Supprimer le slash final si présent
    url = url.replace(/\/$/, '');

    // Ajouter le port si spécifié
    if (port) {
      url += `:${port}`;
    }

    return url;
  }

  /**
   * Construit l'URL de l'API player
   */
  private getPlayerApiUrl(action: string, params: Record<string, string> = {}): string {
    const { username, password } = this.credentials;
    const queryParams = new URLSearchParams({
      username,
      password,
      action,
      ...params,
    });
    return `${this.baseUrl}/player_api.php?${queryParams.toString()}`;
  }

  /**
   * Effectue une requête à l'API
   */
  private async apiRequest<T>(action: string, params: Record<string, string> = {}): Promise<T> {
    const url = this.getPlayerApiUrl(action, params);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Xtream API Error: ${error.message}`);
      }
      throw new Error('Xtream API Error: Unknown error');
    }
  }

  /**
   * Authentification et récupération des infos utilisateur/serveur
   */
  async authenticate(): Promise<XtreamAuthResponse> {
    const { username, password } = this.credentials;
    const url = `${this.baseUrl}/player_api.php?username=${username}&password=${password}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status}`);
      }

      const data = await response.json();

      if (data.user_info?.auth === 0) {
        throw new Error('Authentication failed: Invalid credentials');
      }

      return data as XtreamAuthResponse;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Authentication failed: Unknown error');
    }
  }

  // ====== LIVE TV ======

  /**
   * Récupère les catégories de chaînes live
   */
  async getLiveCategories(): Promise<XtreamCategory[]> {
    return this.apiRequest<XtreamCategory[]>('get_live_categories');
  }

  /**
   * Récupère toutes les chaînes live
   */
  async getLiveStreams(categoryId?: string): Promise<XtreamLiveStream[]> {
    const params: Record<string, string> = {};
    if (categoryId) {
      params.category_id = categoryId;
    }
    return this.apiRequest<XtreamLiveStream[]>('get_live_streams', params);
  }

  /**
   * Génère l'URL de streaming pour une chaîne live
   */
  getLiveStreamUrl(streamId: number, format: string = 'm3u8'): string {
    const { username, password } = this.credentials;
    return `${this.baseUrl}/live/${username}/${password}/${streamId}.${format}`;
  }

  // ====== VOD (Films) ======

  /**
   * Récupère les catégories de films
   */
  async getVodCategories(): Promise<XtreamCategory[]> {
    return this.apiRequest<XtreamCategory[]>('get_vod_categories');
  }

  /**
   * Récupère tous les films
   */
  async getVodStreams(categoryId?: string): Promise<XtreamVodStream[]> {
    const params: Record<string, string> = {};
    if (categoryId) {
      params.category_id = categoryId;
    }
    return this.apiRequest<XtreamVodStream[]>('get_vod_streams', params);
  }

  /**
   * Récupère les détails d'un film
   */
  async getVodInfo(vodId: number): Promise<unknown> {
    return this.apiRequest('get_vod_info', { vod_id: vodId.toString() });
  }

  /**
   * Génère l'URL de streaming pour un film
   */
  getVodStreamUrl(streamId: number, extension: string = 'mp4'): string {
    const { username, password } = this.credentials;
    return `${this.baseUrl}/movie/${username}/${password}/${streamId}.${extension}`;
  }

  // ====== SERIES ======

  /**
   * Récupère les catégories de séries
   */
  async getSeriesCategories(): Promise<XtreamCategory[]> {
    return this.apiRequest<XtreamCategory[]>('get_series_categories');
  }

  /**
   * Récupère toutes les séries
   */
  async getSeries(categoryId?: string): Promise<XtreamSeriesInfo[]> {
    const params: Record<string, string> = {};
    if (categoryId) {
      params.category_id = categoryId;
    }
    return this.apiRequest<XtreamSeriesInfo[]>('get_series', params);
  }

  /**
   * Récupère les détails d'une série (saisons et épisodes)
   */
  async getSeriesInfo(seriesId: number): Promise<XtreamSeriesDetails> {
    return this.apiRequest<XtreamSeriesDetails>('get_series_info', {
      series_id: seriesId.toString(),
    });
  }

  /**
   * Génère l'URL de streaming pour un épisode
   */
  getSeriesStreamUrl(streamId: string, extension: string = 'mp4'): string {
    const { username, password } = this.credentials;
    return `${this.baseUrl}/series/${username}/${password}/${streamId}.${extension}`;
  }

  // ====== EPG ======

  /**
   * Récupère le guide des programmes (EPG) court terme
   */
  async getShortEpg(streamId: number, limit?: number): Promise<unknown> {
    const params: Record<string, string> = { stream_id: streamId.toString() };
    if (limit) {
      params.limit = limit.toString();
    }
    return this.apiRequest('get_short_epg', params);
  }

  /**
   * Récupère le guide des programmes complet
   */
  async getSimpleDataTable(streamId: number): Promise<unknown> {
    return this.apiRequest('get_simple_data_table', {
      stream_id: streamId.toString(),
    });
  }

  // ====== CONVERSION EN PLAYLIST M3U ======

  /**
   * Convertit les chaînes live Xtream en playlist M3U
   */
  async convertToM3UPlaylist(): Promise<M3UPlaylist> {
    const [categories, liveStreams, vodStreams] = await Promise.all([
      this.getLiveCategories(),
      this.getLiveStreams(),
      this.getVodStreams().catch(() => [] as XtreamVodStream[]),
    ]);

    // Créer un map des catégories pour accès rapide
    const categoryMap = new Map<string, string>();
    categories.forEach(cat => {
      categoryMap.set(cat.category_id, cat.category_name);
    });

    // Convertir les chaînes live
    const liveChannels: M3UChannel[] = liveStreams.map(stream => {
      const channel = xtreamToM3UChannel(stream, this.credentials);
      // Remplacer l'ID de catégorie par le nom
      if (channel.group && categoryMap.has(channel.group)) {
        channel.group = categoryMap.get(channel.group);
      }
      return channel;
    });

    // Convertir les VOD
    const vodChannels: M3UChannel[] = vodStreams.map(vod => {
      const channel = xtreamVodToM3UChannel(vod, this.credentials);
      return channel;
    });

    const allChannels = [...liveChannels, ...vodChannels];
    const groups = Array.from(new Set(allChannels.map(ch => ch.group).filter(Boolean))) as string[];

    return {
      name: 'Xtream Playlist',
      channels: allChannels,
      groups: groups.sort(),
      totalChannels: allChannels.length,
      loadedAt: new Date(),
    };
  }

  // ====== UTILITAIRES ======

  /**
   * Vérifie si la connexion est valide
   */
  async testConnection(): Promise<{ success: boolean; message: string; userInfo?: XtreamAuthResponse['user_info'] }> {
    try {
      const auth = await this.authenticate();
      return {
        success: true,
        message: 'Connection successful',
        userInfo: auth.user_info,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Connection failed',
      };
    }
  }

  /**
   * Récupère les statistiques du compte
   */
  async getAccountStats(): Promise<{
    expirationDate: string;
    maxConnections: number;
    activeConnections: number;
    isTrial: boolean;
    status: string;
  }> {
    const auth = await this.authenticate();
    const { user_info } = auth;

    return {
      expirationDate: user_info.exp_date
        ? new Date(parseInt(user_info.exp_date) * 1000).toLocaleDateString()
        : 'N/A',
      maxConnections: parseInt(user_info.max_connections) || 1,
      activeConnections: parseInt(user_info.active_cons) || 0,
      isTrial: user_info.is_trial === '1',
      status: user_info.status,
    };
  }
}

/**
 * Factory pour créer une instance du service Xtream
 */
export function createXtreamService(credentials: XtreamCredentials): XtreamService {
  return new XtreamService(credentials);
}

/**
 * Parse une URL M3U Xtream pour extraire les credentials
 * Format: http://server:port/get.php?username=xxx&password=xxx&type=m3u_plus
 */
export function parseXtreamUrl(url: string): XtreamCredentials | null {
  try {
    const urlObj = new URL(url);
    const username = urlObj.searchParams.get('username');
    const password = urlObj.searchParams.get('password');

    if (!username || !password) {
      return null;
    }

    const server = `${urlObj.protocol}//${urlObj.hostname}`;
    const port = urlObj.port || undefined;

    return { server, username, password, port };
  } catch {
    return null;
  }
}

/**
 * Vérifie si une URL est une URL Xtream valide
 */
export function isXtreamUrl(url: string): boolean {
  return parseXtreamUrl(url) !== null;
}
