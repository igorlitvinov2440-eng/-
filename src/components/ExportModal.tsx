import React, { useState } from "react";
import { Download, Copy, Check, X, FileImage, ShieldCheck } from "lucide-react";
import { downloadImage, copyImageToClipboard } from "../utils/imageUtils";

interface ExportModalProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
}

export function ExportModal({ imageUrl, isOpen, onClose, productName = "product" }: ExportModalProps) {
  const [format, setFormat] = useState<"png" | "jpeg" | "webp">("png");
  const [quality, setQuality] = useState<number>(0.95);
  const [isCopied, setIsCopied] = useState(false);
  const [filename, setFilename] = useState(`${productName.toLowerCase().replace(/\s+/g, "-")}-cleaned`);

  if (!isOpen) return null;

  const handleDownload = () => {
    // If user requested jpeg or webp conversion:
    if (format === "png") {
      downloadImage(imageUrl, `${filename}.png`);
      onClose();
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (format === "jpeg") {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);

      const mimeType = format === "jpeg" ? "image/jpeg" : "image/webp";
      const convertedUrl = canvas.toDataURL(mimeType, quality);
      downloadImage(convertedUrl, `${filename}.${format}`);
      onClose();
    };
    img.src = imageUrl;
  };

  const handleCopy = async () => {
    const success = await copyImageToClipboard(imageUrl);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileImage className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-semibold text-stone-900">
              Export Cleaned Product Photo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Preview Thumbnail */}
          <div className="w-full h-40 rounded-xl bg-checkerboard border border-stone-200 flex items-center justify-center overflow-hidden p-2">
            <img
              src={imageUrl}
              alt="Export preview"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-full object-contain drop-shadow-xs"
            />
          </div>

          {/* Filename */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              File Name
            </label>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Format selection */}
          <div>
            <label className="text-xs font-semibold text-stone-700 block mb-1">
              File Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormat("png")}
                className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-colors ${
                  format === "png"
                    ? "bg-amber-50 border-amber-400 text-amber-900 font-semibold shadow-2xs"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                PNG
                <span className="block text-[10px] text-stone-400 font-normal">Lossless / Alpha</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("jpeg")}
                className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-colors ${
                  format === "jpeg"
                    ? "bg-amber-50 border-amber-400 text-amber-900 font-semibold shadow-2xs"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                JPEG
                <span className="block text-[10px] text-stone-400 font-normal">Compressed</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("webp")}
                className={`py-2 px-3 rounded-lg border text-xs font-medium text-center transition-colors ${
                  format === "webp"
                    ? "bg-amber-50 border-amber-400 text-amber-900 font-semibold shadow-2xs"
                    : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                }`}
              >
                WEBP
                <span className="block text-[10px] text-stone-400 font-normal">Modern Web</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Ready for e-commerce catalogs (Shopify, Amazon, Etsy, WooCommerce)</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-5 py-4 border-t border-stone-200 bg-stone-50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 transition-colors"
          >
            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? "Copied" : "Copy to Clipboard"}</span>
          </button>

          <button
            type="button"
            id="btn-confirm-download"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-amber-400" />
            <span>Download {format.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
