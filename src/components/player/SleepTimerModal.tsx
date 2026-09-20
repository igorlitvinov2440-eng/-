import React from "react";
import { Moon, X, Clock, Check } from "lucide-react";

interface SleepTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  sleepTimerMinutes: number | null;
  onSetSleepTimer: (minutes: number | null) => void;
}

const PRESET_MINUTES = [15, 30, 45, 60, 90];

export function SleepTimerModal({
  isOpen,
  onClose,
  sleepTimerMinutes,
  onSetSleepTimer,
}: SleepTimerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-stone-900 border border-stone-800 text-white rounded-3xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-5">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Таймер сна</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-stone-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-stone-400 mb-4">
          Воспроизведение музыки автоматически остановится по истечении выбранного времени.
        </p>

        <div className="space-y-2 mb-6">
          {PRESET_MINUTES.map((mins) => {
            const isSelected = sleepTimerMinutes === mins;
            return (
              <button
                key={mins}
                onClick={() => {
                  onSetSleepTimer(mins);
                  onClose();
                }}
                className={`w-full p-3 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-amber-500/20 border-amber-400 text-amber-300"
                    : "bg-stone-950/40 border-stone-800 text-stone-200 hover:bg-stone-800"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-stone-400" />
                  <span>{mins} минут</span>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-400" />}
              </button>
            );
          })}
        </div>

        {sleepTimerMinutes !== null && (
          <button
            type="button"
            onClick={() => {
              onSetSleepTimer(null);
              onClose();
            }}
            className="w-full py-2.5 rounded-xl border border-red-500/30 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            Отключить таймер
          </button>
        )}
      </div>
    </div>
  );
}
