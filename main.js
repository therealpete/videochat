const { app, BrowserWindow } = require('electron')
const path = require('path')
app.commandLine.appendSwitch('lang', 'de')

const room = app.commandLine.getSwitchValue('room')

function createWindow() {
  const options = {
    center: true,
    show: false,
    autoHideMenuBar: true,
  }

  if (!room) {
    options.webPreferences = {
      nodeIntegration: true
    }
  } else {
    options.webPreferences = {
      preload: path.join(__dirname, 'jitsi.js'),
      additionalArguments: [room.trim()]
    }
  }

  const win = new BrowserWindow(options)
  win.maximize()
  win.once('ready-to-show', () => {
    win.show()
  })

  if (room) {
    win.loadFile('jitsi.html')
  } else {
    win.loadFile('install.html')
  }
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