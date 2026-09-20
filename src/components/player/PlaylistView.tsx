import { useState } from "react";
import {
  Play,
  Pause,
  Heart,
  Search,
  Upload,
  Clock,
  Sparkles,
  Music2,
  FolderPlus,
} from "lucide-react";
import { Playlist, Track } from "../../types/music";

interface PlaylistViewProps {
  tracks: Track[];
  playlists: Playlist[];
  currentTrack: Track | null;
  isPlaying: boolean;
  activePlaylistId: string;
  onSelectPlaylist: (playlistId: string) => void;
  onSelectTrack: (track: Track) => void;
  onTogglePlay: () => void;
  onToggleFavorite: (trackId: string) => void;
  onOpenUpload: () => void;
}

function formatDuration(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "3:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function PlaylistView({
  tracks,
  playlists,
  currentTrack,
  isPlaying,
  activePlaylistId,
  onSelectPlaylist,
  onSelectTrack,
  onTogglePlay,
  onToggleFavorite,
  onOpenUpload,
}: PlaylistViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  const activePlaylist = playlists.find((p) => p.id === activePlaylistId) || playlists[0];

  // Filter tracks by active playlist trackIds
  let playlistTracks =
    activePlaylistId === "pl-all"
      ? tracks
      : activePlaylistId === "pl-favorites"
      ? tracks.filter((t) => t.isFavorite)
      : tracks.filter((t) => activePlaylist.trackIds.includes(t.id));

  // Extract all available genres
  const genres = Array.from(new Set(tracks.map((t) => t.genre)));

  // Search filter
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    playlistTracks = playlistTracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.album.toLowerCase().includes(q) ||
        t.genre.toLowerCase().includes(q)
    );
  }

  // Genre filter
  if (selectedGenre !== "all") {
    playlistTracks = playlistTracks.filter((t) => t.genre === selectedGenre);
  }

  return (
    <div className="w-full bg-white rounded-3xl border border-stone-200 shadow-sm p-5 sm:p-7 flex flex-col">
      {/* Top Header: Playlist Tabs & Upload Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
        <div>
          <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
            <Music2 className="w-5 h-5 text-amber-600" />
            Медиатека и плейлисты
          </h3>
          <p className="text-xs text-stone-500">
            {playlistTracks.length} {playlistTracks.length === 1 ? "трек" : "треков"} • Поддержка файлов MP3/WAV
          </p>
        </div>

        <button
          type="button"
          id="btn-upload-music"
          onClick={onOpenUpload}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors shadow-xs"
        >
          <Upload className="w-4 h-4 text-amber-400" />
          <span>Загрузить аудио (MP3/WAV)</span>
        </button>
      </div>

      {/* Playlist Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-3.5 scrollbar-thin">
        {playlists.map((pl) => {
          const isSelected = pl.id === activePlaylistId;
          return (
            <button
              key={pl.id}
              onClick={() => onSelectPlaylist(pl.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isSelected
                  ? "bg-amber-100 text-amber-950 border border-amber-300 font-semibold"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {pl.id === "pl-favorites" ? (
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              ) : (
                <FolderPlus className="w-3.5 h-3.5 text-stone-500" />
              )}
              <span>{pl.title}</span>
            </button>
          );
        })}
      </div>

      {/* Search & Genre Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 my-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию, артисту или альбому..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full scrollbar-thin">
          <button
            onClick={() => setSelectedGenre("all")}
            className={`text-[11px] px-2.5 py-1 rounded-lg transition-colors ${
              selectedGenre === "all"
                ? "bg-stone-800 text-white font-medium"
                : "text-stone-500 hover:bg-stone-100"
            }`}
          >
            Все жанры
          </button>
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`text-[11px] px-2.5 py-1 rounded-lg whitespace-nowrap transition-colors ${
                selectedGenre === g
                  ? "bg-stone-800 text-white font-medium"
                  : "text-stone-500 hover:bg-stone-100"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Tracks Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-stone-200/80 text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
              <th className="py-2.5 px-3 w-12 text-center">#</th>
              <th className="py-2.5 px-3">Название</th>
              <th className="py-2.5 px-3 hidden md:table-cell">Альбом</th>
              <th className="py-2.5 px-3 hidden sm:table-cell">Жанр</th>
              <th className="py-2.5 px-3 text-right">
                <Clock className="w-3.5 h-3.5 inline text-stone-400" />
              </th>
              <th className="py-2.5 px-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 text-xs">
            {playlistTracks.length > 0 ? (
              playlistTracks.map((track, idx) => {
                const isCurrent = currentTrack?.id === track.id;

                return (
                  <tr
                    key={track.id}
                    id={`track-row-${track.id}`}
                    onClick={() => {
                      if (isCurrent) {
                        onTogglePlay();
                      } else {
                        onSelectTrack(track);
                      }
                    }}
                    className={`group cursor-pointer transition-colors ${
                      isCurrent ? "bg-amber-50/70" : "hover:bg-stone-50"
                    }`}
                  >
                    {/* Index / Play Button */}
                    <td className="py-3 px-3 text-center text-stone-400 font-mono text-[11px]">
                      {isCurrent && isPlaying ? (
                        <div className="flex items-center justify-center gap-0.5 h-3 w-4 mx-auto text-amber-600">
                          <span className="w-1 h-3 bg-amber-600 rounded-full animate-bounce"></span>
                          <span className="w-1 h-2 bg-amber-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                          <span className="w-1 h-3.5 bg-amber-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                      ) : (
                        <span className="group-hover:hidden">{idx + 1}</span>
                      )}
                      <Play className="w-3.5 h-3.5 text-stone-700 hidden group-hover:block mx-auto fill-current" />
                    </td>

                    {/* Title & Artist & Artwork */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={track.coverUrl}
                          alt={track.title}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-lg object-cover bg-stone-200 shrink-0 border border-stone-200"
                        />
                        <div className="min-w-0">
                          <span
                            className={`font-semibold block truncate ${
                              isCurrent ? "text-amber-800 font-bold" : "text-stone-900"
                            }`}
                          >
                            {track.title}
                          </span>
                          <span className="text-[11px] text-stone-500 block truncate">
                            {track.artist}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Album */}
                    <td className="py-3 px-3 text-stone-600 hidden md:table-cell truncate max-w-[160px]">
                      {track.album}
                    </td>

                    {/* Genre */}
                    <td className="py-3 px-3 hidden sm:table-cell">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-700 border border-stone-200">
                        {track.genre}
                      </span>
                    </td>

                    {/* Duration */}
                    <td className="py-3 px-3 text-right font-mono text-stone-500 text-[11px]">
                      {formatDuration(track.duration)}
                    </td>

                    {/* Favorite Button */}
                    <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(track.id)}
                        className="p-1 rounded-md text-stone-400 hover:text-rose-500 transition-colors"
                        title="Добавить в любимые"
                      >
                        <Heart
                          className={`w-3.5 h-3.5 ${
                            track.isFavorite ? "fill-rose-500 text-rose-500" : ""
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-stone-400">
                  <Sparkles className="w-6 h-6 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">Треки в этой категории не найдены.</p>
                  <p className="text-xs text-stone-500 mt-1">Попробуйте изменить поисковый запрос или загрузите свой аудиофайл.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
