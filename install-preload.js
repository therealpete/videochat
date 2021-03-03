const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    createRoom: (room) => ipcRenderer.invoke('create-room', room)
})