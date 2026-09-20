import fs from 'fs';
import sharp from 'sharp';

const liaSvg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Фоновый градиент (глубокий кибер-фиолетовый) -->
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="75%">
      <stop offset="0%" stop-color="#1c1630" />
      <stop offset="60%" stop-color="#120e20" />
      <stop offset="100%" stop-color="#0a0813" />
    </radialGradient>

    <!-- Свечения для неона -->
    <filter id="cyanGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" result="blur1" />
      <feGaussianBlur stdDeviation="5" result="blur2" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="blur2" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" result="blur1" />
      <feGaussianBlur stdDeviation="5" result="blur2" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="blur2" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <filter id="orangeGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="12" result="blur1" />
      <feGaussianBlur stdDeviation="5" result="blur2" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="blur2" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Тень от трубок на сетку фона -->
    <filter id="tubeShadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.85" />
    </filter>
  </defs>

  <!-- Темный фон с легким радиальным освещением -->
  <rect width="512" height="512" rx="32" fill="url(#bgGlow)" />

  <!-- Фиолетовая сетка (Synthwave Grid) -->
  <g stroke="#2d1f4e" stroke-width="1.8" opacity="0.95">
    <!-- Вертикальные линии -->
    <line x1="32" y1="0" x2="32" y2="512" />
    <line x1="64" y1="0" x2="64" y2="512" />
    <line x1="96" y1="0" x2="96" y2="512" />
    <line x1="128" y1="0" x2="128" y2="512" />
    <line x1="160" y1="0" x2="160" y2="512" />
    <line x1="192" y1="0" x2="192" y2="512" />
    <line x1="224" y1="0" x2="224" y2="512" />
    <line x1="256" y1="0" x2="256" y2="512" />
    <line x1="288" y1="0" x2="288" y2="512" />
    <line x1="320" y1="0" x2="320" y2="512" />
    <line x1="352" y1="0" x2="352" y2="512" />
    <line x1="384" y1="0" x2="384" y2="512" />
    <line x1="416" y1="0" x2="416" y2="512" />
    <line x1="448" y1="0" x2="448" y2="512" />
    <line x1="480" y1="0" x2="480" y2="512" />

    <!-- Горизонтальные линии -->
    <line x1="0" y1="32" x2="512" y2="32" />
    <line x1="0" y1="64" x2="512" y2="64" />
    <line x1="0" y1="96" x2="512" y2="96" />
    <line x1="0" y1="128" x2="512" y2="128" />
    <line x1="0" y1="160" x2="512" y2="160" />
    <line x1="0" y1="192" x2="512" y2="192" />
    <line x1="0" y1="224" x2="512" y2="224" />
    <line x1="0" y1="256" x2="512" y2="256" />
    <line x1="0" y1="288" x2="512" y2="288" />
    <line x1="0" y1="320" x2="512" y2="320" />
    <line x1="0" y1="352" x2="512" y2="352" />
    <line x1="0" y1="384" x2="512" y2="384" />
    <line x1="0" y1="416" x2="512" y2="416" />
    <line x1="0" y1="448" x2="512" y2="448" />
    <line x1="0" y1="480" x2="512" y2="480" />
  </g>

  <!-- ТЕНИ НЕОНОВЫХ ТРУБОК -->
  <g filter="url(#tubeShadow)" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- Тень L -->
    <path d="M 68 64 L 132 64 L 132 380 L 328 380 L 328 448 L 68 448 Z" stroke="#000" stroke-width="15" />
    <!-- Тень i -->
    <rect x="180" y="64" width="68" height="64" rx="8" stroke="#000" stroke-width="14" />
    <rect x="180" y="152" width="68" height="212" rx="8" stroke="#000" stroke-width="14" />
    <!-- Тень A -->
    <path d="M 276 448 L 276 256 L 324 256 L 324 448 M 276 352 L 444 352 M 444 448 L 444 256 M 276 256 C 276 130, 444 130, 444 256" stroke="#000" stroke-width="14" />
  </g>

  <!-- ==================== БУКВА L (Неоновый циан) ==================== -->
  <g filter="url(#cyanGlow)" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <!-- Внешнее диффузное свечение -->
    <path d="M 72 64 L 130 64 L 130 384 L 328 384 L 328 444 L 72 444 Z"
          stroke="#00e5ff" stroke-width="18" opacity="0.4" />
    <!-- Основная трубка неона -->
    <path d="M 72 64 L 130 64 L 130 384 L 328 384 L 328 444 L 72 444 Z"
          stroke="#00e5ff" stroke-width="11" />
    <!-- Яркая сердцевина (бело-голубая) -->
    <path d="M 72 64 L 130 64 L 130 384 L 328 384 L 328 444 L 72 444 Z"
          stroke="#d8faff" stroke-width="3.5" />
  </g>

  <!-- ==================== БУКВА i (Неоновый лайм) ==================== -->
  <g filter="url(#greenGlow)" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <!-- Точка над i (диффузное свечение, трубка, сердцевина) -->
    <rect x="180" y="64" width="68" height="64" rx="10" stroke="#76ff03" stroke-width="18" opacity="0.4" />
    <rect x="180" y="64" width="68" height="64" rx="10" stroke="#76ff03" stroke-width="11" />
    <rect x="180" y="64" width="68" height="64" rx="10" stroke="#f1ffd9" stroke-width="3.5" />

    <!-- Тело буквы i -->
    <rect x="180" y="152" width="68" height="208" rx="10" stroke="#76ff03" stroke-width="18" opacity="0.4" />
    <rect x="180" y="152" width="68" height="208" rx="10" stroke="#76ff03" stroke-width="11" />
    <rect x="180" y="152" width="68" height="208" rx="10" stroke="#f1ffd9" stroke-width="3.5" />
  </g>

  <!-- ==================== БУКВА A (Неоновый оранж / янтарь) ==================== -->
  <!-- Контур буквы А: внешний арочный контур и внутреннее отверстие арки -->
  <g filter="url(#orangeGlow)" fill="none" stroke-linejoin="round" stroke-linecap="round">
    <!-- Внешний силуэт A с перемычкой и ногами -->
    <path d="M 276 348 L 276 210 C 276 96, 444 96, 444 210 L 444 444 L 378 444 L 378 266 L 324 266 L 324 348 Z"
          stroke="#ff9100" stroke-width="18" opacity="0.4" />
    <path d="M 276 348 L 276 210 C 276 96, 444 96, 444 210 L 444 444 L 378 444 L 378 266 L 324 266 L 324 348 Z"
          stroke="#ff9100" stroke-width="11" />
    <path d="M 276 348 L 276 210 C 276 96, 444 96, 444 210 L 444 444 L 378 444 L 378 266 L 324 266 L 324 348 Z"
          stroke="#fff4df" stroke-width="3.5" />

    <!-- Окно внутри верхней арки буквы A -->
    <path d="M 324 214 C 324 150, 396 150, 396 214 Z"
          stroke="#ff9100" stroke-width="18" opacity="0.4" />
    <path d="M 324 214 C 324 150, 396 150, 396 214 Z"
          stroke="#ff9100" stroke-width="11" />
    <path d="M 324 214 C 324 150, 396 150, 396 214 Z"
          stroke="#fff4df" stroke-width="3.5" />
  </g>
</svg>
`;

async function main() {
  const svgBuf = Buffer.from(liaSvg);
  fs.writeFileSync('public/lia.svg', liaSvg, 'utf8');

  // Генерируем высококачественные PNG
  await sharp(svgBuf).resize(512, 512).png().toFile('public/lia.png');
  await sharp(svgBuf).resize(128, 128).png().toFile('public/lia-small.png');
  console.log('Изображение LIA успешно сгенерировано в public/lia.svg и public/lia.png');
}

main().catch(console.error);
