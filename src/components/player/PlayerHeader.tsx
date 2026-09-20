import React from "react";
import {
  Music,
  Moon,
  Sliders,
  Upload,
  Activity,
  Radio,
} from "lucide-react";
import { VisualizerType } from "../../types/music";

interface PlayerHeaderProps {
  onOpenEqualizer: () => void;
  onOpenUpload: () => void;
  onOpenSleepTimer: () => void;
  onCycleVisualizer: () => void;
  visualizerType: VisualizerType;
  sleepTimerRemaining: number | null;
  isPlaying: boolean;
}

const VISUALIZER_NAMES: Record<VisualizerType, string> = {
  bars: "Столбцы",
  wave: "Волна",
  circle: "Круг",
};

export function PlayerHeader({
  onOpenEqualizer,
  onOpenUpload,
  onOpenSleepTimer,
  onCycleVisualizer,
  visualizerType,
  sleepTimerRemaining,
  isPlaying,
}: PlayerHeaderProps) {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-stone-200/80 sticky top-0 z-30 px-4 sm:px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-md">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-stone-900 tracking-tight flex items-center gap-1.5">
              Аура Плеер
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                Звуковой движок
              </span>
            </h1>
            <p className="text-[11px] text-stone-500">
              5-полосный эквалайзер Web Audio • Визуализатор • Загрузка файлов
            </p>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          {/* Sleep Timer */}
          <button
            type="button"
            onClick={onOpenSleepTimer}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
              sleepTimerRemaining !== null
                ? "bg-amber-100 text-amber-900 border border-amber-300 font-semibold"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
            title="Таймер сна"
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {sleepTimerRemaining !== null ? `${sleepTimerRemaining} мин` : "Таймер сна"}
            </span>
          </button>

          {/* Visualizer Style Switcher */}
          <button
            type="button"
            onClick={onCycleVisualizer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
            title="Сменить режим визуализации"
          >
            <Activity className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Вид: {VISUALIZER_NAMES[visualizerType]}</span>
          </button>

          {/* Equalizer */}
          <button
            type="button"
            onClick={onOpenEqualizer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 text-stone-700 hover:bg-stone-200 transition-colors"
            title="Студийный эквалайзер"
          >
            <Sliders className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Эквалайзер</span>
          </button>

          {/* Upload Song Button */}
          <button
            type="button"
            onClick={onOpenUpload}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-xs"
          >
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Загрузить</span>
          </button>
        </div>
      </div>
    </header>
  );
}
