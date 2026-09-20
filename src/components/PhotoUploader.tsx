import React, { useRef, useState } from "react";
import { UploadCloud, Image as ImageIcon, ArrowRight, CheckCircle2 } from "lucide-react";
import { SAMPLE_PHOTOS } from "../sampleData";
import { SamplePhoto } from "../types";
import { fileToDataUrl, urlToDataUrl } from "../utils/imageUtils";

interface PhotoUploaderProps {
  onPhotoSelected: (dataUrl: string, sampleInfo?: SamplePhoto) => void;
  isLoading: boolean;
}

export function PhotoUploader({ onPhotoSelected, isLoading }: PhotoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [loadingSampleId, setLoadingSampleId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        const dataUrl = await fileToDataUrl(file);
        onPhotoSelected(dataUrl);
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        const dataUrl = await fileToDataUrl(file);
        onPhotoSelected(dataUrl);
      }
    }
  };

  const handleSelectSample = async (sample: SamplePhoto) => {
    try {
      setLoadingSampleId(sample.id);
      const dataUrl = await urlToDataUrl(sample.url);
      onPhotoSelected(dataUrl, sample);
    } catch (err) {
      console.error("Failed to load sample image:", err);
    } finally {
      setLoadingSampleId(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Hero statement */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-2.5">
          Clean Up & Retouch Product Photos with Natural Text
        </h2>
        <p className="text-sm sm:text-base text-stone-600">
          Upload any raw product photo, or pick a sample below. Type what to remove or change—isolate subjects, remove messy backgrounds, clean up dust and scratches, or place products on modern architectural pedestals.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        id="drop-zone-uploader"
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? "border-amber-500 bg-amber-50/50 scale-[1.01]"
            : "border-stone-300 hover:border-stone-400 bg-stone-50/60 hover:bg-stone-50"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="w-16 h-16 rounded-2xl bg-white shadow-xs border border-stone-200 text-stone-700 mx-auto mb-4 flex items-center justify-center">
          <UploadCloud className="w-8 h-8 text-amber-600" />
        </div>

        <h3 className="text-base sm:text-lg font-semibold text-stone-900 mb-1">
          Drop your product photo here, or <span className="text-amber-700 underline underline-offset-2">browse file</span>
        </h3>
        <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto mb-4">
          Supports PNG, JPG, or WEBP up to 50MB. High-resolution photos are handled with lossless fidelity.
        </p>

        <div className="inline-flex items-center gap-4 text-xs text-stone-500 bg-white px-3.5 py-1.5 rounded-full border border-stone-200">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> E-commerce Ready
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Coding
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fast AI Inpainting
          </span>
        </div>
      </div>

      {/* Samples Grid */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-semibold text-stone-900 flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-amber-600" /> Or try with realistic product samples:
            </h4>
            <p className="text-xs text-stone-500">
              Pre-loaded scenarios with common product photo defects: background clutter, dust, reflections, and harsh shadows.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {SAMPLE_PHOTOS.map((sample) => {
            const isThisLoading = loadingSampleId === sample.id || (isLoading && loadingSampleId === sample.id);
            return (
              <button
                key={sample.id}
                id={`sample-card-${sample.id}`}
                onClick={() => handleSelectSample(sample)}
                disabled={isLoading}
                className="group text-left bg-white rounded-xl border border-stone-200 overflow-hidden hover:border-amber-400 hover:shadow-md transition-all duration-200 flex flex-col"
              >
                <div className="relative aspect-square w-full bg-stone-100 overflow-hidden">
                  <img
                    src={sample.url}
                    alt={sample.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isThisLoading && (
                    <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <span className="absolute bottom-1.5 left-1.5 text-[10px] font-medium bg-black/60 backdrop-blur-xs text-white px-1.5 py-0.5 rounded">
                    {sample.category.split(" ")[0]}
                  </span>
                </div>

                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h5 className="text-xs font-semibold text-stone-900 group-hover:text-amber-800 line-clamp-1">
                      {sample.title}
                    </h5>
                    <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                      {sample.description}
                    </p>
                  </div>
                  <div className="mt-2 pt-1.5 border-t border-stone-100 flex items-center justify-between text-[11px] font-medium text-amber-700">
                    <span>Load photo</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
