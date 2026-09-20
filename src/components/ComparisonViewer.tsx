import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Columns,
  Split,
  Eye,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Copy,
  Check,
  Sparkles,
  Scissors,
  Layers,
} from "lucide-react";
import { ViewMode } from "../types";

interface ComparisonViewerProps {
  originalImage: string;
  processedImage: string | null;
  isLoading: boolean;
  activeInstruction?: string;
  onOpenExport: () => void;
  onInstantCutout: () => void;
  onCopyToClipboard: () => void;
  isCopied: boolean;
  modelUsed?: string;
}

export function ComparisonViewer({
  originalImage,
  processedImage,
  isLoading,
  activeInstruction,
  onOpenExport,
  onInstantCutout,
  onCopyToClipboard,
  isCopied,
  modelUsed,
}: ComparisonViewerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [canvasBg, setCanvasBg] = useState<"checkerboard" | "white" | "gray" | "dark">("white");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // If there's no processed image yet, default to showing original
  const effectiveMode = processedImage ? viewMode : "original-only";

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateSlider(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateSlider(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pos);
  }, []);

  // Loading animation message rotation
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  useEffect(() => {
    if (!isLoading) return;
    const messages = [
      "Analyzing product geometry & materials...",
      "Separating product silhouette from background...",
      "Cleaning surface blemishes and reflections...",
      "Applying studio lighting and natural contact shadow...",
      "Refining edge anti-aliasing...",
    ];
    const timer = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % messages.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [isLoading]);

  const getCanvasBgClass = () => {
    switch (canvasBg) {
      case "checkerboard":
        return "bg-checkerboard";
      case "white":
        return "bg-white";
      case "gray":
        return "bg-stone-100";
      case "dark":
        return "bg-stone-900";
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
      {/* Top Viewer Toolbar */}
      <div className="px-4 py-3 border-b border-stone-200 bg-stone-50/80 flex flex-wrap items-center justify-between gap-3">
        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-stone-200/70 p-1 rounded-xl text-xs font-medium">
          <button
            type="button"
            id="view-mode-split"
            onClick={() => setViewMode("split")}
            disabled={!processedImage}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
              effectiveMode === "split"
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Split comparison slider"
          >
            <Split className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Split Slider</span>
          </button>

          <button
            type="button"
            id="view-mode-side-by-side"
            onClick={() => setViewMode("side-by-side")}
            disabled={!processedImage}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
              effectiveMode === "side-by-side"
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Side by side view"
          >
            <Columns className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Side by Side</span>
          </button>

          <button
            type="button"
            id="view-mode-result-only"
            onClick={() => setViewMode("result-only")}
            disabled={!processedImage}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
              effectiveMode === "result-only"
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Cleaned result only"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Result</span>
          </button>

          <button
            type="button"
            id="view-mode-original-only"
            onClick={() => setViewMode("original-only")}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-colors ${
              effectiveMode === "original-only"
                ? "bg-white text-stone-900 shadow-xs font-semibold"
                : "text-stone-600 hover:text-stone-900"
            }`}
            title="Original raw photo"
          >
            <Eye className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Original</span>
          </button>
        </div>

        {/* Canvas Background & Zoom Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Background selector */}
          <div className="flex items-center gap-1 bg-stone-200/50 p-1 rounded-lg text-[11px]">
            <span className="text-stone-500 px-1 hidden md:inline">Backdrop:</span>
            <button
              type="button"
              onClick={() => setCanvasBg("white")}
              className={`w-5 h-5 rounded border ${
                canvasBg === "white" ? "border-amber-600 ring-2 ring-amber-300" : "border-stone-300"
              } bg-white`}
              title="White background"
            />
            <button
              type="button"
              onClick={() => setCanvasBg("checkerboard")}
              className={`w-5 h-5 rounded border ${
                canvasBg === "checkerboard" ? "border-amber-600 ring-2 ring-amber-300" : "border-stone-300"
              } bg-checkerboard`}
              title="Checkerboard (Transparency check)"
            />
            <button
              type="button"
              onClick={() => setCanvasBg("gray")}
              className={`w-5 h-5 rounded border ${
                canvasBg === "gray" ? "border-amber-600 ring-2 ring-amber-300" : "border-stone-300"
              } bg-stone-200`}
              title="Neutral Gray background"
            />
            <button
              type="button"
              onClick={() => setCanvasBg("dark")}
              className={`w-5 h-5 rounded border ${
                canvasBg === "dark" ? "border-amber-600 ring-2 ring-amber-300" : "border-stone-300"
              } bg-stone-900`}
              title="Dark studio background"
            />
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-stone-200/50 p-0.5 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.25))}
              className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-200/80 transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1 text-[11px] font-mono text-stone-600 min-w-10 text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(3, z + 0.25))}
              className="p-1 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-200/80 transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoomLevel !== 1 && (
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                className="p-1 rounded text-stone-500 hover:text-stone-900 text-[10px] font-medium"
                title="Reset zoom"
              >
                1:1
              </button>
            )}
          </div>

          {/* Instant Cutout Tool */}
          {processedImage && (
            <button
              type="button"
              id="btn-instant-cutout"
              onClick={onInstantCutout}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 hover:text-stone-900 transition-colors shadow-2xs"
              title="Create transparent PNG cutout"
            >
              <Scissors className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Cutout Mask</span>
            </button>
          )}

          {/* Copy to Clipboard */}
          {processedImage && (
            <button
              type="button"
              id="btn-copy-clipboard"
              onClick={onCopyToClipboard}
              className="p-1.5 rounded-lg text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 transition-colors shadow-2xs"
              title="Copy result to clipboard"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          )}

          {/* Export / Download button */}
          {processedImage && (
            <button
              type="button"
              id="btn-open-export"
              onClick={onOpenExport}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Canvas Display Stage */}
      <div
        ref={containerRef}
        className={`relative w-full h-[460px] sm:h-[540px] md:h-[600px] overflow-hidden select-none flex items-center justify-center ${getCanvasBgClass()}`}
        onPointerDown={effectiveMode === "split" && processedImage ? handlePointerDown : undefined}
        onPointerMove={effectiveMode === "split" && processedImage ? handlePointerMove : undefined}
        onPointerUp={effectiveMode === "split" && processedImage ? handlePointerUp : undefined}
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-stone-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="relative mb-4">
              <div className="w-14 h-14 rounded-full border-3 border-amber-400/20 border-t-amber-400 animate-spin"></div>
              <Sparkles className="w-6 h-6 text-amber-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <h4 className="text-base font-semibold tracking-tight text-white mb-1">
              Cleaning Up Product Photo
            </h4>
            <p className="text-xs text-amber-300 font-mono tracking-wide max-w-sm h-5 transition-all">
              {loadingTextIndex === 0 && "Analyzing product geometry & materials..."}
              {loadingTextIndex === 1 && "Separating product silhouette from background..."}
              {loadingTextIndex === 2 && "Cleaning surface blemishes and reflections..."}
              {loadingTextIndex === 3 && "Applying studio lighting and natural contact shadow..."}
              {loadingTextIndex === 4 && "Refining edge anti-aliasing..."}
            </p>
            {activeInstruction && (
              <div className="mt-4 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md max-w-md text-xs text-stone-300 border border-white/10 italic">
                "{activeInstruction}"
              </div>
            )}
          </div>
        )}

        {/* Display Rendering based on ViewMode */}
        {effectiveMode === "split" && processedImage && (
          <div
            className="relative w-full h-full flex items-center justify-center cursor-ew-resize overflow-hidden"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
          >
            {/* Background Layer: Processed Result (Cleaned) */}
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <img
                src={processedImage}
                alt="Cleaned product"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-md"
              />
            </div>

            {/* Foreground Layer: Original Raw Image (Clipped) */}
            <div
              className="absolute inset-0 flex items-center justify-center p-4 overflow-hidden pointer-events-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              }}
            >
              <img
                src={originalImage}
                alt="Original product"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-md"
              />
            </div>

            {/* Vertical Divider Line with Draggable Handle */}
            <div
              className="absolute top-0 bottom-0 z-10 w-0.5 bg-white shadow-lg pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-xl border-2 border-stone-800 text-stone-800 flex items-center justify-center text-[10px] font-bold">
                <Split className="w-4 h-4 text-stone-900" />
              </div>
            </div>

            {/* Floating Badges */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-stone-900/80 text-white backdrop-blur-md shadow-xs">
                Before (Raw)
              </span>
            </div>
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-amber-600/90 text-white backdrop-blur-md shadow-xs">
                After (Cleaned)
              </span>
            </div>
          </div>
        )}

        {effectiveMode === "side-by-side" && processedImage && (
          <div
            className="w-full h-full grid grid-cols-2 divide-x divide-stone-200/80 overflow-hidden"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
          >
            {/* Left: Original */}
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
              <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase bg-stone-900/80 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                Original Raw
              </span>
              <img
                src={originalImage}
                alt="Original product"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain drop-shadow-md"
              />
            </div>

            {/* Right: Cleaned */}
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
              <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase bg-amber-600/90 text-white px-2 py-0.5 rounded backdrop-blur-xs">
                Cleaned Studio
              </span>
              <img
                src={processedImage}
                alt="Cleaned product"
                referrerPolicy="no-referrer"
                className="max-w-full max-h-full object-contain drop-shadow-md"
              />
            </div>
          </div>
        )}

        {effectiveMode === "result-only" && processedImage && (
          <div
            className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
          >
            <img
              src={processedImage}
              alt="Cleaned product"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain drop-shadow-md"
            />
            <div className="absolute top-4 right-4 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-amber-600/90 text-white backdrop-blur-md shadow-xs">
                Cleaned Result
              </span>
            </div>
          </div>
        )}

        {effectiveMode === "original-only" && (
          <div
            className="relative w-full h-full flex items-center justify-center p-4 overflow-hidden"
            style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
          >
            <img
              src={originalImage}
              alt="Original product"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain drop-shadow-md"
            />
            <div className="absolute top-4 left-4 pointer-events-none">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider uppercase bg-stone-900/80 text-white backdrop-blur-md shadow-xs">
                Original Raw
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Metadata & Instruction Recap */}
      {processedImage && (
        <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between text-xs text-stone-600 gap-2">
          <div className="flex items-center gap-2 truncate max-w-xl">
            <span className="font-semibold text-stone-800 shrink-0">Applied Instruction:</span>
            <span className="text-stone-600 truncate italic">
              "{activeInstruction || "Clean up and background removal"}"
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-stone-500">
            {modelUsed && (
              <span className="font-mono bg-stone-200/70 px-2 py-0.5 rounded text-stone-700">
                {modelUsed}
              </span>
            )}
            <span>Drag slider horizontally to compare</span>
          </div>
        </div>
      )}
    </div>
  );
}
