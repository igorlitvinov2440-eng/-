declare const jsmediatags: any;
declare const ColorThief: any;
declare const Capacitor: any;

// ===== НАСТРОЙКИ =====
interface AppBaseTheme {
  id: string;
  name: string;
  desc: string;
  base: string;
  surface: string;
  surfaceElevated: string;
  card: string;
  border: string;
  previewColor: string;
}

const APP_THEMES: AppBaseTheme[] = [
  {
    id: 'violet',
    name: 'Космический фиолетовый',
    desc: 'Классический ретро-футуристичный темный фиолет',
    base: '#12101a',
    surface: '#1c1830',
    surfaceElevated: '#241f3d',
    card: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(var(--accent-rgb), 0.22)',
    previewColor: '#2b1b4a'
  },
  {
    id: 'obsidian',
    name: 'Глубокий обсидиан (OLED)',
    desc: 'Настоящий глубокий черный для максимальной контрастности',
    base: '#070709',
    surface: '#131317',
    surfaceElevated: '#1a1a20',
    card: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(255, 255, 255, 0.12)',
    previewColor: '#121216'
  },
  {
    id: 'midnight',
    name: 'Полуночный индиго',
    desc: 'Глубокий синий космический тон ночного города',
    base: '#0a0f1d',
    surface: '#121c2e',
    surfaceElevated: '#18253d',
    card: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(56, 189, 248, 0.2)',
    previewColor: '#1b2a47'
  },
  {
    id: 'charcoal',
    name: 'Студийный графит',
    desc: 'Сдержанный нейтральный матовый серый оттенок аппаратуры',
    base: '#131417',
    surface: '#1d1f24',
    surfaceElevated: '#262930',
    card: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(255, 255, 255, 0.12)',
    previewColor: '#2b2d35'
  },
  {
    id: 'wine',
    name: 'Тёмный рубин',
    desc: 'Винтажный винный и бордовый бархат',
    base: '#170c14',
    surface: '#261320',
    surfaceElevated: '#33192c',
    card: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(255, 107, 157, 0.2)',
    previewColor: '#3d162d'
  },
  {
    id: 'emerald',
    name: 'Изумрудная хвоя',
    desc: 'Глубокая хвойная ночная гамма в стиле ретро-синтезатора',
    base: '#081411',
    surface: '#0f241e',
    surfaceElevated: '#15332b',
    card: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(16, 185, 129, 0.2)',
    previewColor: '#14362b'
  },
  {
    id: 'cyberpunk',
    name: 'Киберпанк нуар',
    desc: 'Ультратёмный неоновый сине-фиолетовый кибер-стиль',
    base: '#0b0817',
    surface: '#16112c',
    surfaceElevated: '#211942',
    card: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(196, 77, 255, 0.25)',
    previewColor: '#28174f'
  },
  {
    id: 'espresso',
    name: 'Тёплый эспрессо',
    desc: 'Винтажный тёплый шоколадно-кофейный винил',
    base: '#140f0c',
    surface: '#221915',
    surfaceElevated: '#30241e',
    card: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(245, 166, 35, 0.2)',
    previewColor: '#362218'
  },
  {
    id: 'sapphire',
    name: 'Королевский сапфир',
    desc: 'Глубокий насыщенный сине-лазурный бархат',
    base: '#081122',
    surface: '#0d1d3a',
    surfaceElevated: '#13284f',
    card: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(59, 130, 246, 0.25)',
    previewColor: '#173060'
  },
  {
    id: 'amethyst',
    name: 'Тёмный аметист',
    desc: 'Мистический глубокий сумеречный кварц',
    base: '#130d1d',
    surface: '#1f1530',
    surfaceElevated: '#2d1f45',
    card: 'rgba(255, 255, 255, 0.04)',
    border: 'rgba(168, 85, 247, 0.25)',
    previewColor: '#392257'
  }
];

function getAppBaseTheme(id?: string): AppBaseTheme {
  return APP_THEMES.find(t => t.id === (id || (appSettings ? appSettings.appThemeBg : 'violet'))) || APP_THEMES[0];
}

export type MediaSkinType = 'cassette' | 'vinyl';

export interface SoundFxSettings {
  enabled: boolean;
  preset: 'bass' | 'surround' | 'vocal' | 'punch' | 'club' | 'flat' | 'custom';
  bassBoost: number; // 0..100 (%)
  spatial3D: number; // 0..100 (%)
  trebleClarity: number; // 0..100 (%)
  compressor: boolean;
  eqBands: number[]; // 5 bands in dB [-12..+12]: 60Hz, 230Hz, 910Hz, 3.6kHz, 14kHz
  eqPreset: 'flat' | 'bass' | 'rock' | 'pop' | 'jazz' | 'club' | 'vocal' | 'treble' | 'custom';
}

interface AppSettings {
  neonGlow: boolean;
  cassetteFloat: boolean;
  dynamicBg: boolean;
  topGradient: boolean;
  showCassetteCover: boolean;
  showMediaText?: boolean;
  hapticFeedback: boolean;
  vintageFilter: boolean;
  eqPreset: 'flat' | 'bass' | 'vocal';
  accentTheme: string;
  appThemeBg: string;
  cassetteSkin?: string;
  mediaSkin?: MediaSkinType;
  playerSkin?: 'classic' | 'hardware';
  labelFont?: string;
  sleepTimerMinutes: number | null;
  autoScanOnStart: boolean;
  soundFx: SoundFxSettings;
}

const defaultSoundFx: SoundFxSettings = {
  enabled: false,
  preset: 'flat',
  bassBoost: 0,
  spatial3D: 0,
  trebleClarity: 0,
  compressor: false,
  eqBands: [0, 0, 0, 0, 0],
  eqPreset: 'flat',
};

const defaultSettings: AppSettings = {
  neonGlow: true,
  cassetteFloat: true,
  dynamicBg: true,
  topGradient: true,
  showCassetteCover: true,
  showMediaText: false,
  hapticFeedback: true,
  vintageFilter: false,
  eqPreset: 'flat',
  accentTheme: '#00e5ff',
  appThemeBg: 'obsidian',
  mediaSkin: 'vinyl',
  playerSkin: 'hardware',
  sleepTimerMinutes: null,
  autoScanOnStart: true,
  soundFx: defaultSoundFx,
};

function loadSettings(): AppSettings {
  try {
    const raw = localStorage.getItem('my_player_settings');
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...defaultSettings,
        ...parsed,
        neonGlow: true,
        cassetteFloat: true,
        mediaSkin: 'vinyl',
        playerSkin: parsed.playerSkin || 'hardware',
        topGradient: parsed.topGradient !== undefined ? parsed.topGradient : true,
        showCassetteCover: parsed.showCassetteCover !== undefined ? parsed.showCassetteCover : true,
        soundFx: { ...defaultSoundFx, ...(parsed.soundFx || {}) },
      };
    }
  } catch (e) {}
  return { ...defaultSettings, neonGlow: true, cassetteFloat: true, soundFx: { ...defaultSoundFx } };
}

let appSettings: AppSettings = loadSettings();

// ===== УТИЛИТЫ =====
const $ = (id: string) => document.getElementById(id) as HTMLElement;
const hasVibrate = typeof navigator !== 'undefined' && !!navigator.vibrate;
const buzz = (ms: number = 8) => {
  if (hasVibrate && appSettings.hapticFeedback) {
    try { navigator.vibrate(ms); } catch (e) {}
  }
};
const fmt = (s: number) => {
  if (!s || isNaN(s)) return '0:00';
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

function formatBytes(bytes: number): string {
  if (!bytes || bytes === 0) return '0 КБ';
  const k = 1024;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

const _htmlCache = new Map<string, string>();
function escapeHtml(s: any): string {
  const str = String(s);
  if (_htmlCache.has(str)) return _htmlCache.get(str)!;
  const result = str.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] || c));
  if (_htmlCache.size > 1000) _htmlCache.clear();
  _htmlCache.set(str, result);
  return result;
}

// ===== SVG-иконки (белые через currentColor) =====
const SVG_NOTE = '<svg viewBox="0 0 24 24"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="currentColor"/></svg>';
const SVG_PLAYLIST = '<svg viewBox="0 0 24 24"><path d="M15 6H3v2h12V6zm0 4H3v2h12v-2zM3 16h8v-2H3v2zM17 6v8.18c-.31-.11-.65-.18-1-.18-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3V8h3V6h-5z" fill="currentColor"/></svg>';
const SVG_ALBUM = '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" fill="currentColor"/></svg>';
const SVG_SETTINGS = '<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/></svg>';
const SVG_EQUALIZER = '<svg viewBox="0 0 24 24"><path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z" fill="currentColor"/></svg>';
const SVG_BRUSH = '<svg viewBox="0 0 24 24"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.996.996 0 0 0-1.41 0L9 12.25 11.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z" fill="currentColor"/></svg>';
const SVG_STORAGE = '<svg viewBox="0 0 24 24"><path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z" fill="currentColor"/></svg>';
const SVG_PLAYLIST_BIG = SVG_PLAYLIST;
const SVG_ALBUM_BIG = SVG_ALBUM;
const SVG_PLAYLIST_EMPTY = SVG_PLAYLIST;
const SVG_ALBUM_EMPTY = SVG_ALBUM;

const SVG_PALETTE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z"/></svg>';
const SVG_SLIDERS = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>';
const SVG_STORAGE_DISC = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12H2"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></svg>';
const SVG_INFO_CIRCLE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
const SVG_CASSETTE_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8" cy="11.5" r="2.5"/><circle cx="16" cy="11.5" r="2.5"/><path d="M8 14h8"/><path d="M6 20l2-3h8l2 3"/></svg>';
const SVG_SMARTPHONE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>';
const SVG_FOLDER_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>';
const SVG_SEARCH_RADAR = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/><path d="M12 12l7-7"/><circle cx="12" cy="12" r="2"/></svg>';
const SVG_TRASH_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';
const SVG_MUSIC_FORMAT = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
const SVG_SPARKLES_TIPS = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"/></svg>';

const SVG_HEART = '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="currentColor" stroke-width="2"/></svg>';
const SVG_HEART_FILLED = '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg>';
const SVG_CHEVRON_RIGHT = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';
const SVG_VOLUME = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
const SVG_HEADPHONES = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/></svg>';
const SVG_SPARKLES = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.91 5.09L19 10l-5.09 1.91L12 17l-1.91-5.09L5 10l5.09-1.91L12 3z"/></svg>';
const SVG_BOLT = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
const SVG_ACTIVITY = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>';
const SVG_WAVE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h3l2-6 4 12 4-12 2 6h3"/></svg>';
const SVG_DISC = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>';
const SVG_MEDIA_VINYL = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 6a6 6 0 0 1 6 6" stroke-dasharray="2 2"/></svg>';
const SVG_MEDIA_CASSETTE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8" cy="11.5" r="2.5"/><circle cx="16" cy="11.5" r="2.5"/><path d="M8 14h8"/></svg>';
const SVG_DAP_PLAYER_ICON = '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" fill-rule="evenodd"><path d="M 8 2.5 C 6.5 2.5 5.5 3.5 5.5 5 L 5.5 19 C 5.5 20.5 6.5 21.5 8 21.5 L 16 21.5 C 17.5 21.5 18.5 20.5 18.5 19 L 18.5 5 C 18.5 3.5 17.5 2.5 16 2.5 L 14.5 2.5 L 14.5 1 C 14.5 0.6 14.1 0.3 13.7 0.3 L 11.8 0.3 C 11.4 0.3 11 0.6 11 1 L 11 2.5 Z M 9.2 10.5 C 8.3 10.5 7.6 11.1 7.6 11.9 C 7.6 12.7 8.3 13.3 9.2 13.3 C 10.1 13.3 10.8 12.7 10.8 11.9 L 10.8 7.2 L 15 6.2 L 15 9.7 C 14.2 9.7 13.5 10.3 13.5 11.1 C 13.5 11.9 14.2 12.5 15.1 12.5 C 16 12.5 16.7 11.9 16.7 11.1 L 16.7 5.1 C 16.7 4.7 16.4 4.4 16 4.5 L 10.1 5.8 C 9.7 5.9 9.5 6.2 9.5 6.6 L 9.5 10.5 Z M 12 15 C 10.6 15 9.5 16.1 9.5 17.5 C 9.5 18.9 10.6 20 12 20 C 13.4 20 14.5 18.9 14.5 17.5 C 14.5 16.1 13.4 15 12 15 Z M 12 16.6 C 12.5 16.6 12.9 17 12.9 17.5 C 12.9 18 12.5 18.4 12 18.4 C 11.5 18.4 11.1 18 11.1 17.5 C 11.1 17 11.5 16.6 12 16.6 Z"/></svg>';
const SVG_VINYL_PLAYER_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 6a6 6 0 0 1 6 6" stroke-dasharray="2 2"/></svg>';
const SVG_REPEAT = '<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" fill="currentColor"/></svg>';
const SVG_SHUFFLE = '<svg viewBox="0 0 24 24"><path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z" fill="currentColor"/></svg>';
const SVG_GITHUB = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 14.42 22 12A10 10 0 0 0 12 2z"/></svg>';
const SVG_EXTERNAL_LINK = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

// ===== DOM =====
const audio = $('audio') as HTMLAudioElement;
const library = $('library');
const searchInput = $('searchInput') as HTMLInputElement;
const layerTracks = $('layer-tracks');
const layerPlaylists = $('layer-playlists');
const layerSettings = $('layer-settings');
const layerMap: Record<string, HTMLElement> = {
  tracks: layerTracks,
  playlists: layerPlaylists,
  settings: layerSettings
};
const contentWrap = document.querySelector('.lib-content-wrap') as HTMLElement;
const miniPlayer = $('miniPlayer');
const mpCover = $('mpCover');
const mpName = $('mpName');
const mpArtist = $('mpArtist');
const mpPlay = $('mpPlay');
const mpPrev = $('mpPrev');
const mpNext = $('mpNext');
const mpPlayIcon = $('mpPlayIcon');
const miniProgress = $('miniProgress');
const player = $('player');
const cassetteWrap = $('cassetteWrap');
const cassetteLabel = $('cassetteLabel');
const labelTitle = $('labelTitle');
const labelArtist = $('labelArtist');
const titleEl = $('title');
const artistEl = $('artist');
const progress = $('progress');
const progressWrap = $('progressWrap');
const currentEl = $('current');
const durationEl = $('duration');
const playBtn = $('play');
const playIcon = $('playIcon');
const prevBtn = $('prev');
const nextBtn = $('next');
const shuffleBtn = $('shuffle');
const repeatBtn = $('repeat');
const playlistEl = $('playlist');
const fileInput = $('fileInput') as HTMLInputElement;
const imageInput = $('imageInput') as HTMLInputElement;
const addBtn = $('addBtn');
const audioFxBtn = $('audioFxBtn');
const playlistBtn = $('playlistBtn');
const sheet = $('sheet');
const backdrop = $('backdrop');
const closeSheetBtn = $('closeSheet');
const audioFxSheet = $('audioFxSheet');
const audioFxBackdrop = $('audioFxBackdrop');
const closeAudioFxSheetBtn = $('closeAudioFxSheet');
const fxPanel = $('fxPanel');
const fxSheetBadge = $('fxSheetBadge');
const closePlayerBtn = $('closePlayer');
const playerMenu = $('playerMenu');
const playerFavBtn = $('playerFavBtn');
const playerSkinToggleBtn = $('playerSkinToggleBtn');
const playerTitleFavBtn = $('playerTitleFavBtn');
const volumeSlider = $('volumeSlider') as HTMLInputElement;

// DAP Hardware Player DOM Nodes
const dapPlayerWrap = $('dapPlayerWrap');
const dapTitle = $('dapTitle');
const dapArtist = $('dapArtist');
const dapThumbImg = $('dapThumbImg') as HTMLImageElement;
const dapThumbFallback = $('dapThumbFallback');
const dapCurrentTime = $('dapCurrentTime');
const dapDurationTime = $('dapDurationTime');
const dapSeekFill = $('dapSeekFill');
const dapSeekThumb = $('dapSeekThumb');
const dapSpeedText = $('dapSpeedText');
const dapSpeedBadge = $('dapSpeedBadge');
const dapPlayIcon = $('dapPlayIcon');
const dapFavBtn = $('dapFavBtn');
const dapRepeatBtn = $('dapRepeatBtn');
const dapShuffleBtn = $('dapShuffleBtn');
const dapQueueBtn = $('dapQueueBtn');
const dapCloseBtn = $('dapCloseBtn');
const dapSkinToggleBtn = $('dapSkinToggleBtn');
const dapPrevBtn = $('dapPrevBtn');
const dapNextBtn = $('dapNextBtn');
const dapPlayBtn = $('dapPlayBtn');
const dapSpeedBtn = $('dapSpeedBtn');
const dapFxBtn = $('dapFxBtn');
const dapSeekWrap = $('dapSeekWrap');
const dapSpectrumWrap = $('dapSpectrumWrap');
const bgLayers = $('bgLayers');
const ctxBackdrop = $('ctxBackdrop');
const ctxMenu = $('ctxMenu');
const modalBackdrop = $('modalBackdrop');
const modalTitle = $('modalTitle');
const modalInput = $('modalInput') as HTMLInputElement;
const modalOk = $('modalOk');
const modalCancel = $('modalCancel');
const addInHeader = $('addInHeader');
const collection = $('collection');
const collectionHeaderTitle = $('collectionHeaderTitle');
const collectionCover = $('collectionCover');
const collectionName = $('collectionName');
const collectionMeta = $('collectionMeta');
const collectionTracks = $('collectionTracks');
const closeCollectionBtn = $('closeCollection');
const collectionPlay = $('collectionPlay');
const collectionShuffle = $('collectionShuffle');
const collectionMenu = $('collectionMenu');
const coverEditBtn = $('coverEditBtn');
const collectionAddTracks = $('collectionAddTracks');
const collectionCoverBtn = $('collectionCoverBtn');
const collectionCoverBtnText = $('collectionCoverBtnText');

const mediaDeck = $('mediaDeck');
const vinylWrap = $('vinylWrap');
const vinylSleeve = $('vinylSleeve');
const vinylSleeveArt = $('vinylSleeveArt');
const vinylSleeveTitle = $('vinylSleeveTitle');
const vinylSleeveArtist = $('vinylSleeveArtist');
const vinylDiscWrap = $('vinylDiscWrap');
const vinylDisc = $('vinylDisc');
const vinylCenter = $('vinylCenter');
const vinylCenterArt = $('vinylCenterArt');

const pickerBackdrop = $('pickerBackdrop');
const pickerSheet = $('pickerSheet');
const pickerTitle = $('pickerTitle');
const pickerClose = $('pickerClose');
const pickerSearch = $('pickerSearch') as HTMLInputElement;
const pickerList = $('pickerList');
const pickerAddBtn = $('pickerAddBtn') as HTMLButtonElement;

const toastContainer = $('toastContainer');
const addSheetBackdrop = $('addSheetBackdrop');
const addSheet = $('addSheet');
const addSheetClose = $('addSheetClose');
const optAutoScanDevice = $('optAutoScanDevice');
const optPickFolder = $('optPickFolder');
const optPickFiles = $('optPickFiles');
const folderInput = $('folderInput') as HTMLInputElement;
const deviceAudioInput = $('deviceAudioInput') as HTMLInputElement;
const scannerBackdrop = $('scannerBackdrop');
const scannerModal = $('scannerModal');
const scannerTitle = $('scannerTitle');
const scannerStatus = $('scannerStatus');
const scannerProgressBar = $('scannerProgressBar');
const scannerStatFound = $('scannerStatFound');
const scannerStatAdded = $('scannerStatAdded');
const scannerStatSkipped = $('scannerStatSkipped');
const scannerCancelBtn = $('scannerCancelBtn');

const ICON_PLAY = '<path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z"/>';
const ICON_PAUSE = '<path d="M7 5a1.5 1.5 0 0 0-1.5 1.5v11A1.5 1.5 0 0 0 7 19h2a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 9 5H7zm8 0a1.5 1.5 0 0 0-1.5 1.5v11a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-11A1.5 1.5 0 0 0 17 5h-2z"/>';

// ===== СОСТОЯНИЕ =====
interface Track {
  id: number;
  name: string;
  artist: string;
  album: string;
  blob?: Blob | null;
  picBlob?: Blob | null;
  deviceUri?: string | null;
  isDevice?: boolean;
  url: string | null;
  picURL: string | null;
  fileKey?: string | null;
  fileSize?: number;
  date?: number;
}

interface Album {
  id: number;
  name: string;
  artist: string;
  coverTrackId?: number | null;
  trackIds: number[];
  manual?: boolean;
  coverBlob?: Blob | null;
  coverURL?: string | null;
}

interface Playlist {
  id: number;
  name: string;
  isFavorites?: boolean;
  trackIds: number[];
  created?: number;
  coverBlob?: Blob | null;
  coverURL?: string | null;
}

let tracks: Track[] = [];
let playlists: Playlist[] = [];
let currentTab: string = 'tracks';
let currentTabIndex: number = 0;
const tabOrder = ['tracks', 'playlists', 'settings'];
let activeSettingsSubTab: 'appearance' | 'sound' | 'storage' | 'about' = 'appearance';
let activeFxSubTab: 'eq' | 'dsp' = 'dsp';
let currentIndex: number = 0;
let hasPlaybackStarted: boolean = false;
let currentQueue: number[] = [];
let queueIndex: number = 0;
let shuffle: boolean = false;
let repeat: boolean = false;
let audioCtx: AudioContext | null = null;
let eqFilterNodes: BiquadFilterNode[] = [];
let filterNode: BiquadFilterNode | null = null;
let bassFilterNode: BiquadFilterNode | null = null;
let subBassNode: BiquadFilterNode | null = null;
let vocalNode: BiquadFilterNode | null = null;
let trebleFilterNode: BiquadFilterNode | null = null;
let compressorNode: DynamicsCompressorNode | null = null;
let spatialSplitter: ChannelSplitterNode | null = null;
let spatialMerger: ChannelMergerNode | null = null;
let spatialDelayL: DelayNode | null = null;
let spatialDelayR: DelayNode | null = null;
let spatialCrossL: GainNode | null = null;
let spatialCrossR: GainNode | null = null;
let spatialDryGain: GainNode | null = null;
let spatialWetGain: GainNode | null = null;
let preCompressorSum: GainNode | null = null;
let analyser: AnalyserNode | null = null;
let dataArray: Uint8Array | null = null;
let source: MediaElementAudioSourceNode | null = null;
let gainNode: GainNode | null = null;
let fxVisualizerFrame: number | null = null;
let currentBgLayer: HTMLElement | null = null;
let searchQuery: string = '';
let currentCollection: { type: 'album' | 'playlist'; id: number } | null = null;
let editingCoverFor: { type: 'album' | 'playlist'; id: number } | null = null;
let lastActiveIdx: number = -1;
let pickerSelected = new Set<number>();
let pickerExcludeIds = new Set<number>();
let swipeLocked: boolean = false;
(window as any).__accentRGB = [196, 77, 255];

