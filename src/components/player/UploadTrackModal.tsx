import React, { useState, useRef } from "react";
import { Upload, Music, X, Image as ImageIcon, Check } from "lucide-react";
import { Track } from "../../types/music";

interface UploadTrackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrack: (track: Track, playNow: boolean) => void;
}

const DEFAULT_COVERS = [
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80",
];

export function UploadTrackModal({
  isOpen,
  onClose,
  onAddTrack,
}: UploadTrackModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("Мой исполнитель");
  const [album, setAlbum] = useState("Мои треки");
  const [genre, setGenre] = useState("Электронная");
  const [selectedCover, setSelectedCover] = useState(DEFAULT_COVERS[0]);
  const [duration, setDuration] = useState(180);
  const [playNow, setPlayNow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFile = (uploadedFile: File) => {
    if (!uploadedFile.type.startsWith("audio/") && !uploadedFile.name.match(/\.(mp3|wav|ogg|m4a|flac)$/i)) {
      alert("Пожалуйста, выберите корректный аудиофайл (.mp3, .wav, .ogg, .m4a, .flac)");
      return;
    }

    setFile(uploadedFile);

    // Clean up filename for default title
    const cleanTitle = uploadedFile.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
    setTitle(cleanTitle);

    // Read audio duration
    const tempAudio = new Audio();
    const objectUrl = URL.createObjectURL(uploadedFile);
    tempAudio.src = objectUrl;
    tempAudio.onloadedmetadata = () => {
      if (tempAudio.duration && !isNaN(tempAudio.duration)) {
        setDuration(Math.round(tempAudio.duration));
      }
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const audioUrl = URL.createObjectURL(file);
    const newTrack: Track = {
      id: "local-" + Date.now(),
      title: title.trim() || file.name,
      artist: artist.trim() || "Неизвестный исполнитель",
      album: album.trim() || "Загруженная музыка",
      duration: duration || 180,
      coverUrl: selectedCover,
      audioUrl: audioUrl,
      genre: genre,
      isLocalUpload: true,
      accentColor: "#f59e0b",
      lyrics: [
        { time: 0, text: "♪ [Воспроизведение пользовательского трека] ♪" },
        { time: 10, text: `${title} — ${artist}` },
      ],
    };

    onAddTrack(newTrack, playNow);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-stone-900 border border-stone-800 text-white rounded-3xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-5">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">Добавить аудиофайл</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Dropzone */}
          {!file ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`p-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-amber-400 bg-amber-500/10"
                  : "border-stone-700 bg-stone-950/40 hover:border-stone-500"
              }`}
            >
              <Upload className="w-8 h-8 text-amber-400 mb-2" />
              <p className="text-xs font-semibold text-stone-200">
                Нажмите для выбора или перетащите аудиофайл сюда
              </p>
              <p className="text-[11px] text-stone-500 mt-1">Поддерживаются MP3, WAV, OGG, M4A, FLAC</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*,.mp3,.wav,.ogg,.m4a,.flac"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) handleFile(e.target.files[0]);
                }}
              />
            </div>
          ) : (
            <div className="p-3 bg-stone-800/80 rounded-2xl flex items-center justify-between border border-stone-700">
              <div className="flex items-center gap-2.5 min-w-0">
                <Music className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs text-stone-200 truncate font-medium">
                  {file.name}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-[11px] text-stone-400 hover:text-rose-400 underline underline-offset-2 ml-2 shrink-0"
              >
                Изменить
              </button>
            </div>
          )}

          {/* Metadata Inputs */}
          <div>
            <label className="text-[11px] font-semibold text-stone-400 block mb-1">
              Название трека
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Например: Любимая мелодия"
              className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] font-semibold text-stone-400 block mb-1">
                Исполнитель
              </label>
              <input
                type="text"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-400 block mb-1">
                Жанр
              </label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-stone-950 border border-stone-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Лоу-фай бит">Лоу-фай бит</option>
                <option value="Синтвейв">Синтвейв</option>
                <option value="Электронная">Электронная</option>
                <option value="Рок / Поп">Рок / Поп</option>
                <option value="Классика">Классика</option>
                <option value="Инди / Акустика">Инди / Акустика</option>
                <option value="Джаз">Джаз</option>
              </select>
            </div>
          </div>

          {/* Cover Art selection */}
          <div>
            <label className="text-[11px] font-semibold text-stone-400 block mb-1">
              Выберите обложку
            </label>
            <div className="grid grid-cols-4 gap-2">
              {DEFAULT_COVERS.map((cov, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelectedCover(cov)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedCover === cov ? "border-amber-400 ring-2 ring-amber-400/40" : "border-stone-800"
                  }`}
                >
                  <img src={cov} alt="Cover" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  {selectedCover === cov && (
                    <div className="absolute inset-0 bg-amber-500/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="check-play-now"
              checked={playNow}
              onChange={(e) => setPlayNow(e.target.checked)}
              className="accent-amber-400 rounded"
            />
            <label htmlFor="check-play-now" className="text-xs text-stone-300 cursor-pointer">
              Воспроизвести сразу после добавления
            </label>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-white"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={!file}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-40 transition-colors"
            >
              Добавить в плеер
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
