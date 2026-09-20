import React, { useState } from "react";
import { Sliders, RotateCcw, X, Volume2 } from "lucide-react";
import { EQUALIZER_PRESETS } from "../../data/musicTracks";

interface EqualizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bands: number[];
  onBandsChange: (bands: number[]) => void;
}

const FREQUENCY_LABELS = [
  { freq: "60 Гц", label: "Саб-бас" },
  { freq: "250 Гц", label: "Бас" },
  { freq: "1 кГц", label: "Средние" },
  { freq: "4 кГц", label: "Присутствие" },
  { freq: "14 кГц", label: "Высокие" },
];

export function EqualizerModal({
  isOpen,
  onClose,
  bands,
  onBandsChange,
}: EqualizerModalProps) {
  const [activePreset, setActivePreset] = useState<string>("Нейтральный (Flat)");

  if (!isOpen) return null;

  const handleSliderChange = (index: number, val: number) => {
    const nextBands = [...bands];
    nextBands[index] = val;
    onBandsChange(nextBands);
    setActivePreset("Пользовательский");
  };

  const applyPreset = (presetName: string, presetBands: number[]) => {
    setActivePreset(presetName);
    onBandsChange([...presetBands]);
  };

  const handleReset = () => {
    applyPreset("Нейтральный (Flat)", [0, 0, 0, 0, 0]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-stone-900 border border-stone-800 text-white rounded-3xl shadow-2xl max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">5-полосный студийный эквалайзер</h3>
              <p className="text-xs text-stone-400">Настройте частоты под свои наушники или аудиосистему</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Presets Row */}
        <div className="mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
            Пресеты звучания
          </span>
          <div className="flex flex-wrap gap-1.5">
            {EQUALIZER_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset.name, preset.bands)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  activePreset === preset.name
                    ? "bg-amber-500 text-stone-950 font-bold"
                    : "bg-stone-800 text-stone-300 hover:bg-stone-700"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Equalizer Vertical Sliders */}
        <div className="bg-stone-950/60 p-5 rounded-2xl border border-stone-800/80 mb-6">
          <div className="grid grid-cols-5 gap-3 h-48 items-center text-center">
            {FREQUENCY_LABELS.map((item, idx) => {
              const gain = bands[idx] || 0;
              return (
                <div key={item.freq} className="flex flex-col items-center justify-between h-full">
                  <span className="text-[11px] font-mono text-amber-400 font-semibold">
                    {gain > 0 ? `+${gain}` : gain} дБ
                  </span>

                  {/* Vertical Slider */}
                  <div className="relative flex-1 flex items-center justify-center my-2">
                    <input
                      type="range"
                      min={-12}
                      max={12}
                      step={1}
                      value={gain}
                      onChange={(e) => handleSliderChange(idx, parseInt(e.target.value, 10))}
                      className="accent-amber-400 w-28 h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer -rotate-90"
                    />
                  </div>

                  <div>
                    <span className="text-xs font-bold text-stone-200 block">{item.freq}</span>
                    <span className="text-[10px] text-stone-500 block">{item.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить в исходное</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-stone-950 bg-white hover:bg-stone-200 transition-colors shadow-xs"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
}