// ===== INDEXEDDB =====
const DB_NAME = 'myPlayerDB_v2';
const DB_VERSION = 2;
let db: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e: any) => {
      const d = e.target.result as IDBDatabase;
      if (!d.objectStoreNames.contains('tracks')) d.createObjectStore('tracks', { keyPath: 'id', autoIncrement: true });
      if (!d.objectStoreNames.contains('albums')) d.createObjectStore('albums', { keyPath: 'id', autoIncrement: true });
      if (!d.objectStoreNames.contains('playlists')) d.createObjectStore('playlists', { keyPath: 'id', autoIncrement: true });
      if (!d.objectStoreNames.contains('meta')) d.createObjectStore('meta', { keyPath: 'key' });
    };
    req.onsuccess = (e: any) => { db = e.target.result; resolve(db!); };
    req.onerror = () => reject(req.error);
  });
}

function dbAdd(store: string, obj: any): Promise<number | null> {
  return new Promise(resolve => {
    if (!db) return resolve(null);
    const tx = db.transaction(store, 'readwrite');
    const req = tx.objectStore(store).add(obj);
    req.onsuccess = () => resolve(req.result as number);
    req.onerror = () => resolve(null);
  });
}

function dbPut(store: string, obj: any): Promise<void> {
  return new Promise(resolve => {
    if (!db) return resolve();
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).put(obj);
    tx.oncomplete = () => resolve();
  });
}

function dbDelete(store: string, id: number): Promise<void> {
  return new Promise(resolve => {
    if (!db) return resolve();
    const tx = db.transaction(store, 'readwrite');
    tx.objectStore(store).delete(id);
    tx.oncomplete = () => resolve();
  });
}

function dbGetAll(store: string): Promise<any[]> {
  return new Promise(resolve => {
    if (!db) return resolve([]);
    const tx = db.transaction(store, 'readonly');
    const req = tx.objectStore(store).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => resolve([]);
  });
}

async function dbClear(store: string): Promise<void> {
  if (!db) return;
  const tx = db.transaction(store, 'readwrite');
  tx.objectStore(store).clear();
  return new Promise(r => { tx.oncomplete = () => r(); });
}

function dbGetMeta(key: string): Promise<any> {
  return new Promise(resolve => {
    if (!db || !db.objectStoreNames.contains('meta')) return resolve(null);
    try {
      const tx = db.transaction('meta', 'readonly');
      const req = tx.objectStore('meta').get(key);
      req.onsuccess = () => resolve(req.result ? req.result.val : null);
      req.onerror = () => resolve(null);
    } catch (e) {
      resolve(null);
    }
  });
}

function dbSetMeta(key: string, val: any): Promise<void> {
  return new Promise(resolve => {
    if (!db || !db.objectStoreNames.contains('meta')) return resolve();
    try {
      const tx = db.transaction('meta', 'readwrite');
      tx.objectStore('meta').put({ key, val });
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch (e) {
      resolve();
    }
  });
}

function getValidBlob(itemBlob: any, mimeType = 'audio/mpeg'): Blob | null {
  if (!itemBlob) return null;
  if (itemBlob instanceof Blob && itemBlob.size > 0) return itemBlob;
  if (itemBlob instanceof ArrayBuffer && itemBlob.byteLength > 0) {
    return new Blob([itemBlob], { type: mimeType });
  }
  if (typeof itemBlob === 'object' && (itemBlob.size > 0 || itemBlob.byteLength > 0)) {
    try {
      if (itemBlob.buffer instanceof ArrayBuffer) {
        return new Blob([itemBlob.buffer], { type: mimeType });
      }
      return new Blob([itemBlob], { type: itemBlob.type || mimeType });
    } catch (e) {}
  }
  return null;
}

// ===== WEB AUDIO & УЛУЧШАЙЗЕР ЗВУКА (AUDIO DSP) =====
const EQ_BAND_FREQS: { freq: number; type: BiquadFilterType; label: string; sub: string }[] = [
  { freq: 60, type: 'lowshelf', label: '60 Hz', sub: 'Суб-бас' },
  { freq: 230, type: 'peaking', label: '230 Hz', sub: 'Бас' },
  { freq: 910, type: 'peaking', label: '910 Hz', sub: 'Средние' },
  { freq: 3600, type: 'peaking', label: '3.6 kHz', sub: 'Вокал' },
  { freq: 14000, type: 'highshelf', label: '14 kHz', sub: 'Верха' },
];

const EQ_PRESETS: Record<string, { name: string; icon: string; desc: string; bands: number[] }> = {
  flat: { name: 'Чистый (Flat)', icon: SVG_NOTE, desc: 'Нейтральная АЧХ без искажений', bands: [0, 0, 0, 0, 0] },
  bass: { name: 'Супер Бас', icon: SVG_VOLUME, desc: 'Усиление суб-баса и низких частот', bands: [7, 5, 1, 0, 2] },
  rock: { name: 'Рок / Драйв', icon: SVG_BOLT, desc: 'Плотный гитарный звук и глубокий бас', bands: [5, 3, -1, 4, 6] },
  pop: { name: 'Поп & Вокал', icon: SVG_SPARKLES, desc: 'Яркие средние частоты и детальность', bands: [2, 4, 6, 3, 1] },
  jazz: { name: 'Джаз', icon: SVG_HEADPHONES, desc: 'Мягкий теплый акустический баланс', bands: [3, 2, 1, 3, 4] },
  club: { name: 'Клуб & Dance', icon: SVG_ACTIVITY, desc: 'Энергичный клубный биты и динамика', bands: [6, 3, 0, 4, 5] },
  vocal: { name: 'Вокал', icon: SVG_NOTE, desc: 'Фокус на человеческом голосе', bands: [-2, 1, 5, 4, 1] },
  treble: { name: 'Кристальные верха', icon: SVG_SPARKLES, desc: 'Выделение высоких частот и звонкости', bands: [-2, 0, 2, 6, 8] },
};

const SOUND_FX_PRESETS: Record<string, {
  name: string;
  icon: string;
  desc: string;
  bassBoost: number;
  spatial3D: number;
  trebleClarity: number;
  compressor: boolean;
}> = {
  bass: {
    name: 'Глубокий бас',
    icon: SVG_VOLUME,
    desc: 'Плотный бархатный суб-бас и глубина',
    bassBoost: 85,
    spatial3D: 35,
    trebleClarity: 25,
    compressor: true,
  },
  surround: {
    name: '3D Студия',
    icon: SVG_HEADPHONES,
    desc: 'Широкая стереосцена и живой объём',
    bassBoost: 45,
    spatial3D: 90,
    trebleClarity: 60,
    compressor: true,
  },
  vocal: {
    name: 'Кристалл',
    icon: SVG_SPARKLES,
    desc: 'Чёткий выразительный вокал и верха',
    bassBoost: 20,
    spatial3D: 45,
    trebleClarity: 85,
    compressor: true,
  },
  punch: {
    name: 'Макс. драйв',
    icon: SVG_BOLT,
    desc: 'Ударный бас, объём и студийная плотность',
    bassBoost: 95,
    spatial3D: 70,
    trebleClarity: 75,
    compressor: true,
  },
  club: {
    name: 'Клуб & Dance',
    icon: SVG_ACTIVITY,
    desc: 'Мощный танцевальный бит и динамика',
    bassBoost: 80,
    spatial3D: 65,
    trebleClarity: 60,
    compressor: true,
  },
  flat: {
    name: 'Оригинал',
    icon: SVG_NOTE,
    desc: 'Чистый звук без частотной окраски',
    bassBoost: 0,
    spatial3D: 0,
    trebleClarity: 0,
    compressor: false,
  },
};

function getSoundFxPresetTitle(key: string): string {
  if (key === 'custom') return 'Пользовательский';
  return SOUND_FX_PRESETS[key]?.name || 'Глубокий бас';
}

function updateFxButtonUI() {
  const fxBtn = document.getElementById('audioFxBtn');
  const isEnabled = !!appSettings.soundFx?.enabled;
  if (fxBtn) {
    fxBtn.classList.toggle('active', isEnabled);
    fxBtn.title = isEnabled
      ? `Эквалайзер и звук: ВКЛ (${getSoundFxPresetTitle(appSettings.soundFx.preset)})`
      : 'Эквалайзер и звук: ВЫКЛ';
  }
  const badge = document.getElementById('fxSheetBadge');
  if (badge) {
    badge.classList.toggle('active', isEnabled);
    badge.textContent = isEnabled ? 'ВКЛ' : 'ВЫКЛ';
  }
}

function updateAudioFilters() {
  if (!audioCtx) return;

  const fx = appSettings.soundFx;
  if (!fx) return;

  // Винтажный плёночный срез высоких частот (Lo-Fi)
  if (filterNode) {
    filterNode.frequency.setValueAtTime(appSettings.vintageFilter ? 3400 : 20000, audioCtx.currentTime);
  }

  // 5-полосный эквалайзер
  if (eqFilterNodes && eqFilterNodes.length === 5) {
    const bands = fx.eqBands && fx.eqBands.length === 5 ? fx.eqBands : [0, 0, 0, 0, 0];
    eqFilterNodes.forEach((node, idx) => {
      const gainVal = fx.enabled ? (bands[idx] || 0) : 0;
      node.gain.setTargetAtTime(gainVal, audioCtx!.currentTime, 0.04);
    });
  }

  // Если мастер-обработка выключена
  if (!fx.enabled) {
    if (bassFilterNode) bassFilterNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.04);
    if (subBassNode) subBassNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.04);
    if (vocalNode) vocalNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.04);
    if (trebleFilterNode) trebleFilterNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.04);
    if (spatialWetGain) spatialWetGain.gain.setTargetAtTime(0, audioCtx.currentTime, 0.04);
    if (compressorNode) {
      compressorNode.threshold.setValueAtTime(0, audioCtx.currentTime);
      compressorNode.ratio.setValueAtTime(1, audioCtx.currentTime);
    }
    updateFxButtonUI();
    return;
  }

  // 1) Бас: суб-бас 60Hz + низ 110Hz
  const bassRatio = Math.max(0, Math.min(100, fx.bassBoost)) / 100;
  if (bassFilterNode) {
    bassFilterNode.gain.setTargetAtTime(bassRatio * 10.0, audioCtx.currentTime, 0.04);
  }
  if (subBassNode) {
    subBassNode.gain.setTargetAtTime(bassRatio * 4.0, audioCtx.currentTime, 0.04);
  }

  // 2) Кристальная чёткость: вокал 2800Hz + верха 8500Hz
  const trebleRatio = Math.max(0, Math.min(100, fx.trebleClarity)) / 100;
  if (trebleFilterNode) {
    trebleFilterNode.gain.setTargetAtTime(trebleRatio * 8.0, audioCtx.currentTime, 0.04);
  }
  if (vocalNode) {
    vocalNode.gain.setTargetAtTime(trebleRatio * 4.5, audioCtx.currentTime, 0.04);
  }

  // 3) Пространственный 3D объём (стереопанорама Haas)
  const spatialRatio = Math.max(0, Math.min(100, fx.spatial3D)) / 100;
  if (spatialWetGain) {
    spatialWetGain.gain.setTargetAtTime(spatialRatio * 0.40, audioCtx.currentTime, 0.04);
  }

  // 4) Студийный динамический компрессор (Dynamic Punch)
  if (compressorNode) {
    if (fx.compressor) {
      compressorNode.threshold.setValueAtTime(-18, audioCtx.currentTime);
      compressorNode.knee.setValueAtTime(12, audioCtx.currentTime);
      compressorNode.ratio.setValueAtTime(4.0, audioCtx.currentTime);
      compressorNode.attack.setValueAtTime(0.003, audioCtx.currentTime);
      compressorNode.release.setValueAtTime(0.25, audioCtx.currentTime);
    } else {
      compressorNode.threshold.setValueAtTime(0, audioCtx.currentTime);
      compressorNode.ratio.setValueAtTime(1, audioCtx.currentTime);
    }
  }

  updateFxButtonUI();
}

function initAudio() {
  if (audioCtx) return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioCtx = new AudioContextClass();
    source = audioCtx.createMediaElementSource(audio);
    gainNode = audioCtx.createGain();
    gainNode.gain.value = parseFloat(volumeSlider.value) || 1;

    // 0) 5-полосный мастер-эквалайзер
    eqFilterNodes = EQ_BAND_FREQS.map(cfg => {
      const f = audioCtx!.createBiquadFilter();
      f.type = cfg.type;
      f.frequency.value = cfg.freq;
      f.gain.value = 0;
      if (cfg.type === 'peaking') f.Q.value = 1.1;
      return f;
    });

    // 1) Бас Lowshelf (110Hz)
    bassFilterNode = audioCtx.createBiquadFilter();
    bassFilterNode.type = 'lowshelf';
    bassFilterNode.frequency.value = 110;

    // 2) Суб-бас Peaking (60Hz)
    subBassNode = audioCtx.createBiquadFilter();
    subBassNode.type = 'peaking';
    subBassNode.frequency.value = 60;
    subBassNode.Q.value = 1.1;

    // 3) Вокальная выразительность Peaking (2800Hz)
    vocalNode = audioCtx.createBiquadFilter();
    vocalNode.type = 'peaking';
    vocalNode.frequency.value = 2800;
    vocalNode.Q.value = 1.0;

    // 4) Воздушные верха Highshelf (8500Hz)
    trebleFilterNode = audioCtx.createBiquadFilter();
    trebleFilterNode.type = 'highshelf';
    trebleFilterNode.frequency.value = 8500;

    // 5) 3D пространственное стереорасширение (Haas stereo widener)
    spatialSplitter = audioCtx.createChannelSplitter(2);
    spatialMerger = audioCtx.createChannelMerger(2);
    spatialDelayL = audioCtx.createDelay();
    spatialDelayL.delayTime.value = 0.013;
    spatialDelayR = audioCtx.createDelay();
    spatialDelayR.delayTime.value = 0.017;
    spatialCrossL = audioCtx.createGain();
    spatialCrossL.gain.value = -0.32;
    spatialCrossR = audioCtx.createGain();
    spatialCrossR.gain.value = -0.32;

    spatialDryGain = audioCtx.createGain();
    spatialDryGain.gain.value = 1.0;
    spatialWetGain = audioCtx.createGain();
    spatialWetGain.gain.value = 0.25;

    preCompressorSum = audioCtx.createGain();

    // 6) Студийный динамический компрессор
    compressorNode = audioCtx.createDynamicsCompressor();

    // 7) Плёночный винтажный Lo-Fi фильтр
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';

    // 8) Анализатор спектра
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    // Подключение звуковой цепи:
    // source -> eq[0] -> ... -> eq[4] -> bassFilter -> subBass -> vocal -> treble
    let lastAudioNode: AudioNode = source;
    for (const eqNode of eqFilterNodes) {
      lastAudioNode.connect(eqNode);
      lastAudioNode = eqNode;
    }

    lastAudioNode.connect(bassFilterNode);
    bassFilterNode.connect(subBassNode);
    subBassNode.connect(vocalNode);
    vocalNode.connect(trebleFilterNode);

    // Прямой сигнал (Dry)
    trebleFilterNode.connect(spatialDryGain);
    spatialDryGain.connect(preCompressorSum);

    // Пространственный сигнал с кросс-задержкой (Wet Haas)
    trebleFilterNode.connect(spatialSplitter);
    spatialSplitter.connect(spatialDelayL, 0);
    spatialDelayL.connect(spatialCrossR);
    spatialCrossR.connect(spatialMerger, 0, 1);

    spatialSplitter.connect(spatialDelayR, 1);
    spatialDelayR.connect(spatialCrossL);
    spatialCrossL.connect(spatialMerger, 0, 0);

    spatialMerger.connect(spatialWetGain);
    spatialWetGain.connect(preCompressorSum);

    // preCompressorSum -> компрессор -> винтаж -> громкость -> анализатор -> выход
    preCompressorSum.connect(compressorNode);
    compressorNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(analyser);
    analyser.connect(audioCtx.destination);

    updateAudioFilters();
  } catch (e) {
    console.warn('Web Audio:', e);
  }
}

