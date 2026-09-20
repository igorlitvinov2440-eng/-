import { Sparkles, Sliders, RotateCcw, Image as ImageIcon, Zap } from "lucide-react";

interface HeaderProps {
  hasImage: boolean;
  onReset: () => void;
  onOpenSamples: () => void;
  onToggleInspector: () => void;
  isInspectorOpen: boolean;
  activeModel: string;
}

export function Header({
  hasImage,
  onReset,
  onOpenSamples,
  onToggleInspector,
  isInspectorOpen,
  activeModel,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-semibold tracking-tight text-stone-900">
                Product Photo Studio
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/60">
                <Zap className="w-3 h-3 text-amber-600" />
                Prompt-Driven AI
              </span>
            </div>
            <p className="text-xs text-stone-500 hidden sm:block">
              Remove backgrounds and clean up product photos by typing instructions
            </p>
          </div>
        </div>

        {/* Actions & Model Tag */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active Model pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-xs font-medium text-stone-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-mono text-[11px] text-stone-600">{activeModel}</span>
          </div>

          <button
            id="btn-sample-photos"
            onClick={onOpenSamples}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sample Photos</span>
            <span className="sm:hidden">Samples</span>
          </button>

          {hasImage && (
            <>
              <button
                id="btn-toggle-inspector"
                onClick={onToggleInspector}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  isInspectorOpen
                    ? "bg-amber-100 text-amber-900 border border-amber-300"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
                title="AI Photo Inspector & Diagnostic Suggestions"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AI Inspector</span>
              </button>

              <button
                id="btn-reset-workspace"
                onClick={onReset}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
                title="Start over with a new photo"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Photo</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
