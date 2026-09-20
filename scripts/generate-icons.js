import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Дизайн иконки: стильный Hi-Fi плеер с неоновым свечением, кассетой / звуковой волной и эквалайзером
const masterSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Градиент фона (глубокий обсидиан с фиолетово-синим свечением) -->
    <radialGradient id="bgGrad" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#1e1832" />
      <stop offset="50%" stop-color="#100d1c" />
      <stop offset="100%" stop-color="#070709" />
    </radialGradient>

    <!-- Неоновые градиенты плеера -->
    <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00ffff" />
      <stop offset="60%" stop-color="#00e5ff" />
      <stop offset="100%" stop-color="#0091ea" />
    </linearGradient>

    <linearGradient id="neonPurple" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b388ff" />
      <stop offset="50%" stop-color="#7c4dff" />
      <stop offset="100%" stop-color="#00e5ff" />
    </linearGradient>

    <linearGradient id="metallicRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(255,255,255,0.4)" />
      <stop offset="25%" stop-color="rgba(0,229,255,0.6)" />
      <stop offset="50%" stop-color="rgba(255,255,255,0.1)" />
      <stop offset="85%" stop-color="rgba(124,77,255,0.5)" />
      <stop offset="100%" stop-color="rgba(255,255,255,0.3)" />
    </linearGradient>

    <!-- Свечение неона -->
    <filter id="neonGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>

    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.8" />
    </filter>
  </defs>

  <!-- Скругленный внешний корпус иконки (Squircle) -->
  <rect x="16" y="16" width="480" height="480" rx="108" fill="url(#bgGrad)" />
  <rect x="16" y="16" width="480" height="480" rx="108" fill="none" stroke="url(#metallicRim)" stroke-width="4" opacity="0.9" />

  <!-- Декоративные диагональные полосы корпуса аудиофильского DAP -->
  <path d="M60 40 L452 40" stroke="rgba(255,255,255,0.06)" stroke-width="2" />
  <path d="M60 472 L452 472" stroke="rgba(255,255,255,0.04)" stroke-width="2" />

  <!-- Золотистый/бирюзовый виниловый диск / катушка плеера на фоне -->
  <g filter="url(#softShadow)" transform="translate(256, 256)">
    <!-- Внешнее кольцо винила / катушки -->
    <circle cx="0" cy="0" r="176" fill="#0d0b14" stroke="rgba(255,255,255,0.08)" stroke-width="3" />
    <circle cx="0" cy="0" r="162" fill="none" stroke="rgba(0,229,255,0.25)" stroke-width="2" stroke-dasharray="8 6" />
    <circle cx="0" cy="0" r="142" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" />
    <circle cx="0" cy="0" r="120" fill="none" stroke="rgba(0,229,255,0.18)" stroke-width="1.5" stroke-dasharray="5 5" />
    <circle cx="0" cy="0" r="98" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1.5" />

    <!-- Центральный хаб / колесо Hi-Fi плеера -->
    <circle cx="0" cy="0" r="82" fill="url(#bgGrad)" stroke="url(#neonCyan)" stroke-width="3.5" filter="url(#neonGlow)" />

    <!-- Эквалайзерные лучи / звуковые волны вокруг центра -->
    <!-- Левый блок эквалайзера -->
    <rect x="-144" y="-8" width="6" height="16" rx="3" fill="url(#neonCyan)" opacity="0.7" />
    <rect x="-132" y="-18" width="6" height="36" rx="3" fill="url(#neonCyan)" opacity="0.85" />
    <rect x="-120" y="-32" width="6" height="64" rx="3" fill="url(#neonCyan)" filter="url(#neonGlow)" />
    <rect x="-108" y="-22" width="6" height="44" rx="3" fill="url(#neonPurple)" opacity="0.9" />

    <!-- Правый блок эквалайзера -->
    <rect x="102" y="-22" width="6" height="44" rx="3" fill="url(#neonPurple)" opacity="0.9" />
    <rect x="114" y="-32" width="6" height="64" rx="3" fill="url(#neonCyan)" filter="url(#neonGlow)" />
    <rect x="126" y="-18" width="6" height="36" rx="3" fill="url(#neonCyan)" opacity="0.85" />
    <rect x="138" y="-8" width="6" height="16" rx="3" fill="url(#neonCyan)" opacity="0.7" />

    <!-- Верхние и нижние спектральные точки -->
    <circle cx="0" cy="-140" r="4" fill="#00e5ff" opacity="0.8" />
    <circle cx="-30" cy="-136" r="3.5" fill="#7c4dff" opacity="0.7" />
    <circle cx="30" cy="-136" r="3.5" fill="#7c4dff" opacity="0.7" />
    <circle cx="0" cy="140" r="4" fill="#00e5ff" opacity="0.8" />

    <!-- Символ Play в центре хаба плеера -->
    <path d="M-14 -32 L36 0 L-14 32 Z" fill="url(#neonCyan)" filter="url(#neonGlow)" />
    <path d="M-10 -22 L24 0 L-10 22 Z" fill="#ffffff" opacity="0.9" />

    <!-- Кассета / Hi-Fi бейдж сверху -->
    <text x="0" y="-204" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="21" font-weight="900" letter-spacing="6" fill="#00e5ff" text-anchor="middle" opacity="0.95">REMIX</text>
    <text x="0" y="222" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" letter-spacing="4" fill="rgba(255,255,255,0.6)" text-anchor="middle">HI-FI AUDIO</text>
  </g>