// ===== УПРАВЛЕНИЕ UI УЛУЧШАЙЗЕРА ЗВУКА И ЭКВАЛАЙЗЕРА =====
function renderAudioFxSheet() {
  const fx = appSettings.soundFx;
  const isEnabled = fx.enabled;
  const bands = fx.eqBands && fx.eqBands.length === 5 ? fx.eqBands : [0, 0, 0, 0, 0];

  const presetsHtml = Object.entries(SOUND_FX_PRESETS).map(([key, p]) => {
    const isActive = fx.preset === key;
    return `
      <button class="fx-preset-btn ${isActive ? 'active' : ''}" data-fx-preset="${key}">
        <div class="fx-preset-name">
          <span>${p.icon}</span>
          <span>${p.name}</span>
        </div>
        <div class="fx-preset-desc">${p.desc}</div>
      </button>
    `;
  }).join('');

  const eqPresetsHtml = Object.entries(EQ_PRESETS).map(([key, p]) => {
    const isActive = fx.eqPreset === key;
    return `
      <button class="fx-preset-btn ${isActive ? 'active' : ''}" data-eq-preset="${key}">
        <div class="fx-preset-name">
          <span>${p.icon}</span>
          <span>${p.name}</span>
        </div>
        <div class="fx-preset-desc">${p.desc}</div>
      </button>
    `;
  }).join('');

  const bassDb = ((fx.bassBoost / 100) * 10.0).toFixed(1);
  const trebleDb = ((fx.trebleClarity / 100) * 8.0).toFixed(1);

  fxPanel.innerHTML = `
    <!-- Главный мастер-переключатель -->
    <div class="fx-master-card">
      <div>
        <div class="fx-master-title">
          <span style="display:inline-flex;color:var(--accent);">${SVG_EQUALIZER}</span>
          <span>Эквалайзер & DSP-Процессинг</span>
        </div>
        <div class="fx-master-desc">5-полосный эквалайзер, бас, 3D-объём и компрессор</div>
      </div>
      <div class="settings-switch ${isEnabled ? 'active' : ''}" id="fxMasterSwitch" title="Включить/выключить обработку"></div>
    </div>

    <!-- Вкладки внутри модального окна (DSP первый, EQ второй) -->
    <div class="fx-tabs">
      <button class="fx-tab-btn ${activeFxSubTab === 'dsp' ? 'active' : ''}" id="tabBtnDsp">
        <span style="display:inline-flex;margin-right:6px;">${SVG_BOLT}</span>Улучшайзеры (DSP)
      </button>
      <button class="fx-tab-btn ${activeFxSubTab === 'eq' ? 'active' : ''}" id="tabBtnEq">
        <span style="display:inline-flex;margin-right:6px;">${SVG_SLIDERS}</span>5-Полосный Эквалайзер
      </button>
    </div>

    ${activeFxSubTab === 'dsp' ? `
      <!-- ВКЛАДКА DSP УЛУЧШАЙЗЕРОВ -->
      <div>
        <div class="fx-section-header">
          <div class="fx-section-label">Студийные пресеты</div>
          ${fx.preset === 'custom' ? '<span style="font-size:11px;color:var(--accent);font-weight:600;">Пользовательский</span>' : ''}
        </div>
        <div class="fx-presets-grid">
          ${presetsHtml}
        </div>
      </div>

      <div class="fx-sliders-card">
        <!-- Бас -->
        <div class="fx-slider-row">
          <div class="fx-slider-info">
            <span class="fx-slider-name" style="display:flex;align-items:center;gap:6px;">
              <span style="display:inline-flex;color:var(--accent);">${SVG_VOLUME}</span>
              <span>Усилитель баса (Bass Boost)</span>
            </span>
            <span class="fx-slider-val" id="valBassBoost">+${bassDb} dB (${fx.bassBoost}%)</span>
          </div>
          <input type="range" class="fx-range" id="sliderBass" min="0" max="100" value="${fx.bassBoost}">
        </div>

        <!-- 3D Объём -->
        <div class="fx-slider-row">
          <div class="fx-slider-info">
            <span class="fx-slider-name" style="display:flex;align-items:center;gap:6px;">
              <span style="display:inline-flex;color:var(--accent);">${SVG_HEADPHONES}</span>
              <span>3D Стерео-объём (Spatial Haas)</span>
            </span>
            <span class="fx-slider-val" id="valSpatial">${fx.spatial3D}%</span>
          </div>
          <input type="range" class="fx-range" id="sliderSpatial" min="0" max="100" value="${fx.spatial3D}">
        </div>

        <!-- Кристальная чёткость / вокал -->
        <div class="fx-slider-row">
          <div class="fx-slider-info">
            <span class="fx-slider-name" style="display:flex;align-items:center;gap:6px;">
              <span style="display:inline-flex;color:var(--accent);">${SVG_SPARKLES}</span>
              <span>Кристальный вокал & Верха</span>
            </span>
            <span class="fx-slider-val" id="valTreble">+${trebleDb} dB (${fx.trebleClarity}%)</span>
          </div>
          <input type="range" class="fx-range" id="sliderTreble" min="0" max="100" value="${fx.trebleClarity}">
        </div>

        <!-- Компрессор -->
        <div class="settings-item" style="padding:4px 0 0;border-top:1px solid rgba(255,255,255,0.06);">
          <div class="settings-item-info">
            <div class="settings-item-label" style="font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px;">
              <span style="display:inline-flex;color:var(--accent);">${SVG_BOLT}</span>
              <span>Студийный компрессор (Dynamic Punch)</span>
            </div>
            <div class="settings-item-desc" style="font-size:11px;">Плотный напор, сглаживание пиков и защита от перегрузок</div>
          </div>
          <div class="settings-switch ${fx.compressor ? 'active' : ''}" id="fxCompressorSwitch"></div>
        </div>

        <!-- Lo-Fi кассета -->
        <div class="settings-item" style="padding:4px 0 0;border-top:1px solid rgba(255,255,255,0.06);">
          <div class="settings-item-info">
            <div class="settings-item-label" style="font-size:13px;font-weight:600;display:flex;align-items:center;gap:6px;">
              <span style="display:inline-flex;color:var(--accent);">${SVG_CASSETTE_ICON}</span>
              <span>Винтажный плёночный звук (Tape Lo-Fi)</span>
            </div>
            <div class="settings-item-desc" style="font-size:11px;">Тёплое аналоговое кассетное звучание 80-х</div>
          </div>
          <div class="settings-switch ${appSettings.vintageFilter ? 'active' : ''}" id="fxVintageSwitch"></div>
        </div>
      </div>
    ` : `
      <!-- ВКЛАДКА ЭКВАЛАЙЗЕРА -->
      <div>
        <div class="fx-section-header">
          <div class="fx-section-label">Пресеты эквалайзера</div>
          <button class="preset-pill" id="btnResetEq" style="padding:3px 8px;font-size:11px;">Сброс в 0 dB</button>
        </div>
        <div class="fx-presets-grid" style="margin-top:2px;">
          ${eqPresetsHtml}
        </div>
      </div>

      <div class="eq-bands-card">
        <div class="eq-faders-row">
          ${EQ_BAND_FREQS.map((cfg, idx) => {
            const val = bands[idx] || 0;
            const sign = val > 0 ? '+' : '';
            return `
              <div class="eq-fader-col">
                <div class="eq-db-badge" id="eqDbBadge_${idx}">${sign}${val} dB</div>
                <div class="eq-slider-vertical-wrap">
                  <input type="range" class="eq-slider-vertical" data-eq-band="${idx}" min="-12" max="12" step="1" value="${val}">
                </div>
                <div class="eq-freq-label">${cfg.label}</div>
                <div class="eq-freq-sub">${cfg.sub}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `}

    <!-- Живой спектр частот -->
    <div class="fx-visualizer-wrap">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="display:inline-flex;color:var(--accent);">${SVG_ACTIVITY}</span>
        <span style="font-size:12px;color:#a8a2c2;">Аудио-спектр в реальном времени</span>
      </div>
      <div class="fx-visualizer-bars" id="fxBarsContainer">
        ${Array.from({ length: 20 }).map(() => `<div class="fx-visualizer-bar" style="height:4px;"></div>`).join('')}
      </div>
    </div>
  `;

  // События внутри листа
  const tabBtnEq = $('tabBtnEq');
  const tabBtnDsp = $('tabBtnDsp');
  if (tabBtnEq) {
    tabBtnEq.onclick = () => {
      buzz(8);
      activeFxSubTab = 'eq';
      renderAudioFxSheet();
    };
  }
  if (tabBtnDsp) {
    tabBtnDsp.onclick = () => {
      buzz(8);
      activeFxSubTab = 'dsp';
      renderAudioFxSheet();
    };
  }

  const masterSwitch = $('fxMasterSwitch');
  if (masterSwitch) {
    masterSwitch.onclick = () => {
      buzz(12);
      appSettings.soundFx.enabled = !appSettings.soundFx.enabled;
      saveSettings();
      updateAudioFilters();
      renderAudioFxSheet();
      renderSettings();
    };
  }

  // EQ Presets
  fxPanel.querySelectorAll('[data-eq-preset]').forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      buzz(10);
      const pKey = (btn as HTMLElement).dataset.eqPreset!;
      applyEqPreset(pKey);
    };
  });

  // EQ Sliders
  fxPanel.querySelectorAll('.eq-slider-vertical').forEach(slider => {
    const input = slider as HTMLInputElement;
    input.oninput = () => {
      const idx = parseInt(input.dataset.eqBand || '0', 10);
      const val = parseInt(input.value, 10);
      if (!appSettings.soundFx.eqBands || appSettings.soundFx.eqBands.length !== 5) {
        appSettings.soundFx.eqBands = [0, 0, 0, 0, 0];
      }
      appSettings.soundFx.eqBands[idx] = val;
      appSettings.soundFx.eqPreset = 'custom';
      appSettings.soundFx.enabled = true;

      const badge = $(`eqDbBadge_${idx}`);
      if (badge) badge.textContent = `${val > 0 ? '+' : ''}${val} dB`;

      saveSettings();
      updateAudioFilters();
    };
  });

  const btnResetEq = $('btnResetEq');
  if (btnResetEq) {
    btnResetEq.onclick = () => {
      buzz(10);
      applyEqPreset('flat');
    };
  }

  // DSP Presets
  fxPanel.querySelectorAll('[data-fx-preset]').forEach(btn => {
    (btn as HTMLElement).onclick = () => {
      buzz(10);
      const pKey = (btn as HTMLElement).dataset.fxPreset!;
      applySoundFxPreset(pKey);
    };
  });

  const sliderBass = $('sliderBass') as HTMLInputElement;
  if (sliderBass) {
    sliderBass.oninput = () => {
      const val = parseInt(sliderBass.value, 10);
      appSettings.soundFx.bassBoost = val;
      appSettings.soundFx.preset = 'custom';
      appSettings.soundFx.enabled = true;
      const db = ((val / 100) * 10.0).toFixed(1);
      const valEl = $('valBassBoost');
      if (valEl) valEl.textContent = `+${db} dB (${val}%)`;
      saveSettings();
      updateAudioFilters();
      highlightActivePreset('custom');
    };
  }

  const sliderSpatial = $('sliderSpatial') as HTMLInputElement;
  if (sliderSpatial) {
    sliderSpatial.oninput = () => {
      const val = parseInt(sliderSpatial.value, 10);
      appSettings.soundFx.spatial3D = val;
      appSettings.soundFx.preset = 'custom';
      appSettings.soundFx.enabled = true;
      const valEl = $('valSpatial');
      if (valEl) valEl.textContent = `${val}%`;
      saveSettings();
      updateAudioFilters();
      highlightActivePreset('custom');
    };
  }

  const sliderTreble = $('sliderTreble') as HTMLInputElement;
  if (sliderTreble) {
    sliderTreble.oninput = () => {
      const val = parseInt(sliderTreble.value, 10);
      appSettings.soundFx.trebleClarity = val;
      appSettings.soundFx.preset = 'custom';
      appSettings.soundFx.enabled = true;
      const db = ((val / 100) * 8.0).toFixed(1);
      const valEl = $('valTreble');
      if (valEl) valEl.textContent = `+${db} dB (${val}%)`;
      saveSettings();
      updateAudioFilters();
      highlightActivePreset('custom');
    };
  }

  const compSwitch = $('fxCompressorSwitch');
  if (compSwitch) {
    compSwitch.onclick = () => {
      buzz(10);
      appSettings.soundFx.compressor = !appSettings.soundFx.compressor;
      appSettings.soundFx.preset = 'custom';
      appSettings.soundFx.enabled = true;
      saveSettings();
      updateAudioFilters();
      renderAudioFxSheet();
    };
  }

  const vintageSwitch = $('fxVintageSwitch');
  if (vintageSwitch) {
    vintageSwitch.onclick = () => {
      buzz(10);
      appSettings.vintageFilter = !appSettings.vintageFilter;
      saveSettings();
      updateAudioFilters();
      renderAudioFxSheet();
    };
  }
}

function applyEqPreset(presetKey: string) {
  const preset = EQ_PRESETS[presetKey];
  if (!preset) return;
  appSettings.soundFx.eqPreset = presetKey as any;
  appSettings.soundFx.eqBands = [...preset.bands];
  appSettings.soundFx.enabled = true;
  saveSettings();
  updateAudioFilters();
  renderAudioFxSheet();
  showToast(`🎚️ Эквалайзер: ${preset.name}`, '🎚️', 2000);
}

function highlightActivePreset(activeKey: string) {
  fxPanel.querySelectorAll('[data-fx-preset]').forEach(btn => {
    btn.classList.toggle('active', (btn as HTMLElement).dataset.fxPreset === activeKey);
  });
}

function applySoundFxPreset(presetKey: string) {
  const preset = SOUND_FX_PRESETS[presetKey];
  if (!preset) return;
  appSettings.soundFx.preset = presetKey as any;
  appSettings.soundFx.bassBoost = preset.bassBoost;
  appSettings.soundFx.spatial3D = preset.spatial3D;
  appSettings.soundFx.trebleClarity = preset.trebleClarity;
  appSettings.soundFx.compressor = preset.compressor;
  appSettings.soundFx.enabled = true;
  saveSettings();
  updateAudioFilters();
  renderAudioFxSheet();
  renderSettings();
  showToast(`🎛️ DSP: ${preset.name}`, '🎛️', 2000);
}

function startFxVisualizer() {
  stopFxVisualizer();
  const loop = () => {
    if (!audioFxSheet.classList.contains('open')) return;
    const bars = fxPanel.querySelectorAll('.fx-visualizer-bar');
    if (bars.length) {
      if (analyser && dataArray && !audio.paused) {
        analyser.getByteFrequencyData(dataArray as any);
        const step = Math.floor(dataArray.length / bars.length);
        bars.forEach((bar, idx) => {
          const val = dataArray![idx * step] || 0;
          const h = Math.max(3, Math.min(22, Math.round((val / 255) * 22)));
          (bar as HTMLElement).style.height = `${h}px`;
        });
      } else {
        bars.forEach((bar, idx) => {
          const idleH = 3 + (idx % 3);
          (bar as HTMLElement).style.height = `${idleH}px`;
        });
      }
    }
    fxVisualizerFrame = requestAnimationFrame(loop);
  };
  loop();
}

function stopFxVisualizer() {
  if (fxVisualizerFrame) {
    cancelAnimationFrame(fxVisualizerFrame);
    fxVisualizerFrame = null;
  }
}

function openAudioFxSheet() {
  initAudio();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  renderAudioFxSheet();
  audioFxBackdrop.classList.add('open');
  audioFxSheet.classList.add('open');
  startFxVisualizer();
  pushHistoryState({ page: 'audio-fx' });
}

function closeAudioFxSheet() {
  audioFxBackdrop.classList.remove('open');
  audioFxSheet.classList.remove('open');
  stopFxVisualizer();
}
if (closeAudioFxSheetBtn) {
  closeAudioFxSheetBtn.onclick = () => { if (history.length > 1) history.back(); else closeAudioFxSheet(); };
}
if (audioFxBackdrop) {
  audioFxBackdrop.onclick = () => { if (history.length > 1) history.back(); else closeAudioFxSheet(); };
}

// ===== ПУЛЬСАЦИЯ =====
let pulseAnimationId: number | null = null;
function startPulse() {
  if (pulseAnimationId) return;
  const tick = () => {
    if (!analyser || !dataArray || audio.paused) {
      pulseAnimationId = null;
      if (cassetteWrap) {
        cassetteWrap.style.setProperty('--glow-alpha', '0.25');
        cassetteWrap.style.setProperty('--glow-size', '20px');
      }
      if (vinylWrap) {
        vinylWrap.style.setProperty('--glow-alpha', '0.25');
        vinylWrap.style.setProperty('--glow-size', '20px');
      }
      return;
    }

    analyser.getByteFrequencyData(dataArray as any);
    let sum = 0;
    const BINS = 24;
    for (let i = 2; i < BINS; i++) sum += dataArray[i];
    const avg = sum / (BINS - 2);
    const energy = avg / 255;
    const smooth = Math.pow(energy, 1.2);

    const glowSize = (18 + smooth * 80).toFixed(1) + 'px';
    const glowAlpha = (0.2 + smooth * 0.85).toFixed(2);

    if (cassetteWrap) {
      cassetteWrap.style.setProperty('--glow-size', glowSize);
      cassetteWrap.style.setProperty('--glow-alpha', glowAlpha);
    }
    if (vinylWrap) {
      vinylWrap.style.setProperty('--glow-size', glowSize);
      vinylWrap.style.setProperty('--glow-alpha', glowAlpha);
    }
    pulseAnimationId = requestAnimationFrame(tick);
  };
  pulseAnimationId = requestAnimationFrame(tick);
}

function stopPulse() {
  if (pulseAnimationId) {
    cancelAnimationFrame(pulseAnimationId);
    pulseAnimationId = null;
  }
  if (cassetteWrap) {
    cassetteWrap.style.setProperty('--glow-size', '20px');
    cassetteWrap.style.setProperty('--glow-alpha', '0.25');
  }
  if (vinylWrap) {
    vinylWrap.style.setProperty('--glow-size', '20px');
    vinylWrap.style.setProperty('--glow-alpha', '0.25');
  }
}

// ===== ПРИМЕНЕНИЕ НАСТРОЕК ТЕМЫ =====
function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) || 196;
  const g = parseInt(clean.substring(2, 4), 16) || 77;
  const b = parseInt(clean.substring(4, 6), 16) || 255;
  return [r, g, b];
}

function applyAppBaseTheme(themeId: string, triggerCrossfade: boolean = false) {
  const theme = getAppBaseTheme(themeId);
  appSettings.appThemeBg = theme.id;
  document.documentElement.style.setProperty('--bg-base', theme.base);
  document.documentElement.style.setProperty('--bg-surface', theme.surface);
  document.documentElement.style.setProperty('--bg-surface-elevated', theme.surfaceElevated);
  document.documentElement.style.setProperty('--bg-card', theme.card);
  document.documentElement.style.setProperty('--border-subtle', theme.border);

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', theme.base);

  if (triggerCrossfade && (!appSettings.dynamicBg || !tracks[currentIndex]?.picURL)) {
    const [r, g, b] = (window as any).__accentRGB || [196, 77, 255];
    crossfadeBackground(`radial-gradient(circle at 50% 0%, rgba(${r},${g},${b},0.35) 0%, ${theme.base} 70%)`);
  }
  applyCassetteAccentTheme();
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return [h, s, l];
}

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r: number, g: number, b: number;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const hk = h / 360;
    r = hue2rgb(p, q, hk + 1/3);
    g = hue2rgb(p, q, hk);
    b = hue2rgb(p, q, hk - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function normalizeAndBoostCoverColor(r: number, g: number, b: number, isMonochrome: boolean = false): {
  primaryRgb: [number, number, number];
  secondaryRgb: [number, number, number];
  isWhiteAccent: boolean;
} {
  // Если обложка чёрно-белая, монохромная, чисто чёрная или белая
  if (isMonochrome) {
    return {
      primaryRgb: [255, 255, 255],
      secondaryRgb: [220, 225, 242],
      isWhiteAccent: true
    };
  }

  const [h, s, l] = rgbToHsl(r, g, b);

  if (s < 0.12) {
    return {
      primaryRgb: [255, 255, 255],
      secondaryRgb: [220, 225, 242],
      isWhiteAccent: true
    };
  }

  // Если есть цветной цвет (зеленый, красный, синий, фиолетовый и т.д.) - подтягиваем его насыщенность и яркость
  const targetS = Math.max(0.85, Math.min(1.0, s + 0.3));
  const targetL = 0.58;

  const [boostedR, boostedG, boostedB] = hslToRgb(h, targetS, targetL);
  const [secR, secG, secB] = hslToRgb((h + 20) % 360, Math.min(1.0, targetS + 0.1), Math.min(0.72, targetL + 0.10));

  return {
    primaryRgb: [boostedR, boostedG, boostedB],
    secondaryRgb: [secR, secG, secB],
    isWhiteAccent: false
  };
}

function setAccentCSSVariables(
  r: number, g: number, b: number,
  r2?: number, g2?: number, b2?: number,
  isWhiteAccent: boolean = false
) {
  if (r2 === undefined || g2 === undefined || b2 === undefined) {
    const [h, s, l] = rgbToHsl(r, g, b);
    [r2, g2, b2] = hslToRgb((h + 20) % 360, Math.min(1, s + 0.1), Math.min(0.8, l + 0.1));
  }

  const root = document.documentElement;
  root.style.setProperty('--accent', `rgb(${r},${g},${b})`);
  root.style.setProperty('--accent-rgb', `${r}, ${g}, ${b}`);
  root.style.setProperty('--accent2', `rgb(${r2},${g2},${b2})`);
  root.style.setProperty('--accent2-rgb', `${r2}, ${g2}, ${b2}`);
  root.style.setProperty('--glow-color', `${r},${g},${b}`);
  root.style.setProperty('--play-btn-icon', isWhiteAccent ? '#12101a' : '#ffffff');

  (window as any).__accentRGB = [r, g, b];

  if (cassetteWrap) cassetteWrap.style.setProperty('--glow-color', `${r},${g},${b}`);
  if (vinylWrap) vinylWrap.style.setProperty('--glow-color', `${r},${g},${b}`);
}

function applyThemeColors(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  const [h, s, l] = rgbToHsl(r, g, b);
  const [r2, g2, b2] = hslToRgb((h + 20) % 360, Math.min(1, s + 0.1), Math.min(0.8, l + 0.1));

  setAccentCSSVariables(r, g, b, r2, g2, b2, l > 0.85);

  const theme = getAppBaseTheme();
  if (!appSettings.dynamicBg || !tracks[currentIndex]?.picURL) {
    crossfadeBackground(`radial-gradient(circle at 50% 0%, rgba(${r},${g},${b},0.35) 0%, ${theme.base} 70%)`);
  }
  applyCassetteAccentTheme();
}

function updateMediaArtwork() {
  const t = tracks[currentIndex];
  const hasCover = !!(t && t.picURL && appSettings.showCassetteCover !== false);

  // 1. Кассета
  if (cassetteLabel) {
    if (hasCover) {
      cassetteLabel.style.transition = 'background 0.3s ease, box-shadow 0.3s ease';
      cassetteLabel.style.backgroundImage = `url(${t.picURL})`;
      cassetteLabel.style.backgroundColor = '#12101a';
      cassetteLabel.style.backgroundSize = 'cover';
      cassetteLabel.style.backgroundPosition = 'center';
      cassetteLabel.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 2px 8px rgba(0,0,0,0.6)';
    } else {
      cassetteLabel.style.transition = 'background 0.3s ease, box-shadow 0.3s ease';
      cassetteLabel.style.backgroundImage = 'none';
      cassetteLabel.style.backgroundColor = 'var(--accent)';
      cassetteLabel.style.background = 'var(--accent)';
      cassetteLabel.style.boxShadow = 'inset 0 1px 1.5px rgba(255,255,255,0.35), inset 0 -1px 3px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.4)';
    }
  }

  // 2. Винил
  if (vinylSleeveArt) {
    if (hasCover) {
      vinylSleeveArt.style.backgroundImage = `url(${t.picURL})`;
      vinylSleeveArt.style.backgroundSize = 'cover';
      vinylSleeveArt.style.backgroundPosition = 'center';
      vinylSleeveArt.innerHTML = '';
    } else {
      vinylSleeveArt.style.backgroundImage = 'none';
      vinylSleeveArt.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:rgba(255,255,255,0.85);filter:drop-shadow(0 0 8px rgba(var(--accent-rgb),0.5));">${SVG_NOTE}</div>`;
    }
  }
  if (vinylCenterArt) {
    if (hasCover) {
      vinylCenterArt.style.backgroundImage = `url(${t.picURL})`;
      vinylCenterArt.style.backgroundSize = 'cover';
      vinylCenterArt.style.backgroundPosition = 'center';
      vinylCenterArt.innerHTML = '';
    } else {
      vinylCenterArt.style.backgroundImage = 'none';
      vinylCenterArt.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:rgba(255,255,255,0.9);filter:drop-shadow(0 0 6px rgba(var(--accent-rgb),0.5));">${SVG_NOTE}</div>`;
    }
  }
  if (vinylSleeveTitle) vinylSleeveTitle.textContent = t ? t.name : 'Нет трека';
  if (vinylSleeveArtist) vinylSleeveArtist.textContent = t ? (t.artist || 'Добавьте музыку') : 'Плеер готов';

  const showText = appSettings.showMediaText !== false;
  if (labelTitle) labelTitle.style.display = showText ? 'block' : 'none';
  if (labelArtist) labelArtist.style.display = showText ? 'block' : 'none';
  const vinylTitleRow = document.getElementById('vinylSleeveTitleRow');
  if (vinylTitleRow) vinylTitleRow.style.display = showText ? 'block' : 'none';

  // 3. DAP Portable Audio Player
  if (dapTitle) dapTitle.textContent = t ? t.name : 'Нет трека';
  if (dapArtist) dapArtist.textContent = t ? (t.artist || 'Неизвестный исполнитель') : 'Добавь музыку';
  if (dapThumbImg && dapThumbFallback) {
    if (t && t.picURL) {
      dapThumbImg.src = t.picURL;
      dapThumbImg.style.display = 'block';
      dapThumbFallback.style.display = 'none';
    } else {
      dapThumbImg.src = '';
      dapThumbImg.style.display = 'none';
      dapThumbFallback.style.display = 'flex';
      dapThumbFallback.innerHTML = SVG_NOTE;
    }
  }
}

function updateCassetteArtwork() {
  updateMediaArtwork();
}

function setMediaSkin(skin: MediaSkinType = 'vinyl', save: boolean = false) {
  appSettings.mediaSkin = 'vinyl';
  
  if (cassetteWrap) cassetteWrap.style.display = 'none';
  if (vinylWrap) vinylWrap.style.display = 'flex';

  updateMediaArtwork();
  if (save) {
    saveSettings();
  }
}

function applyCassetteAccentTheme() {
  const root = document.documentElement;
  const [r, g, b] = (window as any).__accentRGB || hexToRgb(appSettings.accentTheme);

  // Плотный чистый цвет корпуса и наклейки кассеты
  const bodyTone = `rgb(${Math.max(10, Math.round(r * 0.16))}, ${Math.max(10, Math.round(g * 0.16))}, ${Math.max(14, Math.round(b * 0.20))})`;
  const solidLabel = `rgb(${r}, ${g}, ${b})`;

  root.style.setProperty('--cassette-body', bodyTone);
  root.style.setProperty('--cassette-label-bg', solidLabel);

  updateMediaArtwork();
}

function applySettings() {
  appSettings.neonGlow = true;
  appSettings.cassetteFloat = true;
  applyAppBaseTheme(appSettings.appThemeBg || 'obsidian', false);

  if (library) {
    library.classList.toggle('has-top-gradient', appSettings.topGradient !== false);
  }

  const curTrackPic = tracks[currentIndex]?.picURL;
  if (appSettings.dynamicBg && curTrackPic && hasPlaybackStarted) {
    applyDominantColor(curTrackPic);
  } else {
    applyThemeColors(appSettings.accentTheme);
  }

  applyCassetteAccentTheme();
  setMediaSkin('vinyl', false);

  const isHardware = (appSettings.playerSkin || 'hardware') === 'hardware';
  if (player) {
    if (isHardware) {
      player.classList.add('player-hardware-mode');
    } else {
      player.classList.remove('player-hardware-mode');
    }
  }

  if (playerSkinToggleBtn) {
    if (isHardware) {
      playerSkinToggleBtn.setAttribute('title', 'Переключить на Виниловый плеер');
      playerSkinToggleBtn.innerHTML = SVG_VINYL_PLAYER_ICON;
    } else {
      playerSkinToggleBtn.setAttribute('title', 'Переключить на портативный Hi-Fi плеер');
      playerSkinToggleBtn.innerHTML = SVG_DAP_PLAYER_ICON;
    }
  }

  if (dapSkinToggleBtn) {
    dapSkinToggleBtn.setAttribute('title', 'Переключить на Виниловый плеер');
    dapSkinToggleBtn.innerHTML = SVG_VINYL_PLAYER_ICON;
  }

  if (cassetteWrap) {
    cassetteWrap.style.display = 'none';
  }
  if (vinylWrap) {
    vinylWrap.style.animation = '';
    vinylWrap.style.setProperty('--glow-size', '20px');
    vinylWrap.style.setProperty('--glow-alpha', '0.25');
  }
  updateAudioFilters();
}

function saveSettings() {
  try {
    localStorage.setItem('my_player_settings', JSON.stringify(appSettings));
  } catch (e) {}
  applySettings();
}

// ===== ID3 =====
async function readTags(file: Blob): Promise<any> {
  return new Promise(resolve => {
    if (typeof jsmediatags === 'undefined') return resolve(null);
    jsmediatags.read(file, {
      onSuccess: (tag: any) => resolve(tag.tags),
      onError: () => resolve(null)
    });
  });
}

function pictureToBlob(picture: any): Blob | null {
  if (!picture || !picture.data) return null;
  try {
    const { data, format } = picture;
    return new Blob([new Uint8Array(data)], { type: format });
  } catch (e) {
    return null;
  }
}

// ===== ФОН =====
function makeBgGradient(r: number, g: number, b: number) {
  const theme = getAppBaseTheme();
  return `radial-gradient(circle at 50% 0%, rgb(${r},${g},${b}) 0%, ${theme.base} 70%)`;
}
function defaultBgGradient() {
  const theme = getAppBaseTheme();
  return `radial-gradient(circle at 50% 0%, ${theme.previewColor} 0%, ${theme.base} 70%)`;
}

function crossfadeBackground(gradient: string) {
  const newLayer = document.createElement('div');
  newLayer.className = 'bg-layer';
  newLayer.style.background = gradient;
  bgLayers.appendChild(newLayer);
  void newLayer.offsetWidth;
  newLayer.classList.add('active');
  const oldLayer = currentBgLayer;
  currentBgLayer = newLayer;
  setTimeout(() => { if (oldLayer && oldLayer.parentNode) oldLayer.remove(); }, 1300);
}

