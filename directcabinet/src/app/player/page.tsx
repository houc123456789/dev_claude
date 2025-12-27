'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { M3UPlaylist, M3UChannel } from '@/types/iptv';
import VideoPlayer from '@/components/iptv/VideoPlayer';
import ChannelList from '@/components/iptv/ChannelList';
import PlaylistLoader from '@/components/iptv/PlaylistLoader';

// Clés localStorage
const STORAGE_KEYS = {
  PLAYLIST: 'iptv_playlist',
  FAVORITES: 'iptv_favorites',
  LAST_CHANNEL: 'iptv_last_channel',
};

export default function PlayerPage() {
  const [playlist, setPlaylist] = useState<M3UPlaylist | null>(null);
  const [activeChannel, setActiveChannel] = useState<M3UChannel | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showLoader, setShowLoader] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les données depuis localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const savedPlaylist = localStorage.getItem(STORAGE_KEYS.PLAYLIST);
      if (savedPlaylist) {
        const parsed = JSON.parse(savedPlaylist) as M3UPlaylist;
        parsed.loadedAt = new Date(parsed.loadedAt);
        setPlaylist(parsed);

        // Restaurer la dernière chaîne
        const lastChannelId = localStorage.getItem(STORAGE_KEYS.LAST_CHANNEL);
        if (lastChannelId) {
          const channel = parsed.channels.find(ch => ch.id === lastChannelId);
          if (channel) {
            setActiveChannel(channel);
          }
        }
      }

      const savedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }

    setIsLoaded(true);
  }, []);

  // Sauvegarder la playlist
  useEffect(() => {
    if (!isLoaded || !playlist) return;

    try {
      localStorage.setItem(STORAGE_KEYS.PLAYLIST, JSON.stringify(playlist));
    } catch (error) {
      console.error('Error saving playlist:', error);
    }
  }, [playlist, isLoaded]);

  // Sauvegarder les favoris
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites, isLoaded]);

  // Sauvegarder la dernière chaîne
  useEffect(() => {
    if (!isLoaded || !activeChannel) return;

    try {
      localStorage.setItem(STORAGE_KEYS.LAST_CHANNEL, activeChannel.id);
    } catch (error) {
      console.error('Error saving last channel:', error);
    }
  }, [activeChannel, isLoaded]);

  // Gestion de la playlist
  const handlePlaylistLoaded = useCallback((newPlaylist: M3UPlaylist) => {
    setPlaylist(newPlaylist);
    setShowLoader(false);
    // Sélectionner la première chaîne automatiquement
    if (newPlaylist.channels.length > 0) {
      setActiveChannel(newPlaylist.channels[0]);
    }
  }, []);

  const handleClearPlaylist = useCallback(() => {
    setPlaylist(null);
    setActiveChannel(null);
    localStorage.removeItem(STORAGE_KEYS.PLAYLIST);
    localStorage.removeItem(STORAGE_KEYS.LAST_CHANNEL);
  }, []);

  // Gestion des favoris
  const handleFavoriteToggle = useCallback((channelId: string) => {
    setFavorites(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      }
      return [...prev, channelId];
    });
  }, []);

  // Gestion de la sélection de chaîne
  const handleChannelSelect = useCallback((channel: M3UChannel) => {
    setActiveChannel(channel);
  }, []);

  // Navigation clavier entre chaînes
  useEffect(() => {
    if (!playlist) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;

      const channels = playlist.channels;
      const currentIndex = activeChannel
        ? channels.findIndex(ch => ch.id === activeChannel.id)
        : -1;

      if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const newIndex = currentIndex > 0 ? currentIndex - 1 : channels.length - 1;
        setActiveChannel(channels[newIndex]);
      } else if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const newIndex = currentIndex < channels.length - 1 ? currentIndex + 1 : 0;
        setActiveChannel(channels[newIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playlist, activeChannel]);

  // Animation de chargement initial
  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500/30 border-b-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Effets de fond */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              IPTV Player
            </h1>
            <p className="text-xs text-slate-500">
              {playlist ? `${playlist.totalChannels} chaînes` : 'Futuristic Streaming'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Toggle Sidebar */}
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className={`p-2.5 rounded-xl transition-all ${
              showSidebar
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-800/50 text-slate-400 hover:text-white'
            }`}
            title={showSidebar ? 'Masquer la liste' : 'Afficher la liste'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </button>

          {/* Charger playlist */}
          <button
            onClick={() => setShowLoader(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-cyan-500/25"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="hidden sm:inline">Ajouter Playlist</span>
          </button>

          {/* Clear playlist */}
          {playlist && (
            <button
              onClick={handleClearPlaylist}
              className="p-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Supprimer la playlist"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex h-[calc(100vh-73px)]">
        {/* Player Area */}
        <div className={`flex-1 p-4 transition-all duration-300 ${showSidebar ? 'lg:pr-0' : ''}`}>
          <div className="h-full flex flex-col">
            {/* Video Player */}
            <div className="flex-1 min-h-0">
              <VideoPlayer
                channel={activeChannel}
                autoPlay={true}
                onError={(error) => console.error('Player error:', error)}
              />
            </div>

            {/* Channel Info Bar (sous le player) */}
            {activeChannel && (
              <div className="mt-4 p-4 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {activeChannel.logo && (
                      <img
                        src={activeChannel.logo}
                        alt={activeChannel.name}
                        className="w-14 h-14 rounded-xl object-contain bg-slate-800/50 p-2"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <h2 className="text-lg font-semibold text-white">{activeChannel.name}</h2>
                      <div className="flex items-center gap-3 mt-1">
                        {activeChannel.group && (
                          <span className="px-2 py-0.5 bg-slate-800 rounded-md text-xs text-slate-400">
                            {activeChannel.group}
                          </span>
                        )}
                        {activeChannel.isLive && (
                          <span className="flex items-center gap-1.5 text-xs text-red-400">
                            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            EN DIRECT
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleFavoriteToggle(activeChannel.id)}
                      className={`p-2.5 rounded-xl transition-colors ${
                        favorites.includes(activeChannel.id)
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-slate-800/50 text-slate-400 hover:text-yellow-400'
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill={favorites.includes(activeChannel.id) ? 'currentColor' : 'none'}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Keyboard shortcuts hint */}
            <div className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-400">Space</kbd>
                Play/Pause
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-400">F</kbd>
                Plein écran
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-400">M</kbd>
                Mute
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="px-2 py-1 bg-slate-800 rounded text-slate-400">Ctrl + ↑↓</kbd>
                Chaîne suivante/précédente
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar - Channel List */}
        <div
          className={`w-96 flex-shrink-0 border-l border-slate-800/50 bg-slate-900/30 backdrop-blur-xl transition-all duration-300 ${
            showSidebar ? 'translate-x-0' : 'translate-x-full hidden'
          }`}
        >
          {playlist ? (
            <ChannelList
              channels={playlist.channels}
              groups={playlist.groups}
              activeChannel={activeChannel}
              onChannelSelect={handleChannelSelect}
              onFavoriteToggle={handleFavoriteToggle}
              favorites={favorites}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Aucune playlist chargée</h3>
              <p className="text-sm text-slate-400 mb-6">
                Importez une playlist M3U ou connectez-vous à un serveur Xtream Code
              </p>
              <button
                onClick={() => setShowLoader(true)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
              >
                Charger une playlist
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Playlist Loader Modal */}
      {showLoader && (
        <PlaylistLoader
          onPlaylistLoaded={handlePlaylistLoaded}
          onClose={() => setShowLoader(false)}
        />
      )}
    </div>
  );
}
