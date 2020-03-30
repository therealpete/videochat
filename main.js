const { app, BrowserWindow } = require('electron')
app.commandLine.appendSwitch('lang', 'DE');

const room = app.commandLine.getSwitchValue('room');

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
  }

  const win = new BrowserWindow(options)
  win.maximize()
  win.once('ready-to-show', () => {
    win.show()
  })

  if (room) {
    win.loadURL('https://meet.jit.si/' + room.trim())
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