function extractDominantColorFromImage(imageURL: string): Promise<{
  rgb: [number, number, number];
  isMonochrome: boolean;
} | null> {
  return new Promise(resolve => {
    const img = new Image();
    if (!imageURL.startsWith('blob:') && !imageURL.startsWith('data:')) {
      img.crossOrigin = 'anonymous';
    }
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return resolve(null);
        ctx.drawImage(img, 0, 0, 32, 32);
        const imgData = ctx.getImageData(0, 0, 32, 32).data;

        let totalValid = 0;
        const chromaticPixels: [number, number, number][] = [];

        for (let i = 0; i < imgData.length; i += 4) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          if (a < 128) continue;
          totalValid++;

          const [, s, l] = rgbToHsl(r, g, b);
          // Пиксель цветной: имеет оттенок (не монохромный серый, чёрный или белый)
          if (s >= 0.14 && l >= 0.08 && l <= 0.92) {
            chromaticPixels.push([r, g, b]);
          }
        }

        if (totalValid === 0) return resolve(null);

        // Если есть хотя бы немного цветных пикселей (от 1.5% общей площади обложки), отдаём приоритет цвету!
        if (chromaticPixels.length >= Math.max(10, Math.round(totalValid * 0.015))) {
          const hueBins = Array.from({ length: 24 }, () => ({
            count: 0, rSum: 0, gSum: 0, bSum: 0
          }));

          for (const [r, g, b] of chromaticPixels) {
            const [h] = rgbToHsl(r, g, b);
            const binIdx = Math.min(23, Math.floor(h / 15));
            hueBins[binIdx].count++;
            hueBins[binIdx].rSum += r;
            hueBins[binIdx].gSum += g;
            hueBins[binIdx].bSum += b;
          }

          let maxBin = hueBins[0];
          for (let k = 1; k < 24; k++) {
            if (hueBins[k].count > maxBin.count) {
              maxBin = hueBins[k];
            }
          }

          const rAvg = Math.round(maxBin.rSum / maxBin.count);
          const gAvg = Math.round(maxBin.gSum / maxBin.count);
          const bAvg = Math.round(maxBin.bSum / maxBin.count);
          resolve({ rgb: [rAvg, gAvg, bAvg], isMonochrome: false });
        } else {
          // Исключительно чёрная, белая или чёрно-белая (монохромная) обложка
          resolve({ rgb: [255, 255, 255], isMonochrome: true });
        }
      } catch (e) {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = imageURL;
  });
}

async function applyDominantColor(imageURL: string | null) {
  if (!appSettings.dynamicBg) {
    applyThemeColors(appSettings.accentTheme);
    return;
  }
  if (!imageURL) {
    applyThemeColors(appSettings.accentTheme);
    return;
  }

  let extracted = await extractDominantColorFromImage(imageURL);

  if (!extracted && typeof ColorThief !== 'undefined') {
    try {
      const img = new Image();
      if (!imageURL.startsWith('blob:') && !imageURL.startsWith('data:')) {
        img.crossOrigin = 'anonymous';
      }
      img.src = imageURL;
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; });
      const thief = new ColorThief();
      const color = thief.getColor(img);
      if (color) {
        const [, s] = rgbToHsl(color[0], color[1], color[2]);
        extracted = { rgb: color, isMonochrome: s < 0.12 };
      }
    } catch (e) {}
  }

  if (!extracted) {
    applyThemeColors(appSettings.accentTheme);
    return;
  }

  const { primaryRgb, secondaryRgb, isWhiteAccent } = normalizeAndBoostCoverColor(
    extracted.rgb[0], extracted.rgb[1], extracted.rgb[2], extracted.isMonochrome
  );
  const [r, g, b] = primaryRgb;
  const [r2, g2, b2] = secondaryRgb;

  setAccentCSSVariables(r, g, b, r2, g2, b2, isWhiteAccent);

  crossfadeBackground(makeBgGradient(r, g, b));

  if (!tracks[currentIndex]?.picURL || appSettings.showCassetteCover === false) {
    applyCassetteAccentTheme();
  }
}

// ===== ИСТОРИЯ (кнопка Назад) =====
function pushHistoryState(state: any) {
  try { history.pushState(state, ''); } catch (e) {}
}

window.addEventListener('popstate', () => {
  if (audioFxSheet && audioFxSheet.classList.contains('open')) { closeAudioFxSheet(); pushHistoryState({ page: 'main' }); return; }
  if (scannerBackdrop.classList.contains('open')) { hideScannerUI(); pushHistoryState({ page: 'main' }); return; }
  if (addSheet.classList.contains('open')) { closeAddSheet(); pushHistoryState({ page: 'main' }); return; }
  if (pickerSheet.classList.contains('open')) { closePicker(); pushHistoryState({ page: 'main' }); return; }
  if (ctxMenu.classList.contains('open')) { closeCtxMenu(); pushHistoryState({ page: 'main' }); return; }
  if (modalBackdrop.classList.contains('open')) { closeModal(); pushHistoryState({ page: 'main' }); return; }
  if (sheet.classList.contains('open')) { closeSheet(); pushHistoryState({ page: 'main' }); return; }
  if (collection.classList.contains('open')) { closeCollectionView(); pushHistoryState({ page: 'main' }); return; }
  if (player.classList.contains('open')) { closePlayer(); pushHistoryState({ page: 'main' }); return; }
  history.back();
});

// ===== ВКЛАДКИ =====
document.querySelectorAll('.tab').forEach(tab => {
  (tab as HTMLElement).onclick = () => {
    buzz();
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentTab = (tab as HTMLElement).dataset.tab || 'tracks';
    currentTabIndex = tabOrder.indexOf(currentTab);
    if (currentTab === 'tracks') renderTracks();
    else if (currentTab === 'playlists') renderPlaylists();
    else if (currentTab === 'settings') renderSettings();
    updateLayerPositions(true);
  };
});

searchInput.addEventListener('input', e => {
  searchQuery = (e.target as HTMLInputElement).value.toLowerCase().trim();
  renderLibrary();
});

function renderLibrary() {
  if (currentTab === 'tracks') renderTracks();
  else if (currentTab === 'playlists') renderPlaylists();
  else if (currentTab === 'settings') renderSettings();
  updateLayerPositions(false);
}

function renderAllLayers() {
  renderTracks();
  renderPlaylists();
  renderSettings();
  updateLayerPositions(false);
}

function updateLayerPositions(animate = true) {
  const W = contentWrap.offsetWidth;
  if (!W) return;
  tabOrder.forEach((tab, i) => {
    const layer = layerMap[tab];
    if (animate) {
      layer.style.transition = '';
    } else {
      layer.style.transition = 'none';
      void layer.offsetWidth;
    }
    layer.style.transform = `translateX(${(i - currentTabIndex) * W}px)`;
  });
}

function filterTracks() {
  if (!searchQuery) return tracks;
  return tracks.filter(t =>
    t.name.toLowerCase().includes(searchQuery) ||
    (t.artist || '').toLowerCase().includes(searchQuery) ||
    (t.album || '').toLowerCase().includes(searchQuery)
  );
}

// ===== ИЗБРАННОЕ =====
function getFavoritesPlaylist(): Playlist | undefined {
  return playlists.find(p => p.isFavorites || p.name.trim().toLowerCase() === 'избранное' || p.name.trim().toLowerCase() === 'любимое');
}

async function ensureFavoritesPlaylist(): Promise<Playlist> {
  const favMatches = playlists.filter(p => p.isFavorites || p.name.trim().toLowerCase() === 'избранное' || p.name.trim().toLowerCase() === 'любимое');

  if (favMatches.length === 0) {
    const plObj: Playlist = {
      id: 0,
      name: 'Избранное',
      trackIds: [],
      created: Date.now(),
      isFavorites: true,
    };
    const newId = await dbAdd('playlists', plObj);
    plObj.id = newId || Date.now();
    playlists.unshift(plObj);
    return plObj;
  }

  const primary = favMatches[0];
  primary.isFavorites = true;
  primary.name = 'Избранное';

  // Если нашлось несколько плейлистов Избранное — объединяем треки и удаляем дубликаты
  if (favMatches.length > 1) {
    const extras = favMatches.slice(1);
    for (const dup of extras) {
      dup.trackIds.forEach(tid => {
        if (!primary.trackIds.includes(tid)) {
          primary.trackIds.push(tid);
        }
      });
      if (dup.id) {
        await dbDelete('playlists', dup.id);
      }
      const idx = playlists.indexOf(dup);
      if (idx > -1) {
        playlists.splice(idx, 1);
      }
    }
    await dbPut('playlists', primary);
  }

  return primary;
}

function isTrackFavorite(trackId: number): boolean {
  const favPl = getFavoritesPlaylist();
  return favPl ? favPl.trackIds.includes(trackId) : false;
}

async function toggleTrackFavorite(trackId: number) {
  const favPl = await ensureFavoritesPlaylist();
  const idx = favPl.trackIds.indexOf(trackId);
  if (idx > -1) {
    favPl.trackIds.splice(idx, 1);
    showToast('Удалено из избранного', SVG_HEART, 2000);
  } else {
    favPl.trackIds.push(trackId);
    showToast('Добавлено в избранное', SVG_HEART_FILLED, 2000);
  }
  await dbPut('playlists', favPl);
  updateFavoriteButtons();
  renderPlaylists();
  if (currentCollection && currentCollection.id === favPl.id) {
    renderCollection();
  }
}

function updateFavoriteButtons() {
  const curTrack = tracks[currentIndex];
  const isFav = curTrack ? isTrackFavorite(curTrack.id) : false;
  if (playerTitleFavBtn) {
    playerTitleFavBtn.classList.toggle('active', isFav);
    playerTitleFavBtn.title = isFav ? 'Удалить из избранного' : 'Добавить в избранное';
  }
  if (dapFavBtn) {
    dapFavBtn.classList.toggle('active', isFav);
    dapFavBtn.title = isFav ? 'Удалить из избранного' : 'Добавить в избранное';
  }
  if (playerFavBtn) {
    playerFavBtn.innerHTML = isFav ? SVG_HEART_FILLED : SVG_HEART;
    playerFavBtn.classList.toggle('active', isFav);
    playerFavBtn.title = isFav ? 'Удалить из избранного' : 'Добавить в избранное';
  }
}

function initBatteryMonitor() {
  const batteryText = $('dapBatteryText');
  const batteryIcon = $('dapBatteryIcon');
  if (!batteryText) return;

  const updateBatteryUI = (level: number, charging: boolean) => {
    const percent = Math.max(1, Math.min(100, Math.round(level * 100)));
    if (batteryText) {
      batteryText.textContent = `${percent}%`;
    }
    if (batteryIcon) {
      // Max fill width inside the battery frame is 16px (from x=2.5 to x=18.5)
      const fillWidth = Math.max(1.5, Math.min(16, (percent / 100) * 16));
      const boltSvg = charging
        ? '<path d="M11 2.5 L8.5 6.5 H11 L10 10 L13.5 5.5 H11.5 Z" fill="#fff" filter="drop-shadow(0 0 2px rgba(0,0,0,0.8))"/>'
        : '';

      batteryIcon.innerHTML = `
        <rect x="1" y="1" width="19" height="10" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.2" />
        <path d="M22 4.5v3a1 1 0 0 1-1 1" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
        <rect id="dapBatteryFill" x="2.5" y="2.5" width="${fillWidth.toFixed(1)}" height="7" rx="1.5" fill="currentColor" />
        ${boltSvg}
      `;
    }
  };

  try {
    if (typeof navigator !== 'undefined' && typeof (navigator as any).getBattery === 'function') {
      (navigator as any).getBattery().then((battery: any) => {
        if (!battery) return;
        updateBatteryUI(battery.level, battery.charging);
        battery.addEventListener('levelchange', () => {
          updateBatteryUI(battery.level, battery.charging);
        });
        battery.addEventListener('chargingchange', () => {
          updateBatteryUI(battery.level, battery.charging);
        });
      }).catch(() => {
        // Battery status API rejected or unavailable
      });
    }
  } catch (err) {
    // Battery Status API not supported in current environment
  }
}

if (playerTitleFavBtn) {
  playerTitleFavBtn.onclick = () => {
    if (tracks[currentIndex]) {
      buzz(10);
      toggleTrackFavorite(tracks[currentIndex].id);
    }
  };
}

if (dapFavBtn) {
  dapFavBtn.onclick = () => {
    if (tracks[currentIndex]) {
      buzz(10);
      toggleTrackFavorite(tracks[currentIndex].id);
    }
  };
}

if (playerFavBtn) {
  playerFavBtn.onclick = () => {
    if (tracks[currentIndex]) {
      buzz(10);
      toggleTrackFavorite(tracks[currentIndex].id);
    }
  };
}

function updateActiveRow(newIdx: number) {
  const isAudioPlaying = !audio.paused;

  const activeRows = document.querySelectorAll('.track-row.active');
  activeRows.forEach(r => {
    const el = r as HTMLElement;
    const rIdx = el.dataset.idx !== undefined ? +el.dataset.idx : (el.dataset.realIdx !== undefined ? +el.dataset.realIdx : -1);
    if (!hasPlaybackStarted || rIdx !== newIdx) {
      el.classList.remove('active');
      const wave = el.querySelector('.tr-wave');
      if (wave) wave.remove();
    }
  });

  if (newIdx >= 0 && hasPlaybackStarted) {
    const targetRows = document.querySelectorAll(`.track-row[data-idx="${newIdx}"], .track-row[data-real-idx="${newIdx}"]`);
    targetRows.forEach(row => {
      row.classList.add('active');
      let wave = row.querySelector('.tr-wave') as HTMLElement;
      if (!wave) {
        wave = document.createElement('div');
        wave.className = `tr-wave ${isAudioPlaying ? 'playing' : ''}`;
        wave.innerHTML = '<span></span><span></span><span></span><span></span>';
        const menu = row.querySelector('.tr-menu');
        if (menu) row.insertBefore(wave, menu);
        else row.appendChild(wave);
      } else {
        wave.classList.toggle('playing', isAudioPlaying);
      }
    });
  }
  lastActiveIdx = hasPlaybackStarted ? newIdx : -1;
}

// ===== RENDER: TRACKS =====
function renderTracks() {
  const list = filterTracks();
  if (!list.length) {
    layerTracks.innerHTML = `
      <div class="empty-lib">
        <div class="big">${tracks.length ? '🔍' : SVG_NOTE}</div>
        ${tracks.length ? 'Ничего не найдено' : 'Библиотека пуста.<br>Нажмите <span style="color:var(--accent);font-weight:700;">➕</span> вверху, чтобы добавить музыку'}
      </div>`;
    lastActiveIdx = -1;
    return;
  }

  layerTracks.innerHTML = list.map(t => {
    const realIdx = tracks.indexOf(t);
    const isActive = hasPlaybackStarted && (realIdx === currentIndex);
    const coverStyle = t.picURL ? `background-image:url(${t.picURL})` : '';
    return `<div class="track-row ${isActive ? 'active' : ''}" data-idx="${realIdx}">
      <div class="tr-cover" style="${coverStyle}">${t.picURL ? '' : SVG_NOTE}</div>
      <div class="tr-info">
        <div class="tr-name">${escapeHtml(t.name)}</div>
        <div class="tr-meta">${escapeHtml(t.artist || 'Неизвестный')}${t.album ? ' · ' + escapeHtml(t.album) : ''}</div>
      </div>
      ${isActive ? `<div class="tr-wave ${!audio.paused ? 'playing' : ''}"><span></span><span></span><span></span><span></span></div>` : ''}
      <div class="tr-menu" data-menu="${realIdx}">⋯</div>
    </div>`;
  }).join('');
  lastActiveIdx = hasPlaybackStarted ? currentIndex : -1;
}

layerTracks.addEventListener('click', e => {
  const target = e.target as HTMLElement;

  const menuBtn = target.closest('.tr-menu') as HTMLElement;
  if (menuBtn && menuBtn.dataset.menu !== undefined) {
    buzz();
    showTrackMenu(+menuBtn.dataset.menu);
    return;
  }
  const row = target.closest('.track-row') as HTMLElement;
  if (row && row.dataset.idx !== undefined) {
    buzz();
    playFromLibrary(+row.dataset.idx);
  }
});

// ===== RENDER: PLAYLISTS =====
function renderPlaylists() {
  const filtered = searchQuery
    ? playlists.filter(p => p.name.toLowerCase().includes(searchQuery))
    : playlists;

  // Закрепляем «Избранное» всегда сверху сразу под кнопкой создания плейлистов
  const list = [...filtered].sort((a, b) => {
    const aFav = !!a.isFavorites || a.name === 'Избранное' || a.name === 'Любимое';
    const bFav = !!b.isFavorites || b.name === 'Избранное' || b.name === 'Любимое';
    if (aFav && !bFav) return -1;
    if (!aFav && bFav) return 1;
    return 0;
  });

  const createBtn = `<div class="playlist-row create-playlist-btn" id="createPlaylist" style="margin-bottom:8px">
    <div class="pl-icon">
      <svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="#ffffff"/></svg>
    </div>
    <div class="pl-info"><div class="pl-name">Создать плейлист</div><div class="pl-count">Новый список</div></div>
  </div>`;
  if (!list.length && !searchQuery) {
    layerPlaylists.innerHTML = createBtn + '<div class="empty-lib">Плейлистов пока нет</div>';
  } else {
    layerPlaylists.innerHTML = createBtn + list.map(p => {
      const isFav = !!p.isFavorites || p.name === 'Избранное' || p.name === 'Любимое';
      const coverStyle = p.coverURL ? `background-image:url(${p.coverURL})` : '';
      const icon = p.coverURL ? '' : (isFav ? SVG_HEART_FILLED : SVG_PLAYLIST);
      return `<div class="playlist-row ${isFav ? 'favorites-pl' : ''}" data-pl="${p.id}">
        <div class="pl-icon" style="${coverStyle}">${icon}</div>
        <div class="pl-info">
          <div class="pl-name" style="display:flex;align-items:center;gap:6px;">
            <span>${escapeHtml(p.name)}</span>
            ${isFav ? `<span style="display:inline-flex;color:var(--accent);font-size:12px;">${SVG_HEART_FILLED}</span>` : ''}
          </div>
          <div class="pl-count">${p.trackIds.length} ${plural(p.trackIds.length, 'трек', 'трека', 'треков')}</div>
        </div>
      </div>`;
    }).join('');
  }
}

let playlistDidLongPress = false;
let playlistPressTimer: any = null;
layerPlaylists.addEventListener('click', e => {
  const target = e.target as HTMLElement;
  if (playlistDidLongPress) { playlistDidLongPress = false; return; }
  if (target.closest('#createPlaylist')) { buzz(); createPlaylist(); return; }
  const row = target.closest('.playlist-row[data-pl]') as HTMLElement;
  if (row && row.dataset.pl) { buzz(); openPlaylist(+row.dataset.pl); }
});
layerPlaylists.addEventListener('touchstart', e => {
  const row = (e.target as HTMLElement).closest('.playlist-row[data-pl]') as HTMLElement;
  if (!row || !row.dataset.pl) return;
  playlistDidLongPress = false;
  playlistPressTimer = setTimeout(() => {
    playlistDidLongPress = true;
    buzz(20);
    showPlaylistMenu(+row.dataset.pl!);
  }, 600);
}, { passive: true });
layerPlaylists.addEventListener('touchend', () => clearTimeout(playlistPressTimer));
layerPlaylists.addEventListener('touchmove', () => clearTimeout(playlistPressTimer));

function plural(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few;
  return many;
}

// ===== ТАЙМЕР СНА И РЕЗЕРВНОЕ КОПИРОВАНИЕ =====
let sleepTimerRemainingSeconds: number = 0;
let sleepTimerInterval: any = null;

function setSleepTimer(minutes: number) {
  if (sleepTimerInterval) {
    clearInterval(sleepTimerInterval);
    sleepTimerInterval = null;
  }
  sleepTimerRemainingSeconds = 0;

  if (!minutes || minutes <= 0) {
    appSettings.sleepTimerMinutes = null;
    saveSettings();
    renderSettings();
    return;
  }

  appSettings.sleepTimerMinutes = minutes;
  saveSettings();
  sleepTimerRemainingSeconds = minutes * 60;

  sleepTimerInterval = setInterval(() => {
    sleepTimerRemainingSeconds--;
    if (sleepTimerRemainingSeconds <= 0) {
      clearInterval(sleepTimerInterval);
      sleepTimerInterval = null;
      if (!audio.paused) {
        audio.pause();
        buzz(30);
      }
      appSettings.sleepTimerMinutes = null;
      saveSettings();
      renderSettings();
    } else {
      const displayEl = document.getElementById('sleepTimerDisplay');
      if (displayEl) {
        const m = Math.floor(sleepTimerRemainingSeconds / 60);
        const s = sleepTimerRemainingSeconds % 60;
        displayEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
      }
    }
  }, 1000);

  renderSettings();
}

