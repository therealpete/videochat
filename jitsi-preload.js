const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  data: window.process.argv.slice(-1)
})
