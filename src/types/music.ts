export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
  genre: string;
  isFavorite?: boolean;
  lyrics?: { time: number; text: string }[];
  accentColor?: string;
  isLocalUpload?: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl?: string;
  trackIds: string[];
  isCustom?: boolean;
}

export type PlaybackRepeatMode = "off" | "all" | "one";

export type VisualizerType = "bars" | "wave" | "circle";

export interface EqualizerPreset {
  name: string;
  bands: number[]; // 5 values: 60Hz, 250Hz, 1kHz, 4kHz, 14kHz in dB (-12 to +12)
}
