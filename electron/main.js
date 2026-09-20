import { app, BrowserWindow, shell } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Пропорция смартфона / Hi-Fi плеера (ширина / высота ~ 0.4886)
const ASPECT_RATIO = 430 / 880;

function createWindow() {
  const initialHeight = 880;
  const initialWidth = Math.round(initialHeight * ASPECT_RATIO);

  const mainWindow = new BrowserWindow({
    width: initialWidth,
    height: initialHeight,
    minWidth: 320,
    minHeight: Math.round(320 / ASPECT_RATIO), // ~655px
    icon: path.join(__dirname, 'icon.png'),
    title: 'My Player',
    autoHideMenuBar: true,
    backgroundColor: '#050507',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  // Фиксация пропорций при растягивании окна (macOS / Windows / Linux)
  try {
    mainWindow.setAspectRatio(ASPECT_RATIO);
  } catch (e) {}

  // Гарантированное пропорциональное изменение размера в обе стороны на Windows
  mainWindow.on('will-resize', (event, newBounds) => {
    const targetWidth = Math.round(newBounds.height * ASPECT_RATIO);
    if (Math.abs(newBounds.width - targetWidth) > 3) {
      event.preventDefault();
      mainWindow.setBounds({
        x: newBounds.x,
        y: newBounds.y,
        width: targetWidth,
        height: newBounds.height,
      });
    }
  });

  // Открытие внешних ссылок (например, GitHub) в системном браузере по умолчанию
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  const distIndexPath = path.join(__dirname, '../dist/index.html');
  mainWindow.loadFile(distIndexPath);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

