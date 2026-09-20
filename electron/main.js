import { app, BrowserWindow, shell } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';

const store = new Store();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const defaultBounds = { width: 800, height: 600 };
  const bounds = store.get('window-bounds', defaultBounds);

  const mainWindow = new BrowserWindow({
    ...bounds,
    minWidth: 400,
    minHeight: 300,
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

  // Save bounds on resize/move
  const saveBounds = () => {
    store.set('window-bounds', mainWindow.getBounds());
  };
  mainWindow.on('resize', saveBounds);
  mainWindow.on('moved', saveBounds);

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

