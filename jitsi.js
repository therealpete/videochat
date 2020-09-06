const data = window.process.argv.slice(-1);

let api;

window.addEventListener('DOMContentLoaded', () => {
    api = new JitsiMeetExternalAPI('meet.jit.si', {
        roomName: data[0],
        configOverwrite: {
            defaultLanguage: 'de',
            enableWelcomePage: false,
            prejoinPageEnabled: false,
            enableInsecureRoomNameWarning: false
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
