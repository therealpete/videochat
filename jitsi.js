const data = window.process.argv.slice(-1);

let api;

window.addEventListener('DOMContentLoaded', () => {
    api = new JitsiMeetExternalAPI('meet.jit.si', {
        roomName: data[0],
        interfaceConfigOverwrite: {
            DISPLAY_WELCOME_PAGE_CONTENT: false
        }
    });
    
    api.once('tileViewChanged', (value) => {
        if (!value.enabled) {
            api.executeCommand('toggleTileView');
        }
    });        

});

window.addEventListener('beforeunload', () => {
    api.dispose()
});
