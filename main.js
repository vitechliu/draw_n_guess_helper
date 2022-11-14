const { app, BrowserWindow } = require('electron')
const mainRemote = require("@electron/remote/main")
mainRemote.initialize()
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    transparent: true,
    frame: false,
    // alwaysOnTop: true,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
    },
    
  })

  win.loadFile('index.html')
  mainRemote.enable(win.webContents)
}

app.whenReady().then(() => {
  createWindow()
})