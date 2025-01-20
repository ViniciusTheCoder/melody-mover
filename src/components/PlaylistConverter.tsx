"use client";

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import FeatureCards from './featureCards';
import AudioWaveAnimation from './audioWaveAnimation';

const isValidDeezerUrl = (url: string): boolean => {
  return url.includes('deezer.com/playlist');
};

type ConvertStatus = 'success' | 'error' | null;

const PlaylistConverter: React.FC = () => {
  const [deezerUrl, setDeezerUrl] = useState<string>('');
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [convertStatus, setConvertStatus] = useState<ConvertStatus>(null); 
  const [isUrlValid, setIsUrlValid] = useState<boolean>(true);

  const handleConvert = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!isValidDeezerUrl(deezerUrl)) {
      setIsUrlValid(false);
      return;
    } else {
      setIsUrlValid(true);
    }

    setIsConverting(true);
    setConvertStatus(null);

    setTimeout(() => {
      setIsConverting(false);
      setConvertStatus('success');
    }, 2000);
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDeezerUrl(e.target.value);
    setIsUrlValid(true);
    setConvertStatus(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-violet-950 text-white overflow-hidden">
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Play className="w-8 h-8 text-purple-400" />
              <span className="text-xl sm:text-2xl font-bold ml-2">
                Melody Mover
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Convert your playlists instantly
          </h1>
          <p className="text-lg text-gray-300 max-w-xl mx-auto">
            Transform your Deezer playlists into Spotify collections with just one click.
          </p>
        </div>
        <AudioWaveAnimation />

        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
          <form onSubmit={handleConvert} className="flex flex-col items-center">
            <div className="w-full mb-6">
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
              className={`w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 
                px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 
                transition-all duration-300 transform hover:scale-105 hover:shadow-lg
                ${isConverting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
              disabled={isConverting}
            >
              {isConverting ? (
                <>
                  <span>Converting...</span>
                  <ArrowRight className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  <span>Convert to Spotify</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {convertStatus === 'success' && (
            <div className="mt-4 p-3 bg-green-700 text-white rounded-md text-center">
              Playlist convertida com sucesso!
            </div>
          )}
          {convertStatus === 'error' && (
            <div className="mt-4 p-3 bg-red-700 text-white rounded-md text-center">
              Ocorreu um erro na conversão. Tente novamente.
            </div>
          )}
        </div>

        <div className="mt-10">
          <FeatureCards />
        </div>
      </main>
    </div>
  );
};

export default PlaylistConverter;