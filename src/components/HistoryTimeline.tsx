import { Clock, Undo2, ArrowRight } from "lucide-react";
import { EditHistoryItem } from "../types";

interface HistoryTimelineProps {
  history: EditHistoryItem[];
  currentIndex: number;
  onSelectRevision: (index: number) => void;
  onUseAsBase: (imageUrl: string) => void;
}

export function HistoryTimeline({
  history,
  currentIndex,
  onSelectRevision,
  onUseAsBase,
}: HistoryTimelineProps) {
  if (history.length <= 1) return null;

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 shadow-sm p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-stone-500" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
            Edit Revisions Timeline ({history.length} steps)
          </h4>
        </div>
        <span className="text-[11px] text-stone-500">
          Click any thumbnail to inspect or branch from that step
        </span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {history.map((item, index) => {
          const isSelected = index === currentIndex;
          const isOriginal = index === 0;

          return (
            <div
              key={item.id}
              className={`shrink-0 flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                isSelected
                  ? "bg-amber-50/70 border-amber-400 ring-2 ring-amber-200 shadow-xs"
                  : "bg-stone-50 border-stone-200 hover:border-stone-300"
              }`}
            >
              <button
                type="button"
                onClick={() => onSelectRevision(index)}
                className="flex items-center gap-2 text-left"
              >
                <div className="w-12 h-12 rounded-lg bg-stone-200 overflow-hidden shrink-0 border border-stone-300 relative">
                  <img
                    src={item.imageUrl}
                    alt={`Step ${index}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 border-2 border-amber-500 rounded-lg pointer-events-none" />
                  )}
                </div>

                <div className="max-w-[130px] pr-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-stone-900">
                      {isOriginal ? "Original" : `Step ${index}`}
                    </span>
                    {isSelected && (
                      <span className="text-[9px] bg-amber-200 text-amber-900 px-1 rounded font-semibold">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-stone-500 truncate" title={item.instruction}>
                    {item.instruction}
                  </p>
                </div>
              </button>

              {!isSelected && !isOriginal && (
                <button
                  type="button"
                  onClick={() => onUseAsBase(item.imageUrl)}
                  className="p-1 rounded text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
                  title="Make this image the current base"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
