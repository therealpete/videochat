const packager = require('electron-packager')
const setLanguages = require('electron-packager-languages')

packager({
    overwrite: true,
    out: 'dist',
    dir: '.',
    ignore: '(pack\.js|node_modules*|\.gitignore|download|README)',
    asar: true,
    extraResource: process.platform === 'linux' ? 'icon.png' : undefined,
    afterCopy: [setLanguages(['de', 'de_DE'])]
})