function exportLibraryData() {
  const exportObj = {
    app: 'My Retro Music Player',
    exportedAt: new Date().toISOString(),
    version: '2.1',
    tracksCount: tracks.length,
    playlistsCount: playlists.length,
    tracks: tracks.map(t => ({
      name: t.name,
      artist: t.artist,
      fileSize: t.fileSize,
      date: t.date,
    })),
    playlists: playlists.map(p => ({
      name: p.name,
      trackCount: p.trackIds.length,
      created: p.created,
    })),
    settings: appSettings,
  };
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `music-player-backup-${Date.now()}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// ===== RENDER: НАСТРОЙКИ =====
function renderSettings() {
  const totalTracks = tracks.length;
  const totalPlaylists = playlists.length;
  const totalBytes = tracks.reduce((acc, t) => acc + (t.fileSize || (t.blob ? t.blob.size : 0)), 0);
  const formattedSize = formatBytes(totalBytes);

  const colors = [
    { name: 'Кристальный белый', hex: '#ffffff' },
    { name: 'Неоновый пурпур', hex: '#c44dff' },
    { name: 'Кибернетический циан', hex: '#00e5ff' },
    { name: 'Электрический ультрамарин', hex: '#3b82f6' },
    { name: 'Лазурный бриз', hex: '#06b6d4' },
    { name: 'Изумрудный лайм', hex: '#10b981' },
    { name: 'Неоновая мята', hex: '#00f5a0' },
    { name: 'Кислотный лайм', hex: '#84cc16' },
    { name: 'Ретро золото', hex: '#f5a623' },
    { name: 'Солнечный янтарь', hex: '#fbbf24' },
    { name: 'Неоновый оранж', hex: '#ff6b35' },
    { name: 'Огненный коралл', hex: '#ff5722' },
    { name: 'Розовый закат', hex: '#ff2a6d' },
    { name: 'Яркая фуксия', hex: '#e024c3' },
    { name: 'Пылающий рубин', hex: '#f43f5e' },
    { name: 'Имперский кримсон', hex: '#ef4444' },
    { name: 'Космическая сирень', hex: '#a855f7' },
    { name: 'Глубокий индиго', hex: '#6366f1' },
    { name: 'Арктический лед', hex: '#38bdf8' }
  ];

  const sleepOptions = [
    { label: 'Выкл', val: 0 },
    { label: '15 мин', val: 15 },
    { label: '30 мин', val: 30 },
    { label: '45 мин', val: 45 },
    { label: '60 мин', val: 60 }
  ];

  let sleepTimerText = '';
  if (sleepTimerRemainingSeconds > 0) {
    const m = Math.floor(sleepTimerRemainingSeconds / 60);
    const s = sleepTimerRemainingSeconds % 60;
    sleepTimerText = ` (Осталось: <span id="sleepTimerDisplay" style="color:var(--accent);font-weight:700;">${m}:${s.toString().padStart(2, '0')}</span>)`;
  }

  layerSettings.innerHTML = `
    <div class="settings-container">
      <!-- Навигация по категориям настроек (Вкладки) -->
      <div class="settings-nav-tabs">
        <button class="settings-nav-tab ${activeSettingsSubTab === 'appearance' ? 'active' : ''}" data-settings-tab="appearance">
          <span style="display:flex;align-items:center;">${SVG_PALETTE}</span>
          <span>Внешний вид</span>
        </button>
        <button class="settings-nav-tab ${activeSettingsSubTab === 'sound' ? 'active' : ''}" data-settings-tab="sound">
          <span style="display:flex;align-items:center;">${SVG_SLIDERS}</span>
          <span>Звук и DSP</span>
        </button>
        <button class="settings-nav-tab ${activeSettingsSubTab === 'storage' ? 'active' : ''}" data-settings-tab="storage">
          <span style="display:flex;align-items:center;">${SVG_STORAGE_DISC}</span>
          <span>Память и Файлы</span>
        </button>
        <button class="settings-nav-tab ${activeSettingsSubTab === 'about' ? 'active' : ''}" data-settings-tab="about">
          <span style="display:flex;align-items:center;">${SVG_INFO_CIRCLE}</span>
          <span>О плеере</span>
        </button>
      </div>

      ${activeSettingsSubTab === 'appearance' ? `
        <!-- Вкладка: Внешний вид -->
        <div class="settings-card">
          <div class="settings-card-header">
            <div class="settings-card-title">
              ${SVG_BRUSH}
              Тема интерфейса и цвет
            </div>
          </div>

          <div class="settings-item" style="flex-direction:column;align-items:flex-start;">
            <div class="settings-item-info" style="width:100%;">
              <div class="settings-item-label">Цвет темы приложения</div>
              <div class="settings-item-desc">Базовый тон экранов, карточек, плеера и фона</div>
            </div>
            <div class="theme-options">
              ${APP_THEMES.map(t => `
                <div class="theme-chip app-theme-chip ${appSettings.appThemeBg === t.id ? 'active' : ''}"
                     data-app-theme="${t.id}" title="${t.name} — ${t.desc}" style="background:${t.previewColor};"></div>
              `).join('')}
            </div>
            <div class="theme-current-name">
              <span class="theme-current-dot"></span>
              Тон интерфейса: <strong>${escapeHtml(getAppBaseTheme().name)}</strong>
            </div>
          </div>

          <div class="settings-item" style="flex-direction:column;align-items:flex-start;">
            <div class="settings-item-info" style="width:100%;">
              <div class="settings-item-label">Основной акцент темы</div>
              <div class="settings-item-desc">Цвет подсветки, кнопок, кассеты и неонового перелива заголовка</div>
            </div>
            <div class="theme-options">
              ${colors.map(c => `
                <div class="theme-chip ${appSettings.accentTheme === c.hex ? 'active' : ''}"
                     data-color="${c.hex}" title="${c.name}" style="background:${c.hex};"></div>
              `).join('')}
            </div>
            <div class="theme-current-name">
              <span class="theme-current-dot" style="background:${appSettings.accentTheme}"></span>
              Цвет подсветки: <strong>${escapeHtml((colors.find(c => c.hex.toLowerCase() === appSettings.accentTheme.toLowerCase()) || colors[0]).name)}</strong>
            </div>
          </div>
        </div>

        <div class="settings-card">
          <div class="settings-card-header">
            <div class="settings-card-title">
              ${SVG_MEDIA_VINYL}
              Носитель и оформление
            </div>
          </div>

          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-label">Обложка трека на носителе</div>
              <div class="settings-item-desc">Отображать обложку альбома на пластинке и кассете</div>
            </div>
            <div class="settings-switch ${appSettings.showCassetteCover !== false ? 'active' : ''}" data-setting="showCassetteCover"></div>
          </div>

          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-label">Название и артист на носителе</div>
              <div class="settings-item-desc">Отображать текст с названием трека и исполнителем на пластинке и кассете</div>
            </div>
            <div class="settings-switch ${appSettings.showMediaText !== false ? 'active' : ''}" data-setting="showMediaText"></div>
          </div>

          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-label">Динамический фон по обложке</div>
              <div class="settings-item-desc">Автоматически адаптирует градиент фона и окантовку под обложку трека</div>
            </div>
            <div class="settings-switch ${appSettings.dynamicBg ? 'active' : ''}" data-setting="dynamicBg"></div>
          </div>

          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-label">Градиент акцента на главной</div>
              <div class="settings-item-desc">Плавный цветной перелив подсветки сверху вниз на главном экране</div>
            </div>
            <div class="settings-switch ${appSettings.topGradient !== false ? 'active' : ''}" data-setting="topGradient"></div>
          </div>

          <div class="settings-item" style="flex-direction:column;align-items:flex-start;">
            <div class="settings-item-info" style="width:100%;">
              <div class="settings-item-label">Режим внешнего вида плеера</div>
              <div class="settings-item-desc">Переключение между портативным Hi-Fi плеером и ретро-винилом</div>
            </div>
            <div class="preset-pills" style="margin-top:4px;">
              <button class="preset-pill ${(appSettings.playerSkin || 'hardware') === 'hardware' ? 'active' : ''}" data-setting-playerskin="hardware" style="display:inline-flex;align-items:center;gap:6px;">
                ${SVG_SMARTPHONE}
                <span>Портативный HIFI плеер</span>
              </button>
              <button class="preset-pill ${(appSettings.playerSkin || 'hardware') === 'classic' ? 'active' : ''}" data-setting-playerskin="classic" style="display:inline-flex;align-items:center;gap:6px;">
                ${SVG_MEDIA_VINYL}
                <span>Ретро-винил</span>
              </button>
            </div>
          </div>
        </div>
      ` : activeSettingsSubTab === 'sound' ? `
        <!-- Вкладка: Звук и DSP -->
        <div class="settings-card">
          <div class="settings-card-header">
            <div class="settings-card-title">
              ${SVG_SLIDERS}
              Студийный звук и эквалайзер
            </div>
          </div>

          <div style="padding:2px 0 8px 0;">
            <button class="settings-btn primary" id="btnOpenEqModal" style="display:flex;align-items:center;justify-content:space-between;gap:10px;font-size:13px;padding:9px 12px;border-radius:10px;width:100%;box-sizing:border-box;">
              <div style="display:flex;align-items:center;gap:10px;min-width:0;overflow:hidden;text-align:left;">
                <span style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,0.14);flex-shrink:0;">
                  ${SVG_SLIDERS}
                </span>
                <div style="min-width:0;overflow:hidden;">
                  <div style="font-weight:600;font-size:13px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">5-Полосный Эквалайзер & DSP</div>
                  <div style="font-size:11px;opacity:0.8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">Настройка частот, баса и 3D эффектов</div>
                </div>
              </div>
              <span style="display:inline-flex;align-items:center;flex-shrink:0;opacity:0.85;">
                ${SVG_CHEVRON_RIGHT}
              </span>
            </button>
          </div>

          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-label">Мастер-обработка звука (DSP)</div>
              <div class="settings-item-desc">Активен 5-полосный EQ, Bass Boost, 3D Surround и Punch</div>
            </div>
            <div class="settings-switch ${appSettings.soundFx.enabled ? 'active' : ''}" data-setting="fxEnabled"></div>
          </div>

          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-label">Винтажный пленочный звук (Tape Lo-Fi)</div>
              <div class="settings-item-desc">Мягкий аналоговый спад высоких частот как на магнитной ленте 80-х</div>
            </div>
            <div class="settings-switch ${appSettings.vintageFilter ? 'active' : ''}" data-setting="vintageFilter"></div>
          </div>

          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-label">Тактильный виброотклик</div>
              <div class="settings-item-desc">Легкая вибрация при касаниях кнопок и переключениях</div>
            </div>
            <div class="settings-switch ${appSettings.hapticFeedback ? 'active' : ''}" data-setting="hapticFeedback"></div>
          </div>

          <div class="settings-item" style="flex-direction:column;align-items:flex-start;">
            <div class="settings-item-info" style="width:100%;">
              <div class="settings-item-label">Таймер автоотключения (сна)${sleepTimerText}</div>
              <div class="settings-item-desc">Остановит воспроизведение через выбранный промежуток времени</div>
            </div>
            <div class="preset-pills">
              ${sleepOptions.map(s => {
                const isActive = (s.val === 0 && !appSettings.sleepTimerMinutes) || (appSettings.sleepTimerMinutes === s.val);
                return `
                  <button class="preset-pill ${isActive ? 'active' : ''}" data-sleep="${s.val}">
                    ${s.label}
                  </button>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      ` : activeSettingsSubTab === 'storage' ? `
        <!-- Вкладка: Память и Файлы -->
        <div class="settings-card">
          <div class="settings-card-header">
            <div class="settings-card-title">
              ${SVG_SMARTPHONE}
              Музыка на устройстве
            </div>
          </div>

          <div class="settings-item">
            <div class="settings-item-info">
              <div class="settings-item-label">Автопоиск музыки при запуске</div>
              <div class="settings-item-desc">Автоматически проверять новые треки в памяти при открытии плеера</div>
            </div>
            <div class="settings-switch ${appSettings.autoScanOnStart ? 'active' : ''}" data-setting="autoScanOnStart"></div>
          </div>

          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-dim);margin:6px 0 10px 0;line-height:1.4;">
            ${savedDirectoryName ? `
              <span style="display:inline-flex;color:var(--accent);">${SVG_FOLDER_ICON}</span>
              <span>Привязанная папка: <b style="color:var(--accent);">${escapeHtml(savedDirectoryName)}</b></span>
            ` : 'Папка не привязана. Нажмите «Сканировать», чтобы плеер добавил музыку с устройства.'}
          </div>

          <div style="display:flex;flex-direction:column;gap:8px;">
            <button class="settings-btn primary" id="btnSettingsScanNow">
              ${SVG_SEARCH_RADAR}
              <span>Сканировать музыку на устройстве</span>
            </button>
            <button class="settings-btn" id="btnSettingsChooseFolder">
              ${SVG_FOLDER_ICON}
              <span>Выбрать конкретную папку</span>
            </button>
          </div>
        </div>

        <div class="settings-card">
          <div class="settings-card-header">
            <div class="settings-card-title">
              ${SVG_STORAGE_DISC}
              Медиатека и память
            </div>
          </div>

          <div class="settings-stats">
            <div class="stat-box">
              <div class="stat-val">${totalTracks}</div>
              <div class="stat-lbl">Всего треков</div>
            </div>
            <div class="stat-box">
              <div class="stat-val">${totalPlaylists}</div>
              <div class="stat-lbl">Плейлистов</div>
            </div>
            <div class="stat-box">
              <div class="stat-val">${formattedSize}</div>
              <div class="stat-lbl">Память IndexedDB</div>
            </div>
            <div class="stat-box stat-box-action danger" id="btnClearLibrary" role="button" tabindex="0" title="Очистить библиотеку">
              <div class="stat-val" style="display:flex;align-items:center;gap:6px;font-size:14px;color:#ff5277;">
                ${SVG_TRASH_ICON}
                <span>Очистить</span>
              </div>
              <div class="stat-lbl" style="color:#ff8099;">Всю библиотеку</div>
            </div>
          </div>
        </div>
      ` : `
        <!-- Вкладка: О плеере -->
        <div class="settings-card">
          <div class="settings-hero" style="margin-bottom:12px;">
            <div class="settings-hero-icon lia-avatar">
              <img src="/lia.png" alt="Creator of Lia" class="settings-hero-img" referrerpolicy="no-referrer">
            </div>
            <div class="settings-hero-info" style="flex:1;min-width:0;">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <div class="settings-hero-title" style="margin:0;">Мой плеер</div>
                <span style="font-size:10px;font-weight:600;letter-spacing:0.4px;color:var(--accent);background:rgba(var(--accent-rgb),0.12);border:1px solid rgba(var(--accent-rgb),0.28);border-radius:6px;padding:2px 7px;white-space:nowrap;box-shadow:0 0 8px rgba(var(--accent-rgb),0.2);">Creator of Lia</span>
              </div>
              <a href="https://github.com/igorlitvinov2440-eng" target="_blank" rel="noopener noreferrer" class="settings-github-btn" id="authorGithubBtn" title="Перейти на мой GitHub">
                ${SVG_GITHUB}
                <span>Перейти на мой GitHub</span>
                ${SVG_EXTERNAL_LINK}
              </a>
            </div>
          </div>

          <div class="settings-item" style="flex-direction:column;align-items:flex-start;gap:6px;">
            <div class="settings-item-label" style="display:flex;align-items:center;gap:6px;">
              ${SVG_MUSIC_FORMAT}
              <span>Поддерживаемые аудиоформаты</span>
            </div>
            <div class="settings-item-desc" style="line-height:1.5;">
              MP3, FLAC (Lossless), WAV, AAC, M4A, OGG, OPUS, WebM с автоматическим чтением встроенных ID3-обложек и метаданных.
            </div>
          </div>

          <div class="settings-item" style="flex-direction:column;align-items:flex-start;gap:6px;">
            <div class="settings-item-label" style="display:flex;align-items:center;gap:6px;">
              ${SVG_SPARKLES_TIPS}
              <span>Советы по управлению</span>
            </div>
            <div class="settings-item-desc" style="line-height:1.6;">
              • Горизонтальный свайп на главном экране переключает вкладки библиотеки.<br>
              • Кнопка <b>Hi-Fi</b> вверху плеера мгновенно переключает между Ретро-винилом и Hi-Fi DAP плеером.<br>
              • Сердечко рядом с названием трека быстро добавляет композицию в Избранное.<br>
              • Долгое нажатие (0.6 сек) на плейлист открывает меню редактирования и удаление.<br>
              • Свайп вниз по открытому плееру сворачивает его в мини-плеер.<br>
              • Кнопка эквалайзера вызовет 5-полосный DSP-процессор, 3D стерео-объём и бас-буст.
            </div>
          </div>
        </div>
      `}
    </div>
  `;
}

// Обработчики кликов внутри вкладки Настроек
layerSettings.addEventListener('click', async (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  // Переключение вкладок внутри настроек
  const subTabBtn = target.closest('.settings-nav-tab[data-settings-tab]') as HTMLElement;
  if (subTabBtn && subTabBtn.dataset.settingsTab) {
    buzz(8);
    activeSettingsSubTab = subTabBtn.dataset.settingsTab as any;
    renderSettings();
    return;
  }

  // Переход на GitHub автора
  const githubBtn = target.closest('#authorGithubBtn') as HTMLAnchorElement;
  if (githubBtn) {
    buzz(10);
    // Ссылка открывается системным браузером по умолчанию через target="_blank"
    return;
  }

  // Кнопка быстрого вызова эквалайзера
  if (target.closest('#btnOpenEqModal')) {
    buzz(10);
    openAudioFxSheet();
    return;
  }

  // Переключатели
  const switchEl = target.closest('.settings-switch[data-setting]') as HTMLElement;
  if (switchEl && switchEl.dataset.setting) {
    buzz(12);
    const key = switchEl.dataset.setting;
    if (key === 'fxEnabled') {
      appSettings.soundFx.enabled = !appSettings.soundFx.enabled;
      saveSettings();
      updateAudioFilters();
      renderSettings();
      return;
    }
    const appKey = key as keyof AppSettings;
    if (typeof appSettings[appKey] === 'boolean') {
      (appSettings as any)[appKey] = !(appSettings as any)[appKey];
      saveSettings();
      if (appKey === 'showCassetteCover' || appKey === 'showMediaText') {
        updateCassetteArtwork();
      }
      if (appKey === 'topGradient') {
        if (library) {
          library.classList.toggle('has-top-gradient', appSettings.topGradient !== false);
        }
      }
      if (appKey === 'dynamicBg') {
        if (appSettings.dynamicBg && tracks[currentIndex] && tracks[currentIndex].picURL) {
          applyDominantColor(tracks[currentIndex].picURL);
        } else {
          applyThemeColors(appSettings.accentTheme);
        }
      }
      renderSettings();
    }
    return;
  }

  // Вид плеера (классический / DAP)
  const playerSkinPill = target.closest('.preset-pill[data-setting-playerskin]') as HTMLElement;
  if (playerSkinPill && playerSkinPill.dataset.settingPlayerskin) {
    buzz(10);
    appSettings.playerSkin = playerSkinPill.dataset.settingPlayerskin as any;
    saveSettings();
    applySettings();
    renderSettings();
    return;
  }

  // Стиль медиадеки (скины)
  const skinPill = target.closest('.preset-pill[data-setting-skin]') as HTMLElement;
  if (skinPill && skinPill.dataset.settingSkin) {
    buzz(10);
    setMediaSkin(skinPill.dataset.settingSkin as MediaSkinType, true);
    renderSettings();
    return;
  }

  // Цвета базовой темы приложения
  const appThemeChip = target.closest('.theme-chip[data-app-theme]') as HTMLElement;
  if (appThemeChip && appThemeChip.dataset.appTheme) {
    buzz(10);
    applyAppBaseTheme(appThemeChip.dataset.appTheme, true);
    saveSettings();
    renderSettings();
    return;
  }

  // Цвета акцента темы
  const chipEl = target.closest('.theme-chip[data-color]') as HTMLElement;
  if (chipEl && chipEl.dataset.color) {
    buzz(10);
    appSettings.accentTheme = chipEl.dataset.color;
    applyThemeColors(chipEl.dataset.color);
    saveSettings();
    renderSettings();
    return;
  }

  // Таймер сна
  const sleepPill = target.closest('.preset-pill[data-sleep]') as HTMLElement;
  if (sleepPill && sleepPill.dataset.sleep !== undefined) {
    buzz(10);
    setSleepTimer(parseInt(sleepPill.dataset.sleep, 10));
    return;
  }

  // Кнопки управления
  if (target.closest('#btnSettingsScanNow')) {
    buzz(12);
    scanDeviceMusic('auto');
    return;
  }
  if (target.closest('#btnSettingsChooseFolder')) {
    buzz(12);
    scanDeviceMusic('folder');
    return;
  }
  if (target.closest('#btnExportData')) {
    buzz(10);
    exportLibraryData();
    return;
  }
  if (target.closest('#btnClearLibrary')) {
    buzz(20);
    showConfirmModal(
      'Точно ли удалить?',
      'Все треки, обложки и плейлисты будут безвозвратно удалены из библиотеки плеера.',
      async () => {
        audio.pause();
        tracks = [];
        playlists = [];
        currentQueue = [];
        currentIndex = 0;
        await Promise.all([
          dbClear('tracks'),
          dbClear('playlists')
        ]);
        renderAllLayers();
        miniPlayer.classList.add('hidden');
        library.classList.remove('with-mini');
        showToast('Библиотека полностью очищена', SVG_TRASH_ICON, 2000);
        buzz(30);
      },
      'Точно удалить',
      'Отмена'
    );
    return;
  }
});

// ===== СВАЙПЫ =====
let swipeStartX = 0, swipeStartY = 0, swipeActive = false, swipeDirectionLocked: string | null = null;
const SWIPE_THRESHOLD = 60;

contentWrap.addEventListener('touchstart', (e: TouchEvent) => {
  if ((e.target as HTMLElement).closest('button')) return;
  if (swipeLocked) return;
  swipeStartX = e.touches[0].clientX;
  swipeStartY = e.touches[0].clientY;
  swipeActive = true;
  swipeDirectionLocked = null;
}, { passive: true });

contentWrap.addEventListener('touchmove', (e: TouchEvent) => {
  if (!swipeActive) return;
  const dx = e.touches[0].clientX - swipeStartX;
  const dy = e.touches[0].clientY - swipeStartY;
  if (!swipeDirectionLocked) {
    if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
    if (Math.abs(dx) > Math.abs(dy) * 1.5) swipeDirectionLocked = 'h';
    else { swipeDirectionLocked = 'v'; swipeActive = false; return; }
  }
  if (swipeDirectionLocked === 'h') {
    let effectiveDx = dx;
    if ((currentTabIndex === 0 && dx > 0) || (currentTabIndex === tabOrder.length - 1 && dx < 0)) {
      effectiveDx = dx * 0.3;
    }
    const W = contentWrap.offsetWidth;
    tabOrder.forEach((tab, i) => {
      const layer = layerMap[tab];
      layer.style.transition = 'none';
      layer.classList.add('dragging');
      layer.style.transform = `translateX(${(i - currentTabIndex) * W + effectiveDx}px)`;
    });
  }
}, { passive: true });

