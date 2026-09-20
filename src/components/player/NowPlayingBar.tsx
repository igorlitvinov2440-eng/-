import React from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Volume1,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  Sliders,
  FileText,
  Activity,
  Maximize2,
} from "lucide-react";
import { PlaybackRepeatMode, Track, VisualizerType } from "../../types/music";

interface NowPlayingBarProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  repeatMode: PlaybackRepeatMode;
  visualizerType: VisualizerType;
  isLyricsOpen: boolean;
  onTogglePlay: () => void;
  onNextTrack: () => void;
  onPrevTrack: () => void;
  onSeek: (time: number) => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onToggleShuffle: () => void;
  onToggleRepeat: () => void;
  onToggleFavorite: (trackId: string) => void;
  onToggleLyrics: () => void;
  onToggleVisualizerType: () => void;
  onOpenEqualizer: () => void;
  onOpenFullScreen?: () => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

const VISUALIZER_NAMES: Record<VisualizerType, string> = {
  bars: "Столбцы",
  wave: "Волна",
  circle: "Круг",
};

export function NowPlayingBar({
  currentTrack,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isShuffle,
  repeatMode,
  visualizerType,
  isLyricsOpen,
  onTogglePlay,
  onNextTrack,
  onPrevTrack,
  onSeek,
  onVolumeChange,
  onToggleMute,
  onToggleShuffle,
  onToggleRepeat,
  onToggleFavorite,
  onToggleLyrics,
  onToggleVisualizerType,
  onOpenEqualizer,
}: NowPlayingBarProps) {
  if (!currentTrack) return null;

  const effectiveDuration = duration || currentTrack.duration || 180;
  const progressPercent = Math.min(100, Math.max(0, (currentTime / effectiveDuration) * 100));

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const newTime = (val / 100) * effectiveDuration;
    onSeek(newTime);
  };

  const repeatTooltip =
    repeatMode === "off"
      ? "Повтор: выключен"
      : repeatMode === "one"
      ? "Повтор: текущий трек"
      : "Повтор: все треки";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900/95 backdrop-blur-lg border-t border-stone-800 text-white px-4 py-2.5 sm:py-3 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
        {/* Left: Track Information */}
        <div className="flex items-center gap-3 w-full sm:w-1/4 min-w-0">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-800 shadow-md group">
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isPlaying ? "scale-105" : "scale-100"
              }`}
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h4 className="text-xs sm:text-sm font-semibold truncate text-stone-100">
                {currentTrack.title}
              </h4>
            </div>
            <p className="text-[11px] text-stone-400 truncate">
              {currentTrack.artist} • <span className="text-stone-500">{currentTrack.album}</span>
            </p>
          </div>

          <button
            type="button"
            id="btn-like-current"
            onClick={() => onToggleFavorite(currentTrack.id)}
            className="p-1.5 rounded-full text-stone-400 hover:text-rose-500 transition-colors shrink-0"
            title="Добавить в любимые"
          >
            <Heart
              className={`w-4 h-4 ${
                currentTrack.isFavorite ? "fill-rose-500 text-rose-500" : ""
              }`}
            />
          </button>
        </div>

        {/* Center: Controls & Scrubber */}
        <div className="flex flex-col items-center w-full sm:w-2/4 max-w-xl">
          {/* Button Row */}
          <div className="flex items-center gap-3 sm:gap-4 mb-1">
            <button
              type="button"
              id="btn-shuffle"
              onClick={onToggleShuffle}
              className={`p-1.5 rounded-full text-xs transition-colors ${
                isShuffle ? "text-amber-400" : "text-stone-400 hover:text-white"
              }`}
              title="Перемешать треки"
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              type="button"
              id="btn-prev-track"
              onClick={onPrevTrack}
              className="p-1.5 rounded-full text-stone-300 hover:text-white transition-colors"
              title="Предыдущий трек"
            >
              <SkipBack className="w-4 h-4 fill-current" />
            </button>

            <button
              type="button"
              id="btn-play-pause"
              onClick={onTogglePlay}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-stone-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg"
              title={isPlaying ? "Пауза" : "Воспроизведение"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              type="button"
              id="btn-next-track"
              onClick={onNextTrack}
              className="p-1.5 rounded-full text-stone-300 hover:text-white transition-colors"
              title="Следующий трек"
            >
              <SkipForward className="w-4 h-4 fill-current" />
            </button>

            <button
              type="button"
              id="btn-repeat"
              onClick={onToggleRepeat}
              className={`p-1.5 rounded-full text-xs transition-colors ${
                repeatMode !== "off" ? "text-amber-400" : "text-stone-400 hover:text-white"
              }`}
              title={repeatTooltip}
            >
              {repeatMode === "one" ? (
                <Repeat1 className="w-4 h-4" />
              ) : (
                <Repeat className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Time Scrubber */}
          <div className="w-full flex items-center gap-2 text-[11px] font-mono text-stone-400 select-none">
            <span className="w-8 text-right">{formatTime(currentTime)}</span>
            <div className="relative flex-1 group py-1 flex items-center">
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={progressPercent}
                onChange={handleProgressChange}
                className="w-full h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500 group-hover:h-1.5 transition-all"
              />
            </div>
            <span className="w-8">{formatTime(effectiveDuration)}</span>
          </div>
        </div>

        {/* Right: Volume & Sound Tools */}
        <div className="hidden sm:flex items-center justify-end gap-2 w-1/4">
          <button
            type="button"
            onClick={onToggleVisualizerType}
            className="p-1.5 rounded-lg text-stone-400 hover:text-amber-400 transition-colors"
            title={`Режим визуализатора: ${VISUALIZER_NAMES[visualizerType]}`}
          >
            <Activity className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onToggleLyrics}
            className={`p-1.5 rounded-lg transition-colors ${
              isLyricsOpen ? "text-amber-400 bg-stone-800" : "text-stone-400 hover:text-white"
            }`}
            title="Текст песни"
          >
            <FileText className="w-4 h-4" />
          </button>

          <button
            type="button"
            id="btn-open-eq"
            onClick={onOpenEqualizer}
            className="p-1.5 rounded-lg text-stone-400 hover:text-amber-400 transition-colors"
            title="Эквалайзер и звуковые эффекты"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5 ml-1">
            <button
              type="button"
              onClick={onToggleMute}
              className="p-1 text-stone-400 hover:text-white transition-colors"
              title={isMuted ? "Включить звук" : "Выключить звук"}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-stone-500" />
              ) : volume < 0.5 ? (
                <Volume1 className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-16 h-1 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              title={`Громкость: ${Math.round(volume * 100)}%`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
