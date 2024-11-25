import { app, shell, BrowserWindow, ipcMain, ipcRenderer } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'

const fs = require('fs')

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    minWidth: 1100,
    minHeight: 720,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
  mainWindow.on("maximize", () => { mainWindow.webContents.send("ismax", true); });
  mainWindow.on("unmaximize", () => { mainWindow.webContents.send("ismax", false); });
  ipcMain.on('minimize', () => mainWindow.minimize())
  ipcMain.on('maximize', () => { mainWindow.maximize() })
  ipcMain.on('unmaximize', () => { mainWindow.unmaximize() })
  ipcMain.on('close', () => mainWindow.close())
  ipcMain.on('openwindow', (event, data) => {
    createwindow(data[0], data[1])
  })


  let filePath = 'D:/TsrTools'
  IsFolder(filePath)
  let folders = readFolder(filePath)
  let toolsjsons = readAllToolJsonInfo(filePath, folders)
  // console.log(toolsjsons)
  saveToolJson(toolsjsons)

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// 判断文件夹是否存在,不存在则创建
function IsFolder(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK)
  } catch (err) {
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath);
    }
  }
}

//读取文件夹下文件
function readFolder(filePath) {
  return fs.readdirSync(filePath)
}

//读取所有工具json信息
function readAllToolJsonInfo(filePath, folders: string[]) {
  let toolJson: string[] = []
  let toolJsonPath = ""
  for (let i = 0; i < folders.length; i++) {
    toolJsonPath = join(filePath, folders[i], 'plugin.json')
    try {
      fs.accessSync(toolJsonPath, fs.constants.F_OK)
      toolJson.push(toolJsonPath);
    } catch (err) {
    }
  }
  return toolJson
}
//对识别的工具进行存档
function saveToolJson(toolJson: string[]) {
  for (let i = 0; i < toolJson.length; i++) {
    console.log(JSON.parse(fs.readFileSync(toolJson[i]))[0].name)
  }
}



function createwindow(name: string, url: string): void {
  console.log(name, url)
  let toolwin = new BrowserWindow({
    width: 800,
    height: 500,
    title: name,
    autoHideMenuBar: true,
    webPreferences: {
      // preload: join(__dirname, '../preload/index.js'),
    }
  });
  let fullPath: string = ""
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    fullPath = process.env['ELECTRON_RENDERER_URL'].trimEnd();
  } else {
    fullPath = join(__dirname, 'index.html');
  }
  toolwin.loadURL(`${fullPath}#${url}`);
}


app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
