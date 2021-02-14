const { shell } = require('electron')
const { app } = require('@electron/remote')
const fs = require('fs');

const room = document.getElementById('room')
const button = document.getElementById('button')
const close = document.getElementById('close')
const box = document.getElementById('box')
const success = document.getElementById('success')

room.addEventListener('input', () => {
    if (room.value.length > 0) {
        if (button.disabled) {
            button.disabled = false;
        }
    } else {
        button.disabled = true;
    }
})

button.addEventListener('click', () => {
    let name = room.value.trim()
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
    box.classList.add('hidden')
    success.classList.remove('hidden')

})

close.addEventListener('click', () => {
    window.close();
})
