'use client';

import React, { useState, useRef, useCallback } from 'react';
import { M3UPlaylist, XtreamCredentials } from '@/types/iptv';
import { parseM3U, loadM3UFromUrl, isValidM3U } from '@/lib/m3uParser';
import { createXtreamService, parseXtreamUrl } from '@/lib/xtreamService';

type LoaderTab = 'm3u-file' | 'm3u-url' | 'xtream';

interface PlaylistLoaderProps {
  onPlaylistLoaded: (playlist: M3UPlaylist) => void;
  onClose: () => void;
}

export default function PlaylistLoader({ onPlaylistLoaded, onClose }: PlaylistLoaderProps) {
  const [activeTab, setActiveTab] = useState<LoaderTab>('m3u-file');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // M3U URL state
  const [m3uUrl, setM3uUrl] = useState('');

  // Xtream Code state
  const [xtreamServer, setXtreamServer] = useState('');
  const [xtreamUsername, setXtreamUsername] = useState('');
  const [xtreamPassword, setXtreamPassword] = useState('');
  const [xtreamPort, setXtreamPort] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Gestion du fichier M3U
  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);
    setIsLoading(true);

    try {
      const content = await file.text();

      if (!isValidM3U(content)) {
        throw new Error('Le fichier ne semble pas être une playlist M3U valide');
      }

      const playlist = parseM3U(content);
      playlist.name = file.name.replace(/\.m3u8?$/i, '');

      if (playlist.channels.length === 0) {
        throw new Error('Aucune chaîne trouvée dans la playlist');
      }

      onPlaylistLoaded(playlist);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement du fichier');
    } finally {
      setIsLoading(false);
    }
  }, [onPlaylistLoaded]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  // Drag & Drop
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.m3u') || file.name.endsWith('.m3u8'))) {
      handleFileSelect(file);
    } else {
      setError('Veuillez déposer un fichier .m3u ou .m3u8');
    }
  }, [handleFileSelect]);

  // Chargement depuis URL
  const handleUrlLoad = useCallback(async () => {
    if (!m3uUrl.trim()) {
      setError('Veuillez entrer une URL valide');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      // Vérifier si c'est une URL Xtream
      const xtreamCreds = parseXtreamUrl(m3uUrl);
      if (xtreamCreds) {
        const service = createXtreamService(xtreamCreds);
        const playlist = await service.convertToM3UPlaylist();
        onPlaylistLoaded(playlist);
        return;
      }

      // Sinon, charger comme M3U standard
      const playlist = await loadM3UFromUrl(m3uUrl);

      if (playlist.channels.length === 0) {
        throw new Error('Aucune chaîne trouvée dans la playlist');
      }

      onPlaylistLoaded(playlist);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement de la playlist');
    } finally {
      setIsLoading(false);
    }
  }, [m3uUrl, onPlaylistLoaded]);

  // Connexion Xtream Code
  const handleXtreamConnect = useCallback(async () => {
    if (!xtreamServer.trim() || !xtreamUsername.trim() || !xtreamPassword.trim()) {
      setError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const credentials: XtreamCredentials = {
        server: xtreamServer,
        username: xtreamUsername,
        password: xtreamPassword,
        port: xtreamPort || undefined,
      };

      const service = createXtreamService(credentials);

      // Test de connexion
      const testResult = await service.testConnection();
      if (!testResult.success) {
        throw new Error(testResult.message);
      }

      // Charger les chaînes
      const playlist = await service.convertToM3UPlaylist();

      if (playlist.channels.length === 0) {
        throw new Error('Aucune chaîne trouvée sur ce serveur');
      }

      onPlaylistLoaded(playlist);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion au serveur Xtream');
    } finally {
      setIsLoading(false);
    }
  }, [xtreamServer, xtreamUsername, xtreamPassword, xtreamPort, onPlaylistLoaded]);

  const tabs: { id: LoaderTab; label: string; icon: JSX.Element }[] = [
    {
      id: 'm3u-file',
      label: 'Fichier M3U',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: 'm3u-url',
      label: 'URL M3U',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      id: 'xtream',
      label: 'Xtream Code',
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-slate-900/95 rounded-3xl border border-slate-700/50 shadow-2xl shadow-cyan-500/10 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between p-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-xl font-bold text-white">Charger une Playlist</h2>
            <p className="text-sm text-slate-400 mt-1">Importez vos chaînes depuis un fichier ou serveur</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="relative flex gap-2 p-4 border-b border-slate-700/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setError(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* M3U File Tab */}
          {activeTab === 'm3u-file' && (
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                dragActive
                  ? 'border-cyan-500 bg-cyan-500/10'
                  : 'border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-800/30'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".m3u,.m3u8"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>

              <p className="text-white font-medium mb-2">
                {dragActive ? 'Déposez le fichier ici' : 'Glissez-déposez votre fichier M3U'}
              </p>
              <p className="text-slate-400 text-sm mb-4">ou</p>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isLoading ? 'Chargement...' : 'Parcourir les fichiers'}
              </button>

              <p className="mt-4 text-xs text-slate-500">
                Formats supportés: .m3u, .m3u8
              </p>
            </div>
          )}

          {/* M3U URL Tab */}
          {activeTab === 'm3u-url' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  URL de la playlist M3U
                </label>
                <input
                  type="url"
                  value={m3uUrl}
                  onChange={(e) => setM3uUrl(e.target.value)}
                  placeholder="https://exemple.com/playlist.m3u"
                  className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Supporte également les URLs Xtream Code (get.php)
                </p>
              </div>

              <button
                onClick={handleUrlLoad}
                disabled={isLoading || !m3uUrl.trim()}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Chargement...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Charger la playlist
                  </>
                )}
              </button>
            </div>
          )}

          {/* Xtream Code Tab */}
          {activeTab === 'xtream' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Serveur *
                  </label>
                  <input
                    type="text"
                    value={xtreamServer}
                    onChange={(e) => setXtreamServer(e.target.value)}
                    placeholder="http://serveur.exemple.com"
                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Port (optionnel)
                  </label>
                  <input
                    type="text"
                    value={xtreamPort}
                    onChange={(e) => setXtreamPort(e.target.value)}
                    placeholder="80"
                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Nom d&apos;utilisateur *
                  </label>
                  <input
                    type="text"
                    value={xtreamUsername}
                    onChange={(e) => setXtreamUsername(e.target.value)}
                    placeholder="username"
                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Mot de passe *
                  </label>
                  <input
                    type="password"
                    value={xtreamPassword}
                    onChange={(e) => setXtreamPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-800/50 border border-slate-600/50 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <button
                onClick={handleXtreamConnect}
                disabled={isLoading || !xtreamServer.trim() || !xtreamUsername.trim() || !xtreamPassword.trim()}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Connexion...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    Connecter au serveur
                  </>
                )}
              </button>

              <p className="text-xs text-slate-500 text-center">
                * Champs obligatoires
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative p-4 border-t border-slate-700/50 bg-slate-800/30">
          <p className="text-xs text-slate-500 text-center">
            Vos données sont stockées localement et ne sont jamais partagées
          </p>
        </div>
      </div>
    </div>
  );
}
