// Types pour l'application IPTV - M3U et Xtream Code

// ====== TYPES M3U ======

export interface M3UChannel {
  id: string;
  name: string;
  logo?: string;
  group?: string;
  url: string;
  tvgId?: string;
  tvgName?: string;
  tvgLogo?: string;
  tvgCountry?: string;
  tvgLanguage?: string;
  tvgUrl?: string;
  catchup?: string;
  catchupSource?: string;
  catchupDays?: number;
  userAgent?: string;
  referer?: string;
  isLive: boolean;
  type: 'live' | 'movie' | 'series';
}

export interface M3UPlaylist {
  name: string;
  channels: M3UChannel[];
  groups: string[];
  totalChannels: number;
  loadedAt: Date;
}

export interface M3UParserOptions {
  extractGroups?: boolean;
  parseExtendedInfo?: boolean;
}

// ====== TYPES XTREAM CODE ======

export interface XtreamCredentials {
  server: string;
  username: string;
  password: string;
  port?: string;
}

export interface XtreamServerInfo {
  url: string;
  port: string;
  https_port: string;
  server_protocol: string;
  rtmp_port: string;
  timezone: string;
  timestamp_now: number;
  time_now: string;
}

export interface XtreamUserInfo {
  username: string;
  password: string;
  message: string;
  auth: number;
  status: string;
  exp_date: string;
  is_trial: string;
  active_cons: string;
  created_at: string;
  max_connections: string;
  allowed_output_formats: string[];
}

export interface XtreamAuthResponse {
  user_info: XtreamUserInfo;
  server_info: XtreamServerInfo;
}

export interface XtreamCategory {
  category_id: string;
  category_name: string;
  parent_id: number;
}

export interface XtreamLiveStream {
  num: number;
  name: string;
  stream_type: string;
  stream_id: number;
  stream_icon: string;
  epg_channel_id: string;
  added: string;
  category_id: string;
  custom_sid: string;
  tv_archive: number;
  direct_source: string;
  tv_archive_duration: number;
}

export interface XtreamVodStream {
  num: number;
  name: string;
  stream_type: string;
  stream_id: number;
  stream_icon: string;
  rating: string;
  rating_5based: number;
  added: string;
  category_id: string;
  container_extension: string;
  custom_sid: string;
  direct_source: string;
}

export interface XtreamSeriesInfo {
  series_id: number;
  name: string;
  cover: string;
  plot: string;
  cast: string;
  director: string;
  genre: string;
  releaseDate: string;
  last_modified: string;
  rating: string;
  rating_5based: number;
  backdrop_path: string[];
  youtube_trailer: string;
  episode_run_time: string;
  category_id: string;
}

export interface XtreamEpisode {
  id: string;
  episode_num: number;
  title: string;
  container_extension: string;
  info: {
    movie_image: string;
    plot: string;
    releasedate: string;
    rating: number;
    duration_secs: number;
    duration: string;
  };
  custom_sid: string;
  added: string;
  season: number;
  direct_source: string;
}

export interface XtreamSeriesDetails {
  seasons: {
    season_number: number;
    name: string;
    episode_count: number;
    overview: string;
    air_date: string;
    cover: string;
    cover_big: string;
  }[];
  info: XtreamSeriesInfo;
  episodes: {
    [key: string]: XtreamEpisode[];
  };
}

// ====== TYPES EPG ======

export interface EPGProgram {
  id: string;
  channelId: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  category?: string;
  icon?: string;
}

export interface EPGData {
  channelId: string;
  programs: EPGProgram[];
}

// ====== TYPES PLAYER ======

export interface PlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  isBuffering: boolean;
  isFullscreen: boolean;
  isMuted: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  error: string | null;
}

export interface PlayerControls {
  play: () => void;
  pause: () => void;
  stop: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleFullscreen: () => void;
}

// ====== TYPES APPLICATION ======

export type ContentType = 'live' | 'movies' | 'series';
export type PlaylistSource = 'm3u' | 'xtream' | 'url';

export interface PlaylistConfig {
  id: string;
  name: string;
  source: PlaylistSource;
  m3uContent?: string;
  m3uUrl?: string;
  xtreamCredentials?: XtreamCredentials;
  createdAt: Date;
  lastSync?: Date;
}

export interface AppState {
  playlists: PlaylistConfig[];
  activePlaylist: string | null;
  activeChannel: M3UChannel | XtreamLiveStream | null;
  contentType: ContentType;
  favorites: string[];
  recentlyWatched: string[];
}

// ====== CONVERSION UTILS ======

export function xtreamToM3UChannel(
  stream: XtreamLiveStream,
  credentials: XtreamCredentials
): M3UChannel {
  const baseUrl = `${credentials.server}${credentials.port ? ':' + credentials.port : ''}`;
  return {
    id: `xtream_${stream.stream_id}`,
    name: stream.name,
    logo: stream.stream_icon,
    group: stream.category_id,
    url: `${baseUrl}/live/${credentials.username}/${credentials.password}/${stream.stream_id}.m3u8`,
    tvgId: stream.epg_channel_id,
    isLive: true,
    type: 'live',
  };
}

export function xtreamVodToM3UChannel(
  vod: XtreamVodStream,
  credentials: XtreamCredentials
): M3UChannel {
  const baseUrl = `${credentials.server}${credentials.port ? ':' + credentials.port : ''}`;
  return {
    id: `xtream_vod_${vod.stream_id}`,
    name: vod.name,
    logo: vod.stream_icon,
    group: vod.category_id,
    url: `${baseUrl}/movie/${credentials.username}/${credentials.password}/${vod.stream_id}.${vod.container_extension}`,
    isLive: false,
    type: 'movie',
  };
}