contentWrap.addEventListener('touchend', (e: TouchEvent) => {
  if (!swipeActive || swipeDirectionLocked !== 'h') {
    swipeActive = false;
    swipeDirectionLocked = null;
    return;
  }
  const dx = e.changedTouches[0].clientX - swipeStartX;
  let newIndex = currentTabIndex;
  if (Math.abs(dx) > SWIPE_THRESHOLD) {
    if (dx < 0 && currentTabIndex < tabOrder.length - 1) newIndex = currentTabIndex + 1;
    else if (dx > 0 && currentTabIndex > 0) newIndex = currentTabIndex - 1;
  }
  const W = contentWrap.offsetWidth;
  tabOrder.forEach((tab, i) => {
    const layer = layerMap[tab];
    layer.classList.remove('dragging');
    layer.style.transition = '';
    layer.style.transform = `translateX(${(i - newIndex) * W}px)`;
  });
  if (newIndex !== currentTabIndex) {
    buzz(6);
    swipeLocked = true;
    currentTabIndex = newIndex;
    currentTab = tabOrder[newIndex];
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.tab[data-tab="${currentTab}"]`)?.classList.add('active');
    if (currentTab === 'tracks') renderTracks();
    else if (currentTab === 'playlists') renderPlaylists();
    else if (currentTab === 'settings') renderSettings();
    setTimeout(() => { swipeLocked = false; }, 400);
  }
  swipeActive = false;
  swipeDirectionLocked = null;
}, { passive: true });

let resizeTimer: any = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => updateLayerPositions(false), 100);
});

// ===== КОЛЛЕКЦИИ (ПЛЕЙЛИСТЫ) =====
function openPlaylist(plId: number) {
  const pl = playlists.find(p => p.id === plId);
  if (!pl) return;
  currentCollection = { type: 'playlist', id: plId };
  renderCollection();
  collection.classList.add('open');
  pushHistoryState({ page: 'playlist', id: plId });
}

function closeCollectionView() {
  collection.classList.remove('open');
  currentCollection = null;
}
closeCollectionBtn.onclick = () => { buzz(); if (history.length > 1) history.back(); else closeCollectionView(); };

function renderCollection() {
  if (!currentCollection) return;
  const { id } = currentCollection;
  const p = playlists.find(x => x.id === id);
  if (!p) { closeCollectionView(); return; }
  const name = p.name;
  const trackIds = p.trackIds;
  let coverURL: string | null = null;
  if (p.coverURL) coverURL = p.coverURL;
  else {
    const anyWithCover = trackIds.map(tid => tracks.find(t => t.id === tid)).find(t => t && t.picURL);
    if (anyWithCover) coverURL = anyWithCover.picURL;
  }
  const tracksInColl = trackIds.map(tid => tracks.find(t => t.id === tid)).filter(Boolean) as Track[];
  collectionHeaderTitle.textContent = '';
  collectionName.textContent = name;
  collectionMeta.textContent = `${tracksInColl.length} ${plural(tracksInColl.length, 'трек', 'трека', 'треков')}`;
  collectionAddTracks.style.display = '';

  const oldUploadBtn = collection.querySelector('.cover-upload-empty');
  if (oldUploadBtn) oldUploadBtn.remove();

  const isFavPl = !!p.isFavorites || p.name === 'Избранное' || p.name === 'Любимое';

  const collectionSettingsBtn = $('collectionSettingsBtn');
  if (collectionSettingsBtn) {
    if (isFavPl) {
      collectionSettingsBtn.style.display = 'none';
    } else {
      collectionSettingsBtn.style.display = 'flex';
      collectionSettingsBtn.onclick = () => {
        buzz(10);
        showPlaylistMenu(p.id);
      };
    }
  }

  if (isFavPl) {
    collectionCover.style.backgroundImage = '';
    collectionCover.classList.add('has-fallback-gradient');
    collectionCover.innerHTML = `<span style="display:inline-flex;color:#ffffff;filter:drop-shadow(0 0 12px var(--accent));">${SVG_HEART_FILLED}</span>`;
    if (coverEditBtn) coverEditBtn.style.display = 'none';
    if (collectionCoverBtn) collectionCoverBtn.style.display = 'none';
  } else if (p.coverURL) {
    collectionCover.style.backgroundImage = `url(${p.coverURL})`;
    collectionCover.classList.remove('has-fallback-gradient');
    collectionCover.innerHTML = '';
    if (coverEditBtn) coverEditBtn.style.display = 'none';
    if (collectionCoverBtn) collectionCoverBtn.style.display = 'none';
  } else if (coverURL) {
    collectionCover.style.backgroundImage = `url(${coverURL})`;
    collectionCover.classList.remove('has-fallback-gradient');
    collectionCover.innerHTML = '';
    if (coverEditBtn) coverEditBtn.style.display = 'none';
    if (collectionCoverBtn) collectionCoverBtn.style.display = 'none';
  } else {
    collectionCover.style.backgroundImage = '';
    collectionCover.classList.add('has-fallback-gradient');
    collectionCover.innerHTML = SVG_PLAYLIST_BIG;
    if (coverEditBtn) coverEditBtn.style.display = 'none';
    if (collectionCoverBtn) collectionCoverBtn.style.display = 'none';
  }

  if (!tracksInColl.length) {
    collectionTracks.innerHTML = `<div class="empty-lib">
      <div class="big">${SVG_PLAYLIST_EMPTY}</div>
      В плейлисте пока нет треков
    </div>`;
  } else {
    collectionTracks.innerHTML = tracksInColl.map((t, i) => {
      const realIdx = tracks.indexOf(t);
      const isCurrent = realIdx === currentIndex;
      const coverStyle = t.picURL ? `background-image:url(${t.picURL})` : '';
      return `<div class="track-row ${isCurrent ? 'active' : ''}" data-idx="${i}" data-real-idx="${realIdx}">
        <div class="tr-cover" style="${coverStyle}">${t.picURL ? '' : SVG_NOTE}</div>
        <div class="tr-info">
          <div class="tr-name">${escapeHtml(t.name)}</div>
          <div class="tr-meta">${escapeHtml(t.artist || 'Неизвестный')}</div>
        </div>
        ${isCurrent ? `<div class="tr-wave ${!audio.paused ? 'playing' : ''}"><span></span><span></span><span></span><span></span></div>` : ''}
        <div class="tr-menu" data-menu="${i}">⋯</div>
      </div>`;
    }).join('');
  }
}

collectionTracks.addEventListener('click', e => {
  if (!currentCollection) return;
  const { id } = currentCollection;
  const p = playlists.find(x => x.id === id);
  const trackIds = p ? p.trackIds : [];
  const tracksInColl = trackIds.map(tid => tracks.find(t => t.id === tid)).filter(Boolean) as Track[];
  const target = e.target as HTMLElement;
  const menuBtn = target.closest('.tr-menu') as HTMLElement;
  if (menuBtn && menuBtn.dataset.menu !== undefined) { buzz(); showCollectionTrackMenu(+menuBtn.dataset.menu, tracksInColl); return; }
  const row = target.closest('.track-row[data-idx]') as HTMLElement;
  if (row && row.dataset.idx !== undefined) {
    buzz();
    const idx = +row.dataset.idx;
    currentQueue = tracksInColl.map(t => tracks.indexOf(t));
    queueIndex = idx;
    loadTrackByQueueIndex(idx);
  }
});

function showCollectionTrackMenu(idx: number, tracksInColl: Track[]) {
  const t = tracksInColl[idx];
  if (!t) return;
  const isFav = isTrackFavorite(t.id);
  const items: any[] = [
    { icon: 'play', label: 'Играть', action: () => {
      hasPlaybackStarted = true;
      currentQueue = tracksInColl.map(x => tracks.indexOf(x));
      queueIndex = idx;
      loadTrackByQueueIndex(idx);
    }},
    { icon: 'heart', label: isFav ? 'Убрать из избранного' : 'В избранное', action: () => toggleTrackFavorite(t.id) },
    { icon: 'playlist', label: 'В плейлист...', action: () => addToPlaylist(t.id) },
    { icon: 'trash', label: 'Убрать из плейлиста', danger: true, action: () => removeFromPlaylist(currentCollection!.id, t.id) },
    { icon: 'edit', label: 'Переименовать', action: () => renameTrack(t.id) },
    { icon: 'trash', label: 'Удалить из библиотеки', danger: true, action: () => deleteTrack(t.id) }
  ];
  showCtxMenu(t.name, items);
}

async function removeFromPlaylist(plId: number, trackId: number) {
  const p = playlists.find(x => x.id === plId);
  if (!p) return;
  p.trackIds = p.trackIds.filter(id => id !== trackId);
  await dbPut('playlists', p);
  renderCollection();
  renderLibrary();
}

collectionPlay.onclick = () => {
  if (!currentCollection) return;
  buzz();
  const { id } = currentCollection;
  const p = playlists.find(x => x.id === id);
  const trackIds = p ? p.trackIds : [];
  const tracksInColl = trackIds.map(tid => tracks.find(t => t.id === tid)).filter(Boolean) as Track[];
  if (!tracksInColl.length) return;
  currentQueue = tracksInColl.map(t => tracks.indexOf(t));
  queueIndex = 0;
  loadTrackByQueueIndex(0);
};

collectionShuffle.onclick = () => {
  if (!currentCollection) return;
  buzz();
  shuffle = true;
  shuffleBtn.classList.add('active');
  const { id } = currentCollection;
  const p = playlists.find(x => x.id === id);
  const trackIds = p ? p.trackIds : [];
  const tracksInColl = trackIds.map(tid => tracks.find(t => t.id === tid)).filter(Boolean) as Track[];
  if (!tracksInColl.length) return;
  currentQueue = tracksInColl.map(t => tracks.indexOf(t));
  queueIndex = Math.floor(Math.random() * currentQueue.length);
  loadTrackByQueueIndex(queueIndex);
};

if (collectionMenu) {
  collectionMenu.onclick = () => {
    if (!currentCollection) return;
    buzz();
    const { id } = currentCollection;
    const p = playlists.find(x => x.id === id);
    if (!p) return;
    const isFav = p.isFavorites || p.name === 'Избранное' || p.name === 'Любимое';
    if (isFav) {
      showToast('Плейлист «Избранное» зафиксирован', SVG_HEART_FILLED, 2000);
      return;
    }
    const items: any[] = [
      { icon: 'edit', label: 'Переименовать', action: () => renamePlaylist(id) },
      { icon: 'album', label: 'Изменить обложку', action: () => { editingCoverFor = { ...currentCollection! }; imageInput.click(); } }
    ];
    if (p.coverURL) items.push({ icon: 'trash', label: 'Удалить обложку', danger: true, action: () => removeCover() });
    items.push({ icon: 'trash', label: 'Удалить плейлист', danger: true, action: () => deletePlaylist(id) });
    showCtxMenu('Плейлист', items);
  };
}

// ===== ОБЛОЖКИ =====
coverEditBtn.onclick = () => {
  if (!currentCollection) return;
  buzz();
  editingCoverFor = { ...currentCollection };
  imageInput.click();
};

imageInput.onchange = async (e: any) => {
  const file = e.target.files[0];
  if (!file || !editingCoverFor) { editingCoverFor = null; imageInput.value = ''; return; }
  if (!file.type.startsWith('image/')) { alert('Выбери картинку'); editingCoverFor = null; imageInput.value = ''; return; }
  if (file.size > 5 * 1024 * 1024) { alert('Картинка слишком большая (>5 МБ)'); editingCoverFor = null; imageInput.value = ''; return; }
  const { id } = editingCoverFor;
  const coverBlob = file;
  const coverURL = URL.createObjectURL(coverBlob);
  const p = playlists.find(x => x.id === id);
  if (!p || p.isFavorites || p.name === 'Избранное' || p.name === 'Любимое') { editingCoverFor = null; imageInput.value = ''; return; }
  if (p.coverURL && p.coverURL.startsWith('blob:')) { try { URL.revokeObjectURL(p.coverURL); } catch (e) {} }
  p.coverBlob = coverBlob; p.coverURL = coverURL;
  await dbPut('playlists', p);
  editingCoverFor = null; imageInput.value = '';
  renderCollection(); renderLibrary();
  buzz(20);
};

async function removeCover() {
  if (!currentCollection) return;
  const { id } = currentCollection;
  const p = playlists.find(x => x.id === id);
  if (!p) return;
  if (p.coverURL && p.coverURL.startsWith('blob:')) { try { URL.revokeObjectURL(p.coverURL); } catch (e) {} }
  p.coverBlob = null; p.coverURL = null;
  await dbPut('playlists', p);
  renderCollection(); renderLibrary();
  buzz(20);
}

// ===== PICKER (добавить треки в плейлист) =====
function openPicker() {
  const coll = currentCollection;
  if (!coll || coll.type !== 'playlist') return;
  const p = playlists.find(x => x.id === coll.id);
  if (!p) return;
  pickerSelected = new Set();
  pickerExcludeIds = new Set(p.trackIds);
  pickerSearch.value = '';
  pickerTitle.textContent = 'Добавить в плейлист';
  renderPickerList();
  updatePickerButton();
  pickerBackdrop.classList.add('open');
  pickerSheet.classList.add('open');
  pushHistoryState({ page: 'picker' });
}

function closePicker() {
  pickerBackdrop.classList.remove('open');
  pickerSheet.classList.remove('open');
  pickerSelected = new Set();
}

function renderPickerList() {
  const q = pickerSearch.value.toLowerCase().trim();
  const list = q
    ? tracks.filter(t => t.name.toLowerCase().includes(q) || (t.artist || '').toLowerCase().includes(q) || (t.album || '').toLowerCase().includes(q))
    : tracks;
  if (!list.length) { pickerList.innerHTML = '<div class="empty-lib">Треков не найдено</div>'; return; }
  pickerList.innerHTML = list.map(t => {
    const isExcluded = pickerExcludeIds.has(t.id);
    const isSelected = pickerSelected.has(t.id);
    const coverStyle = t.picURL ? `background-image:url(${t.picURL})` : '';
    return `<div class="picker-item ${isExcluded ? 'disabled' : ''} ${isSelected ? 'selected' : ''}" data-id="${t.id}">
      <div class="pi-cover" style="${coverStyle}">${t.picURL ? '' : SVG_NOTE}</div>
      <div class="pi-info">
        <div class="pi-name">${escapeHtml(t.name)}</div>
        <div class="pi-meta">${escapeHtml(t.artist || 'Неизвестный')}${t.album ? ' · ' + escapeHtml(t.album) : ''}</div>
      </div>
      <div class="pi-check"></div>
    </div>`;
  }).join('');
}

function updatePickerButton() {
  const n = pickerSelected.size;
  pickerAddBtn.disabled = n === 0;
  pickerAddBtn.textContent = n === 0 ? 'Выберите треки' : `Добавить ${n} ${plural(n, 'трек', 'трека', 'треков')}`;
}

pickerList.addEventListener('click', e => {
  const item = (e.target as HTMLElement).closest('.picker-item') as HTMLElement;
  if (!item || item.classList.contains('disabled')) return;
  const id = +item.dataset.id!;
  buzz();
  if (pickerSelected.has(id)) { pickerSelected.delete(id); item.classList.remove('selected'); }
  else { pickerSelected.add(id); item.classList.add('selected'); }
  updatePickerButton();
});

pickerSearch.addEventListener('input', () => renderPickerList());

pickerAddBtn.onclick = async () => {
  const coll = currentCollection;
  if (!coll || coll.type !== 'playlist') return;
  const p = playlists.find(x => x.id === coll.id);
  if (!p || !pickerSelected.size) return;
  buzz();
  pickerSelected.forEach(id => { if (!p.trackIds.includes(id)) p.trackIds.push(id); });
  await dbPut('playlists', p);
  closePicker();
  renderCollection();
  renderLibrary();
};

pickerClose.onclick = () => { if (history.length > 1) history.back(); else closePicker(); };
pickerBackdrop.onclick = () => { if (history.length > 1) history.back(); else closePicker(); };
collectionAddTracks.onclick = () => { buzz(); openPicker(); };

// ===== ВОСПРОИЗВЕДЕНИЕ =====
function playFromLibrary(idx: number) {
  currentQueue = tracks.map((_, i) => i);
  queueIndex = idx;
  currentIndex = idx;
  loadTrackByQueueIndex(queueIndex);
}

function loadTrackByQueueIndex(qi: number) {
  if (!currentQueue.length) return;
  queueIndex = qi;
  const trackIdx = currentQueue[qi];
  if (trackIdx === undefined) return;
  loadTrack(trackIdx);
}

function loadTrack(i: number) {
  if (!tracks[i]) return;
  const t = tracks[i];
  if (!t.url && t.blob) {
    try { t.url = URL.createObjectURL(t.blob); } catch (e) { return; }
  }
  if (!t.url) return;
  hasPlaybackStarted = true;
  currentIndex = i;
  audio.src = t.url;
  labelTitle.textContent = t.name;
  labelArtist.textContent = t.artist || '';
  titleEl.textContent = t.name;
  artistEl.textContent = t.artist || '';
  mpName.textContent = t.name;
  mpArtist.textContent = t.artist || '';
  updateCassetteArtwork();
  updateFavoriteButtons();
  if (t.picURL) {
    mpCover.style.backgroundImage = `url(${t.picURL})`;
    mpCover.textContent = '';
    applyDominantColor(t.picURL);
  } else {
    mpCover.style.backgroundImage = '';
    mpCover.innerHTML = SVG_NOTE;
    mpCover.style.color = 'var(--accent)';
    crossfadeBackground(defaultBgGradient());
    applyThemeColors(appSettings.accentTheme);
    applyCassetteAccentTheme();
  }
  updateActiveRow(i);
  renderQueue();
  updateMediaSession();
  miniPlayer.classList.remove('hidden');
  library.classList.add('with-mini');
  audio.play().catch(() => {});
}

function togglePlay() {
  if (!tracks.length) { fileInput.click(); return; }
  hasPlaybackStarted = true;
  if (!audioCtx) initAudio();
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  if (audio.paused) {
    if (!audio.src && tracks[currentIndex]) {
      loadTrack(currentIndex);
    } else {
      audio.play();
    }
  } else {
    audio.pause();
  }
}

function nextTrack() {
  if (!currentQueue.length) return;
  if (shuffle) queueIndex = Math.floor(Math.random() * currentQueue.length);
  else queueIndex = (queueIndex + 1) % currentQueue.length;
  loadTrackByQueueIndex(queueIndex);
}

function prevTrack() {
  if (!currentQueue.length) return;
  if (audio.currentTime > 3) { audio.currentTime = 0; return; }
  queueIndex = (queueIndex - 1 + currentQueue.length) % currentQueue.length;
  loadTrackByQueueIndex(queueIndex);
}

// ===== ДОБАВЛЕНИЕ ФАЙЛОВ И АВТОПОИСК НА УСТРОЙСТВЕ =====
function showToast(message: string, icon = '🎵', duration = 3500) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  let iconContent = icon;
  if (icon === '🎵' || icon === '➕') iconContent = SVG_NOTE;
  else if (icon === '🔁') iconContent = SVG_REPEAT;
  else if (icon === '🔀') iconContent = SVG_SHUFFLE;
  else if (icon === '🎚️') iconContent = SVG_EQUALIZER;
  else if (icon === '⚡') iconContent = SVG_BOLT;
  else if (icon === '📻') iconContent = SVG_CASSETTE_ICON;
  else if (icon === '🔍') iconContent = SVG_SEARCH_RADAR;

  toast.innerHTML = `
    <div class="toast-icon">${iconContent}</div>
    <div class="toast-text">${escapeHtml(message)}</div>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 320);
  }, duration);
}

function isMobileDevice(): boolean {
  if (typeof navigator === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(navigator.userAgent) ||
    (window.matchMedia && window.matchMedia('(max-width: 768px)').matches && 'ontouchstart' in window);
}

function isAudioFile(file: File | { name?: string; type?: string }): boolean {
  const mime = (file.type || '').toLowerCase();
  if (mime.startsWith('audio/')) return true;
  const name = (file.name || '').toLowerCase();
  return /\.(mp3|flac|wav|m4a|aac|ogg|opus|wma|webm|alac|aif|aiff|mid|midi)$/i.test(name);
}

let savedDirectoryHandle: any = null;
let savedDirectoryName = '';
let isScanningAborted = false;

function openAddSheet() {
  buzz(12);
  addSheetBackdrop.classList.add('open');
  addSheet.classList.add('open');
  pushHistoryState({ page: 'add-sheet' });
}

function closeAddSheet() {
  addSheetBackdrop.classList.remove('open');
  addSheet.classList.remove('open');
}

addSheetBackdrop.onclick = () => closeAddSheet();
addSheetClose.onclick = () => closeAddSheet();

optAutoScanDevice.onclick = () => {
  closeAddSheet();
  scanDeviceMusic('auto');
};

optPickFolder.onclick = () => {
  closeAddSheet();
  scanDeviceMusic('folder');
};

optPickFiles.onclick = () => {
  closeAddSheet();
  fileInput.click();
};

addInHeader.onclick = () => { buzz(); openAddSheet(); };
addBtn.onclick = () => { buzz(); openAddSheet(); };

function showScannerUI(title = 'Сканирование устройства', status = 'Поиск аудиофайлов...') {
  isScanningAborted = false;
  scannerTitle.textContent = title;
  scannerStatus.textContent = status;
  scannerProgressBar.style.width = '0%';
  scannerStatFound.textContent = '0';
  scannerStatAdded.textContent = '0';
  scannerStatSkipped.textContent = '0';
  scannerBackdrop.classList.add('open');
  pushHistoryState({ page: 'scanner' });
}

function hideScannerUI() {
  scannerBackdrop.classList.remove('open');
}

scannerCancelBtn.onclick = () => {
  isScanningAborted = true;
  hideScannerUI();
  buzz(10);
};

async function collectFilesFromDirHandle(dir: any, files: File[] = []): Promise<File[]> {
  if (isScanningAborted) return files;
  try {
    for await (const entry of dir.values()) {
      if (isScanningAborted) break;
      if (entry.kind === 'file') {
        try {
          const f = await entry.getFile();
          if (isAudioFile(f)) {
            files.push(f);
            scannerStatFound.textContent = String(files.length);
          }
        } catch (e) {}
      } else if (entry.kind === 'directory') {
        if (!entry.name.startsWith('.')) {
          scannerStatus.textContent = `Поиск в: ${entry.name}...`;
          await collectFilesFromDirHandle(entry, files);
        }
      }
    }
  } catch (err) {
    console.warn('Directory scan error:', err);
  }
  return files;
}

async function processScannedFiles(files: File[], sourceLabel: string) {
  const audioFiles = files.filter(isAudioFile);
  scannerStatFound.textContent = String(audioFiles.length);

  if (!audioFiles.length) {
    hideScannerUI();
    showToast('Аудиофайлы не найдены', '🔍', 3000);
    return;
  }

  let addedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < audioFiles.length; i++) {
    if (isScanningAborted) break;
    const file = audioFiles[i];

    const progressPct = Math.round(((i + 1) / audioFiles.length) * 100);
    scannerProgressBar.style.width = `${progressPct}%`;
    scannerStatus.textContent = `[${i + 1}/${audioFiles.length}] ${file.name}`;

    const fileKey = `${file.name}::${file.size}::${file.lastModified}`;
    const isDuplicate = tracks.some(t =>
      t.fileKey === fileKey ||
      (!t.fileKey && t.blob && t.blob.size === file.size && t.name === file.name.replace(/\.[^.]+$/, ''))
    );

    if (isDuplicate) {
      skippedCount++;
      scannerStatSkipped.textContent = String(skippedCount);
      continue;
    }

    let tags: any = null;
    try {
      tags = await readTags(file);
    } catch (e) {}

    let name = file.name.replace(/\.[^.]+$/, '');
    let artist = 'Неизвестный', album = '', picURL: string | null = null, picBlob: Blob | null = null;
    if (tags) {
      if (tags.title) name = tags.title;
      if (tags.artist) artist = tags.artist;
      if (tags.album) album = tags.album;
      if (tags.picture) {
        picBlob = pictureToBlob(tags.picture);
        if (picBlob) picURL = URL.createObjectURL(picBlob);
      }
    }

    const trackObj: Track = {
      id: 0,
      name, artist, album,
      url: URL.createObjectURL(file),
      blob: file, picURL, picBlob, fileKey,
      fileSize: file.size, date: Date.now()
    };

    const dbRecord = {
      name, artist, album,
      blob: file,
      picBlob: picBlob || null,
      fileKey,
      fileSize: file.size,
      date: Date.now()
    };

    const id = await dbAdd('tracks', dbRecord);
    trackObj.id = id || Date.now();
    tracks.push(trackObj);
    addedCount++;
    scannerStatAdded.textContent = String(addedCount);

    if (i % 2 === 0) {
      await new Promise(r => setTimeout(r, 6));
    }
  }

  hideScannerUI();

  if (addedCount > 0) {
    currentQueue = tracks.map((_, i) => i);
    renderAllLayers();
    buzz(30);

    showToast(`Добавлено ${addedCount} ${plural(addedCount, 'трек', 'трека', 'треков')} с устройства`, '🎵', 4000);
  } else if (skippedCount > 0) {
    showToast(`Все найденные треки (${skippedCount}) уже есть в вашей медиатеке`, 'ℹ️', 3500);
  } else {
    showToast('Новые треки не найдены', '🔍', 3000);
  }
}

