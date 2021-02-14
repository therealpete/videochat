const packager = require('electron-packager')
const setLanguages = require('electron-packager-languages')

packager({
    overwrite: true,
    out: 'dist',
    dir: '.',
    ignore: 'download',
    afterCopy: [setLanguages(['de', 'de_DE'])]
})