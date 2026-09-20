import React, { useState } from "react";
import {
  Sliders,
  AlertCircle,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Loader2,
  RefreshCw,
  X,
} from "lucide-react";
import { PhotoAnalysis } from "../types";

interface InspectorPanelProps {
  currentImage: string;
  onApplyPrompt: (prompt: string) => void;
  onClose: () => void;
}

export function InspectorPanel({ currentImage, onApplyPrompt, onClose }: InspectorPanelProps) {
  const [analysis, setAnalysis] = useState<PhotoAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      setError(null);
      const res = await fetch("/api/analyze-and-suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: currentImage }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Analysis failed");
      }
      setAnalysis(data.analysis);
    } catch (err: any) {
      console.error("Inspector error:", err);
      setError(err?.message || "Failed to inspect photo. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run automatically on open if not analyzed yet
  React.useEffect(() => {
    if (!analysis && !isAnalyzing && currentImage) {
      runAnalysis();
    }
  }, [currentImage]);

  return (
    <div className="w-full bg-amber-50/50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 relative shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-xs">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-stone-900">
              AI Photo Diagnostic Inspector
            </h3>
            <p className="text-xs text-stone-500">
              Scans defects & recommends precision cleanup prompts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-amber-100 transition-colors"
            title="Re-run analysis"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-amber-100 transition-colors"
            title="Close inspector"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isAnalyzing && (
        <div className="py-6 flex flex-col items-center justify-center text-center text-xs text-stone-600">
          <Loader2 className="w-6 h-6 animate-spin text-amber-600 mb-2" />
          <p className="font-medium">Evaluating photo geometry, surface blemishes, and backdrop...</p>
        </div>
      )}

      {error && !isAnalyzing && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium">Diagnostic could not complete</p>
            <p className="mt-0.5 text-red-600/80">{error}</p>
            <button
              onClick={runAnalysis}
              className="mt-2 text-red-800 font-semibold underline underline-offset-2"
            >
              Retry inspection
            </button>
          </div>
        </div>
      )}

      {analysis && !isAnalyzing && (
        <div className="space-y-4">
          {/* Detected Subject & Defects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Detected Product Subject
              </span>
              <p className="font-semibold text-stone-900 text-sm">{analysis.productName}</p>
            </div>

            <div className="bg-white/80 p-3 rounded-xl border border-amber-200/60">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Identified Imperfections
              </span>
              <ul className="space-y-1">
                {analysis.issuesFound.map((issue, idx) => (
                  <li key={idx} className="flex items-center gap-1.5 text-stone-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommended Prompts */}
          <div>
            <span className="text-xs font-semibold text-stone-700 block mb-2">
              Recommended 1-Click Retouch Prompts:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {analysis.suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => onApplyPrompt(sug.prompt)}
                  className="group p-2.5 bg-white hover:bg-amber-100/50 border border-stone-200 hover:border-amber-400 rounded-xl text-left transition-all duration-150 flex flex-col justify-between shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-stone-900 group-hover:text-amber-900">
                      {sug.title}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 capitalize font-medium">
                      {sug.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 line-clamp-2 italic">
                    "{sug.prompt}"
                  </p>
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-amber-700 group-hover:text-amber-800">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>Apply instruction</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform ml-auto" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
