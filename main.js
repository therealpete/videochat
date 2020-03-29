const { app, BrowserWindow } = require('electron')
const fs = require('fs');

app.commandLine.appendSwitch('lang', 'DE');


function createWindow () {
  const win = new BrowserWindow({
    center: true,
    show: false,
    autoHideMenuBar: true,
  })

  win.maximize()

  win.once('ready-to-show', () => {
    win.show()
  })

  //win.loadURL('https://meet.jit.si/Pete')
  win.loadFile('install.html')

}


app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})