// ===== БЛОКИРОВКА ОРИЕНТАЦИИ: ТОЛЬКО ВЕРТИКАЛЬНЫЙ ПОРТРЕТНЫЙ ФОРМАТ НА ТЕЛЕФОНЕ =====
async function lockPortraitOrientation() {
  // 1. Нативный плагин Capacitor для Android / iOS
  if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform && Capacitor.isNativePlatform()) {
    try {
      const { ScreenOrientation } = await import('@capacitor/screen-orientation');
      await ScreenOrientation.lock({ orientation: 'portrait' });
      return;
    } catch (e) {
      console.warn('Capacitor screen orientation lock attempt:', e);
    }
  }

  // 2. Стандартный веб-API ориентации экрана (Screen Orientation API для Chrome/Android/PWA)
  try {
    if (window.screen && window.screen.orientation && typeof (window.screen.orientation as any).lock === 'function') {
      await (window.screen.orientation as any).lock('portrait');
    } else if ((window.screen as any)?.lockOrientation) {
      (window.screen as any).lockOrientation('portrait');
    } else if ((window.screen as any)?.mozLockOrientation) {
      (window.screen as any).mozLockOrientation('portrait');
    } else if ((window.screen as any)?.msLockOrientation) {
      (window.screen as any).msLockOrientation('portrait');
    }
  } catch (e) {
    // В некоторых браузерах блокировка ориентации может требовать жеста пользователя
  }
}

// ===== АВТОМАТИЧЕСКИЙ ПОИСК МУЗЫКИ НА ANDROID / CAPACITOR =====
async function autoScanAndroidMusic(isQuiet = false) {
  if (typeof Capacitor === 'undefined' || !Capacitor.isNativePlatform || !Capacitor.isNativePlatform()) {
    return false;
  }

  try {
    const { Filesystem, Directory } = await import('@capacitor/filesystem');
    
    // Запрос прав на чтение внешней памяти на Android
    try {
      const permStatus = await Filesystem.requestPermissions();
      if ((permStatus as any).publicStorage !== 'granted') {
        if (!isQuiet) showToast('Предоставьте доступ к памяти для автопоиска музыки', '⚠️', 3500);
        return false;
      }
    } catch (pe) {
      console.warn('Filesystem permissions check skipped or unsupported:', pe);
    }

    if (!isQuiet) showToast('Сканирование памяти телефона...', '🔍', 2500);

    const audioExtensions = ['.mp3', '.flac', '.m4a', '.wav', '.aac', '.ogg', '.opus', '.wma'];
    const directoriesToScan = ['Music', 'Download', 'Audio', 'Podcasts', 'Ringtones'];
    let addedCount = 0;

    async function scanDirectoryRecursive(dirPath: string, rootDir: any) {
      try {
        const result = await Filesystem.readdir({ path: dirPath, directory: rootDir });
        if (!result || !result.files) return;

        for (const entry of result.files) {
          const fullPath = dirPath ? `${dirPath}/${entry.name}` : entry.name;
          if (entry.type === 'directory') {
            await scanDirectoryRecursive(fullPath, rootDir);
          } else if (entry.type === 'file') {
            const ext = entry.name.substring(entry.name.lastIndexOf('.')).toLowerCase();
            if (audioExtensions.includes(ext)) {
              const fileKey = `device_${entry.name}_${entry.size || 0}`;
              if (tracks.some(t => t.fileKey === fileKey || (t.deviceUri && t.deviceUri === entry.uri))) {
                continue;
              }

              const webPath = Capacitor.convertFileSrc ? Capacitor.convertFileSrc(entry.uri) : entry.uri;
              const cleanName = entry.name.replace(/\.[^/.]+$/, '');

              const trackObj: Track = {
                id: Date.now() + Math.floor(Math.random() * 100000),
                name: cleanName,
                artist: 'Аудиофайл устройства',
                album: '',
                blob: null,
                picBlob: null,
                deviceUri: entry.uri,
                isDevice: true,
                url: webPath,
                picURL: null,
                fileKey,
                fileSize: entry.size || 0,
                date: Date.now()
              };

              const id = await dbAdd('tracks', {
                name: cleanName,
                artist: 'Аудиофайл устройства',
                album: '',
                blob: null,
                picBlob: null,
                deviceUri: entry.uri,
                isDevice: true,
                fileKey,
                fileSize: entry.size || 0,
                date: Date.now()
              });

              trackObj.id = id || trackObj.id;
              tracks.push(trackObj);
              addedCount++;
            }
          }
        }
      } catch (e) {
        // Игнорируем недоступные папки
      }
    }

    for (const dirName of directoriesToScan) {
      await scanDirectoryRecursive(dirName, Directory.ExternalStorage);
    }

    if (addedCount > 0) {
      currentQueue = tracks.map((_, i) => i);
      renderAllLayers();
      buzz(30);
      showToast(`Автопоиск завершён: найдено ${addedCount} ${plural(addedCount, 'трек', 'трека', 'треков')}`, '🎵', 4000);
    } else if (!isQuiet) {
      showToast('Новой музыки в памяти телефона не найдено', 'ℹ️', 3000);
    }
    return true;
  } catch (err) {
    console.warn('Android auto-scan failed:', err);
    return false;
  }
}

async function scanDeviceMusic(mode: 'auto' | 'folder' | 'files' = 'auto') {
  buzz(12);

  // На Android с использованием Capacitor запускаем полноценный нативный автопоиск по файлам
  if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform && Capacitor.isNativePlatform()) {
    if (mode === 'auto') {
      const scanned = await autoScanAndroidMusic(false);
      if (scanned) return;
    }
  }

  // Мобильный веб-браузер без нативного Capacitor: открытие выбора файлов
  if (mode === 'auto' && isMobileDevice()) {
    showToast('Выберите аудиофайлы на устройстве', '🎵', 3000);
    deviceAudioInput.value = '';
    deviceAudioInput.click();
    return;
  }

  // Check File System Access API (PC / Chrome)
  if ((mode === 'auto' || mode === 'folder') && 'showDirectoryPicker' in window) {
    try {
      const dirHandle = await (window as any).showDirectoryPicker({
        id: 'device-music-folder',
        mode: 'read',
        startIn: 'music'
      });

      if (dirHandle) {
        // Мгновенный запрос разрешений на чтение с первого раза!
        if (typeof dirHandle.requestPermission === 'function') {
          try {
            let status = await dirHandle.queryPermission({ mode: 'read' });
            if (status !== 'granted') {
              status = await dirHandle.requestPermission({ mode: 'read' });
            }
            if (status !== 'granted') {
              showToast('Доступ к папке не предоставлен', '⚠️', 3000);
              return;
            }
          } catch (pe) {}
        }

        savedDirectoryHandle = dirHandle;
        savedDirectoryName = dirHandle.name || 'Музыка';
        await dbSetMeta('saved_directory_name', savedDirectoryName);
        try {
          await dbSetMeta('saved_directory_handle', dirHandle);
        } catch (e) {}
        renderSettings();

        showScannerUI(`Сканирование «${savedDirectoryName}»`, 'Рекурсивный поиск музыки...');
        const foundFiles: File[] = [];
        await collectFilesFromDirHandle(dirHandle, foundFiles);

        if (isScanningAborted) {
          hideScannerUI();
          return;
        }

        await processScannedFiles(foundFiles, savedDirectoryName);
        return;
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        return;
      }
      console.warn('showDirectoryPicker unavailable, falling back:', err);
    }
  }

  // Fallback to HTML folder or device multi-audio picker
  if (mode === 'folder' || mode === 'auto') {
    folderInput.value = '';
    folderInput.click();
  } else {
    deviceAudioInput.value = '';
    deviceAudioInput.click();
  }
}

folderInput.onchange = async (e: any) => {
  const files = [...(e.target.files || [])].filter(isAudioFile);
  if (!files.length) {
    showToast('Аудиофайлы в выбранной папке не найдены', '🔍', 3000);
    return;
  }
  showScannerUI('Сканирование выбранной папки', `Найдено файлов: ${files.length}`);
  await processScannedFiles(files, 'Папка устройства');
  folderInput.value = '';
};

deviceAudioInput.onchange = async (e: any) => {
  const files = [...(e.target.files || [])].filter(isAudioFile);
  if (!files.length) return;
  showScannerUI('Обработка аудиофайлов', `Выбрано файлов: ${files.length}`);
  await processScannedFiles(files, 'Файлы устройства');
  deviceAudioInput.value = '';
};

fileInput.onchange = async (e: any) => {
  const files = [...e.target.files].filter(isAudioFile);
  if (!files.length) return;
  showScannerUI('Импорт треков', `Выбрано файлов: ${files.length}`);
  await processScannedFiles(files, 'Выбранные файлы');
  fileInput.value = '';
};

async function scanDirectoryInBackground(dirHandle: any) {
  try {
    const files: File[] = [];
    await collectFilesFromDirHandle(dirHandle, files);
    const audioFiles = files.filter(isAudioFile);
    if (!audioFiles.length) return;

    let newCount = 0;
    for (const file of audioFiles) {
      const fileKey = `${file.name}::${file.size}::${file.lastModified}`;
      const isDuplicate = tracks.some(t =>
        t.fileKey === fileKey ||
        (!t.fileKey && t.blob && t.blob.size === file.size && t.name === file.name.replace(/\.[^.]+$/, ''))
      );
      if (isDuplicate) continue;

      let tags: any = null;
      try { tags = await readTags(file); } catch (e) {}

      let name = file.name.replace(/\.[^.]+$/, '');
      let artist = 'Неизвестный', album = '', picURL: string | null = null, picBlob: Blob | null = null;
      if (tags) {
        if (tags.title) name = tags.title;
        if (tags.artist) artist = tags.artist;
        if (tags.album) album = tags.album;
        if (tags.picture) {
          picBlob = pictureToBlob(tags.picture);
          if (picBlob) picURL = URL.createObjectURL(picBlob);
        }
      }

      const trackObj: Track = {
        id: 0,
        name, artist, album,
        url: URL.createObjectURL(file),
        blob: file, picURL, picBlob, fileKey,
        fileSize: file.size, date: Date.now()
      };

      const id = await dbAdd('tracks', trackObj);
      trackObj.id = id || Date.now();
      tracks.push(trackObj);
      newCount++;
    }

    if (newCount > 0) {
      renderAllLayers();
      showToast(`Автопоиск: добавлено ${newCount} новых треков с телефона!`, '🎵', 4000);
    }
  } catch (err) {
    console.warn('Background auto-scan failed:', err);
  }
}

// ===== КОНТЕКСТНОЕ МЕНЮ =====
function showCtxMenu(title: string, items: any[]) {
  const iconSVGs: Record<string, string> = {
    play: '<path d="M8 5v14l11-7z"/>',
    heart: '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>',
    playlist: '<path d="M14 10H3v2h11v-2zm0-4H3v2h11V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM3 16h7v-2H3v2z"/>',
    edit: '<path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>',
    artist: '<path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>',
    album: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.49 0-4.5-2.01-4.5-4.5S9.51 7.5 12 7.5s4.5 2.01 4.5 4.5-2.01 4.5-4.5 4.5zm0-5.5c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z"/>',
    trash: '<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>',
    create: '<path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>'
  };
  ctxMenu.innerHTML = (title ? `<div class="ctx-title">${escapeHtml(title)}</div>` : '') +
    items.map((it, i) => {
      const svgPath = iconSVGs[it.icon] || iconSVGs.play;
      return `<div class="ctx-item ${it.danger ? 'danger' : ''}" data-i="${i}">
        <svg class="ci-icon" viewBox="0 0 24 24">${svgPath}</svg>
        <span>${escapeHtml(it.label)}</span>
      </div>`;
    }).join('');
  ctxBackdrop.classList.add('open');
  ctxMenu.classList.add('open');
  pushHistoryState({ page: 'menu' });
  ctxMenu.querySelectorAll('.ctx-item').forEach(el => {
    (el as HTMLElement).onclick = () => {
      buzz();
      const action = items[+(el as HTMLElement).dataset.i!].action;
      closeCtxMenu();
      setTimeout(() => action(), 200);
    };
  });
}

function closeCtxMenu() {
  ctxBackdrop.classList.remove('open');
  ctxMenu.classList.remove('open');
}
ctxBackdrop.onclick = () => { if (history.length > 1) history.back(); else closeCtxMenu(); };

function showTrackMenu(trackIdx: number) {
  const t = tracks[trackIdx];
  if (!t) return;
  const isFav = isTrackFavorite(t.id);
  showCtxMenu(t.name, [
    { icon: 'play', label: 'Играть', action: () => {
      hasPlaybackStarted = true;
      currentQueue = tracks.map((_, i) => i);
      queueIndex = trackIdx;
      loadTrack(trackIdx);
    } },
    { icon: 'heart', label: isFav ? 'Убрать из избранного' : 'В избранное', action: () => toggleTrackFavorite(t.id) },
    { icon: 'playlist', label: 'В плейлист...', action: () => addToPlaylist(t.id) },
    { icon: 'edit', label: 'Переименовать', action: () => renameTrack(t.id) },
    { icon: 'trash', label: 'Удалить из библиотеки', danger: true, action: () => deleteTrack(t.id) }
  ]);
}

function showPlaylistMenu(plId: number) {
  const p = playlists.find(x => x.id === plId);
  if (!p) return;
  const isFav = p.isFavorites || p.name === 'Избранное' || p.name === 'Любимое';
  if (isFav) return;

  const items: any[] = [
    { icon: 'edit', label: 'Изменить название', action: () => renamePlaylist(plId) },
    { icon: 'album', label: 'Изменить обложку', action: () => {
      editingCoverFor = { type: 'playlist', id: plId };
      imageInput.click();
    } }
  ];
  if (p.coverURL) {
    items.push({ icon: 'trash', label: 'Удалить обложку', danger: true, action: async () => {
      if (p.coverURL && p.coverURL.startsWith('blob:')) { try { URL.revokeObjectURL(p.coverURL); } catch (e) {} }
      p.coverBlob = null; p.coverURL = null;
      await dbPut('playlists', p);
      renderLibrary();
      if (currentCollection?.id === plId) renderCollection();
    } });
  }
  items.push({ icon: 'trash', label: 'Удалить плейлист', danger: true, action: () => deletePlaylist(plId) });
  showCtxMenu(p.name, items);
}

// ===== РЕДАКТИРОВАНИЕ И ДИАЛОГИ =====
function showModal(title: string, defaultValue: string, onOk: (val: string) => void) {
  modalTitle.textContent = title;
  modalInput.style.display = 'block';
  modalInput.value = defaultValue || '';
  const subEl = modalBackdrop.querySelector('.modal-sub') as HTMLElement;
  if (subEl) subEl.style.display = 'none';
  modalOk.textContent = 'OK';
  modalCancel.textContent = 'Отмена';
  modalBackdrop.classList.add('open');
  pushHistoryState({ page: 'modal' });
  setTimeout(() => modalInput.focus(), 100);
  const handler = () => {
    const val = modalInput.value.trim();
    closeModal();
    if (val) onOk(val);
  };
  modalOk.onclick = handler;
  modalInput.onkeydown = e => { if (e.key === 'Enter') handler(); };
  modalCancel.onclick = closeModal;
}

function showConfirmModal(title: string, subtitle: string, onConfirm: () => void, confirmText = 'Удалить', cancelText = 'Отмена') {
  modalTitle.textContent = title;
  modalInput.style.display = 'none';
  let subEl = modalBackdrop.querySelector('.modal-sub') as HTMLElement;
  if (!subEl) {
    subEl = document.createElement('div');
    subEl.className = 'modal-sub';
    subEl.style.cssText = 'font-size:13px;color:#a8a2c2;margin:8px 0 18px;line-height:1.5;text-align:center;';
    modalTitle.after(subEl);
  }
  subEl.textContent = subtitle;
  subEl.style.display = 'block';
  modalOk.textContent = confirmText;
  modalCancel.textContent = cancelText;
  modalBackdrop.classList.add('open');
  pushHistoryState({ page: 'modal' });

  const cleanup = () => {
    modalInput.style.display = 'block';
    if (subEl) subEl.style.display = 'none';
    modalOk.textContent = 'OK';
    modalCancel.textContent = 'Отмена';
    closeModal();
  };

  modalOk.onclick = () => {
    cleanup();
    onConfirm();
  };
  modalCancel.onclick = () => {
    cleanup();
  };
}

function closeModal() {
  modalBackdrop.classList.remove('open');
  modalInput.blur();
}
modalBackdrop.onclick = e => { if (e.target === modalBackdrop) closeModal(); };

async function renameTrack(id: number) {
  const t = tracks.find(x => x.id === id);
  if (!t) return;
  showModal('Новое название', t.name, async val => {
    t.name = val;
    if (t.blob) await dbPut('tracks', { ...t, blob: t.blob, picBlob: t.picBlob || null });
    renderLibrary();
    if (currentCollection) renderCollection();
    if (tracks[currentIndex]?.id === id) {
      labelTitle.textContent = val; titleEl.textContent = val; mpName.textContent = val;
    }
  });
}

async function deleteTrack(id: number) {
  const idx = tracks.findIndex(t => t.id === id);
  if (idx === -1) return;
  await dbDelete('tracks', id);
  tracks.splice(idx, 1);
  currentQueue = currentQueue.filter(i => i !== idx).map(i => i > idx ? i - 1 : i);
  for (const pl of playlists) {
    pl.trackIds = pl.trackIds.filter(tid => tid !== id);
    await dbPut('playlists', pl);
  }
  renderLibrary();
  if (currentCollection) renderCollection();
}

async function createPlaylist() {
  showModal('Название плейлиста', '', async val => {
    const cleanName = val.trim();
    if (cleanName.toLowerCase() === 'избранное' || cleanName.toLowerCase() === 'любимое') {
      showToast('Плейлист «Избранное» уже создан', SVG_HEART_FILLED, 2000);
      return;
    }
    const pl: Playlist = { id: 0, name: cleanName, trackIds: [], created: Date.now(), coverBlob: null, coverURL: null };
    const id = await dbAdd('playlists', pl);
    pl.id = id || Date.now();
    playlists.push(pl);
    renderLibrary();
  });
}

async function renamePlaylist(plId: number) {
  const p = playlists.find(x => x.id === plId);
  if (!p) return;
  if (p.isFavorites || p.name === 'Избранное' || p.name === 'Любимое') {
    showToast('Плейлист «Избранное» зафиксирован', SVG_HEART_FILLED, 2000);
    return;
  }
  showModal('Новое название', p.name, async val => {
    p.name = val;
    await dbPut('playlists', p);
    renderLibrary();
    if (currentCollection?.type === 'playlist' && currentCollection.id === plId) renderCollection();
  });
}

async function deletePlaylist(plId: number) {
  const p = playlists.find(x => x.id === plId);
  if (p && (p.isFavorites || p.name === 'Избранное' || p.name === 'Любимое')) {
    showToast('Плейлист «Избранное» нельзя удалить', SVG_HEART_FILLED, 2000);
    return;
  }
  await dbDelete('playlists', plId);
  playlists = playlists.filter(x => x.id !== plId);
  if (currentCollection?.type === 'playlist' && currentCollection.id === plId) closeCollectionView();
  renderLibrary();
}

function addToPlaylist(trackId: number) {
  if (!playlists.length) {
    showCtxMenu('Нет плейлистов', [{ icon: 'create', label: 'Создать новый', action: () => createPlaylist() }]);
    return;
  }
  showCtxMenu('Добавить в...', [
    ...playlists.map(p => ({
      icon: 'playlist', label: p.name,
      action: async () => {
        if (p.trackIds.includes(trackId)) return;
        p.trackIds.push(trackId);
        await dbPut('playlists', p);
        renderLibrary();
        if (currentCollection?.type === 'playlist' && currentCollection.id === p.id) renderCollection();
      }
    })),
    { icon: 'create', label: 'Создать новый', action: () => createPlaylist() }
  ]);
}

// ===== ПЛЕЕР UI =====
function openPlayer() {
  player.classList.add('open');
  initBatteryMonitor();
  pushHistoryState({ page: 'player' });
}
function closePlayer() { player.classList.remove('open'); }
closePlayerBtn.onclick = () => { buzz(); if (history.length > 1) history.back(); else closePlayer(); };
miniPlayer.onclick = (e: any) => {
  if (e.target.closest('.mp-btn')) return;
  buzz(); openPlayer();
};
mpPlay.onclick = e => { e.stopPropagation(); buzz(); togglePlay(); };
if (mpPrev) mpPrev.onclick = e => { e.stopPropagation(); buzz(); prevTrack(); };
if (mpNext) mpNext.onclick = e => { e.stopPropagation(); buzz(); nextTrack(); };

playBtn.onclick = () => { buzz(); togglePlay(); };
prevBtn.onclick = () => { buzz(); prevTrack(); };
nextBtn.onclick = () => { buzz(); nextTrack(); };
shuffleBtn.onclick = () => {
  buzz();
  shuffle = !shuffle;
  shuffleBtn.classList.toggle('active', shuffle);
  if (dapShuffleBtn) dapShuffleBtn.classList.toggle('active', shuffle);
  showToast(shuffle ? 'Случайный порядок включен' : 'Случайный порядок выключен', SVG_SHUFFLE, 1500);
};
repeatBtn.onclick = () => {
  buzz();
  repeat = !repeat;
  repeatBtn.classList.toggle('active', repeat);
  if (dapRepeatBtn) dapRepeatBtn.classList.toggle('active', repeat);
  showToast(repeat ? 'Повтор включен' : 'Повтор выключен', SVG_REPEAT, 1500);
};
if (audioFxBtn) {
  audioFxBtn.onclick = () => { buzz(); openAudioFxSheet(); };
}
playlistBtn.onclick = () => { buzz(); openSheet(); };
if (playerMenu) {
  playerMenu.onclick = () => { buzz(); if (!tracks[currentIndex]) return; showTrackMenu(currentIndex); };
}
const handlePlayerSkinToggle = () => {
  buzz(12);
  appSettings.playerSkin = appSettings.playerSkin === 'hardware' ? 'classic' : 'hardware';
  saveSettings();
  applySettings();
  renderSettings();
  initBatteryMonitor();
};
if (playerSkinToggleBtn) {
  playerSkinToggleBtn.onclick = handlePlayerSkinToggle;
}
if (dapSkinToggleBtn) {
  dapSkinToggleBtn.onclick = handlePlayerSkinToggle;
}

let playerTouchStartY = 0;
player.addEventListener('touchstart', (e: TouchEvent) => {
  if (e.touches.length === 1) {
    playerTouchStartY = e.touches[0].clientY;
  }
}, { passive: true });

player.addEventListener('touchend', (e: TouchEvent) => {
  if (e.changedTouches.length === 1) {
    const dy = e.changedTouches[0].clientY - playerTouchStartY;
    if (dy > 80 && player.classList.contains('open')) {
      buzz(10);
      if (history.length > 1) history.back();
      else closePlayer();
    }
  }
}, { passive: true });

// ===== ОЧЕРЕДЬ =====
function openSheet() {
  renderQueue();
  backdrop.classList.add('open');
  sheet.classList.add('open');
  pushHistoryState({ page: 'queue' });
}
function closeSheet() {
  backdrop.classList.remove('open');
  sheet.classList.remove('open');
}
closeSheetBtn.onclick = () => { if (history.length > 1) history.back(); else closeSheet(); };
backdrop.onclick = () => { if (history.length > 1) history.back(); else closeSheet(); };