</svg>
`;

// Foreground для адаптивной иконки Android (без жесткого внешнего прямоугольника)
const foregroundSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fgHubGrad" cx="50%" cy="35%" r="70%">
      <stop offset="0%" stop-color="#1e1832" />
      <stop offset="60%" stop-color="#100d1c" />
      <stop offset="100%" stop-color="#070709" />
    </radialGradient>
    <linearGradient id="fgNeonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00ffff" />
      <stop offset="60%" stop-color="#00e5ff" />
      <stop offset="100%" stop-color="#0091ea" />
    </linearGradient>
    <linearGradient id="fgNeonPurple" x1="0%" y1="100%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#b388ff" />
      <stop offset="50%" stop-color="#7c4dff" />
      <stop offset="100%" stop-color="#00e5ff" />
    </linearGradient>
    <filter id="fgGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <g transform="translate(256, 256) scale(0.92)">
    <circle cx="0" cy="0" r="160" fill="#0d0b14" stroke="rgba(255,255,255,0.1)" stroke-width="3" />
    <circle cx="0" cy="0" r="146" fill="none" stroke="rgba(0,229,255,0.25)" stroke-width="2" stroke-dasharray="8 6" />
    <circle cx="0" cy="0" r="110" fill="none" stroke="rgba(0,229,255,0.2)" stroke-width="1.5" stroke-dasharray="5 5" />

    <circle cx="0" cy="0" r="82" fill="url(#fgHubGrad)" stroke="url(#fgNeonCyan)" stroke-width="3.5" filter="url(#fgGlow)" />

    <!-- Эквалайзер -->
    <rect x="-144" y="-8" width="6" height="16" rx="3" fill="url(#fgNeonCyan)" opacity="0.7" />
    <rect x="-132" y="-18" width="6" height="36" rx="3" fill="url(#fgNeonCyan)" opacity="0.85" />
    <rect x="-120" y="-32" width="6" height="64" rx="3" fill="url(#fgNeonCyan)" filter="url(#fgGlow)" />
    <rect x="-108" y="-22" width="6" height="44" rx="3" fill="url(#fgNeonPurple)" opacity="0.9" />

    <rect x="102" y="-22" width="6" height="44" rx="3" fill="url(#fgNeonPurple)" opacity="0.9" />
    <rect x="114" y="-32" width="6" height="64" rx="3" fill="url(#fgNeonCyan)" filter="url(#fgGlow)" />
    <rect x="126" y="-18" width="6" height="36" rx="3" fill="url(#fgNeonCyan)" opacity="0.85" />
    <rect x="138" y="-8" width="6" height="16" rx="3" fill="url(#fgNeonCyan)" opacity="0.7" />

    <!-- Play -->
    <path d="M-14 -32 L36 0 L-14 32 Z" fill="url(#fgNeonCyan)" filter="url(#fgGlow)" />
    <path d="M-10 -22 L24 0 L-10 22 Z" fill="#ffffff" opacity="0.9" />

    <text x="0" y="-188" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" letter-spacing="6" fill="#00e5ff" text-anchor="middle">REMIX</text>
    <text x="0" y="206" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" letter-spacing="4" fill="rgba(255,255,255,0.65)" text-anchor="middle">HI-FI AUDIO</text>
  </g>
</svg>
`;

