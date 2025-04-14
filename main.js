import { app, BrowserWindow } from 'electron';
import { format } from "url";
import { join } from "path";

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL(
    format({
      pathname: join(__dirname, `/dist/cash-register-angular-app/browser/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
