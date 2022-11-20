const { app, Menu, BrowserWindow, globalShortcut } = require('electron')

var opacity = 0.5;
const template = [
    // { role: 'appMenu' }
    {
        label: '文件',
        submenu: [
            {
                label: '关闭',
                role: 'close'
            }
        ]
    },
    {
        label: '窗口',
        submenu: [
            {
                label: '开发者模式',
                role: 'toggledevtools'
            },
        ]
    },
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

const mainRemote = require("@electron/remote/main")
const { setupTitlebar, attachTitlebarToWindow } = require("custom-electron-titlebar/main");
mainRemote.initialize()
const path = require('path')
setupTitlebar();

var mainWin = null
var status = 0; // 0 可配置 1 锁定
const createWindow = () => {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    transparent: true,
    titleBarStyle: 'hidden',
    // alwaysOnTop: true,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true,
        sandbox: false,
        preload: path.join(__dirname, 'assets', 'preload.js')
    },
    
  })

  win.loadFile('index.html')
  mainRemote.enable(win.webContents)
  mainWin = win
  // attach fullscreen(f11 and not 'maximized') && focus listeners
  attachTitlebarToWindow(win);
}

const sendMsg = (type, data) => {
  mainWin.webContents.send('asynchronous-reply', JSON.stringify({
    type: type, 
    data: data
  }))
}
app.whenReady().then(() => {
  createWindow()
  mainWin.webContents.devTools = true
  globalShortcut.register('Ctrl+F1', function () {
    if (status) {
      mainWin.setAlwaysOnTop(false)
      mainWin.setIgnoreMouseEvents(false)
      mainWin.setOpacity(1)
      status = 0
    } else {
      mainWin.setAlwaysOnTop(true)
      mainWin.setIgnoreMouseEvents(true)
      mainWin.setOpacity(opacity)
      status = 1
    }
    sendMsg('changeStatus', status)
  })

  globalShortcut.register('Ctrl+Shift+=', function () {
    if (opacity < 1) opacity += 0.1
    if (status === 1) mainWin.setOpacity(opacity)
  })
  globalShortcut.register('Ctrl+Shift+-', function () {
    if (opacity > 0) opacity -= 0.1
    if (status === 1) mainWin.setOpacity(opacity)
  })
})



