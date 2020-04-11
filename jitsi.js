const data = window.process.argv.slice(-1);

window.addEventListener('DOMContentLoaded', () => {
    const api = new JitsiMeetExternalAPI('meet.jit.si', {
        roomName: data[0]
    });
    api.executeCommand('toggleTileView');
});