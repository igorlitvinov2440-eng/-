import React, { useRef, useEffect } from "react";
import { Disc, FileText, Activity, Heart, Sparkles, Music } from "lucide-react";
import { Track, VisualizerType } from "../../types/music";
import { AudioEngine } from "../../services/audioEngine";
import { VisualizerCanvas } from "./VisualizerCanvas";

interface MainPlayerViewProps {
  track: Track;
  isPlaying: boolean;
  currentTime: number;
  audioEngine: AudioEngine;
  visualizerType: VisualizerType;
  showLyrics: boolean;
  onToggleLyrics: () => void;
  onToggleFavorite: (id: string) => void;
}

const VISUALIZER_RUSSIAN_LABELS: Record<VisualizerType, string> = {
  bars: "Столбцы",
  wave: "Волна",
  circle: "Круг",
};

export function MainPlayerView({
  track,
  isPlaying,
  currentTime,
  audioEngine,
  visualizerType,
  showLyrics,
  onToggleLyrics,
  onToggleFavorite,
}: MainPlayerViewProps) {
  const lyricsContainerRef = useRef<HTMLDivElement | null>(null);

  // Find active lyric line based on current playback time
  const activeLyricIndex = track.lyrics
    ? track.lyrics.reduce((acc, line, idx) => (currentTime >= line.time ? idx : acc), 0)
    : -1;

  // Auto-scroll lyrics as song plays
  useEffect(() => {
    if (!showLyrics || !lyricsContainerRef.current) return;
    const activeEl = lyricsContainerRef.current.querySelector(`[data-lyric-index="${activeLyricIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeLyricIndex, showLyrics]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between">
      {/* Dynamic ambient color glow in the background */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: track.accentColor || "#6366f1" }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: track.accentColor || "#f43f5e" }}
      />

      {/* Top bar inside the main stage */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            {audioEngine.isUsingSynth() ? "Синтезированный аудиодвижок" : "Hi-Fi Стереозвучание"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleLyrics}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              showLyrics
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-stone-800/80 text-stone-300 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{showLyrics ? "Обложка трека" : "Текст песни"}</span>
          </button>
        </div>
      </div>

      {/* Main Center Area: Switch between Vinyl/Artwork and Lyrics View */}
      <div className="relative z-10 my-auto py-4 flex flex-col md:flex-row items-center justify-center gap-8 min-h-[300px]">
        {!showLyrics ? (
          /* Artwork & Vinyl View */
          <div className="flex flex-col items-center text-center">
            {/* Vinyl & Cover Assembly */}
            <div className="relative group">
              {/* Spinning Vinyl Record (slides out when playing) */}
              <div
                className={`absolute top-0 right-0 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-stone-950 border-4 border-stone-800 flex items-center justify-center shadow-2xl transition-all duration-700 pointer-events-none ${
                  isPlaying ? "translate-x-14 sm:translate-x-20 rotate-180" : "translate-x-0"
                }`}
                style={{
                  backgroundImage: "radial-gradient(circle, #292524 30%, #0c0a09 70%)",
                  boxShadow: "0 0 40px rgba(0,0,0,0.8)",
                }}
              >
                {/* Vinyl Grooves */}
                <div className="w-40 h-40 rounded-full border border-stone-800/60 flex items-center justify-center">
                  <div className="w-28 h-28 rounded-full border border-stone-800/60 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-stone-800 border-2 border-amber-500 flex items-center justify-center">
                      <Disc className={`w-8 h-8 text-amber-400 ${isPlaying ? "animate-spin" : ""}`} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Square Album Cover */}
              <div className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 rounded-2xl overflow-hidden shadow-2xl border border-stone-700/80 bg-stone-800">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                <button
                  type="button"
                  onClick={() => onToggleFavorite(track.id)}
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-rose-500 transition-colors shadow-lg"
                  title="Добавить в любимые треки"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      track.isFavorite ? "fill-rose-500 text-rose-500" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Track Title, Artist & Album */}
            <div className="mt-6 max-w-md">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-1">
                {track.title}
              </h2>
              <p className="text-sm font-medium text-stone-300">
                {track.artist}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700 font-medium">
                  {track.album}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 font-medium">
                  {track.genre}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Synchronized Lyrics View */
          <div
            ref={lyricsContainerRef}
            className="w-full max-w-xl h-80 overflow-y-auto px-4 py-8 space-y-5 text-center scrollbar-thin select-none"
          >
            {track.lyrics && track.lyrics.length > 0 ? (
              track.lyrics.map((line, idx) => {
                const isActive = idx === activeLyricIndex;
                const isPast = idx < activeLyricIndex;

                return (
                  <p
                    key={idx}
                    data-lyric-index={idx}
                    className={`transition-all duration-300 ${
                      isActive
                        ? "text-xl sm:text-2xl font-bold text-amber-300 scale-105 drop-shadow-md"
                        : isPast
                        ? "text-sm sm:text-base text-stone-400 opacity-60"
                        : "text-sm sm:text-base text-stone-500 opacity-40 hover:opacity-80"
                    }`}
                  >
                    {line.text}
                  </p>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-stone-400">
                <Music className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">Инструментальная композиция или текст отсутствует.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Stage Area: Audio Visualizer Canvas */}
      <div className="relative z-10 w-full pt-4 border-t border-stone-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium text-stone-400 uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            Визуализатор частот ({VISUALIZER_RUSSIAN_LABELS[visualizerType]})
          </span>
          <span className="text-[11px] text-stone-400 font-mono">
            {isPlaying ? "Прямой спектр сигнала" : "Режим ожидания"}
          </span>
        </div>

        <div className="w-full h-14 rounded-xl bg-stone-950/60 border border-stone-800 overflow-hidden p-1">
          <VisualizerCanvas
            audioEngine={audioEngine}
            isPlaying={isPlaying}
            type={visualizerType}
            accentColor={track.accentColor || "#6366f1"}
          />
        </div>
      </div>
    </div>
  );
}
