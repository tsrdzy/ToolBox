import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  openwindow: (data) => {
    ipcRenderer.send('openwindow', data);
  },
}
//控制按钮
const setbuttons = {
  minimize: () => {
    ipcRenderer.send('minimize');
  },
  maximize: () => {
    ipcRenderer.send('maximize');
  },
  unmaximize: () => {
    ipcRenderer.send('unmaximize');
  },
  close: () => {
    ipcRenderer.send('close');
  },
  getmax: (ismax) => {
    return ipcRenderer.on('ismax', ismax);
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('setbuttons', setbuttons)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
