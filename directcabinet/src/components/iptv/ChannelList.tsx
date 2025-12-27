'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { M3UChannel, ContentType } from '@/types/iptv';
import { searchChannels, filterChannelsByGroup, sortChannels } from '@/lib/m3uParser';

interface ChannelListProps {
  channels: M3UChannel[];
  groups: string[];
  activeChannel: M3UChannel | null;
  onChannelSelect: (channel: M3UChannel) => void;
  onFavoriteToggle?: (channelId: string) => void;
  favorites?: string[];
}

export default function ChannelList({
  channels,
  groups,
  activeChannel,
  onChannelSelect,
  onFavoriteToggle,
  favorites = [],
}: ChannelListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [contentType, setContentType] = useState<ContentType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'group'>('name');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);

  // Filtrage et recherche
  const filteredChannels = useMemo(() => {
    let result = channels;

    // Filtrer par type de contenu
    if (contentType !== 'all') {
      result = result.filter(ch => ch.type === contentType);
    }

    // Filtrer par groupe
    result = filterChannelsByGroup(result, selectedGroup);

    // Recherche
    result = searchChannels(result, searchQuery);

    // Favoris uniquement
    if (showFavoritesOnly) {
      result = result.filter(ch => favorites.includes(ch.id));
    }

    // Tri
    result = sortChannels(result, sortBy, true);

    return result;
  }, [channels, contentType, selectedGroup, searchQuery, showFavoritesOnly, favorites, sortBy]);

  // Stats par type
  const stats = useMemo(() => {
    return {
      live: channels.filter(ch => ch.type === 'live').length,
      movies: channels.filter(ch => ch.type === 'movie').length,
      series: channels.filter(ch => ch.type === 'series').length,
      total: channels.length,
    };
  }, [channels]);

  const handleChannelClick = useCallback((channel: M3UChannel) => {
    onChannelSelect(channel);
  }, [onChannelSelect]);

  const isFavorite = useCallback((channelId: string) => {
    return favorites.includes(channelId);
  }, [favorites]);

  return (
    <div className="channel-list flex flex-col h-full bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
      {/* Header avec recherche */}
      <div className="p-4 border-b border-slate-700/50">
        {/* Barre de recherche */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une chaîne..."
            className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filtres par type */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setContentType('all')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              contentType === 'all'
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Tout ({stats.total})
          </button>
          <button
            onClick={() => setContentType('live')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              contentType === 'live'
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/25'
                : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              Live ({stats.live})
            </span>
          </button>
          <button
            onClick={() => setContentType('movie')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              contentType === 'movies'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            Films ({stats.movies})
          </button>
        </div>

        {/* Actions secondaires */}
        <div className="flex items-center gap-2 mt-3">
          {/* Bouton favoris */}
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-2 py-2 px-3 rounded-lg text-sm transition-all ${
              showFavoritesOnly
                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                : 'bg-slate-800/50 text-slate-400 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4" fill={showFavoritesOnly ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Favoris ({favorites.length})
          </button>

          {/* Sélecteur de groupe */}
          <div className="relative flex-1">
            <button
              onClick={() => setIsGroupsOpen(!isGroupsOpen)}
              className="w-full flex items-center justify-between gap-2 py-2 px-3 bg-slate-800/50 rounded-lg text-sm text-slate-400 hover:text-white transition-colors"
            >
              <span className="truncate">
                {selectedGroup === 'all' ? 'Tous les groupes' : selectedGroup}
              </span>
              <svg className={`w-4 h-4 transition-transform ${isGroupsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown des groupes */}
            {isGroupsOpen && (
              <div className="absolute z-50 top-full left-0 right-0 mt-2 max-h-64 overflow-y-auto bg-slate-800 border border-slate-600/50 rounded-xl shadow-xl">
                <button
                  onClick={() => {
                    setSelectedGroup('all');
                    setIsGroupsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    selectedGroup === 'all' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Tous les groupes
                </button>
                {groups.map((group) => (
                  <button
                    key={group}
                    onClick={() => {
                      setSelectedGroup(group);
                      setIsGroupsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      selectedGroup === group ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {group}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tri */}
          <button
            onClick={() => setSortBy(sortBy === 'name' ? 'group' : 'name')}
            className="p-2 bg-slate-800/50 rounded-lg text-slate-400 hover:text-white transition-colors"
            title={`Trier par ${sortBy === 'name' ? 'groupe' : 'nom'}`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Liste des chaînes */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredChannels.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12 text-slate-400">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">Aucune chaîne trouvée</p>
            <p className="text-sm mt-1 text-slate-500">
              {searchQuery ? 'Essayez une autre recherche' : 'Importez une playlist pour commencer'}
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {filteredChannels.map((channel, index) => (
              <button
                key={channel.id}
                onClick={() => handleChannelClick(channel)}
                className={`channel-item w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 group ${
                  activeChannel?.id === channel.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'hover:bg-slate-800/50 border border-transparent'
                }`}
                style={{ animationDelay: `${Math.min(index * 20, 500)}ms` }}
              >
                {/* Logo ou placeholder */}
                <div className="relative flex-shrink-0">
                  {channel.logo ? (
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      className="w-12 h-12 rounded-lg object-contain bg-slate-800/50 p-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '';
                        (e.target as HTMLImageElement).className = 'hidden';
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <span className="text-lg font-bold text-slate-500">
                        {channel.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  {/* Indicateur Live */}
                  {channel.isLive && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse" />
                  )}
                </div>

                {/* Infos chaîne */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-medium truncate ${
                    activeChannel?.id === channel.id ? 'text-cyan-400' : 'text-white'
                  }`}>
                    {channel.name}
                  </h4>
                  {channel.group && (
                    <p className="text-xs text-slate-500 truncate mt-0.5">{channel.group}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {/* Bouton favori */}
                  {onFavoriteToggle && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onFavoriteToggle(channel.id);
                      }}
                      className={`p-2 rounded-lg transition-colors ${
                        isFavorite(channel.id)
                          ? 'text-yellow-400 bg-yellow-500/20'
                          : 'text-slate-400 hover:text-yellow-400 hover:bg-slate-700'
                      }`}
                    >
                      <svg className="w-4 h-4" fill={isFavorite(channel.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  )}

                  {/* Indicateur de lecture */}
                  {activeChannel?.id === channel.id && (
                    <div className="flex items-center gap-0.5 ml-1">
                      <span className="w-1 h-4 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                      <span className="w-1 h-6 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                      <span className="w-1 h-3 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer avec stats */}
      <div className="p-3 border-t border-slate-700/50 bg-slate-800/30">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{filteredChannels.length} chaîne{filteredChannels.length > 1 ? 's' : ''}</span>
          {activeChannel && (
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
              En cours de lecture
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
