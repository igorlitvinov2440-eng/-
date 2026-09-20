import React, { useState } from "react";
import {
  Sparkles,
  Send,
  Loader2,
  SlidersHorizontal,
  SunMedium,
  Grid,
  Box,
  Leaf,
  Moon,
  Lamp,
  X,
  RefreshCw,
} from "lucide-react";
import { QUICK_PRESETS } from "../sampleData";
import { AspectRatio, ImageSize, QuickPreset } from "../types";

interface InstructionBarProps {
  onExecuteInstruction: (instruction: string, options: { aspectRatio: AspectRatio; imageSize: ImageSize }) => void;
  isLoading: boolean;
  initialPrompt?: string;
}

export function InstructionBar({
  onExecuteInstruction,
  isLoading,
  initialPrompt = "",
}: InstructionBarProps) {
  const [instruction, setInstruction] = useState(initialPrompt);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("1:1");
  const [imageSize, setImageSize] = useState<ImageSize>("1K");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Sync if initial prompt changes from outside (e.g. sample or inspector)
  React.useEffect(() => {
    if (initialPrompt) {
      setInstruction(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!instruction.trim() || isLoading) return;
    onExecuteInstruction(instruction.trim(), { aspectRatio, imageSize });
  };

  const handleApplyPreset = (preset: QuickPreset) => {
    setInstruction(preset.prompt);
  };

  const getPresetIcon = (iconName: string) => {
    switch (iconName) {
      case "SunMedium":
        return <SunMedium className="w-3.5 h-3.5 text-amber-600" />;
      case "Grid":
        return <Grid className="w-3.5 h-3.5 text-indigo-600" />;
      case "Sparkles":
        return <Sparkles className="w-3.5 h-3.5 text-emerald-600" />;
      case "Box":
        return <Box className="w-3.5 h-3.5 text-stone-600" />;
      case "Leaf":
        return <Leaf className="w-3.5 h-3.5 text-green-600" />;
      case "Moon":
        return <Moon className="w-3.5 h-3.5 text-purple-600" />;
      case "Lamp":
        return <Lamp className="w-3.5 h-3.5 text-orange-600" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  const filteredPresets =
    activeCategory === "all"
      ? QUICK_PRESETS
      : QUICK_PRESETS.filter((p) => p.category === activeCategory);

  return (
    <div className="w-full bg-white rounded-2xl border border-stone-200 shadow-sm p-4 sm:p-5">
      {/* Main Instruction Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center justify-between">
          <label
            htmlFor="instruction-input"
            className="text-xs font-semibold uppercase tracking-wider text-stone-600 flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            Type Editing & Cleanup Instruction
          </label>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="btn-toggle-advanced-settings"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 transition-colors ${
                showAdvanced
                  ? "bg-stone-100 text-stone-900"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Settings ({aspectRatio}, {imageSize})</span>
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <div className="relative flex items-center">
          <textarea
            id="instruction-input"
            rows={2}
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="e.g., 'Remove background and place product on a clean white surface with soft shadow', or 'Clean all dust specks and scratches on the metal'..."
            className="w-full pr-28 sm:pr-32 pl-4 py-3 text-sm text-stone-900 bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none transition-all placeholder:text-stone-400"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            {instruction && (
              <button
                type="button"
                onClick={() => setInstruction("")}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-200/60 transition-colors"
                title="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              id="btn-run-instruction"
              disabled={!instruction.trim() || isLoading}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 shadow-xs ${
                !instruction.trim() || isLoading
                  ? "bg-stone-200 text-stone-400 cursor-not-allowed"
                  : "bg-stone-900 hover:bg-stone-800 text-white active:scale-98"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Execute</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Advanced Aspect Ratio & Size Options (Expandable) */}
        {showAdvanced && (
          <div className="pt-2 pb-1 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="font-medium text-stone-600 mb-1.5 block">Aspect Ratio</span>
              <div className="flex flex-wrap gap-1.5">
                {(["1:1", "4:3", "3:4", "16:9", "9:16"] as AspectRatio[]).map((ar) => (
                  <button
                    key={ar}
                    type="button"
                    onClick={() => setAspectRatio(ar)}
                    className={`px-2.5 py-1 rounded-md border font-mono text-[11px] transition-colors ${
                      aspectRatio === ar
                        ? "bg-amber-50 text-amber-900 border-amber-300 font-semibold"
                        : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    {ar} {ar === "1:1" && "(Square)"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="font-medium text-stone-600 mb-1.5 block">Output Resolution</span>
              <div className="flex gap-1.5">
                {(["1K", "2K", "512px"] as ImageSize[]).map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setImageSize(sz)}
                    className={`px-3 py-1 rounded-md border font-mono text-[11px] transition-colors ${
                      imageSize === sz
                        ? "bg-amber-50 text-amber-900 border-amber-300 font-semibold"
                        : "bg-white text-stone-600 border-stone-200 hover:bg-stone-50"
                    }`}
                  >
                    {sz} {sz === "1K" ? "(Default)" : sz === "2K" ? "(Ultra HD)" : "(Fast)"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Quick Presets Carousel */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-stone-500">
              Quick 1-Click Recipe Chips:
            </span>
            <div className="flex items-center gap-1">
              {["all", "background", "cleanup", "staging", "lighting"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] px-2 py-0.5 rounded capitalize transition-colors ${
                    activeCategory === cat
                      ? "bg-stone-200 text-stone-800 font-medium"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                id={`preset-chip-${preset.id}`}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 active:bg-amber-50 border border-stone-200 hover:border-stone-300 rounded-xl text-xs font-medium text-stone-700 transition-colors text-left group"
                title={preset.description}
              >
                {getPresetIcon(preset.iconName)}
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}