async function run() {
  console.log('Генерация иконок для Windows и Android...');
  const svgBuffer = Buffer.from(masterSvg);
  const fgBuffer = Buffer.from(foregroundSvg);

  // 1. Создание папок
  const dirs = [
    'public',
    'electron',
    'build',
    'android/app/src/main/res/mipmap-mdpi',
    'android/app/src/main/res/mipmap-hdpi',
    'android/app/src/main/res/mipmap-xhdpi',
    'android/app/src/main/res/mipmap-xxhdpi',
    'android/app/src/main/res/mipmap-xxxhdpi',
  ];

  for (const d of dirs) {
    if (!fs.existsSync(d)) {
      fs.mkdirSync(d, { recursive: true });
    }
  }

  // 2. Web & Electron иконки
  await sharp(svgBuffer).resize(512, 512).png().toFile('public/icon.png');
  await sharp(svgBuffer).resize(192, 192).png().toFile('public/icon-192.png');
  await sharp(svgBuffer).resize(64, 64).png().toFile('public/favicon.png');

  // Electron & Windows build
  await sharp(svgBuffer).resize(512, 512).png().toFile('electron/icon.png');
  await sharp(svgBuffer).resize(512, 512).png().toFile('build/icon.png');
  await sharp(svgBuffer).resize(256, 256).png().toFile('build/icon.ico'); // electron-builder can use 256x256 png or ico

  // 3. Android Mipmap densities
  const androidSizes = [
    { dir: 'mipmap-mdpi', size: 48, fgSize: 108 },
    { dir: 'mipmap-hdpi', size: 72, fgSize: 162 },
    { dir: 'mipmap-xhdpi', size: 96, fgSize: 216 },
    { dir: 'mipmap-xxhdpi', size: 144, fgSize: 324 },
    { dir: 'mipmap-xxxhdpi', size: 192, fgSize: 432 },
  ];

  for (const { dir, size, fgSize } of androidSizes) {
    const basePath = `android/app/src/main/res/${dir}`;
    // Обычная иконка
    await sharp(svgBuffer).resize(size, size).png().toFile(`${basePath}/ic_launcher.png`);
    // Круглая иконка
    const circleMask = Buffer.from(
      `<svg width="${size}" height="${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#fff"/></svg>`
    );
    await sharp(svgBuffer)
      .resize(size, size)
      .composite([{ input: circleMask, blend: 'dest-in' }])
      .png()
      .toFile(`${basePath}/ic_launcher_round.png`);
    // Foreground адаптивной иконки
    await sharp(fgBuffer).resize(fgSize, fgSize).png().toFile(`${basePath}/ic_launcher_foreground.png`);
  }

  // 4. Обновление цвета фона адаптивной иконки Android на #070709
  const bgXmlPath = 'android/app/src/main/res/values/ic_launcher_background.xml';
  const bgXmlContent = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#070709</color>
</resources>
`;
  fs.writeFileSync(bgXmlPath, bgXmlContent, 'utf8');

  console.log('Все иконки успешно созданы!');
}

run().catch(console.error);
