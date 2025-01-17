"use client";

import React, { useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import FeatureCards from '../components/FeatureCard';
import AudioWaveAnimation from '../components/AudioWaveAnimation';

// Exemplo básico de verificação se a URL contem "deezer.com/playlist"
function isValidDeezerUrl(url) {
  return url.includes('deezer.com/playlist');
}

const PlaylistConverter = () => {
  const [deezerUrl, setDeezerUrl] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [convertStatus, setConvertStatus] = useState(null); 
  // 'success', 'error' ou null, para exibir feedback ao usuário
  const [isUrlValid, setIsUrlValid] = useState(true);

  const handleConvert = (e) => {
    e.preventDefault();

    // Validação simples
    if (!isValidDeezerUrl(deezerUrl)) {
      setIsUrlValid(false);
      return;
    } else {
      setIsUrlValid(true);
    }

    setIsConverting(true);
    setConvertStatus(null);

    // Simulação de conversão...
    setTimeout(() => {
      // Exemplo de “sucesso”
      setIsConverting(false);
      setConvertStatus('success');
      // Caso quisesse simular erro, você poderia usar:
      // setConvertStatus('error');
    }, 2000);
  };

  const handleUrlChange = (e) => {
    setDeezerUrl(e.target.value);
    setIsUrlValid(true);
    setConvertStatus(null);
  };

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4cfbf]">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
            <Play className="w-8 h-8 text-[#4d9375]" />
              <span className="ml-2 text-xl font-semibold tracking-wider ml-2"><span className='mr-2'>M e l o d y</span>M o v e r</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Seção "hero" */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Convert your playlists instantly
          </h1>
          <p className="text-lg text-[#758575] max-w-xl mx-auto">
            Transform your Deezer playlists into Spotify collections with just one click.
          </p>
        </div>
        <AudioWaveAnimation />

        {/* Formulário de conversão */}
        <div className="bg-[#2a2a2a] p-8 rounded-lg shadow-xl">
          <form onSubmit={handleConvert}>
            <div className="mb-6">
              <label htmlFor="playlist-url" className="block mb-2 text-sm font-medium">
                Deezer Playlist URL
              </label>
              <input
                type="url"
                id="playlist-url"
                className={`w-full p-3 bg-[#1e1e1e] border rounded-md text-[#d4cfbf]
                  focus:outline-none focus:border-[#4d9375] transition-colors
                  ${
                    isUrlValid 
                      ? 'border-gray-700'
                      : 'border-red-500'
                  }`}
                placeholder="https://www.deezer.com/playlist/..."
                value={deezerUrl}
                onChange={handleUrlChange}
                required
              />
              {!isUrlValid && (
                <p className="text-sm text-red-400 mt-2">
                  Por favor, insira uma URL válida do Deezer.
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-md flex items-center justify-center space-x-2
                ${
                  isConverting
                    ? 'bg-[#3d7460] cursor-not-allowed'
                    : 'bg-[#4d9375] hover:bg-[#3d7460]'
                }
                text-white transition-colors`}
              disabled={isConverting}
            >
              <span>{isConverting ? 'Converting...' : 'Convert to Spotify'}</span>
              {!isConverting && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Exemplo de mensagem de feedback pós-conversão */}
          {convertStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-700 text-white rounded-md">
              Playlist convertida com sucesso!
            </div>
          )}
          {convertStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-700 text-white rounded-md">
              Ocorreu um erro na conversão. Tente novamente.
            </div>
          )}
        </div>

        {/* Cards de recursos */}
        <FeatureCards />
      </main>
    </div>
  );
};

export default PlaylistConverter;