function renderQueue() {
  if (!currentQueue.length) { playlistEl.innerHTML = '<div class="empty-lib">Очередь пуста</div>'; return; }
  playlistEl.innerHTML = currentQueue.map((ti, qi) => {
    const t = tracks[ti];
    if (!t) return '';
    return `<div class="track-row ${qi === queueIndex ? 'active' : ''}" data-qi="${qi}">
      <span style="width:22px;text-align:center;font-size:13px;color:${qi === queueIndex ? 'var(--accent)' : '#6f6a86'}">${qi === queueIndex && !audio.paused ? '▶' : qi + 1}</span>
      <div class="tr-info">
        <div class="tr-name">${escapeHtml(t.name)}</div>
        <div class="tr-meta">${escapeHtml(t.artist || '')}</div>
      </div>
    </div>`;
  }).join('');
  playlistEl.querySelectorAll('[data-qi]').forEach(el => {
    (el as HTMLElement).onclick = () => { buzz(); loadTrackByQueueIndex(+(el as HTMLElement).dataset.qi!); closeSheet(); };
  });
}

// ===== DAP HARDWARE INTERACTION & SPECTRUM =====
let dapAnimId: number | null = null;
function animateDapSpectrum() {
  if (!dapSpectrumWrap) return;
  const bars = dapSpectrumWrap.querySelectorAll('.dap-bar-fill');

  if (!audio.paused) {
    bars.forEach((bar: any, idx) => {
      const base = 28 + Math.sin(Date.now() / 130 + idx * 0.6) * 28;
      const rand = Math.random() * 42;
      const h = Math.min(98, Math.max(14, base + rand));
      bar.style.height = `${h}%`;
    });

    if (dapAnimId) cancelAnimationFrame(dapAnimId);
    dapAnimId = requestAnimationFrame(animateDapSpectrum);
  } else {
    bars.forEach((bar: any) => { bar.style.height = '14%'; });
    if (dapAnimId) { cancelAnimationFrame(dapAnimId); dapAnimId = null; }
  }
}

const speedRates = [0.75, 1.0, 1.25, 1.5, 2.0];
let currentSpeedIndex = 1;
function cyclePlaybackSpeed() {
  currentSpeedIndex = (currentSpeedIndex + 1) % speedRates.length;
  const rate = speedRates[currentSpeedIndex];
  audio.playbackRate = rate;
  const label = `${rate.toFixed((rate % 1 === 0) ? 0 : 2)}X`.replace('.00', '').replace('.0', '');
  if (dapSpeedText) dapSpeedText.textContent = label;
  if (dapSpeedBadge) dapSpeedBadge.textContent = label;
  showToast(`Скорость воспроизведения: ${label}`, '⚡', 1800);
}

if (dapCloseBtn) dapCloseBtn.onclick = () => { buzz(10); closePlayer(); };
if (dapSkinToggleBtn) {
  dapSkinToggleBtn.onclick = handlePlayerSkinToggle;
}
if (dapPlayBtn) dapPlayBtn.onclick = () => { buzz(12); togglePlay(); };
if (dapPrevBtn) dapPrevBtn.onclick = () => { buzz(10); prevTrack(); };
if (dapNextBtn) dapNextBtn.onclick = () => { buzz(10); nextTrack(); };
if (dapFavBtn) dapFavBtn.onclick = () => { buzz(10); if (tracks[currentIndex]) toggleTrackFavorite(tracks[currentIndex].id); };
if (dapRepeatBtn) dapRepeatBtn.onclick = () => {
  buzz(10);
  repeat = !repeat;
  repeatBtn.classList.toggle('active', repeat);
  dapRepeatBtn.classList.toggle('active', repeat);
  showToast(repeat ? 'Повтор включен' : 'Повтор выключен', SVG_REPEAT, 1500);
};
if (dapShuffleBtn) dapShuffleBtn.onclick = () => {
  buzz(10);
  shuffle = !shuffle;
  shuffleBtn.classList.toggle('active', shuffle);
  dapShuffleBtn.classList.toggle('active', shuffle);
  showToast(shuffle ? 'Случайный порядок включен' : 'Случайный порядок выключен', SVG_SHUFFLE, 1500);
};
if (dapQueueBtn) dapQueueBtn.onclick = () => { buzz(10); openSheet(); };
if (dapFxBtn) dapFxBtn.onclick = () => { buzz(10); openAudioFxSheet(); };

// DAP Seek handled by attachScrubber below

// ===== СОБЫТИЯ АУДИО =====
audio.onplaying = () => { animateDapSpectrum(); };
audio.onseeking = () => { animateDapSpectrum(); };
audio.onseeked = () => { animateDapSpectrum(); };

audio.onplay = () => {
  hasPlaybackStarted = true;
  playIcon.innerHTML = ICON_PAUSE;
  mpPlayIcon.innerHTML = ICON_PAUSE;
  if (dapPlayIcon) dapPlayIcon.innerHTML = ICON_PAUSE;
  playBtn.classList.add('playing');
  if (cassetteWrap) cassetteWrap.classList.add('playing');
  if (vinylWrap) vinylWrap.classList.add('playing');
  mpCover.classList.add('playing');
  document.querySelectorAll('.tr-wave').forEach(w => w.classList.add('playing'));
  updateActiveRow(currentIndex);
  updateFavoriteButtons();
  renderQueue();
  updateMediaSession();
  if ('mediaSession' in navigator) {
    try { navigator.mediaSession.playbackState = 'playing'; } catch (e) {}
  }
  startPulse();
  animateDapSpectrum();
};
audio.onpause = () => {
  playIcon.innerHTML = ICON_PLAY;
  mpPlayIcon.innerHTML = ICON_PLAY;
  if (dapPlayIcon) dapPlayIcon.innerHTML = ICON_PLAY;
  playBtn.classList.remove('playing');
  if (cassetteWrap) cassetteWrap.classList.remove('playing');
  if (vinylWrap) vinylWrap.classList.remove('playing');
  mpCover.classList.remove('playing');
  document.querySelectorAll('.tr-wave').forEach(w => w.classList.remove('playing'));
  updateActiveRow(currentIndex);
  renderQueue();
  if ('mediaSession' in navigator) {
    try { navigator.mediaSession.playbackState = 'paused'; } catch (e) {}
  }
  stopPulse();
  animateDapSpectrum();
};
audio.ontimeupdate = () => {
  if (isScrubbing) return;
  const p = (audio.currentTime / audio.duration) * 100 || 0;
  progress.style.width = p + '%';
  miniProgress.style.width = p + '%';
  currentEl.textContent = fmt(audio.currentTime);

  if (dapCurrentTime) dapCurrentTime.textContent = fmt(audio.currentTime);
  if (dapSeekFill) dapSeekFill.style.width = p + '%';
  if (dapSeekThumb) dapSeekThumb.style.left = p + '%';

  if (!audio.paused && !dapAnimId) {
    animateDapSpectrum();
  }

  if (Math.abs(audio.currentTime - lastPositionUpdate) >= 1) {
    lastPositionUpdate = audio.currentTime;
    updateMediaSessionPosition();
  }
};
audio.onloadedmetadata = () => {
  durationEl.textContent = fmt(audio.duration);
  if (dapDurationTime) dapDurationTime.textContent = fmt(audio.duration);
  if (!audio.paused) animateDapSpectrum();
  updateMediaSessionPosition();
};
audio.onended = () => {
  if (repeat) { audio.currentTime = 0; audio.play(); }
  else nextTrack();
};

// ===== ПЕРЕМОТКА И ПЛАВНЫЙ СКРАББИНГ =====
let isScrubbing = false;
let scrubAudioThrottleTimer: any = null;
let lastAudioSeekTimestamp = 0;

function syncScrubUI(ratio: number) {
  const clamped = Math.max(0, Math.min(1, ratio));
  const pct = clamped * 100;
  progress.style.width = pct + '%';
  miniProgress.style.width = pct + '%';
  if (dapSeekFill) dapSeekFill.style.width = pct + '%';
  if (dapSeekThumb) dapSeekThumb.style.left = pct + '%';

  if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
    const previewTime = clamped * audio.duration;
    currentEl.textContent = fmt(previewTime);
    if (dapCurrentTime) dapCurrentTime.textContent = fmt(previewTime);
  }
}

function applyScrubAudio(ratio: number, force: boolean = false) {
  if (!audio.duration || isNaN(audio.duration) || audio.duration <= 0) return;
  const clamped = Math.max(0, Math.min(1, ratio));
  const targetTime = clamped * audio.duration;

  const now = performance.now();
  if (force || now - lastAudioSeekTimestamp >= 30) {
    lastAudioSeekTimestamp = now;
    if (scrubAudioThrottleTimer) {
      clearTimeout(scrubAudioThrottleTimer);
      scrubAudioThrottleTimer = null;
    }
    try {
      audio.currentTime = targetTime;
    } catch (e) {}
    if (!audio.paused) animateDapSpectrum();
  } else if (!scrubAudioThrottleTimer) {
    scrubAudioThrottleTimer = setTimeout(() => {
      scrubAudioThrottleTimer = null;
      lastAudioSeekTimestamp = performance.now();
      try {
        audio.currentTime = targetTime;
      } catch (e) {}
      if (!audio.paused) animateDapSpectrum();
    }, 30);
  }
}

function attachScrubber(wrapEl: HTMLElement | null) {
  if (!wrapEl) return;

  const getRatio = (clientX: number): number => {
    const rect = wrapEl.getBoundingClientRect();
    if (rect.width <= 0) return 0;
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
  };

  let activePointerId: number | null = null;
  let isDraggingThis = false;

  const startScrub = (clientX: number, pointerId?: number) => {
    if (!audio.duration || isNaN(audio.duration) || audio.duration <= 0) return;
    isScrubbing = true;
    isDraggingThis = true;
    wrapEl.classList.add('is-dragging');
    if (pointerId !== undefined) {
      activePointerId = pointerId;
      try {
        wrapEl.setPointerCapture(pointerId);
      } catch (e) {}
    }
    buzz(8);
    const r = getRatio(clientX);
    syncScrubUI(r);
    applyScrubAudio(r, true);
  };

  const moveScrub = (clientX: number) => {
    if (!isScrubbing || !isDraggingThis) return;
    const r = getRatio(clientX);
    syncScrubUI(r);
    applyScrubAudio(r, false);
  };

  const endScrub = (clientX: number, pointerId?: number) => {
    if (!isDraggingThis) return;
    isDraggingThis = false;
    wrapEl.classList.remove('is-dragging');
    if (pointerId !== undefined && activePointerId === pointerId) {
      try {
        wrapEl.releasePointerCapture(pointerId);
      } catch (e) {}
      activePointerId = null;
    }
    if (scrubAudioThrottleTimer) {
      clearTimeout(scrubAudioThrottleTimer);
      scrubAudioThrottleTimer = null;
    }
    const r = getRatio(clientX);
    syncScrubUI(r);
    applyScrubAudio(r, true);
    updateMediaSessionPosition();
    isScrubbing = false;
  };

  // Pointer Events (Unified Pointer for modern desktop & mobile)
  wrapEl.addEventListener('pointerdown', (e: PointerEvent) => {
    if (e.button !== undefined && e.button !== 0) return;
    startScrub(e.clientX, e.pointerId);
    e.preventDefault();
  });

  wrapEl.addEventListener('pointermove', (e: PointerEvent) => {
    if (activePointerId !== null && e.pointerId === activePointerId) {
      moveScrub(e.clientX);
      e.preventDefault();
    }
  });

  wrapEl.addEventListener('pointerup', (e: PointerEvent) => {
    if (activePointerId !== null && e.pointerId === activePointerId) {
      endScrub(e.clientX, e.pointerId);
      e.preventDefault();
    }
  });

  wrapEl.addEventListener('pointercancel', (e: PointerEvent) => {
    if (activePointerId !== null && e.pointerId === activePointerId) {
      wrapEl.classList.remove('is-dragging');
      try {
        wrapEl.releasePointerCapture(e.pointerId);
      } catch (err) {}
      activePointerId = null;
      isDraggingThis = false;
      isScrubbing = false;
    }
  });

  // Fallback touch listeners for mobile WebView
  let touchActive = false;
  wrapEl.addEventListener('touchstart', (e: TouchEvent) => {
    if (activePointerId !== null) return;
    touchActive = true;
    const touch = e.touches[0];
    if (touch) startScrub(touch.clientX);
    if (e.cancelable) e.preventDefault();
  }, { passive: false });

  window.addEventListener('touchmove', (e: TouchEvent) => {
    if (!touchActive) return;
    const touch = e.touches[0];
    if (touch) moveScrub(touch.clientX);
    if (e.cancelable) e.preventDefault();
  }, { passive: false });

  const handleTouchEnd = (e: TouchEvent) => {
    if (!touchActive) return;
    touchActive = false;
    const touch = e.changedTouches[0];
    if (touch) endScrub(touch.clientX);
    else {
      wrapEl.classList.remove('is-dragging');
      isDraggingThis = false;
      isScrubbing = false;
    }
  };
  window.addEventListener('touchend', handleTouchEnd);
  window.addEventListener('touchcancel', () => {
    if (touchActive) {
      touchActive = false;
      wrapEl.classList.remove('is-dragging');
      isDraggingThis = false;
      isScrubbing = false;
    }
  });

  // Also support simple click jumps if pointer events are somehow intercepted
  wrapEl.addEventListener('click', (e: MouseEvent) => {
    if (!audio.duration || isNaN(audio.duration) || isDraggingThis) return;
    const r = getRatio(e.clientX);
    syncScrubUI(r);
    applyScrubAudio(r, true);
    updateMediaSessionPosition();
  });
}

// Initializing scrubbers for both players
attachScrubber(progressWrap);
attachScrubber(dapSeekWrap);

// ===== ГРОМКОСТЬ =====
volumeSlider.addEventListener('input', (e: any) => {
  if (!gainNode) initAudio();
  const v = parseFloat(e.target.value);
  if (gainNode) gainNode.gain.value = v;
});

// ===== КЛАВИАТУРА =====
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if ((e.target as HTMLElement).tagName === 'INPUT') return;
  if (e.code === 'Space') { e.preventDefault(); togglePlay(); }
  if (e.code === 'ArrowRight') nextTrack();
  if (e.code === 'ArrowLeft') prevTrack();
});

// ===== MEDIA SESSION (ANDROID LOCKSCREEN & NOTIFICATIONS) =====
let defaultArtworkDataUrl: string = '';
function getDefaultArtwork(): string {
  if (defaultArtworkDataUrl) return defaultArtworkDataUrl;
  try {
    const c = document.createElement('canvas');
    c.width = 512;
    c.height = 512;
    const ctx = c.getContext('2d');
    if (ctx) {
      const g = ctx.createLinearGradient(0, 0, 512, 512);
      g.addColorStop(0, '#161426');
      g.addColorStop(1, '#09080e');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 512, 512);

      ctx.beginPath();
      ctx.arc(256, 256, 210, 0, Math.PI * 2);
      ctx.fillStyle = '#1c1a2e';
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#2d284a';
      ctx.stroke();

      for (let r = 186; r >= 96; r -= 18) {
        ctx.beginPath();
        ctx.arc(256, 256, r, 0, Math.PI * 2);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = 'rgba(255,255,255,0.06)';
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(256, 256, 75, 0, Math.PI * 2);
      ctx.fillStyle = '#7c3aed';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(256, 256, 18, 0, Math.PI * 2);
      ctx.fillStyle = '#09080e';
      ctx.fill();

      defaultArtworkDataUrl = c.toDataURL('image/png');
    }
  } catch (e) {}
  return defaultArtworkDataUrl;
}

let lastPositionUpdate = 0;
function updateMediaSession() {
  if (!('mediaSession' in navigator) || !tracks[currentIndex]) return;
  try {
    const t = tracks[currentIndex];
    const artSrc = t.picURL || getDefaultArtwork();
    const artwork: MediaImage[] = artSrc ? [
      { src: artSrc, sizes: '96x96' },
      { src: artSrc, sizes: '128x128' },
      { src: artSrc, sizes: '192x192' },
      { src: artSrc, sizes: '256x256' },
      { src: artSrc, sizes: '384x384' },
      { src: artSrc, sizes: '512x512' }
    ] : [];

    navigator.mediaSession.metadata = new MediaMetadata({
      title: t.name || 'Remix Player',
      artist: t.artist || 'Неизвестный исполнитель',
      album: t.album || 'Моя музыка',
      artwork
    });

    navigator.mediaSession.playbackState = audio.paused ? 'paused' : 'playing';
    updateMediaSessionPosition();
  } catch (e) {}
}

function updateMediaSessionPosition() {
  if (!('mediaSession' in navigator) || !('setPositionState' in navigator.mediaSession)) return;
  try {
    if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0) {
      navigator.mediaSession.setPositionState({
        duration: audio.duration,
        playbackRate: audio.playbackRate || 1,
        position: Math.max(0, Math.min(audio.currentTime, audio.duration))
      });
    }
  } catch (e) {}
}

function setupMediaSessionHandlers() {
  if (!('mediaSession' in navigator)) return;

  const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
    ['play', () => {
      buzz(10);
      if (audio.paused) {
        if (!audio.src && tracks[currentIndex]) {
          loadTrack(currentIndex);
        } else {
          audio.play().catch(() => {});
        }
      }
    }],
    ['pause', () => {
      buzz(10);
      if (!audio.paused) {
        audio.pause();
      }
    }],
    ['previoustrack', () => {
      buzz(12);
      prevTrack();
    }],
    ['nexttrack', () => {
      buzz(12);
      nextTrack();
    }],
    ['seekto', (details) => {
      if (details.seekTime !== undefined && audio.duration && !isNaN(audio.duration)) {
        audio.currentTime = Math.max(0, Math.min(details.seekTime, audio.duration));
        updateMediaSessionPosition();
      }
    }],
    ['seekbackward', (details) => {
      const skip = details.seekOffset || 10;
      audio.currentTime = Math.max(0, audio.currentTime - skip);
      updateMediaSessionPosition();
    }],
    ['seekforward', (details) => {
      const skip = details.seekOffset || 10;
      if (audio.duration) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + skip);
      } else {
        audio.currentTime += skip;
      }
      updateMediaSessionPosition();
    }],
    ['stop', () => {
      audio.pause();
      audio.currentTime = 0;
      try { navigator.mediaSession.playbackState = 'none'; } catch (e) {}
    }]
  ];

  for (const [action, handler] of handlers) {
    try {
      navigator.mediaSession.setActionHandler(action, handler);
    } catch (e) {}
  }
}
setupMediaSessionHandlers();

// ===== INIT =====
async function init() {
  const first = document.createElement('div');
  first.className = 'bg-layer active';
  first.style.background = defaultBgGradient();
  bgLayers.appendChild(first);
  currentBgLayer = first;

  const [initR, initG, initB] = hexToRgb(appSettings.accentTheme);
  cassetteWrap.style.setProperty('--glow-color', `${initR},${initG},${initB}`);
  cassetteWrap.style.setProperty('--glow-alpha', '0.15');
  cassetteWrap.style.setProperty('--glow-size', '20px');

  await openDB();
  const [savedTracks, savedAlbums, savedPlaylists] = await Promise.all([
    dbGetAll('tracks'),
    dbGetAll('albums'),
    dbGetAll('playlists')
  ]);

  tracks = savedTracks.map(item => {
    let blob = getValidBlob(item.blob, 'audio/mpeg');
    let picBlob = getValidBlob(item.picBlob, 'image/jpeg');

    let url: string | null = null;
    if (blob) {
      try { url = URL.createObjectURL(blob); } catch (e) { url = null; }
    }
    if (!url && item.deviceUri && typeof Capacitor !== 'undefined' && Capacitor.convertFileSrc) {
      try { url = Capacitor.convertFileSrc(item.deviceUri); } catch (e) {}
    }

    let picURL: string | null = null;
    if (picBlob) {
      try { picURL = URL.createObjectURL(picBlob); } catch (e) {}
    }

    return {
      id: item.id,
      name: item.name || 'Без названия',
      artist: item.artist || 'Неизвестный',
      album: item.album || '',
      blob,
      picBlob,
      deviceUri: item.deviceUri || null,
      isDevice: !!item.isDevice,
      url,
      picURL,
      fileKey: item.fileKey || null,
      fileSize: item.fileSize || (blob ? blob.size : 0),
      date: item.date || Date.now()
    };
  }).filter(t => t.url || t.blob || t.deviceUri);

  for (const t of tracks) {
    if (!t.picURL && t.blob && !t.isDevice) {
      const tags = await readTags(t.blob);
      if (tags) {
        if (tags.title && !t.name) t.name = tags.title;
        if (tags.artist && (!t.artist || t.artist === 'Неизвестный')) t.artist = tags.artist;
        if (tags.album && !t.album) t.album = tags.album;
        if (tags.picture) {
          const picBlob = pictureToBlob(tags.picture);
          if (picBlob) {
            t.picBlob = picBlob;
            t.picURL = URL.createObjectURL(picBlob);
            await dbPut('tracks', { ...t, blob: t.blob, picBlob: t.picBlob });
          }
        }
      }
    }
  }

  playlists = (savedPlaylists || []).map(p => {
    let coverURL: string | null = null;
    if (p.coverBlob instanceof Blob) { try { coverURL = URL.createObjectURL(p.coverBlob); } catch (e) { coverURL = null; } }
    else if (p.coverURL) coverURL = p.coverURL;
    return { ...p, coverURL };
  });

  await ensureFavoritesPlaylist();

  renderAllLayers();
  applySettings();

  // Восстановление сохранённой папки музыки и фоновый автопоиск
  try {
    savedDirectoryName = (await dbGetMeta('saved_directory_name')) || '';
    savedDirectoryHandle = await dbGetMeta('saved_directory_handle');
    if (savedDirectoryHandle && appSettings.autoScanOnStart) {
      // Запуск фоновой тихой проверки
      try {
        const perm = await savedDirectoryHandle.queryPermission({ mode: 'read' });
        if (perm === 'granted') {
          scanDirectoryInBackground(savedDirectoryHandle);
        }
      } catch (e) {}
    }
  } catch (e) {
    console.warn('Could not restore directory metadata:', e);
  }

  // Блокировка ориентации на мобильных устройствах (только портретный/вертикальный режим)
  lockPortraitOrientation();
  window.addEventListener('orientationchange', () => {
    lockPortraitOrientation();
  });

  // На Android/Capacitor производим автоматический фоновый сканирование памяти устройства при запуске
  if (typeof Capacitor !== 'undefined' && Capacitor.isNativePlatform && Capacitor.isNativePlatform()) {
    setTimeout(() => {
      autoScanAndroidMusic(true);
    }, 1200);
  }

  // Подсказка для мобильных пользователей при пустой библиотеке
  if (isMobileDevice() && tracks.length === 0) {
    setTimeout(() => {
      showToast('📱 Нажмите «➕» вверху, чтобы добавить музыку или включить автопоиск', '➕', 4500);
    }, 800);
  }

  hasPlaybackStarted = false;
  if (miniPlayer) miniPlayer.classList.add('hidden');
  if (library) library.classList.remove('with-mini');
  if (audio) audio.src = '';
  if (mpName) mpName.textContent = '—';
  if (mpArtist) mpArtist.textContent = '—';
  if (titleEl) titleEl.textContent = '—';
  if (artistEl) artistEl.textContent = '—';
  if (labelTitle) labelTitle.textContent = '—';
  if (labelArtist) labelArtist.textContent = '—';

  if (tracks.length) {
    currentQueue = tracks.map((_, i) => i);
  }

  // Базовая запись в истории для перехвата кнопки Назад
  pushHistoryState({ page: 'main' });
  initBatteryMonitor();

  const resume = () => {
    lockPortraitOrientation();
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  };
  document.addEventListener('touchstart', resume, { once: true });
  document.addEventListener('click', resume, { once: true });
}

init();
