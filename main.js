const { app, BrowserWindow, ipcMain, shell } = require('electron')
const path = require('path')
const fs = require('fs')

app.commandLine.appendSwitch('lang', 'de-DE')

const room = app.commandLine.getSwitchValue('room')

function createWindow() {
  const options = {
    center: true,
    show: false,
    autoHideMenuBar: true,
  }

  if (!room) {
    options.webPreferences = {
      spellcheck: false,
      preload: path.join(__dirname, 'install-preload.js')
    }
  } else {
    options.webPreferences = {
      spellcheck: false,
      preload: path.join(__dirname, 'jitsi-preload.js'),
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

ipcMain.handle('create-room', (event, name) => {
  if (process.platform === 'linux') {
    const fileContents = [
      '#!/user/bin/env xdg-open',
      '[Desktop Entry]',
      'Version=1.0',
      'Name=' + name,
      'Terminal=false',
      'Type=Application',
      'Exec=' + app.getPath('exe') + ' --room=' + name,
      'Path=' + app.getAppPath(),
      'Categories=Internet',
      'Comment=Video Chat ' + name,
      'Icon=' + app.getAppPath() + '/icon.png'
    ].join('\n');
    const target = app.getPath('desktop') + '/' + name + '.desktop';
    fs.writeFileSync(target, fileContents);
    fs.chmodSync(target, '755');
  } else {
    shell.writeShortcutLink(app.getPath('desktop') + '\\' + name + '.lnk', 'create', {
      target: app.getPath('exe'),
      cwd: app.getAppPath(),
      args: '--room=' + name,
      description: 'Video Chat ' + name
    })
  }
})